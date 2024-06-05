import React, { useEffect, useMemo, useState } from "react"
import { ethers } from "ethers"
import { Col, Image, Spinner, Stack } from "react-bootstrap"
import { Big6Math, formatBig6USDPrice, MarketSnapshot, SupportedAsset } from "@perennial/sdk"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { useMarketSnapshots } from "../../../../hooks/markets"
import { useFormattedMarketBarValues } from "../../../../hooks/metrics"
import { AssetMetadata } from "../../../../constants/markets"
import { addPositions, calcNotional, calcTakerLiquidity, nextPosition } from "../../../../utils/positionUtils"
import { VaultSnapshot } from "../../../../hooks/marketsV1"
import tcapLogo from '../../../../../static/website/markets/tcap.png'
import { useTcapPriceChanges } from "../../../../hooks/graph"

// import { ProductInfoCard } from "./common"

/* const highlights = [
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Lorem <span className="text-purple" style={{ fontSize: "1.1rem" }}>ipsum dolor</span> sit amet, consectetur.
  </p>,
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Excepteur sint <span className="text-purple" style={{ fontSize: "1.1rem" }}>occaecat cupidatat</span> non proident.
  </p>,
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Sunt in culpa qui officia deserunt <span className="text-purple" style={{ fontSize: "1.1rem" }}> mollit anim</span>.
  </p>
] */

const PriceBox = ({ currentPrice }: { currentPrice: bigint }) => {
  const { t } = useTranslation()
  const [previousPrice, setPreviousPrice] = useState(0n)
  const [positiveChange, setPositiveChange] = useState(true)

  useEffect(() => {
    setPositiveChange(previousPrice < currentPrice)
    setPreviousPrice(currentPrice)
  }, [currentPrice])

  return (
    <Col lg={2} md={2} sm={12} className="market-row-item not-on-mobile text-right">
      <span className="market-title only-mobile">{t('price')}</span>
      <span className={"market-value ".concat(positiveChange ? "text-green" : "text-red")}>
        {formatBig6USDPrice(currentPrice)}
      </span>
    </Col>
  )
}

const MarketRow = ({ index, asset, market, showOI }: { index: number, asset: SupportedAsset, market: MarketSnapshot, showOI: boolean }) => {
  const { t } = useTranslation()
  const assetMetada = AssetMetadata[asset]
  const formattedValues = useFormattedMarketBarValues(market)
  const darkRow = index % 2 === 0

  return (
    <a
      key={index.toString()}
      className={"market-row ".concat(darkRow ? "dark" : "")}
      href={`https://app.cryptex.finance/?market=${asset}`}
      target="_blank"
    >
      <Col className="market-row-item mobile-header" lg={showOI ? 2 : 4} md={showOI ? 2 : 4} sm={12}>
        <Stack direction="horizontal" gap={3}>
          <Image className="market-logo" src={assetMetada.icon} width={36} height={36} />
          <Stack direction="vertical" gap={0}>
            <span className="market-value">{assetMetada.name}</span>
            <span className="market-subvalue">{assetMetada.symbol}</span>
          </Stack>
        </Stack>
        <span className={`market-value price only-mobile ${!formattedValues.changeIsNegative ? "text-green" : "text-red"}`}>
          {formattedValues.price}
        </span>
      </Col>
      <PriceBox currentPrice={formattedValues.priceBI} />
      <Col lg={2} md={2} sm={12} className="market-row-item text-right">
        <span className="market-title only-mobile">{t('chagen24h')}</span>
        <span className={`market-value ${!formattedValues.changeIsNegative ? "text-green" : "text-red"}`}>
          {formattedValues.change}
        </span>
      </Col>
      <Col lg={showOI ? 3 : 4} md={showOI ? 3 : 4} sm={12} className="market-row-item text-right">
        <span className="market-title only-mobile">{t('ls-liquidity')}</span>
        <span className="market-value">{formattedValues.totalLiquidity}</span>
      </Col>
      {showOI && (
        <Col lg={3} md={3} sm={12} className="market-row-item text-right">
          <span className="market-title  only-mobile">{t('ls-interes')}</span>
          <span className="market-value">{formattedValues.openInterest}</span>
        </Col>
      )}
    </a>
  )
}

