import React from "react"
import { Tabs, Tab} from "react-bootstrap"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { Indexes } from "./Indexes"
import Perpetuals from "./Perpetuals"


const SectionProducts = () => {
  const { t } = useTranslation()

  return(
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
