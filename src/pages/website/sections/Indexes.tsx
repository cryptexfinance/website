import React from "react"
import { Image, Stack } from "react-bootstrap"
import { AssetMetadata, SupportedAsset } from "../../../constants/markets"
import { ProductsInfo } from "./Info"


const IndexBox = ({
  asset,
  price,
  change24,
  liquidity,
  openInteres,
}: {
  asset: SupportedAsset,
  price: string,
  change24: number,
  liquidity?: string,
  openInteres?: string
}) => {
  const assetMetada = AssetMetadata[asset]  

  return (
    <Stack
      direction="vertical"
      style={{
        backgroundColor: "#0e0e19",
        padding: "1rem",
        borderRadius: "5px",
        border: "0.5px solid rgba(33, 33, 56, 0.82)"
      }}
      gap={3}
    >
      <Stack direction="horizontal" gap={2} style={{ alignItems: "center" }}>
        <Image className="market-logo" src={assetMetada.icon} width={38} height={38} />
        <Stack direction="vertical" gap={1} style={{ justifyContent: "center" }}>
          <h6 style={{ margin: "0rem" }}>{assetMetada.symbol}</h6>
          <h6 className="text-grey" style={{ margin: "0rem" }}>{assetMetada.name}</h6>
        </Stack>
        <h5 className={change24 < 0 ? "text-red" : "text-green"}>{price}</h5>
      </Stack>
      <Stack direction="vertical" gap={2}>
        <Stack direction="horizontal" style={{ justifyContent: "space-between" }} >
          <span className="number">24H Change:</span>
          <span className={change24 < 0 ? "text-red" : "text-green"}>{change24}%</span>
        </Stack>
        <Stack direction="horizontal" style={{ justifyContent: "space-between" }} >
          <span className="number">L/S Liquidity:</span>
          <span className="number">{liquidity}</span>
        </Stack>
        <Stack direction="horizontal" style={{ justifyContent: "space-between" }} >
          <span className="number">L/S Open Interest:</span>
          <span className="number">{openInteres}</span>
        </Stack>
      </Stack>  
    </Stack>
  )
}

export const Indexes = ({ showInfo } : { showInfo: boolean} ) => {
  return (
    <Stack direction="horizontal" gap={3} style={{ padding: "1rem 0.5rem" }} >
      {showInfo && (
        <Stack direction="vertical" style={{ width: "35%" }}>
          <ProductsInfo />
        </Stack>
      )}
      <Stack direction="vertical">
        <div
          style={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "48% 48%",
            columnGap: "1rem",
            rowGap: "1rem",
            height: "25rem",
            overflowY: "scroll",
          }}
        >
          <IndexBox asset={SupportedAsset.eth} price={"$3,790.60"} change24={3.54} liquidity="$1.59M / $1.59M" openInteres="$131.16K / $127.71K" />
          <IndexBox asset={SupportedAsset.arb} price={"$1.1880"} change24={4.43} liquidity="$148.35K / $149.39K" openInteres="$5.76K / $4.72K" />
          <IndexBox asset={SupportedAsset.btc} price={"$70,011.60"} change24={-3.54} liquidity="$2.04M / $2.04M" openInteres="$1.08K / $599.54" />
          <IndexBox asset={SupportedAsset.sol} price={"$178.108"} change24={5.14} liquidity="$428.24K / 466.91K" openInteres="$285.91K / $247.24K" />
          <IndexBox asset={SupportedAsset.link} price={"$16.6353"} change24={-2.13} liquidity="$41.14K / $41.14K" openInteres="$0.00 / $0.00" />
          <IndexBox asset={SupportedAsset.matic} price={"$0.7265"} change24={1.45} liquidity="$44.61K / $44.61K" openInteres="$0.00 / $0.00" />
        </div>
      </Stack>  
    </Stack>    
  )   
}