const MarketTcapRow = ({ index, tcapSnapshot, showOI }: { index: number, tcapSnapshot: VaultSnapshot, showOI: boolean }) => {
  const darkRow = index % 2 === 0
  const { data: pricesData } = useTcapPriceChanges()
  const { longSnapshot, shortSnapshot } = tcapSnapshot
  const tcapPrice = parseFloat(ethers.formatEther(longSnapshot.latestVersion.price))
  const longGlobalPosition = nextPosition(longSnapshot.pre, longSnapshot.position)
  const shortGlobalPosition = nextPosition(shortSnapshot.pre, shortSnapshot.position)
  const tcapLiquidity = {
    long: Big6Math.fromFloatString((parseFloat(ethers.formatEther(longGlobalPosition.maker)) * tcapPrice).toString()),
    short: Big6Math.fromFloatString((parseFloat(ethers.formatEther(shortGlobalPosition.maker)) * tcapPrice).toString())
  }
  const globalOpenInterest = {
    long: Big6Math.fromFloatString(ethers.formatEther(longSnapshot.openInterest.taker)),
    short: Big6Math.fromFloatString(ethers.formatEther(shortGlobalPosition.taker))
  }

  const { currentPrice, changeIsNegative, changePercent } = useMemo(() => {
    if (pricesData && pricesData.answerUpdateds) {
      const prices = pricesData.answerUpdateds
      if (prices.length > 0) {
        const currentPrice = parseFloat(ethers.formatEther(BigInt(prices[0].answer)))
        const price24H = prices.length > 1
          ? parseFloat(ethers.formatEther(BigInt(prices[prices.length - 1].answer)))
          : currentPrice
        
        return {
          currentPrice,
          changeIsNegative: currentPrice - price24H < 0,
          changePercent: ((currentPrice - price24H) / currentPrice) * 100
        }
      }      
    }

    return {
      currentPrice: tcapPrice,
      changeIsNegative: false,
      changePercent: 0
    }
  }, [pricesData])

  return (
    <a
      key={index.toString()}
      className={"market-row tcap-row ".concat(darkRow ? "dark" : "")}
      href={"https://app.cryptex.finance/v2/"}
      target="_blank"
    >
      <Col className="market-row-item tcap-item mobile-header" lg={showOI ? 2 : 4} md={showOI ? 2 : 4} sm={12}>
        <Stack direction="horizontal" gap={2}>
          <Image className="market-logo" src={tcapLogo} width={36} height={36} />
          <Stack direction="vertical" gap={0}>
            <span className="market-value tcap">Total Crypto Market Cap</span>
            <span className="market-subvalue">TCAP-USD</span>
          </Stack>
        </Stack>
        <span className={`market-value price only-mobile ${!changeIsNegative ? "text-green" : "text-red"}`}>
          ${currentPrice.toFixed(2)}
        </span>
      </Col>
      <Col lg={2} md={2} sm={12} className="market-row-item not-on-mobile text-right">
        <span className="market-title only-mobile">Price</span>
        <span className={`market-value price ${!changeIsNegative ? "text-green" : "text-red"}`}>
          ${currentPrice.toFixed(2)}
        </span>
      </Col>
      <Col lg={2} md={2} sm={12} className="market-row-item text-right">
        <span className="market-title only-mobile">24h Change</span>
        <span className={`market-value ${!changeIsNegative ? "text-green" : "text-red"}`}>
          {changePercent.toFixed(2)}%
        </span>
      </Col>
      <Col lg={showOI ? 3 : 4} md={showOI ? 3 : 4} sm={12} className="market-row-item text-right">
        <span className="market-title only-mobile">L/S Liquidity</span>
        <span className="market-value">
          {formatBig6USDPrice(tcapLiquidity.long, { compact: true })} / {formatBig6USDPrice(tcapLiquidity.short, { compact: true })}
        </span>
      </Col>
      {showOI && (
        <Col lg={3} md={3} sm={12} className="market-row-item text-right">
          <span className="market-title only-mobile">L/S Open Interest</span>
          <span className="market-value">
            {formatBig6USDPrice(globalOpenInterest.long, { compact: true })} / {formatBig6USDPrice(globalOpenInterest.short, { compact: true })}
          </span>
        </Col>
      )}
    </a> 
  )  
}

