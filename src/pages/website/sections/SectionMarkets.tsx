import React, { useEffect, useMemo, useState } from "react"
import { MarketSnapshot, useMarketSnapshots } from "../../../hooks/markets";
import { useFormattedMarketBarValues } from "../../../hooks/metrics";
import { AssetMetadata, SupportedAsset } from "../../../constants/markets";
import { Col, Image, Spinner, Stack } from "react-bootstrap";
import { calcNotional, calcTakerLiquidity } from "../../../utils/positionUtils";
import { Big6Math, formatBig6USDPrice } from "../../../utils/big6Utils";


const PriceBox = ({ currentPrice }: { currentPrice: bigint }) => {
  const [previousPrice, setPreviousPrice] = useState(0n)
  const [positiveChange, setPositiveChange] = useState(true)

  useEffect(() => {
    setPositiveChange(previousPrice < currentPrice)
    setPreviousPrice(currentPrice)
  }, [currentPrice])

  return (
    <Col lg="2" sm={12} className="market-row-item not-on-mobile text-right">
      <span className="market-title only-mobile">Price</span>
      <span className={"market-value ".concat(positiveChange ? "text-green" : "text-red")}>
        {formatBig6USDPrice(currentPrice)}
      </span>
    </Col>
  )
}

const MarketRow = ({ index, asset, market }: { index: number, asset: SupportedAsset, market: MarketSnapshot }) => {
  const assetMetada = AssetMetadata[asset]
  const formattedValues = useFormattedMarketBarValues(market)
  const darkRow = index % 2 === 0

  return (
    <a
      key={index.toString()}
      // direction="horizontal"
      className={"market-row ".concat(darkRow ? "dark" : "")}
      href={`https://app.cryptex.finance/?market=${asset}`}
      target="_blank"
    >
      <Col className="market-row-item mobile-header" lg="2" sm={12}>
        <Stack direction="horizontal" gap={3}>
          <Image className="market-logo" src={assetMetada.icon} width={36} height={36} />
          <Stack direction="vertical" gap={0}>
            <span className="market-value">{assetMetada.name}</span>
            <span className="market-subvalue">{assetMetada.symbol}</span>
          </Stack>
        </Stack>
        <span className="market-value price only-mobile">{formattedValues.price}</span>
      </Col>
      <PriceBox currentPrice={formattedValues.priceBI} />
      <Col lg="2" sm={12} className="market-row-item text-right">
        <span className="market-title only-mobile">24h Change</span>
        <span className={`market-value ${!formattedValues.changeIsNegative ? "text-green" : "text-red"}`}>
          {formattedValues.change}
        </span>
      </Col>
      <Col lg="3" sm={12} className="market-row-item text-right">
        <span className="market-title only-mobile">L/S Liquidity</span>
        <span className="market-value">{formattedValues.totalLiquidity}</span>
      </Col>
      <Col lg="3" sm={12} className="market-row-item text-right">
        <span className="market-title  only-mobile">L/S Open Interest</span>
        <span className="market-value">{formattedValues.openInterest}</span>
      </Col>
    </a>
  )
}


const SectionMarkets = () => {
  const snapshots = useMarketSnapshots()

  const { markets, sortedAssets, totalLiquidity, totalOpenInteres } = useMemo(() => {
    if (snapshots && snapshots.data) {
      
      const unsorted = Object.keys(snapshots.data.markets).map((market) => {
        const marketSnapshot = snapshots.data?.markets[market as SupportedAsset]
        const marketPrice = marketSnapshot?.global?.latestPrice ?? 0n
        const latestPrice = marketSnapshot?.global?.latestPrice ?? 0n
        const liquidity = marketSnapshot ? calcTakerLiquidity(marketSnapshot) : undefined
        const nextLong = marketSnapshot?.nextPosition?.long ?? 0n
        const nextShort = marketSnapshot?.nextPosition?.short ?? 0n

        return {
          asset: market as SupportedAsset,
          makerNotional: calcNotional(marketSnapshot?.position?.maker ?? 0n, marketPrice),
          liquidity: 
            Big6Math.mul(liquidity?.totalLongLiquidity ?? 0n, latestPrice) + Big6Math.mul(liquidity?.totalShortLiquidity ?? 0n, latestPrice),
          openInterest: Big6Math.mul(nextLong, latestPrice) + Big6Math.mul(nextShort, latestPrice)
        }
      })

      const totalLiquidity = unsorted.reduce(
        (acc, totalLiq) => acc + totalLiq.liquidity,
        0n,
      )
      const totalOpenInteres = unsorted.reduce(
        (acc, totalLiq) => acc + totalLiq.openInterest,
        0n,
      )

      return {
        markets: snapshots.data?.markets,
        sortedAssets: unsorted.sort((a, b) => {
          return Big6Math.toUnsafeFloat(b.makerNotional) - Big6Math.toUnsafeFloat(a.makerNotional)
        }),
        totalLiquidity: formatBig6USDPrice(totalLiquidity, { compact: true }),
        totalOpenInteres: formatBig6USDPrice(totalOpenInteres, { compact: true }),
      }
    }

    return { markets: undefined, sortedAssets: undefined, totalLiquidity: "$0" }
  }, [snapshots, snapshots.status])

  return(
    <div id="markets" className="section-markets">
      <h1 className="header">MARKETS</h1>
      {markets ? (
        <Stack direction="vertical" className="markets-metrics">
          <Stack direction="horizontal" gap={3} className="markets-totals">
            <Col lg={6} sm={12} className="total-box">
              <span className="total-title">Total Liquidity</span>
              <span className="total-value">{totalLiquidity}+</span>
            </Col>
            <Col lg={6} sm={12} className="total-box">
              <span className="total-title">Total Open Interest</span>
              <span className="total-value">{totalOpenInteres}+</span>
            </Col>
          </Stack>
          <div className="markets-detail-container">
            <Stack direction="horizontal" gap={0} className="markets-header">
              <Col lg="2">
                <span className="market-title asset">Asset</span>
              </Col>
              <Col lg="2" className="text-right">
                <span className="market-title">Price</span>
              </Col>
              <Col lg="2" className="text-right">
                <span className="market-title">24h Change</span>
              </Col>
              <Col lg="3" className="text-right">
                <span className="market-title">L/S Liquidity</span>
              </Col>
              <Col lg="3" className="text-right">
                <span className="market-title">L/S Open Interest</span>
              </Col>
            </Stack>
            <div className="markets-detail">
              {sortedAssets.map((sorteAsset, index) => {
                const market = markets[sorteAsset.asset]
                if (!market) return <></>
                return <MarketRow key={index.toString()} index={index} asset={sorteAsset.asset} market={market} />
              })}
            </div>
          </div>  
        </Stack>
      ) : (
        <Stack direction="vertical" className="markets-loading">
          <Spinner animation="border" variant="primary" />
        </Stack> 
      )}
    </div> 
  )
}

export default SectionMarkets
