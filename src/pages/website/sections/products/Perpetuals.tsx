import React, { useEffect, useMemo, useState } from "react"
import { ethers } from "ethers"
import { Accordion, Col, Image, Spinner, Stack } from "react-bootstrap"
import { Big6Math, calcNotional, calcTakerLiquidity, formatBig6USDPrice, MarketSnapshot, SupportedAsset } from "@perennial/sdk"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import tcapLogo from '../../../../../static/website/icons/tcap.png'
import { useMarketSnapshots } from "../../../../hooks/markets"
import { useFormattedMarketBarValues } from "../../../../hooks/metrics"
import { AssetMetadata } from "../../../../constants/markets"
import { addPositions, nextPosition } from "../../../../utils/positionUtils"
import { VaultSnapshot } from "../../../../hooks/marketsV1"
import { useTcapPriceChanges } from "../../../../hooks/graph"

import { ProductInfoCard } from "../../../../components/ProductInfoCard"


const highlights = [
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Lorem <span className="text-purple" style={{ fontSize: "1.1rem" }}>ipsum dolor</span> sit amet, consectetur.
  </p>,
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Excepteur sint <span className="text-purple" style={{ fontSize: "1.1rem" }}>occaecat cupidatat</span> non proident.
  </p>,
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Sunt in culpa qui officia deserunt <span className="text-purple" style={{ fontSize: "1.1rem" }}> mollit anim</span>.
  </p>
]

const PriceBox = ({ currentPrice }: { currentPrice: bigint }) => {
  const { t } = useTranslation()
  const [previousPrice, setPreviousPrice] = useState(0n)
  const [positiveChange, setPositiveChange] = useState(true)

  useEffect(() => {
    setPositiveChange(previousPrice < currentPrice)
    setPreviousPrice(currentPrice)
  }, [currentPrice])

  return (
    <Col lg={2} md={2} sm={12} className="product-row-item not-on-mobile text-right">
      <span className="product-title only-mobile">{t('price')}</span>
      <span className={"product-value ".concat(positiveChange ? "text-green" : "text-red")}>
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
      key={`mr-${asset}`}
      className={"product-row ".concat(darkRow ? "dark" : "")}
      href={`https://app.cryptex.finance/?market=${asset}`}
      target="_blank"
    >
      <Col className="product-row-item mobile-header" lg={showOI ? 2 : 4} md={showOI ? 2 : 4} sm={12}>
        <Stack direction="horizontal" gap={3}>
          <Image className="product-logo" src={assetMetada.icon} width={36} height={36} />
          <Stack direction="vertical" gap={0}>
            <span className="product-value">{assetMetada.name}</span>
            <span className="product-subvalue">{assetMetada.symbol}</span>
          </Stack>
        </Stack>
        <span className={`product-value price only-mobile ${!formattedValues.changeIsNegative ? "text-green" : "text-red"}`}>
          {formattedValues.price}
        </span>
      </Col>
      <PriceBox currentPrice={formattedValues.priceBI} />
      <Col lg={2} md={2} sm={12} className="product-row-item text-right">
        <span className="product-title only-mobile">{t('chagen24h')}</span>
        <span className={`product-value ${!formattedValues.changeIsNegative ? "text-green" : "text-red"}`}>
          {formattedValues.change}
        </span>
      </Col>
      <Col lg={showOI ? 3 : 4} md={showOI ? 3 : 4} sm={12} className="product-row-item text-right">
        <span className="product-title only-mobile">{t('ls-liquidity')}</span>
        <span className="product-value">{formattedValues.totalLiquidity}</span>
      </Col>
      <Col lg={3} md={3} sm={12} className="product-row-item text-right only-mobile flex-sm-row">
        <span className="product-title  only-mobile">{t('ls-interes')}</span>
        <span className="product-value">{formattedValues.openInterest}</span>
      </Col>
    </a>
  )
}

