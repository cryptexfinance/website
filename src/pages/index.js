import React from "react"
import { graphql } from "gatsby"
// import ThemeContext from "../utils/theme"
import { PageLayout } from "../components"
import { SEO } from "../utils"
// import { Container } from "react-bootstrap"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Home from "./website/home";
import bg from '../../static/bg.jpg'
// import bgvideo from '../../static/bg.mp4'
import bgvideom from '../../static/bg.webm'

export default ({ data }) => {
  // const { unemployed, firstName, lastName, occupation } = data.site.siteMetadata
  // const { dark } = useContext(ThemeContext)
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
