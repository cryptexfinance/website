import React from "react"
import { Stack } from "react-bootstrap"
// import { useTranslation } from "react-i18next"
import { graphql } from "gatsby"

import { ProductInfoCard } from "../../../../components/ProductInfoCard"
import { Lifi } from "../../../../components/Lifi"


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

const Spot = () => {
  // const { t } = useTranslation()

  return (
    <Stack direction="horizontal" className="products" gap={3} style={{ padding: "1rem 0.5rem" }} >
      <Stack direction="vertical" className="products-info" style={{ width: "35%", maxWidth: "50%", height: "30.5rem" }}>
        <ProductInfoCard headline="Ut enim ad minim veniam, quis nostrud exercitation." highlights={highlights} totals={undefined} />
      </Stack>
      <Stack direction="vertical" className="products-metrics indexes" style={{ width: "fit-content" }}>
        <Stack className="products-detail-container">
          <Lifi />
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


