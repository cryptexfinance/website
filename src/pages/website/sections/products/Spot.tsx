import React from "react"
import { Accordion, Stack } from "react-bootstrap"
// import { useTranslation } from "react-i18next"
import { graphql } from "gatsby"

const LifiClientSideOnlyLazy = React.lazy(() =>
  import("../../../../components/Lifi")
)


const totals = [
  {
    title: "Chains",
    value: "28"
  },
  {
    title: "Bridges",
    value: "20"
  },
  {
    title: "Dexes",
    value: "38"
  },
]

const Spot = () => {
  // const { t } = useTranslation()
  const isSSR = typeof window === "undefined"

  return (
    <Stack direction="horizontal" className="products" gap={3} style={{ padding: "1rem 0.5rem" }} >
      <Stack className="products-detail-container">
        {!isSSR && (
          <React.Suspense fallback={<div />}>
            <LifiClientSideOnlyLazy />
          </React.Suspense>
        )}
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


