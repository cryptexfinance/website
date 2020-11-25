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
      <SEO title="Cryptex | TCAP" />
      <video className="video" playsInline autoPlay muted loop poster={bg} id="bgvid">
        <source src={bgvideom} type="video/mp4" />
      </video>
        <Home data={data}/>
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
    },
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 300) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`
