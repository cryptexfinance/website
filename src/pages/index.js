import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../components"
import { SEO } from "../utils"
import Home from "./website/home";
import bg from '../../static/bg.webp'
import bgvideom from '../../static/bg.webm'

export default ({ data }) => {
  const tprice=data.price.tcaps[0].tcap;

  return (
    <PageLayout>
      <SEO title="Cryptex | TCAP" />
      <video className="video" playsInline autoPlay muted loop poster={bg} id="bgvid">
        <source src={bgvideom} type="video/mp4" />
      </video>
        <Home price={tprice}/>
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