const Perpetuals = () => {
  const { t } = useTranslation()
  const snapshots = useMarketSnapshots()

  console.log("snapshots: ", snapshots)

  const { markets, tcapMarket, sortedAssets, totalLiquidity, totalOpenInteres } = useMemo(() => {
    if (snapshots && snapshots.data) {
      const unsorted = Object.keys(snapshots.data.markets.market).map((market) => {
        const marketSnapshot = snapshots.data?.markets.market[market as SupportedAsset]
        const marketPrice = marketSnapshot?.global?.latestPrice ?? 0n
        const latestPrice = marketSnapshot?.global?.latestPrice ?? 0n
        const liquidity = marketSnapshot ? calcTakerLiquidity(marketSnapshot) : undefined
        const nextLong = marketSnapshot?.nextPosition?.long ?? 0n
        const nextShort = marketSnapshot?.nextPosition?.short ?? 0n

        return {
          asset: market,
          makerNotional: calcNotional(marketSnapshot?.position?.maker ?? 0n, marketPrice),
          liquidity:
            Big6Math.mul(liquidity?.totalLongLiquidity ?? 0n, latestPrice) + Big6Math.mul(liquidity?.totalShortLiquidity ?? 0n, latestPrice),
          openInterest: Big6Math.mul(nextLong, latestPrice) + Big6Math.mul(nextShort, latestPrice)
        }
      })

      let sortedMarkets = unsorted.sort((a, b) => {
        return Big6Math.toUnsafeFloat(b.makerNotional) - Big6Math.toUnsafeFloat(a.makerNotional)
      })

      if (snapshots.data.tcapSnapshot) {
        const { longSnapshot, shortSnapshot } = snapshots.data.tcapSnapshot
        const tcapPrice = parseFloat(ethers.formatEther(longSnapshot.latestVersion.price))
        const longGlobalPosition = nextPosition(longSnapshot.pre, longSnapshot.position)
        const shortGlobalPosition = nextPosition(shortSnapshot.pre, shortSnapshot.position)
        const globlaTotalPosition = addPositions(longGlobalPosition, shortGlobalPosition)
        const tcapLiquidity = parseFloat(ethers.formatEther(globlaTotalPosition.maker)) * tcapPrice

        const globalOpenInterest = {
          taker: ethers.formatEther(longSnapshot.openInterest.taker + shortGlobalPosition.taker),
          maker: ethers.formatEther(longSnapshot.openInterest.maker + shortGlobalPosition.maker)
        }

        const tcapPosition = 2
        sortedMarkets = [
            ...sortedMarkets.slice(0, tcapPosition),
            {
              asset: "tcap",
              makerNotional: Big6Math.fromFloatString(tcapLiquidity.toString()),
              liquidity: Big6Math.fromFloatString(tcapLiquidity.toString()),
              openInterest: Big6Math.fromFloatString(globalOpenInterest.taker)
            },
            ...sortedMarkets.slice(tcapPosition)
        ]
      }

      const totalLiquidity = sortedMarkets.reduce(
        (acc, totalLiq) => acc + totalLiq.liquidity,
        0n,
      )
      const totalOpenInteres = sortedMarkets.reduce(
        (acc, totalLiq) => acc + totalLiq.openInterest,
        0n,
      )

      return {
        markets: snapshots.data?.markets.market,
        tcapMarket: snapshots.data?.tcapSnapshot,
        sortedAssets: sortedMarkets,
        totalLiquidity: formatBig6USDPrice(totalLiquidity, { compact: true }),
        totalOpenInteres: formatBig6USDPrice(totalOpenInteres, { compact: true }),
      }
    }

    return { markets: undefined, tcapMarket: undefined, sortedAssets: undefined, totalLiquidity: "$0" }
  }, [snapshots, snapshots.status])

  return (
    <Stack direction="horizontal" gap={2} className="markets-metrics">
      {/* <Stack direction="vertical" style={{ width: "42%" }}>
        <ProductInfoCard
          headline="Ut enim ad minim veniam, quis nostrud exercitation."
          highlights={highlights}
          totals={[
            {
              title: "Total Liquidity",
              value: totalLiquidity.concat("+")
            },
            {
              title: "Open Interest",
              value: totalOpenInteres?.concat("+") || "$0.00"
            },
          ]}
        />
      </Stack> */}
      <Stack direction="vertical" style={{ width: "100%" }}>
        <Stack direction="horizontal" gap={3} className="markets-totals">
          <Col lg={6} sm={12} className="total-box">
            <span className="total-title">{t('total-liquidity')}</span>
            <span className="total-value">{totalLiquidity}+</span>
          </Col>
          <Col lg={6} sm={12} className="total-box">
            <span className="total-title">{t('total-interest')}</span>
            <span className="total-value">{totalOpenInteres}+</span>
          </Col>
        </Stack>
        {markets && tcapMarket ? (
          <div className="markets-detail-container">
            <Stack direction="horizontal" gap={0} className="markets-header">
              <Col lg={2} md={2}>
                <span className="market-title asset">{t('asset')}</span>
              </Col>
              <Col lg={2} md={2} className="text-right">
                <span className="market-title">{t('price')}</span>
              </Col>
              <Col lg={2} md={2} className="text-right">
                <span className="market-title">{t('chagen24h')}</span>
              </Col>
              <Col lg={3} md={3} className="text-right">
                <span className="market-title">{t('ls-liquidity')}</span>
              </Col>
              <Col lg={3} md={3} className="text-right">
                <span className="market-title">{t('ls-interes')}</span>
              </Col>
            </Stack>
            <div className="markets-detail">
              {sortedAssets.map((sorteAsset, index) => {
                if (sorteAsset.asset !== 'tcap') {
                  const market = markets[sorteAsset.asset as SupportedAsset]
                  if (!market || sorteAsset.asset === SupportedAsset.rlb) return <></>
                  return (
                    <MarketRow
                      key={index.toString()}
                      index={index}
                      asset={sorteAsset.asset as SupportedAsset}
                      market={market}
                      showOI={true}
                    />
                  )
                }
                return <MarketTcapRow key={index.toString()} index={index} tcapSnapshot={tcapMarket} showOI={true} />
              })}
            </div>
          </div>
        ) : (
          <Stack direction="vertical" className="markets-loading">
            <Spinner animation="border" variant="primary" />
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export default Perpetuals


export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
