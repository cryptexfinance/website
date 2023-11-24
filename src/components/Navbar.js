import React, { useEffect, useState } from "react"
import { Navbar, Nav } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import appEndpoint from "../endpoint"
import hamburgerIcon from "../../static/burger-icon.svg"

const NavbarMenu = props => {
  const [siteUrl, setSiteUrl] = useState("")
  const dataq = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  useEffect(() => {
    if (typeof dataq.site !== "undefined") {
      setSiteUrl(dataq.site.siteMetadata.siteUrl)
    } else {
      console.log("Error with props in team")
    }
  }, [dataq])

  const blogView =
    typeof props.blogPost !== "undefined" ? props.blogPost : false
  const governanceUrl = blogView ? `${siteUrl}/#governance` : "#governance"
  const docsUrl = "https://docs.cryptex.finance/"

  const NavMobile = () => {
    return (
      <div className="nav-mobile">
        <Navbar fixed="top" expand="lg md sm xl">
          <Navbar.Brand className="pl-5 ml-5" as={Link} to="/#home">
            <img className="menu-logo mobile" src="/logom.svg" alt="Logo" />
            <img className="menu-logo tablet" src="/logo.svg" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="mobile_menu_bar"
            aria-hidden="true"
          >
            <img className="hamburger-icon-custom" src={hamburgerIcon}></img>
          </Navbar.Toggle>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-start"
          >
            <Nav className="nav-links">
              <Nav.Link as={Link} to={governanceUrl} title="Governance">
                Governance
              </Nav.Link>
              <div className="nav-links-divisor"></div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

  const NavDesktop = () => {
    return (
      <div className="nav-default">
        <Navbar fixed="top" collapseOnSelect expand="lg" variant="dark">
          <Navbar.Brand className="pl-3 ml-3" as={Link} to="/#home">
            <img className="menu-logo tablet" src="/cryptex_pi_logo.png" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="mobile_menu_bar"
            aria-hidden="true"
          >
          </Navbar.Toggle>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-start"
          >
            <Nav className="nav-links">
              <Nav.Link as={Link} to={governanceUrl} title="CTX Governance">
                Governance
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <a
                href={appEndpoint}
                target="_blank"
                rel="noreferrer"
                className="btn button-navbar helvetica-neue-font"
              >
                Launch App
              </a>    
        </Navbar>
      </div>
    )
  }

  return (
    <>
      <NavMobile />
      <NavDesktop />
    </>
  )
}

export default NavbarMenu
