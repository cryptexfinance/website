import React from "react";
import { graphql } from "gatsby";
import { PageLayout } from "../components";
import { Seo } from "../utils";
import Home from "./website/home";
import bg from "../../static/bg.webp";
import bgvideo from "../../static/bg.mp4";

const App = ({ data }) => {
  return (
    <PageLayout>
      <Seo title="Cryptex" />
      <video
        playsInline
        autoPlay
        loop
        muted
        poster={bg}
        className="video"
        id="bgvid"
      >
        <source src={bgvideo} type="video/mp4" />
      </video>
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
