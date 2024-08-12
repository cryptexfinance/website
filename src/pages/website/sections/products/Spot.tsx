import React from "react"
import { Stack } from "react-bootstrap"
// import { useTranslation } from "react-i18next"
import { graphql } from "gatsby"

import { ProductInfoCard } from "../../../../components/ProductInfoCard"
import { Highlight, PurpleText } from "../../../../components/highlights"

const LifiClientSideOnlyLazy = React.lazy(() =>
  import("../../../../components/Lifi")
)

const highlights = [
  <Highlight>
    Swap and bridge assets from <PurpleText>dozens of blockchains.</PurpleText>
  </Highlight>,
  <Highlight>
    Trade a wide variety of tokens with <PurpleText>real-time market prices.</PurpleText>
  </Highlight>,
  <Highlight>
    Benefit from a <PurpleText>user-friendly interface</PurpleText> for quick exchanges.
  </Highlight>,
  <Highlight>
    Access <PurpleText>cross-chain liquidity</PurpleText> without leaving the platform.
  </Highlight>,
  <Highlight>
    Enjoy <PurpleText>competitive rates</PurpleText> and minimal slippage across trades.
  </Highlight>,
  <Highlight>
    Execute trades with just a <PurpleText>few clicks.</PurpleText>
  </Highlight>
]

const Spot = () => {
  // const { t } = useTranslation()
  const isSSR = typeof window === "undefined"

  return (
    <Stack direction="horizontal" className="products" gap={3} style={{ padding: "1rem 0.5rem" }} >
      <Stack direction="vertical" className="products-info" style={{ width: "35%", maxWidth: "50%", height: "30.5rem" }}>
        <ProductInfoCard headline="Seamless Spot Trading Across Chains" highlights={highlights} totals={undefined} />
      </Stack>
      <Stack direction="vertical" className="products-metrics indexes" style={{ width: "fit-content" }}>
        <Stack className="products-detail-container">
          {!isSSR && (
            <React.Suspense fallback={<div />}>
              <LifiClientSideOnlyLazy />
            </React.Suspense>
          )}
        </Stack>
      </Stack>
    </Stack>    
  )   
}

export default Spot;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;


