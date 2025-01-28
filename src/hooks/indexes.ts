import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { formatUnits } from 'viem';
import { base } from 'viem/chains';
import { gql } from '@apollo/client'

import { CryptexPriceFeedUrl } from "../constants/network";
import { IndexMetadata, SupportedIndex } from "../constants/indexes";
import { useGraphClient } from './network';
const qs = require("qs");


const OneDay = 24 * 60 * 60 * 1000;
const PricesPageSize = 2000

export const useIndexPrices = (index: SupportedIndex, fromTimestamp: number, toTimestamp?: number) => { 
  const feedId = IndexMetadata[index].feedId;

  return useInfiniteQuery({
    queryKey: ['indexPrices', feedId, fromTimestamp, toTimestamp],
    enabled: !!feedId,
    queryFn: async ({ pageParam }) => {      
      const params = qs.stringify({
        feed_id: feedId,
        timestamp_lt: pageParam.toTimestamp ||  Math.ceil((new Date().getTime()) / 1000),
        count: PricesPageSize,
      });

      let prices = new Array<{ time: number, value: number }>();
      const response = await fetch(`${CryptexPriceFeedUrl}?${params}`)
      if (response.ok) { 
        prices = await response.json()
        prices = prices.map((price: any) => ({ time: price.time, value: price.value }))
      }

      let nextPageParam = undefined;
      if (prices.length > 0) { 
        nextPageParam = fromTimestamp < prices[prices.length - 1].time && prices.length === PricesPageSize
          ? { toTimestamp: prices[prices.length - 1].time }
          : undefined
      }

      return {
        prices: prices,
        nextPageParam,
      }
    },
    initialPageParam: {
      toTimestamp: toTimestamp
    },
    getNextPageParam: (lastPage) => lastPage?.nextPageParam,
  })
}

export const usePriceLastUpdates = (index: SupportedIndex, fromTimestamp: number) => { 
  const feedId = IndexMetadata[index].feedId;

  return useQuery({
    queryKey: ['priceLastUpdate', feedId, fromTimestamp],
    enabled: !!feedId && fromTimestamp > 0,
    refetchInterval: 10000,
    queryFn: async () => {
      let lastPrice = { time: 0, value: 0 }

      const params = qs.stringify({
        feed_id: feedId,
        timestamp_gt: fromTimestamp,
        count: 1,
      });
      
      const response = await fetch(`${CryptexPriceFeedUrl}?${params}`)
      if (response.ok) { 
        const data = await response.json()
        if (data.length > 0) { 
          lastPrice = { time: data[0].time, value: data[0].value }
        }
      }

      return lastPrice
    }
  })
}

export const useIndexLastestsPrices = (index: SupportedIndex) => { 
  const feedId = IndexMetadata[index as SupportedIndex].feedId;

  return useQuery({
    queryKey: ['indexLastPrice', feedId],
    enabled: !!feedId,
    refetchInterval: 3000,
    queryFn: async () => {
      let prices = new Array<{ time: number, value: number }>();
      const params = qs.stringify({
        feed_id: feedId,
        count: 2,
      });

      const response = await fetch(`${CryptexPriceFeedUrl}?${params}`)

      if (response.ok) { 
        const data = await response.json()
        if (data.length > 0) {
          prices = data.map((price: any) => ({ time: price.time, value: price.value }))
        }
      }

      return prices;
    }
  })
}

export const use24hPriceChange = (index: SupportedIndex) => { 
  const { data: latestPrices } = useIndexLastestsPrices(index);
  const feedId = IndexMetadata[index as SupportedIndex].feedId;

  return useQuery({
    queryKey: ['24hIndexPriceChange', latestPrices],
    enabled: !!latestPrices,
    queryFn: async () => {
      let percentChange = { change: 0, isPostive: true };
      if (!latestPrices || latestPrices.length === 0) return percentChange;

      const timeElapsed = (new Date().getTime() - OneDay) / 1000;
      const params = qs.stringify({
        feed_id: feedId,
        timestamp_lt: Math.ceil(timeElapsed),
        count: 1,
      });

      const response = await fetch(`${CryptexPriceFeedUrl}?${params}`)
      if (response.ok) { 
        const data = await response.json()
        if (data.length > 0) {
          percentChange = { 
            change: ((latestPrices[0].value - data[0].value) / data[0].value) * 100,
            isPostive: latestPrices[0].value >= data[0].value 
          }
        }
      }

      return percentChange;
    }
  })
}

//
export const useIndexDataFromGraph = (index: SupportedIndex) => {
  const graphClient = useGraphClient(base.id)

  return useQuery({
    queryKey: ['indexGraphPrices'],
    enabled: true,
    refetchInterval: 60000,
    queryFn: async () => {
      const query = gql(`
        query IndexPrices($fromTimestamp: BigInt!) {
          indexPrices(
            orderBy: blockTimestamp, 
            orderDirection: desc,
            first: 200,
            where: { blockTimestamp_gt: $fromTimestamp }
          ) {
            blockTimestamp
            answer
          }
        }
      `);
      const indexMetadata = IndexMetadata[index];
      const fromTimestamp = (new Date().getTime() - OneDay) / 1000;
      const { indexPrices } = await graphClient.request(query, {
          fromTimestamp: Math.ceil(fromTimestamp),
        }) as any

      let lastPrice = { time: 0, value: 0 }
      let percent24hChange = {
        change: 0,
        isPositive: true,
      };
      if (indexPrices.length > 0) {
        const price = parseFloat(formatUnits(indexPrices[0].answer, indexMetadata.decimals))
        lastPrice = {
          time: parseInt(indexPrices[0].blockTimestamp),
          value: price,
        }

        const price24h = parseFloat(formatUnits(indexPrices[indexPrices.length - 1].answer, indexMetadata.decimals))
        percent24hChange = {
          change: ((price - price24h) / price24h) * 100,
          isPositive: price >= price24h,
        }
      }  

      return {
        lastPrice,
        percent24hChange,
      }
    },
  })
}
