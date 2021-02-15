import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../components"
import { SEO } from "../utils"
import Home from "./website/home";
import bg from '../../static/bg.webp'
import bgvideo from '../../static/bg.mp4'

export default ({ data }) => {
  
  return (
    <PageLayout>
      <SEO title="Cryptex" />
      <video playsInline autoPlay loop muted poster={bg} className="video"  id="bgvid">
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
        unemployed
        firstName
        lastName
        occupation
      }
    }
  }
`
