import React from "react"
import { Button, Stack } from "react-bootstrap"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

// import Vaults from "./Vaults"
import { PerennialSDKProvider } from "../../../../context/perennialSdkContext"
import Indexes from "../products/Indexes"
import Spot from "../products/Spot"
import Perpetuals from "../products/Perpetuals"
import Totals from "./totals"


const enum ProductKey { 
  Indexes = "indexes",
  Spot = "spot",
  Perpetuals = "perpetuals"
}

const products = [
  {
    key: ProductKey.Indexes,
    title: "Indexes",
    headline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod",
  },
  {
    key: ProductKey.Spot,
    title: "Spot",
    headline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod",
  },
  {
    key: ProductKey.Perpetuals,
    title: "Perpetuals",
    headline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod",
  }
]

const SectionProducts2 = () => {
  const { t } = useTranslation()
  const [activeProduct, setActiveProduct] = React.useState<ProductKey>(ProductKey.Indexes)

  return (
    <PerennialSDKProvider>
      <div
        id="markets"
        className="section-products"
      >
        <Stack direction="vertical" gap={2} className="align-items-center justify-content-center">
          <h1
            className="header line-up"
            style={{ fontSize: "3rem" }}
          >
            {t('markets')}
          </h1>
          <h2 style={{ color: "#A440F2", marginLeft: "0.5rem", marginBottom: "2.5rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod 
          </h2>
        </Stack>
        <Totals />
        <Stack
          direction="horizontal"
          gap={4}
          className="mx-5jsutify-content-center"
          style={{
            padding: "1.5rem 2rem",
            margin: "3rem 5rem 1.5rem 5rem",
            borderRadius: "5px"
          }}
        >
          <Stack direction="vertical" gap={4} style={{ width: activeProduct !== "spot" ? "36%" : "auto" }}>
            {products.map((product) => (
              <Button
                key={product.key}
                className={`product2-button ${activeProduct === product.key ? "active" : ""}`}
                onClick={() => setActiveProduct(product.key)}
                style={{ textAlign: "left" }}
              >
                <h1>{product.title}</h1>
                {activeProduct === product.key && (
                  <span style={{ fontSize: "1.1rem", color: "#A9A7BE" }} >Neque porro quisquam est qui</span>
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

export default SectionProducts2


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
