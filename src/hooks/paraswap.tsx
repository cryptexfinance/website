import { useQuery } from "@tanstack/react-query"
import { parseUnits } from "viem"
import { mainnet } from "viem/chains"
import { OptimalRate, ParaSwapVersion, SwapSide } from "@paraswap/core"
import axios from "axios"

import { useCrypdexChainId } from "./network"
import { ChainComponentsTokens, ComponentMetadata, SupportedComponents, UsdcMetadata } from "../constants/crypdex"
import { ParaswapApiUrl, ParaswapPartner, ParaswapPricesEndpoint, PriceQueryParams } from "../constants/paraswap"
import { UsdcAddresses } from "../constants/contracts"
import { SupportedChainIdType } from "../constants/network"


export const useTokensUsdcPrices = (componets: Array<SupportedComponents>) => { 
  const chainId = useCrypdexChainId()
    
  return useQuery({
    queryKey: ['TokensUsdcPrices', chainId],
    enabled: !!componets,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return fetchTokensUsdcPrices(componets, chainId)
    },
  })
}

export const fetchTokensUsdcPrices = async (componets: Array<SupportedComponents>, chainId: SupportedChainIdType) => { 
  const priceCalls = componets.map(async (component) => { 
    const tokenMetadata = ComponentMetadata[component];
    const addresses = ChainComponentsTokens[mainnet.id][component]

    if (addresses) {
      const queryParams: PriceQueryParams = {
        srcToken: addresses.token,
        destToken: UsdcAddresses[mainnet.id],
        srcDecimals: tokenMetadata.decimals.toString(),
        destDecimals: UsdcMetadata.decimals.toString(),
        amount: parseUnits("1", tokenMetadata.decimals).toString(), 
        side: SwapSide.SELL,
        network: mainnet.id.toString(),
        partner: ParaswapPartner,
        version: ParaSwapVersion.V6,
        maxImpact: "40",
      };
      const searchString = new URLSearchParams(queryParams);
      const pricesURL = `${ParaswapApiUrl}${ParaswapPricesEndpoint}/?${searchString}`;

      // console.log(`Fetching price for ${component} from ${pricesURL}`);

      return axios.get<{ priceRoute: OptimalRate }>(pricesURL);
    }
  })

  console.log(`Fetching prices for ${componets.length} components`);

  const responses = await Promise.all(priceCalls)

  const priceRoutes = new Array<OptimalRate>();
  responses.forEach((response) => {
    if (response && response.status === 200) { 
      priceRoutes.push(response.data.priceRoute);
    }
  })

  return priceRoutes;
}
