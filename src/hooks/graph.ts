import { last24hrBounds } from '@perennial/sdk'
import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'

import { useGraphClientV1 } from './network'


export const useTcapPriceChanges = () => {
  const graphClient = useGraphClientV1()
  const { from } = last24hrBounds()

  return useQuery({
    queryKey: ['tcap24hPrices'],
    enabled: true,
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    queryFn: async () => {
      const query = gql`
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
      `
       
      const tcapAggregatorAddress = "0x7b9845a634822c543f5ce544dd7d7797b79a06b8"
      
      const prices = await graphClient.request(query, {
        aggregatorAddress: tcapAggregatorAddress,
        fromTS: from.toString(),
      })

      return prices as any
    },
  })  
}
