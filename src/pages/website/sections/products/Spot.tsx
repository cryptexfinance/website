import React from "react"
import { Stack } from "react-bootstrap"
// import { useTranslation } from "react-i18next"
import { graphql } from "gatsby"

import { ProductInfoCard } from "../../../../components/ProductInfoCard"
// import { Lifi } from "../../../../components/Lifi"
// import LoadableLifi from "../../../../components/Lifi"

const LifiClientSideOnlyLazy = React.lazy(() =>
  import("../../../../components/Lifi")
)

const highlights = [
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Swap and bridge assets from <span className="text-purple" style={{ fontSize: "1.1rem" }}>dozens of blockchains</span>.
  </p>,
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Trade a wide variety of tokens with <span className="text-purple" style={{ fontSize: "1.1rem" }}>real-time market prices</span>.
  </p>,
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Benefit from a <span className="text-purple" style={{ fontSize: "1.1rem" }}>user-friendly interface</span> for quick exchanges.
  </p>,
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Access <span className="text-purple" style={{ fontSize: "1.1rem" }}>cross-chain liquidity</span> without leaving the platform.
  </p>,
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Enjoy <span className="text-purple" style={{ fontSize: "1.1rem" }}>competitive rates</span> and minimal slippage across trades.
  </p>,
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Execute trades with just a <span className="text-purple" style={{ fontSize: "1.1rem" }}>few clicks</span>.
  </p>
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


