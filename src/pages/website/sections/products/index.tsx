import React from "react"
import { Button, Stack } from "react-bootstrap"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { PerennialSDKProvider } from "../../../../context/perennialSdkContext"
import Indexes from "./Indexes"
import Perpetuals from "./Perpetuals"
import Spot from "./Spot"
import Summary from "./summary"


const enum ProductKey { 
  Indexes = "indexes",
  Spot = "spot",
  Perpetuals = "perpetuals"
}

const products = [
  {
    key: ProductKey.Indexes,
    title: "Indexes",
    headline: "Neque porro quisquam est qui",
  },
  {
    key: ProductKey.Spot,
    title: "Spot",
    headline: "Sed quia consequuntur magni dolores",
  },
  {
    key: ProductKey.Perpetuals,
    title: "Perpetuals",
    headline: "Quis autem vel eum iure",
  }
]

const SectionProducts = () => {
  const { t } = useTranslation()
  const [activeProduct, setActiveProduct] = React.useState<ProductKey>(ProductKey.Indexes)

  return (
    <PerennialSDKProvider>
      <div id="markets" className="section-products">
        <Stack direction="vertical" gap={2} className="align-items-center justify-content-center">
          <h1 className="header line-up">
            {t('markets')}
          </h1>
          <h2 className="headline line-up text-purple">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod 
          </h2>
        </Stack>
        <Summary />
        <Stack
          direction="horizontal"
          gap={4}
          className="mx-5jsutify-content-center"
          style={{
            padding: "2rem 2rem",
            margin: "1rem 5rem 1.5rem 5rem",
            borderRadius: "3px",
            backgroundColor: "#0e0e13"
          }}
        >
          <Stack direction="vertical" gap={4} style={{ width: activeProduct !== "spot" ? "36%" : "auto" }}>
            {products.map((product) => (
              <Button
                key={product.key}
                className={`product-button ${activeProduct === product.key ? "active" : ""}`}
                onClick={() => setActiveProduct(product.key)}
                style={{ textAlign: "left" }}
              >
                <h1>{product.title}</h1>
                {activeProduct === product.key && (
                  <span style={{ fontSize: "1.1rem", color: "#A9A7BE" }}>
                    {product.headline}
                  </span>
                )}
              </Button>
            ))}
          </Stack>
          <Stack
            direction="vertical"
            style={{
              width: activeProduct !== "spot" ? "64%" : "auto",
              marginTop: "-2rem"
            }}
          >
            <>
              {activeProduct === ProductKey.Indexes && (
                <Indexes />
              )}  
              {activeProduct === ProductKey.Spot && (
                <Spot />
              )}
              {activeProduct === ProductKey.Perpetuals && (
                <Perpetuals />
              )}
            </>
          </Stack>
        </Stack>
      </div>
    </PerennialSDKProvider>
  )
}

export default SectionProducts


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
