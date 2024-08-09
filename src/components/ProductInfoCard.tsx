import React from "react"
import { Stack } from "react-bootstrap"
import { BsCheckCircle } from "react-icons/bs";


const TotalBox = ({ title, value, divider }: { title: string, value: string, divider?: boolean }) => {
  return (
    <>
      <Stack direction="vertical" className="total-box" >
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
        <div className="divider" />
      )}
    </>  
  )
}


type InfoCardProps = {
  headline: string,
  highlights: Array<React.ReactElement>,
  totals: Array<{ title: string, value: string }> | undefined,
}

export const ProductInfoCard = ({ headline, highlights, totals }: InfoCardProps) => {
  return (
    <Stack direction="vertical" gap={2} className="product-info-card">
      <Stack
        direction="vertical"
        style={{
          padding: "1rem 1.2rem",
          width: "100%",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", lineHeight: "1.8rem" }}>
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
          {highlights && highlights.map((highlight, index) => (
            <Stack key={`h-${index}`} direction="horizontal" gap={2}>
              <BsCheckCircle fill="#A440F2" size={20} />
              {highlight}
            </Stack>
          ))}
        </Stack>
      </Stack>
      {totals && (
        <Stack
          direction="horizontal"
          gap={1}
          style={{
            padding: "0.7rem 0rem",
            backgroundColor: "#090909",
            borderTop: "0.5px solid rgba(33, 33, 56, 0.70)",
          }}
        >
          {totals.map((total, index) => (
            <TotalBox
              key={index}
              title={total.title}
              value={total.value}
              divider={index < totals.length - 1}
            />
          ))}
        </Stack>
      )}  
    </Stack>
  );
}
