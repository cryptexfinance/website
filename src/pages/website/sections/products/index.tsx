import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Perpetuals from "./Perpetuals"
import { PerennialSDKProvider } from "../../../../context/perennialSdkContext"


const SectionProducts = () => {
  const { t } = useTranslation()

  return (
    <PerennialSDKProvider>
      <div id="markets" className="section-markets">
        <h1 className="header">{t('markets')}</h1>
        <Perpetuals />
        {/* <Tabs id="products-tabs" defaultActiveKey={"indexes"}>
          <Tab eventKey="indexes" title="Indexes">
            <Indexes />
          </Tab>
          <Tab eventKey="perpetuals" title="Perpetuals">
            <Perpetuals />
            </Tab> 
        </Tabs> */}
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
