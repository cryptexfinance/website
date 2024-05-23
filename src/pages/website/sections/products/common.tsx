import React from "react"
import { Stack } from "react-bootstrap"
import { BsCheckCircle } from "react-icons/bs";


const StatBox = ({ title, value, divider }: { title: string, value: string, divider?: boolean }) => {
  return (
    <>
      <Stack
        direction="vertical"
        style={{ width: "50%", alignItems: "center", justifyContent: "center", backgroundColor: "#090909" }}
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
      {divider && (
        <div style={{ height: "100%", borderLeft: "1px solid rgba(33, 33, 56, 0.70)" }} />
      )}
    </>  
  )
}


type InfoCardProps = {
  headline: string,
  highlights: Array<React.ReactElement>,
  totals: Array<{ title: string, value: string }>,
}

export const ProductInfoCard = ({ headline, highlights, totals }: InfoCardProps) => {
  return (
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
      <Stack
        direction="vertical"
        style={{
          padding: "1rem 1.2rem",
          width: "100%",
        }}
      >
        <h2 style={{ color: "#d5d4e3", fontSize: "1.75rem" }}>
          {headline}
        </h2>
        <Stack
          direction="vertical"
          gap={2}
          style={{
            marginTop: "1.5rem",
            paddingLeft: "0.5rem",
          }}
        >
          {highlights.map((highlight, index) => (
            <Stack key={index} direction="horizontal" gap={2}>
              <BsCheckCircle fill="#A440F2" size={20} />
              {highlight}
            </Stack>
          ))}
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
        {totals.map((total, index) => {
          return <StatBox key={index} title={total.title} value={total.value} divider={index < totals.length - 1} />
        })}
      </Stack>
    </Stack>
  );
}