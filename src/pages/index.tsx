import React from "react";
import { graphql } from "gatsby";
import { PageLayout } from "../components";
import { Seo } from "../utils";
import Home from "./website/home";

const App = ({ data }) => {
  return (
    <PageLayout>
      <Seo title="Cryptex" />
      <Home />
    </PageLayout>
  )
}

export const query = graphql`
  query {
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
`

export default App;
