import React from "react"
import { Stack } from "react-bootstrap"


const StatBox = ({ title, value }: { title: string, value: string }) => {
  return (
    <Stack
      direction="vertical"
      style={{ width: "25%", alignItems: "center", justifyContent: "center" }}
    >
      <span style={{ fontSize: "2rem", color: "#ffffff" }}>{value}</span>
      <h3 style={{ color: "#A9A7BE" }} >{title}</h3>
    </Stack>
  )
}

const SectionGlobal = () => {

  return (
    <Stack
      direction="horizontal"
      style={{
        width: "110%",
        height: "22vh",
        padding: "1rem 15rem 2rem 15rem",
        margin: "0rem -2rem",
        backgroundColor: "#0e0e1a",
        alignItems: "center",
      }}
    >
      <StatBox title="Total Liquidity" value="9.80M+" />
      <StatBox title="Open Interest" value="915.90K+" />
      <StatBox title="Liquidity" value="+1.36M" />
      <StatBox title="Delegated CTX" value="+1.36M" />
    </Stack>
  )
}

export default SectionGlobal;
