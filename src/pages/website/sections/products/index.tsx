import React from "react"
import { Tab, Tabs } from "react-bootstrap"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Indexes from "./Indexes"
import Perpetuals from "./Perpetuals"
import Spot from "./Spot"
import { PerennialSDKProvider } from "../../../../context/perennialSdkContext"
import Vaults from "./Vaults"


const SectionProducts = () => {
  const { t } = useTranslation()

  return (
    <PerennialSDKProvider>
      <div id="markets" className="section-products">
        <Tabs id="products-tabs" defaultActiveKey={"spot"}>
          <Tab eventKey="spot" title="Spot">
            <Spot />
          </Tab>
          <Tab eventKey="perpetuals" title="Perpetuals">
            <Perpetuals />
          </Tab>
          <Tab eventKey="vaults" title="Vaults">
            <Vaults />
          </Tab>
          <Tab eventKey="indexes" title="Indexes">
            <Indexes />
          </Tab>
        </Tabs>
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
