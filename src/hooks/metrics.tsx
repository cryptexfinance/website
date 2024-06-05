import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  BigOrZero,
  Big6Math,
  chainAssetsWithAddress,
  formatBig6Percent,
  formatBig6USDPrice,
  last24hrBounds,
  MarketSnapshot,
  SupportedAsset,
  calcLpExposure,
  calcSkew,
  calcTakerLiquidity,
  efficiency,
  PriceFeed,
} from '@perennial/sdk'

import { AssetMetadata } from '../constants/markets'
import { useChainId, usePythSubscription } from './network'
import { useQuery } from '@tanstack/react-query'
import { PythDataFeedUrl } from '../constants/network'


const useChainLivePrices = () => {
  const chain = useChainId()
  const markets = chainAssetsWithAddress(chain)
  const [prices, setPrices] = useState<{ [key in SupportedAsset]?: { price: bigint; untransformed: bigint } }>({})

  const [feedIds, feedToAsset] = useMemo(() => {
    const feedToAsset = markets.reduce((acc, { asset }) => {
      const feed = AssetMetadata[asset].pythFeedId
      if (!feed) return acc
      if (acc[feed]) {
        acc[feed].push(asset)
      } else {
        acc[feed] = [asset]
      }
      return acc
    }, {} as { [key: string]: SupportedAsset[] })

    const feedIds = Object.keys(feedToAsset)

    return [feedIds, feedToAsset]
  }, [markets])

  const feedSubscription = usePythSubscription(feedIds)
  feedSubscription.setMaxListeners(20)
  const onUpdate = useCallback(
    (priceFeed: PriceFeed) => {
      const price = priceFeed.getPriceNoOlderThan(60)
      const normalizedExpo = price ? 6 + price?.expo : 0

      const normalizedPrice =
        normalizedExpo >= 0
          ? BigOrZero(price?.price) * BigInt(Math.pow(10, normalizedExpo))
          : BigOrZero(price?.price) / BigInt(Math.pow(10, Math.abs(normalizedExpo)))

      setPrices((prices) => ({
        ...prices,
        ...feedToAsset['0x' + priceFeed.id].reduce((acc, asset) => {
          const { transform } = AssetMetadata[asset]
          // Pyth price is has `expo` (negative number) decimals, normalize to expected 18 decimals by multiplying by 10^(18 + expo)
          acc[asset] = price ? { price: transform(normalizedPrice), untransformed: normalizedPrice } : undefined
          return acc
        }, {} as { [key in SupportedAsset]?: { price: bigint; untransformed: bigint } }),
      }))
    },
    [feedToAsset],
  )

  useEffect(() => {
    feedSubscription.on('updates', onUpdate)

    return () => {
      feedSubscription.off('updates', onUpdate)
    }
  }, [feedSubscription, onUpdate])

  return prices
}

export type LivePrices = Awaited<ReturnType<typeof useChainLivePrices>>


export const useMarket24HrHighLow = (asset: SupportedAsset) => {
  const metadata = AssetMetadata[asset]

  return useQuery({
    queryKey: ['market24HrHighLow', asset],
    enabled: !!metadata,
    queryFn: async () => {
      if (!metadata) return

      const { tvTicker, transform } = metadata
      const { from, to } = last24hrBounds()
      const request = await fetch(`${PythDataFeedUrl}/history?symbol=${tvTicker}&resolution=D&from=${from}&to=${to}`) 
      const prices = (await request.json()) as { h: number[]; l: number[]; o: number[] }

      return {
        open: transform(Big6Math.fromFloatString(prices.o[0].toString())),
        high: transform(Big6Math.fromFloatString(Math.max(...prices.h).toString())),
        low: transform(Big6Math.fromFloatString(Math.min(...prices.l).toString())),
      }
    },
  })
}


export const useFormattedMarketBarValues = (marketSnapshot: MarketSnapshot) => {
  const livePrices = useChainLivePrices()
  const selectedMarket = marketSnapshot.asset
  const { data: priceData } = useMarket24HrHighLow(selectedMarket)

  const chainPrice = marketSnapshot.global?.latestPrice ?? 0n
  const currentPrice = livePrices[selectedMarket]?.price ?? chainPrice ?? 0n
  const change = currentPrice - BigInt(priceData?.open ?? currentPrice)

  const latestPrice = marketSnapshot?.global?.latestPrice ?? 0n
  const nextLong = marketSnapshot?.nextPosition?.long ?? 0n
  const nextShort = marketSnapshot?.nextPosition?.short ?? 0n
  const longOpenInterest = Big6Math.mul(nextLong, latestPrice)
  const shortOpenInterest = Big6Math.mul(nextShort, latestPrice)

  const availableLiq = marketSnapshot ? calcTakerLiquidity(marketSnapshot) : undefined
  const lpExposure = calcLpExposure(marketSnapshot)
  const calculatedSkew = calcSkew(marketSnapshot)
  const makerEfficiency = efficiency(
    marketSnapshot?.nextPosition.maker ?? 0n,
    marketSnapshot?.nextMajor ?? 0n,
  )

  return {
    price: formatBig6USDPrice(currentPrice),
    priceBI: currentPrice,
    change: formatBig6Percent(Big6Math.abs(Big6Math.div(change, priceData?.open ?? 1n))),
    changeIsNegative: change < 0n,
    low: formatBig6USDPrice(Big6Math.min(currentPrice, priceData?.low ?? 0n)),
    high: formatBig6USDPrice(Big6Math.max(currentPrice, priceData?.high ?? 0n)),
    openInterest: `${formatBig6USDPrice(longOpenInterest, {
      compact: true,
    })} / ${formatBig6USDPrice(shortOpenInterest, { compact: true })}`,
    availableLiquidity: `${formatBig6USDPrice(Big6Math.mul(availableLiq?.availableLongLiquidity ?? 0n, latestPrice), {
      compact: true,
    })} / ${formatBig6USDPrice(Big6Math.mul(availableLiq?.availableShortLiquidity ?? 0n, latestPrice), {
      compact: true,
    })}`,
    totalLiquidity: `${formatBig6USDPrice(Big6Math.mul(availableLiq?.totalLongLiquidity ?? 0n, latestPrice), {
      compact: true,
    })} / ${formatBig6USDPrice(Big6Math.mul(availableLiq?.totalShortLiquidity ?? 0n, latestPrice), {
      compact: true,
    })}`,
    lpExposurePct: lpExposure?.formattedLpExposure ?? '0.00%',
    lpExposure: lpExposure?.exposureSide ?? '--',
    /* volume7d: `${formatBig6USDPrice((weeklyData?.takerVolumes.long ?? 0n) + (weeklyData?.takerVolumes.short ?? 0n), {
      compact: true,
    })}`, */
    lpUtilization: '0.00%',
    skew: formatBig6Percent(calculatedSkew?.skew ?? 0n),
    longSkew: formatBig6Percent(calculatedSkew?.longSkew ?? 0n),
    shortSkew: formatBig6Percent(calculatedSkew?.shortSkew ?? 0n),
    efficiency: formatBig6Percent(makerEfficiency),
  }
}