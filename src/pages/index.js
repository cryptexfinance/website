import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../components"
import { SEO } from "../utils"
import Home from "./website/home";
import bg from '../../static/bg.webp'
import bgvideom from '../../static/bg.webm'

export default ({ data }) => {
  return (
    <PageLayout>
      <video className="video" playsInline autoPlay muted loop poster={bg} id="bgvid">
        <source src={bgvideom} type="video/mp4" />
      </video>
      <SEO title="Home" />
      {/* <Container> */}
        <Home />
      {/* </Container> */}
    </PageLayout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        unemployed
        firstName
        lastName
        occupation
      }
    }
  }
`
