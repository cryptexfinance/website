import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../components"
import { SEO } from "../utils"
import Home from "./website/home";
import bg from '../../static/bg.webp'
import bgvideo from '../../static/bg.mp4'
import bgvideom from '../../static/bg.webm'

export default ({ data }) => {
  // console.log(data.price);
  return (
    <PageLayout>
      <SEO title="Cryptex | TCAP" />
      <video playsInline autoPlay loop muted poster={bg} className="video"  id="bgvid">
        <source src={bgvideom} type="video/webm" />
        <source src={bgvideo} type="video/mp4" />
      </video>
        <Home price={data.price.tcaps[0]}/>
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
    },
    price {
      tcaps(
            first: 1, 
            orderBy: updatedAt, 
            orderDirection: desc
      ) {
        tcap
      }
    }
  }
`