const MarketTcapRow = ({ index, tcapSnapshot, showOI }: { index: number, tcapSnapshot: VaultSnapshot, showOI: boolean }) => {
  const darkRow = index % 2 === 0
  const { data: pricesData, error } = useTcapPriceChanges()
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
  }, [pricesData, error])

  return (
    <a
      key={index.toString()}
      className={"product-row tcap-row ".concat(darkRow ? "dark" : "")}
      href={"https://app.cryptex.finance/v2/"}
      target="_blank"
    >
      <Col className="product-row-item tcap-item mobile-header" lg={showOI ? 2 : 4} md={showOI ? 2 : 4} sm={12}>
        <Stack direction="horizontal" gap={2}>
          <Image className="product-logo" src={tcapLogo} width={36} height={36} />
          <Stack direction="vertical" gap={0}>
            <span className="product-value tcap">Total Crypto Market Cap</span>
            <span className="product-subvalue">TCAP-USD</span>
          </Stack>
        </Stack>
        <span className={`product-value price only-mobile ${!changeIsNegative ? "text-green" : "text-red"}`}>
          ${currentPrice.toFixed(2)}
        </span>
      </Col>
      <Col lg={2} md={2} sm={12} className="product-row-item not-on-mobile text-right">
        <span className="product-title only-mobile">Price</span>
        <span className={`product-value price ${!changeIsNegative ? "text-green" : "text-red"}`}>
          ${currentPrice.toFixed(2)}
        </span>
      </Col>
      <Col lg={2} md={2} sm={12} className="product-row-item text-right">
        <span className="product-title only-mobile">24h Change</span>
        <span className={`product-value ${!changeIsNegative ? "text-green" : "text-red"}`}>
          {changePercent.toFixed(2)}%
        </span>
      </Col>
      <Col lg={showOI ? 3 : 4} md={showOI ? 3 : 4} sm={12} className="product-row-item text-right">
        <span className="product-title only-mobile">L/S Liquidity</span>
        <span className="product-value">
          {formatBig6USDPrice(tcapLiquidity.long, { compact: true })} / {formatBig6USDPrice(tcapLiquidity.short, { compact: true })}
        </span>
      </Col>
      {showOI && (
        <Col lg={3} md={3} sm={12} className="product-row-item text-right">
          <span className="product-title only-mobile">L/S Open Interest</span>
          <span className="product-value">
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

  const { markets, tcapMarket, sortedAssets, totalLiquidity, totalOpenInteres } = useMemo(() => {
    if (snapshots && snapshots.data && snapshots.data.markets) {
      const unsorted = Object.keys(snapshots.data.markets.market).map((market) => {
        const marketSnapshot = snapshots?.data?.markets?.market[market as SupportedAsset]
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
        totalLiquidity: `${formatBig6USDPrice(totalLiquidity, { compact: true })}+`,
        totalOpenInteres: `${formatBig6USDPrice(totalOpenInteres, { compact: true })}+`,
      }
    }

    return { markets: undefined, tcapMarket: undefined, sortedAssets: undefined, totalLiquidity: "-", totalOpenInteres: "-" }
  }, [snapshots, snapshots.status])

  return (
    <Stack direction="horizontal" gap={2} className="products">
      <Stack direction="vertical" className="products-info" style={{ width: "42%" }}>
        <ProductInfoCard
          headline="Ut enim ad minim veniam, quis nostrud exercitation."
          highlights={highlights}
          totals={[
            {
              title: "Total Liquidity",
              value: totalLiquidity
            },
            {
              title: "Open Interest",
              value: totalOpenInteres || "$0.00"
            },
          ]}
        />
      </Stack>
      <Stack direction="vertical" className="products-metrics" style={{ width: "58%" }}>
        <Accordion defaultActiveKey="0" className="only-mobile">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h6>Product Info</h6>
            </Accordion.Header>
            <Accordion.Body>
              <ProductInfoCard
                headline="Ut enim ad minim veniam, quis nostrud exercitation."
                highlights={highlights}
                totals={undefined}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {markets && tcapMarket ? (
          <div className="products-detail-container">
            <Stack direction="horizontal" gap={0} className="products-header">
              <Col lg={4} md={4}>
                <span className="market-title asset">{t('asset')}</span>
              </Col>
              <Col lg={2} md={2} className="text-right">
                <span className="product-title">{t('price')}</span>
              </Col>
              <Col lg={2} md={2} className="text-right">
                <span className="product-title">{t('chagen24h')}</span>
              </Col>
              <Col lg={4} md={4} className="text-right">
                <span className="product-title">{t('ls-liquidity')}</span>
              </Col>
              {/* <Col lg={3} md={3} className="text-right">
                <span className="market-title">{t('ls-interes')}</span>
              </Col> */}
            </Stack>
            <div className="products-detail">
              {sortedAssets.map((sorteAsset, index) => {
                if (sorteAsset.asset !== 'tcap') {
                  const market = markets[sorteAsset.asset as SupportedAsset]
                  if (!market || sorteAsset.asset === SupportedAsset.rlb) return <></>
                  return (
                    <MarketRow
                      key={sorteAsset.asset}
                      index={index}
                      asset={sorteAsset.asset as SupportedAsset}
                      market={market}
                      showOI={false}
                    />
                  )
                }
                return <MarketTcapRow key={sorteAsset.asset} index={index} tcapSnapshot={tcapMarket} showOI={false} />
              })}
            </div>
          </div>
        ) : (
          <Stack direction="vertical" className="products-loading">
            <Spinner animation="border" variant="primary" />
          </Stack>
        )}
        <Stack direction="horizontal" gap={3} className="products-totals only-mobile">
          <Col lg={6} sm={12} className="total-box">
            <span className="total-title">{t('total-liquidity')}</span>
            <span className="total-value">{totalLiquidity}</span>
          </Col>
          <Col lg={6} sm={12} className="total-box">
            <span className="total-title">{t('total-interest')}</span>
            <span className="total-value">{totalOpenInteres}</span>
          </Col>
        </Stack>
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
