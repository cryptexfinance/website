import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../components"
import { Seo } from "../utils"
import useSiteMetadata from "../components/SiteMetadata"
import { withPrefix } from "gatsby"
import Home from "./website/home"


const App = ({ data }) => {
  return (
    <PageLayout>
      <Seo title="Cryptex Finance" />
      <Home />
    </PageLayout>
  )
}

export const Head = () => {
  const { title, description } = useSiteMetadata() 

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="business.business" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="/" />
      <meta
        property="og:image"
        content={`${withPrefix('/')}img/og-image.jpg`}
      />
    </>
  );  
};

export default App;

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
    },
    site {
      siteMetadata {
        title
        description
        author
        image
        keywords
      }
    }
  }
`;
