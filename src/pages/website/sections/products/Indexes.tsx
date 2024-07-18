import React from "react"
import { Image, Stack } from "react-bootstrap"
import { SupportedAsset } from "@perennial/sdk"
import { AssetMetadata } from "../../../../constants/markets"
import { ProductInfoCard } from "./common"


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

export const Indexes = () => {
  return (
    <Stack direction="horizontal" gap={3} style={{ padding: "1rem 0.5rem" }} >
      <Stack direction="vertical" style={{ width: "35%" }}>
        <ProductInfoCard
          headline="Ut enim ad minim veniam, quis nostrud exercitation."
          highlights={highlights}
          totals={[
            {
              title: "Total Liquidity",
              value: "9.80M+"
            },
            {
              title: "Open Interest",
              value: "915.90K+"
            },
          ]}
        />
      </Stack>
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
        </div>
      </Stack>  
    </Stack>    
  )   
}
