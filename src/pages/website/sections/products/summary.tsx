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
      <div style={{ display: "none" }}>
        <Spot />
      </div>      
    </Stack>    
  )
}

export default Summary;
