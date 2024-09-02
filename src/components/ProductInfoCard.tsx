import React from "react"
import { Stack } from "react-bootstrap"
import { BsCheckCircle } from "react-icons/bs";


const TotalBox = ({ title, value, divider }: { title: string, value: string, divider?: boolean }) => {
  return (
    <>
      <Stack direction="vertical" className="total-box">
        <span className="total-box-value">
          {value}
        </span>
        <h3 className="total-box-title">{title}</h3>
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
        <h2 className="product-info-title">
          {headline}
        </h2>
        <Stack
          className="product-info-highlights"
          direction="vertical"
          gap={2}
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
        <Stack className="product-info-totals" direction="horizontal" gap={1}>
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
