import { ChainMarkets, SupportedAsset, last24hrBounds } from '@perennial/sdk'
import { useQuery } from '@tanstack/react-query'

import { useChainId, useGraphClientV1 } from './network'
import { usePerennialSDKContext } from '../context/perennialSdkContext'


export const useMarket24hrData = (asset: SupportedAsset) => {
  const chainId = useChainId()
  const market = ChainMarkets[chainId][asset]
  const sdk = usePerennialSDKContext()

  return useQuery({
    queryKey: ['market24hData', chainId, asset],
    enabled: !!market,
    queryFn: async () => {
      if (!market) return
      return sdk.markets.read.market24hrData({ market })
    },
  })
}

export const useMarket7dData = (asset: SupportedAsset) => {
  const chainId = useChainId()
  const market = ChainMarkets[chainId][asset]
  const sdk = usePerennialSDKContext()

  return useQuery({
    queryKey: ['market7dData', chainId, asset],
    enabled: !!market,
    queryFn: async () => {
      if (!market) return
      return sdk.markets.read.market7dData({ market })
    },
  })
}


export const useTcapPriceChanges = () => {
  const graphClient = useGraphClientV1()
  const { from } = last24hrBounds()

  return useQuery({
    queryKey: ['tcap24hPrices'],
    enabled: true,
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    queryFn: async () => {
      const query = gql(`
        query LastPriceUpdates($aggregatorAddress: String!, $fromTS: BigInt!) {
          answerUpdateds(
            orderBy: blockTimestamp, 
            orderDirection: desc,
            where: { aggregatorAddress: $aggregatorAddress, blockTimestamp_gte: $fromTS  }
          ) {
            id
            updatedAt
            blockTimestamp
            blockNumber
            answer
          }
        }
      `)
       
      const tcapAggregatorAddress = "0x7b9845a634822c543f5ce544dd7d7797b79a06b8"
      return graphClient.request(query, {
        aggregatorAddress: tcapAggregatorAddress,
        fromTS: from.toString(),
      }) 
    },
  })  
}

