import React from "react"
import { Button, Stack } from "react-bootstrap"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

// import Vaults from "./Vaults"
import { PerennialSDKProvider } from "../../../../context/perennialSdkContext"
import Indexes from "../products/Indexes"
import Spot from "../products/Spot"
import Perpetuals from "../products/Perpetuals"
import Totals from "../products2/totals"


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

const SectionProducts3 = () => {
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
          direction="vertical"
          gap={0}
          className="mx-5jsutify-content-center"
          style={{
            margin: "3rem 4rem 1.5rem 4rem",
            borderRadius: "5px"
          }}
        >
          <Stack
            direction="horizontal"
            gap={4}
            style={{
              backgroundColor: "rgb(16, 16, 20)",
              padding: "1.5rem 2rem",
              height: "22rem"
            }}
          >
            <Stack direction="vertical" style={{ width: "40%" }}>
              <h1 style={{ color: "#A440F2" }}>Indexes</h1>
              <p style={{ fontSize: "1.5rem", color: "#d5d4e3" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
              </p>
            </Stack>
            <Stack direction="vertical" style={{ width: "60%", marginTop: "-2rem" }}>
              <Indexes />
            </Stack>
          </Stack>
          <Stack
            direction="horizontal"
            gap={4}
            style={{
              padding: "1.4rem 2rem",
              backgroundColor: "rgb(10, 10, 16)",
            }}
          >
            <Stack direction="vertical"
              style={{
                minWidth: "42%",
                width: "auto",
                marginTop: "-2rem"
              }}
            >
              <Spot />
            </Stack>
            <Stack
              direction="vertical"
              style={{
                width: "auto",
                maxWidth: "58%",
                marginLeft: "2rem",
              }}
            >
              <h1 style={{ color: "#A440F2" }}>Spot</h1>
              <p style={{ fontSize: "1.4rem", color: "#d5d4e3" }}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              </p>
            </Stack>
          </Stack>
          <Stack
            direction="horizontal"
            gap={4}
            style={{
              backgroundColor: "rgb(16, 16, 20)",
              padding: "1.5rem 2rem",
            }}
          >
            <Stack direction="vertical"  style={{ width: "40%" }}>
              <h1 style={{ color: "#A440F2" }}>Perpetuals</h1>
              <p style={{ fontSize: "1.4rem", color: "#d5d4e3" }}>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit
              </p>
              <p style={{ fontSize: "1.4rem", color: "#d5d4e3" }}>
                Ut enim ad minima veniam, quis nostrum exercitationem.
              </p>
            </Stack>
            <Stack direction="vertical" style={{ width: "60%", marginTop: "-2rem" }}>
              <Perpetuals />
            </Stack>
          </Stack>
        </Stack>
      </div>
    </PerennialSDKProvider>
  )
}

export default SectionProducts3


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
