import { useQuery } from '@tanstack/react-query'
import { gql } from '@apollo/client'

import { ChainMarkets, SupportedAsset } from '../constants/markets'
import { notEmpty, sumBI } from '../utils/arrayUtils'
import { Big6Math, BigOrZero } from '../utils/big6Utils'
import { Day, Hour, last7dBounds, last24hrBounds } from '../utils/timeUtils'

import { useChainId, useGraphClient } from './network'


export const useMarket24hrData = (asset: SupportedAsset) => {
  const chainId = useChainId()
  const graphClient = useGraphClient()
  const market = ChainMarkets[chainId][asset]

  return useQuery({
    queryKey: ['market24hData', chainId, asset],
    enabled: !!market,
    queryFn: async () => {
      if (!market) return

      const { from, to } = last24hrBounds()

      const query = gql(`
        query Market24hrData($market: Bytes!, $from: BigInt!, $to: BigInt!) {
          volume: bucketedVolumes(
            where:{bucket: hourly, market: $market, periodStartTimestamp_gte: $from, periodStartTimestamp_lte: $to}
            orderBy: periodStartTimestamp
            orderDirection: asc
          ) {
            periodStartTimestamp
            longNotional
            shortNotional
            market
          }
        }
      `)

      return graphClient.request(query, {
        market,
        from: from.toString(),
        to: to.toString(),
      })
    },
  })
}

export const useMarket7dData = (asset: SupportedAsset) => {
  const chainId = useChainId()
  const graphClient = useGraphClient()
  const market = ChainMarkets[chainId][asset]

  return useQuery({
    queryKey: ['market7dData', chainId, asset],
    enabled: !!market,
    queryFn: async () => {
      if (!market) return

      const { from, to } = last7dBounds()

      const query = gql(`
        query Market7DayVolume($market: Bytes!, $from: BigInt!, $to: BigInt!) {
          volume: bucketedVolumes(
            where:{bucket: daily, market: $market, periodStartTimestamp_gte: $from, periodStartTimestamp_lte: $to}
            orderBy: periodStartTimestamp, orderDirection: asc
          ) {
            market
            longNotional
            shortNotional
          }

          hourlyFunding: bucketedVolumes(
            where: {bucket: hourly, market: $market, periodStartTimestamp_gte: $from, periodStartTimestamp_lte: $to}
            orderBy: periodStartTimestamp, orderDirection: asc
          ) {
            market
            weightedLongFunding
            weightedLongInterest
            totalWeight
            periodStartTimestamp
            periodEndTimestamp
          }

          firstNonZeroFunding: bucketedVolumes(
            where: {
              and: [
                {bucket: hourly, market: $market, periodStartTimestamp_lt: $from },
                {or: [
                  {weightedLongFunding_gt: 0 },
                  {weightedLongInterest_gt: 0 },
                ]}
              ]
            }
            orderBy: periodStartTimestamp, orderDirection: desc, first: 1
          ) {
            market
            weightedLongFunding
            weightedLongInterest
            totalWeight
            periodStartTimestamp
            periodEndTimestamp
          }

          currentAccumulator: marketAccumulators(
            where: { market: $market, latest: true }
          ) {
            market, fundingMaker, interestMaker, positionFeeMaker
          }

          startAccumulator: marketAccumulators(
            where: { market: $market, version_gte: $from }, first: 1, orderBy: version, orderDirection: asc
          ) {
            market, fundingMaker, interestMaker, positionFeeMaker, version
          }
        }
      `)

      // @ts-ignore
      const { volume, hourlyFunding, firstNonZeroFunding, currentAccumulator, startAccumulator } =
        await graphClient.request(query, {
          market: market,
          from: from.toString(),
          to: to.toString(),
        })

      const takerVolumes = {
        long: sumBI(volume.map((v: any) => BigInt(v.longNotional))),
        short: sumBI(volume.map((v: any) => BigInt(v.shortNotional))),
      }

      const fundingRates = hourlyFunding
        .map((f: any, i: any) => {
          let total = BigOrZero(f?.weightedLongFunding) + BigOrZero(f?.weightedLongInterest)
          let totalWeight = BigInt(f.totalWeight)

          // Set the initial rate to the first non-zero funding rate if the first bucket is zero
          if (i === 0 && total === 0n) {
            total =
              BigOrZero(firstNonZeroFunding.at(0)?.weightedLongFunding) +
              BigOrZero(firstNonZeroFunding.at(0)?.weightedLongInterest)
            totalWeight = BigOrZero(firstNonZeroFunding.at(0)?.totalWeight)
          }

          if (total === 0n) {
            return undefined
          }

          const scaleFactor = Big6Math.fromFloatString((Number(Hour) / Number(totalWeight)).toString())
          const unscaledRate = Big6Math.div(total, totalWeight)
          const hrRate = Big6Math.div(Big6Math.mul(unscaledRate, scaleFactor), Big6Math.ONE)
          return { timestamp: BigInt(f.periodStartTimestamp), hrRate }
        })
        .filter(notEmpty)

      // Scale accumulation values to fill the 7d window
      const accumulatorScaleFactor = Big6Math.fromFloatString(
        (Number(7n * Day) / Number(to - Number(startAccumulator.at(0)?.version ?? from))).toString(),
      )
      return {
        takerVolumes,
        fundingRates,
        // Accumulations are the delta between now and start, scaled to fill the 7d window
        makerAccumulation: {
          funding: Big6Math.mul(
            BigOrZero(currentAccumulator[0]?.fundingMaker) - BigOrZero(startAccumulator[0]?.fundingMaker),
            accumulatorScaleFactor,
          ),
          interest: Big6Math.mul(
            BigOrZero(currentAccumulator[0]?.interestMaker) - BigOrZero(startAccumulator[0]?.interestMaker),
            accumulatorScaleFactor,
          ),
          positionFee: Big6Math.mul(
            BigOrZero(currentAccumulator[0]?.positionFeeMaker) - BigOrZero(startAccumulator[0]?.positionFeeMaker),
            accumulatorScaleFactor,
          ),
        },
      }
    },
  })
}

