import React, { useMemo } from "react"
import { Stack } from "react-bootstrap";
import { ethers } from "ethers"
import { Big6Math, calcNotional, calcTakerLiquidity, formatBig6USDPrice, MarketSnapshot, SupportedAsset } from "@perennial/sdk"

import { addPositions, nextPosition } from "../../../../utils/positionUtils"
import { useMarketSnapshots } from "../../../../hooks/markets";
import { AssetMetadata } from "../../../../constants/markets"
import Spot from "./Spot";


const spotSummary = [
  {
    title: "Chains",
    value: "28",
  },
  {
    title: "Bridges",
    value: "20",
  },
  {
    title: "Dexes",
    value: "38",
  },
]

const Summary = () => {
  const snapshots = useMarketSnapshots();

  const { totalLiquidity, totalOpenInteres } = useMemo(() => {
    if (snapshots && snapshots.data && snapshots.data.markets) {
      const listedMarketsSnapshots = Object.keys(AssetMetadata).filter((asset) => !AssetMetadata[asset as SupportedAsset].isUnlisted)

      const formattedMarkets = listedMarketsSnapshots.map((market) => {
        const marketSnapshot = snapshots?.data?.markets?.market[market as SupportedAsset]
        const marketPrice = marketSnapshot?.global?.latestPrice ?? 0n
        const latestPrice = marketSnapshot?.global?.latestPrice ?? 0n
        const liquidity = marketSnapshot ? calcTakerLiquidity(marketSnapshot) : undefined
        const nextLong = marketSnapshot?.nextPosition?.long ?? 0n
        const nextShort = marketSnapshot?.nextPosition?.short ?? 0n

        return {
          liquidity:
            Big6Math.mul(liquidity?.totalLongLiquidity ?? 0n, latestPrice) + Big6Math.mul(liquidity?.totalShortLiquidity ?? 0n, latestPrice),
          openInterest: Big6Math.mul(nextLong, latestPrice) + Big6Math.mul(nextShort, latestPrice)
        }
      })

      let tcapLiquidity = 0n;
      let tcapOpenInterest = 0n;
      if (snapshots.data.tcapSnapshot) {
        const { longSnapshot, shortSnapshot } = snapshots.data.tcapSnapshot
        const tcapPrice = parseFloat(ethers.formatEther(longSnapshot.latestVersion.price))
        const longGlobalPosition = nextPosition(longSnapshot.pre, longSnapshot.position)
        const shortGlobalPosition = nextPosition(shortSnapshot.pre, shortSnapshot.position)
        const globlaTotalPosition = addPositions(longGlobalPosition, shortGlobalPosition)
        const globalOpenInterest = {
          taker: ethers.formatEther(longSnapshot.openInterest.taker + shortGlobalPosition.taker),
          maker: ethers.formatEther(longSnapshot.openInterest.maker + shortGlobalPosition.maker)
        }

        const liquidity = parseFloat(ethers.formatEther(globlaTotalPosition.maker)) * tcapPrice
        tcapLiquidity = Big6Math.fromFloatString(liquidity.toString())
        tcapOpenInterest = Big6Math.fromFloatString(globalOpenInterest.taker)
      }

      const totalLiquidity = formattedMarkets.reduce(
        (acc, totalLiq) => acc + totalLiq.liquidity,
        0n,
      ) + tcapLiquidity
      const totalOpenInteres = formattedMarkets.reduce(
        (acc, totalLiq) => acc + totalLiq.openInterest,
        0n,
      ) + tcapOpenInterest

      return {
        totalLiquidity: `${formatBig6USDPrice(totalLiquidity, { compact: true })}+`,
        totalOpenInteres: `${formatBig6USDPrice(totalOpenInteres, { compact: true })}+`,
      }
    }

    return { totalLiquidity: "-", totalOpenInteres: "-" }
  }, [snapshots, snapshots.status])

  return (
    <Stack
      direction="horizontal"
      gap={4}
      className="products-summary align-items-center justify-content-center"
    >
      {spotSummary.map((summary) => (
        <div key={summary.title} className="summary-box-wrapper position-relative">
          <Stack
            direction="vertical"
            gap={1}
            className="summary-box p-1 align-items-center justify-content-center"
          >
            <span className="summary-value">
              {summary.value}
            </span>
            <span className="summary-title">
              {summary.title}
            </span>
          </Stack>
        </div>
      ))}
      <div className="position-relative summary-box-wrapper second-line">
        <Stack
          direction="vertical"
          gap={1}
          className="summary-box p-1 align-items-center justify-content-center"
        >
          <span className="summary-value">
            {totalLiquidity}
          </span>
          <span className="summary-title">
            Total Liquidity
          </span>
        </Stack>
      </div>
      <div className="position-relative summary-box-wrapper second-line">
        <Stack
          direction="vertical"
          gap={1}
          className="summary-box p-1 align-items-center justify-content-center"
        >
          <span className="summary-value">
            {totalOpenInteres}
          </span>
          <span className="summary-title">
            Open Interest
          </span>
        </Stack>
      </div>
      <div style={{ display: "none" }}>
        <Spot />
      </div>      
    </Stack>    
  )
}

export default Summary;
