import { useQuery } from "@tanstack/react-query"
import { Address, parseUnits, zeroAddress, formatUnits } from "viem"
import { arbitrum } from "viem/chains"
import { ParaSwapVersion, SwapSide } from "@paraswap/core"
import axios, { AxiosResponse } from "axios"


import {
    addressToComponent,
    ChainSetTokens,
    ComponentMetadata,
    getBasicIssuanceModuleContract,
    SetTokenMetadata,
    SupportedComponents,
    SupportedSetTokens,
} from "../constants/arfi"
import { ParaswapApiUrl, ParaswapSlippage, ParaswapSwapEndpoint, PriceQueryParams } from "../constants/paraswap"
import { Big18Math } from "@perennial/sdk"
import { DummyAddress } from "../constants/paraswap"
import { ChainTokens, SupportedTokens, TokenMetadata } from "../constants/tokens"
import { BuyComponentsDataType } from "./paraswap"
import { SupportedChainIdType } from "../constants/network"


export const useSetTokenPrice = (setToken: SupportedSetTokens) => { 
  return useQuery({
    queryKey: ['SetTokenPrice', setToken],
    enabled: true,
    refetchInterval: 120000,
    refetchIntervalInBackground: false,
    queryFn: async () => {
      const data = await fetchBuyComponentsData(arbitrum.id, setToken, Big18Math.fromFloatString("1"), SupportedTokens.usdc, DummyAddress);
      let priceOneSetToken = Object.keys(data).reduce((total, componentToken) => {
        const componentU = data[componentToken  as SupportedComponents];
        return total + componentU.srcAmount;
      }, 0);

      return { priceOneSetToken }
    },
  })
}

export const  fetchBuyComponentsData = async (
  chainId: SupportedChainIdType,
  setToken: SupportedSetTokens,
  setTokenAmount: bigint,
  srcToken: SupportedTokens,
  userAddress: Address,
) => {
  const buyComponentsData = {} as BuyComponentsDataType;
  const setTokenMetadata = SetTokenMetadata[setToken];
  const componentsUnits = await fetchComponentUnitsForIssue(chainId, setToken, setTokenAmount);

  const scrMetadata = TokenMetadata[srcToken];
  const srcTokenAddress = ChainTokens[chainId][srcToken];

  try {
    const swapCalls = new Array<Promise<AxiosResponse<any>>>();
    Object.keys(componentsUnits).forEach((component) => {
      if (component !== SupportedComponents.floki) {
        const componentMetadata = ComponentMetadata[component as SupportedComponents];
        const cUnit = componentsUnits[component as SupportedComponents];

        const queryParams: PriceQueryParams = {
          srcToken: srcTokenAddress || zeroAddress,
          destToken: cUnit.address,
          srcDecimals: scrMetadata.decimals.toString(),
          destDecimals: componentMetadata.decimals.toString(),
          amount: cUnit.unit.toString(),
          side: SwapSide.BUY,
          network: arbitrum.id.toString(),
          version: ParaSwapVersion.V6,
          userAddress,
          slippage: ParaswapSlippage,
          maxImpact: "30",
          excludeDEXS: "ParaSwapPool,ParaSwapLimitOrders",
        };

        const searchString = new URLSearchParams(queryParams);
        const swapsURL = `${ParaswapApiUrl}${ParaswapSwapEndpoint}/?${searchString}`;

        // console.log("swapsURL", swapsURL)
        swapCalls.push(axios.get(swapsURL));
      }
    })

    for (let i = 0; i < swapCalls.length; i += 1) {
      try {
        const route = await swapCalls[i];
        const srcAmount = parseFloat(formatUnits(BigInt(route.data.priceRoute.srcAmount), scrMetadata.decimals)) * 1.02;
        buyComponentsData[setTokenMetadata.components[i]] = {
          payload: route.data.txParams.data,
          srcAmount: srcAmount,
          srcAmountBI: parseUnits(srcAmount.toString(), scrMetadata.decimals)
        }
      } catch (e: any) {
        buyComponentsData[setTokenMetadata.components[i]] = {
          payload: zeroAddress,
          srcAmount: 0,
          srcAmountBI: 0n,
          error: e.response.data.error
        }
      }
    }
  }
  catch (e) { 
    console.error("ERROR buy components", e)
  }
  return buyComponentsData;
}

export const fetchComponentUnitsForIssue = async (chainId: SupportedChainIdType, setToken: SupportedSetTokens, amount: bigint) => { 
  const basicIssuanceModule = getBasicIssuanceModuleContract(chainId);
  const setTokenAddress = ChainSetTokens[chainId][setToken]

  if (!setTokenAddress) return {} as Record<SupportedComponents, { address: Address, unit: bigint }>;

  const [ unitsForIssue ] = await Promise.all([
    basicIssuanceModule.read.getRequiredComponentUnitsForIssue([setTokenAddress.token, amount])
  ])
  // const addresses = unitsForIssue[0]
  const addresses = new Array<Address>(unitsForIssue[0].length).fill(zeroAddress);
  const units = new Array<bigint>(unitsForIssue[0].length).fill(0n);
    // unitsForIssue[1]
  
  unitsForIssue[0].forEach((address, index) => { 
    const component = addressToComponent(address);
    if (component) {
      const metadata = ComponentMetadata[component];
      addresses[metadata.payloadIndex] = address;
      units[metadata.payloadIndex] = unitsForIssue[1][index];
    }
  })

  const componentsUnitsForIssue = {} as Record<SupportedComponents, { address: Address, unit: bigint }>;
  addresses.forEach((address, index) => {
    const component = addressToComponent(address);
    if (component) {
      componentsUnitsForIssue[component] = {
        address,
        unit: units[index]
      }
    }
  })

  return componentsUnitsForIssue
}

