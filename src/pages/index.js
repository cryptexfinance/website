import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../components"
import { SEO } from "../utils"
import Home from "./website/home";
import bg from '../../static/bg.webp'
import bgvideom from '../../static/bg.webm'

export default () => {

  return (
    <PageLayout>
      <SEO title="Cryptex | TCAP" />
      <video className="video" autoPlay loop muted playsInline poster={bg} id="bgvid">
        <source src={bgvideom} type="video/mp4" />
      </video>
        <Home/>
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
