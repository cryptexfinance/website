import React, { useMemo } from "react"
import { MarketSnapshot, useMarketSnapshots } from "../../../hooks/markets";
import { useFormattedMarketBarValues } from "../../../hooks/metrics";
import { SupportedAsset } from "../../../constants/markets";
import { Table } from "react-bootstrap";


const MarketRow = ({ asset, market }: { asset: SupportedAsset, market: MarketSnapshot }) => {
  const formattedValues = useFormattedMarketBarValues(market)

  return (
    <tr key={asset}>
      <td>{asset}</td>
      <td>{formattedValues.price}</td>
      <td>{formattedValues.totalLiquidity}</td>
      <td>{formattedValues.openInterest}</td>
    </tr>
  )
}


const SectionMarkets = () => { 
  const snapshots = useMarketSnapshots()

  const markets = useMemo(() => {
    if (snapshots && snapshots.data) {
      return snapshots.data.markets
    }

    return undefined
  }, [snapshots, snapshots.status])

  if (!markets) {
    return <h4>Loading</h4>
  }

  return(
    <div className="section-markets">
      <Table>
        <thead>
          <tr>
            <th>Market</th>
            <th>Price</th>
            <th>L/S Liquidity</th>
            <th>L/S Open Interest</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(markets).map((asset) => {
            const market = markets[asset]
            if (!market) return <></>
            return <MarketRow asset={asset as SupportedAsset} market={market} />
          })}
        </tbody>  
      </Table>  
    </div> 
  )
}

export default SectionMarkets;
