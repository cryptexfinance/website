import React from "react"
import { Col, Stack } from "react-bootstrap"
import { BsCheckCircle } from "react-icons/bs";


export const ProductsInfo = () => (
  <Stack direction="vertical" gap={2} style={{ padding: "1rem 4rem", marginTop: "-4rem" }}>
    <Stack direction="vertical" style={{ padding: "1rem 1rem", width: "55%", alignSelf: "center" }}>
      <h1 className="text-purple" style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "600" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h1>
      <h2 style={{ textAlign: "center", color: "#d5d4e3", fontSize: "1.75rem" }}>
        Ut enim ad minim veniam, quis nostrud exercitation.
      </h2>
      <Stack direction="vertical" gap={2} style={{ marginTop: "0.8rem", alignSelf: "center" }}>
        <Stack direction="horizontal" gap={2}>
          <BsCheckCircle fill="#A440F2" size={20} />
          <p className="no-margin" style={{ fontSize: "1.2rem" }}>
            Lorem <span className="text-purple" style={{ fontSize: "1.2rem" }}>ipsum dolor</span> sit amet, consectetur adipiscing elit.
          </p>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <BsCheckCircle fill="#A440F2" size={20} />
          <p className="no-margin" style={{ fontSize: "1.2rem" }}>
            Excepteur sint <span className="text-purple" style={{ fontSize: "1.2rem" }}>occaecat cupidatat</span> non proident.
          </p>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <BsCheckCircle fill="#A440F2" size={20} />
          <p className="no-margin" style={{ fontSize: "1.2rem" }}>
            Sunt in culpa qui officia deserunt mollit anim <span className="text-purple" style={{ fontSize: "1.2rem" }}>id est laborum</span>.
          </p>
        </Stack>
      </Stack>
    </Stack>
  </Stack>    
)

const StatBox = ({ title, value }: { title: string, value: string }) => {
  return (
    <Stack
      direction="vertical"
      style={{ width: "50%", alignItems: "center", justifyContent: "center" }}
    >
      <span
        style={{
          fontSize: "1.7rem",
          color: "#ffffff",
          textShadow: "0 4px 13px rgba(223, 33, 254, 0.7)",
        }}
      >
        {value}
      </span>
      <h3 style={{ color: "#A9A7BE" }} >{title}</h3>
    </Stack>
  )
}

export const ProductsInfo2 = () => (
  <Stack
    direction="vertical"
    gap={2}
    style={{
      padding: "1.5rem 0rem 0rem 0rem",
      backgroundColor: "#090909",
      border: "0.5px solid rgba(33, 33, 56, 0.50)",
      borderRadius: "5px",
      alignItems: "space-between",
    }}
  >
    <Stack direction="vertical" style={{ padding: "1rem 1.2rem", width: "100%", alignSelf: "center" }}>
      <h2 style={{ textAlign: "left", color: "#d5d4e3", fontSize: "1.75rem" }}>
        Ut enim ad minim veniam, quis nostrud exercitation.
      </h2>
      <Stack direction="vertical" gap={2} style={{ marginTop: "1.5rem", paddingLeft: "0.5rem", alignSelf: "left" }}>
        <Stack direction="horizontal" gap={2}>
          <BsCheckCircle fill="#A440F2" size={20} />
          <p className="no-margin" style={{ fontSize: "1.1rem" }}>
            Lorem <span className="text-purple" style={{ fontSize: "1.1rem" }}>ipsum dolor</span> sit amet, consectetur.
          </p>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <BsCheckCircle fill="#A440F2" size={20} />
          <p className="no-margin" style={{ fontSize: "1.1rem" }}>
            Excepteur sint <span className="text-purple" style={{ fontSize: "1.1rem" }}>occaecat cupidatat</span> non proident.
          </p>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <BsCheckCircle fill="#A440F2" size={20} />
          <p className="no-margin" style={{ fontSize: "1.1rem" }}>
            Sunt in culpa qui officia deserunt <span className="text-purple" style={{ fontSize: "1.1rem" }}> mollit anim</span>.
          </p>
        </Stack>
      </Stack>
    </Stack>
    <Stack
      direction="horizontal"
      gap={1}
      style={{
        padding: "0.7rem 0rem",
        backgroundColor: "#090909",
        borderTop: "0.5px solid rgba(33, 33, 56, 0.70)",
      }}
    >
      <StatBox title="Total Liquidity" value="9.80M+" />
      <div style={{ height: "100%", borderLeft: "1px solid rgba(33, 33, 56, 0.70)" }} />
      <StatBox title="Open Interest" value="915.90K+" />
    </Stack>
  </Stack>    
)

export const ProductsInfo3 = () => (
  <Stack direction="vertical" gap={3} style={{ padding: "1rem 0rem", marginTop: "0rem" }}>
    <Stack direction="vertical" gap={3} style={{ padding: "1rem 0rem", width: "55%" }}>
      <h1 className="text-purple" style={{ textAlign: "left", fontSize: "2.5rem", fontWeight: "600" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h1>
      <h2 style={{ color: "#d5d4e3", fontSize: "1.75rem" }}>
        Ut enim ad minim veniam, quis nostrud exercitation.
      </h2>
      <Stack direction="vertical" gap={2} style={{ marginTop: "0.8rem", marginLeft: "0.4rem" }}>
        <Stack direction="horizontal" gap={2}>
          <BsCheckCircle fill="#A440F2" size={20} />
          <p className="no-margin" style={{ fontSize: "1.2rem" }}>
            Lorem <span className="text-purple" style={{ fontSize: "1.2rem" }}>ipsum dolor</span> sit amet, consectetur adipiscing elit.
          </p>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <BsCheckCircle fill="#A440F2" size={20} />
          <p className="no-margin" style={{ fontSize: "1.2rem" }}>
            Excepteur sint <span className="text-purple" style={{ fontSize: "1.2rem" }}>occaecat cupidatat</span> non proident.
          </p>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <BsCheckCircle fill="#A440F2" size={20} />
          <p className="no-margin" style={{ fontSize: "1.2rem" }}>
            Sunt in culpa qui officia deserunt mollit anim <span className="text-purple" style={{ fontSize: "1.2rem" }}>id est laborum</span>.
          </p>
        </Stack>
      </Stack>
    </Stack>
  </Stack>    
)