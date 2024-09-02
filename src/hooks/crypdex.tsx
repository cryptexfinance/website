import { useQuery } from '@tanstack/react-query'
import { Address, formatUnits } from 'viem'
import { Big18Math } from '@perennial/sdk'

import { useCrypdexChainId } from './network'
import {
  chainSetTokensWithAddress,
  SupportedSetTokens,
  addressToComponent,
  SupportedComponents,
  getSetTokenContract,
  getBasicIssuanceModuleContract,
  ChainSetTokens,
} from '../constants/crypdex'
import { SupportedChainIdType } from '../constants/network'
import { fetchTokensUsdcPrices } from './paraswap'


export type SetTokenSnapshot = {
  components: SupportedComponents[],
};

export type SetTokenSnapshots = {
  setTokens: Record<SupportedSetTokens, SetTokenSnapshot>,
}

export type UserSeTokenSnapshot = Record<SupportedSetTokens, { balance: bigint }>;


export const useSetTokensSnapshots = () => { 
  const chainId = useCrypdexChainId()

  return useQuery({
    queryKey: ['SetTokensSnapshot', chainId],
    enabled: true,
    queryFn: async () => {
      const snapshots = await fetchSetTokensSnapshots(chainId)
      return {
        setTokens: snapshots,
      }
    },
  })
}

export const fetchSetTokensSnapshots = async (chainId: SupportedChainIdType) => {
  const setTokens = chainSetTokensWithAddress(chainId)

  const componentCalls = setTokens.map((setToken: any) => {
    const contract = getSetTokenContract(chainId, setToken.setTokenAddress);
    return contract.read.getComponents();
  })

  const components = await Promise.all(componentCalls);

  const snapshot = {} as Record<SupportedSetTokens, { components: SupportedComponents[]  }>;
  setTokens.forEach((setToken, index: number) => {
    const supportedComponents = components[index].map((address) => addressToComponent(address)) as SupportedComponents[];

    snapshot[setToken.asset] = {
      components: supportedComponents,
    }
  })

  return snapshot;
}

export const useComponentUnitsForIssue = (setToken: SupportedSetTokens, amount: bigint) => {
  const chainId = useCrypdexChainId()

  return useQuery({
    queryKey: ['ComponentUnitsForIssue', chainId, setToken, amount.toString()],
    enabled: true,
    queryFn: async () => {
      return await fetchComponentUnitsForIssue(chainId, setToken, amount);
    },
  })
}

export const fetchComponentUnitsForIssue = async (chainId: SupportedChainIdType, setToken: SupportedSetTokens, amount: bigint) => { 
  const basicIssuanceModule = getBasicIssuanceModuleContract(chainId);
  const setTokenAddress = ChainSetTokens[chainId][setToken]

  if (!setTokenAddress) return {} as Record<SupportedComponents, { address: Address, unit: bigint }>;

  const [ unitsForIssue ] = await Promise.all([
    basicIssuanceModule.read.getRequiredComponentUnitsForIssue([setTokenAddress, amount])
  ])

  const addresses = unitsForIssue[0]
  const units = unitsForIssue[1]

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

export const useSetTokenPrice = (setToken: SupportedSetTokens) => { 
  const chainId = useCrypdexChainId()

  return useQuery({
    queryKey: ['SetTokenPrice', chainId, setToken],
    enabled: true,
    refetchInterval: 120000,
    refetchIntervalInBackground: true,
    queryFn: async () => {
      const componentsUnits =  await fetchComponentUnitsForIssue(chainId, setToken, Big18Math.fromFloatString("1"));

      if (!componentsUnits) return { priceOneSetToken: 0 };

      const components = Object.keys(componentsUnits) as SupportedComponents[];
      const usdcPrices = await fetchTokensUsdcPrices(components, chainId);

      // console.log("usdcPrices: ", usdcPrices);
      const priceOneSetToken = Object.keys(componentsUnits).reduce((total, componentToken) => {
        const componentU = componentsUnits[componentToken  as SupportedComponents];
        const componentData = usdcPrices.find((price: any) => price.srcToken.toLowerCase() === componentU.address.toLowerCase());
        
        if (!componentData) return total;

        const cp = parseFloat(formatUnits(componentU.unit, componentData.srcDecimals)) * parseFloat(componentData.srcUSD || "0")

        return total + cp;
      }, 0);

      return { priceOneSetToken }
    },
  })
}
