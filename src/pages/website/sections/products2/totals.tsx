import React from "react"
import { Stack } from "react-bootstrap";


const totals = [
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
  {
    title: "Total Liquidity",
    value: "$41.80M+",
  },
  {
    title: "Open Interest",
    value: "$734.63K+",
  }
]

const Totals = () => {
  return (
    <Stack
      direction="horizontal"
      gap={4}
      className="align-items-center justify-content-center"
      style={{ padding: "0.5rem 6rem" }}
    >
      {totals.map((total) => (
        <div key={total.title} style={{ position: "relative" }}>
          <Stack
            direction="vertical"
            gap={1}
            className="box-total p-1 align-items-center justify-content-center"
          >
            <span style={{ fontSize: "1.7rem", textShadow: "0 4px 13px #df21feb3" }}>
              {total.value}
            </span>
            <span style={{ fontSize: "1.3rem", color: "#A9A7BE" }}>
              {total.title}
            </span>
          </Stack>
        </div>  
      ))}      
    </Stack>    
  )
}

export default Totals;
