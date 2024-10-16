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
          className="products-container justify-content-center"
        >
          <Stack
            direction="vertical"
            gap={4}
            className="products-menu"
            style={{ width: activeProduct !== "spot" ? "36%" : "auto" }}
          >
            {products.map((product) => (
              <div
                key={`bc-${product.key}`}
                className={`btn-mobile-container ${activeProduct === product.key ? "active" : ""}`}
              >
                <Button
                  key={product.key}
                  className={`product-button w-100 ${activeProduct === product.key ? "active" : ""}`}
                  onClick={() => setActiveProduct(product.key)}
                  style={{ textAlign: "left" }}
                >
                  <h1>{product.title}</h1>
                  {/* activeProduct === product.key && (
                    <span>
                      {product.headline}
                    </span>
                  ) */}
                </Button>
                <div className={`product-mobile only-mobile ${activeProduct === product.key ? "active" : "hide"}`}>
                  <div
                    style={{ 
                      backgroundColor: "rgb(22, 22, 30)",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                    }}
                  >
                    {activeProduct === ProductKey.Indexes && (
                      <Indexes />
                    )}  
                    {activeProduct === ProductKey.Spot && (
                      <Spot />
                    )}
                    {activeProduct === ProductKey.Perpetuals && (
                      <Perpetuals />
                    )}
                  </div>    
                </div>
              </div>    
            ))}
          </Stack>
          <Stack
            direction="vertical"
            className="not-on-mobile"
            style={{
              width: activeProduct !== "spot" ? "64%" : "auto",
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
