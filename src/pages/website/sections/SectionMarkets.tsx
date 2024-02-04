import React, { useMemo } from "react"
import { MarketSnapshot, useMarketSnapshots } from "../../../hooks/markets";
import { useFormattedMarketBarValues } from "../../../hooks/metrics";
import { AssetMetadata, SupportedAsset } from "../../../constants/markets";
import { Col, Image, Spinner, Stack } from "react-bootstrap";
import { calcNotional } from "../../../utils/positionUtils";
import { Big6Math } from "../../../utils/big6Utils";


const MarketRow = ({ index, asset, market }: { index: number, asset: SupportedAsset, market: MarketSnapshot }) => {
  const assetMetada = AssetMetadata[asset]
  const formattedValues = useFormattedMarketBarValues(market)
  const darkRow = index % 2 === 0

  return (
    <Stack
      key={index.toString()}
      direction="horizontal"
      className={"market-row ".concat(darkRow ? "dark" : "")}
    >
      <Col className="market-row-item mobile-header" lg="3" sm={12}>
        <Stack direction="horizontal" gap={3}>
          <Image className="market-logo" src={assetMetada.icon} width={36} height={36} />
          <Stack direction="vertical" gap={0}>
            <span className="market-value">{assetMetada.name}</span>
            <span className="market-subvalue">{assetMetada.symbol}</span>
          </Stack>
        </Stack>  
      </Col>
      <Col lg="3" sm={12} className="market-row-item text-right">
        <span className="market-title only-mobile">Price</span>
        <span className="market-value">{formattedValues.price}</span>
      </Col>
      <Col lg="3" sm={12} className="market-row-item text-right">
        <span className="market-title only-mobile">L/S Liquidity</span>
        <span className="market-value">{formattedValues.totalLiquidity}</span>
      </Col>
      <Col lg="3" sm={12} className="market-row-item text-right">
        <span className="market-title  only-mobile">L/S Open Interest</span>
        <span className="market-value">{formattedValues.openInterest}</span>
      </Col>
    </Stack>
  )
}


const SectionMarkets = () => {
  const snapshots = useMarketSnapshots()

  const { markets, sortedAssets } = useMemo(() => {
    if (snapshots && snapshots.data) {
      const unsorted = Object.keys(snapshots.data.markets).map((market) => {
        const marketSnapshot = snapshots.data?.markets[market as SupportedAsset]
        const marketPrice = marketSnapshot?.global?.latestPrice ?? 0n

        return {
          asset: market as SupportedAsset,
          makerNotional: calcNotional(marketSnapshot?.position?.maker ?? 0n, marketPrice)
        }
      })

      return {
        markets: snapshots.data?.markets,
        sortedAssets: unsorted.sort((a, b) => {
          return Big6Math.toUnsafeFloat(b.makerNotional) - Big6Math.toUnsafeFloat(a.makerNotional)
        })
      }
    }

    return { markets: undefined, sortedAssets: undefined }
  }, [snapshots, snapshots.status])


  return(
    <div id="markets" className="section-markets">
      <h1 className="header">MARKETS</h1>
      {markets ? (
        <Stack direction="vertical" className="markets-metrics">
          <Stack direction="horizontal" gap={2} className="markets-header">
            <Col lg="3">
              <span className="market-title">Asset</span>
            </Col>
            <Col lg="3" className="text-right">
              <span className="market-title">Price</span>
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
              return <MarketRow index={index} asset={sorteAsset.asset} market={market} />
            })}
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

// export async function getServerData() {}
