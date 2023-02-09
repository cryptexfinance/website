import React, { useEffect, useState } from "react"
import { Navbar, Nav } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import appEndpoint from "../endpoint"

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
  const productsUrl = blogView ? `${siteUrl}/#solutions` : "#solutions"
  const governanceUrl = blogView ? `${siteUrl}/#governance` : "#governance"
  const safetyUrl = blogView ? `${siteUrl}/#protocol` : "#protocol"
  const newsUrl = `${siteUrl}/blog`
  const faqUrl = "https://cryptexfinance.notion.site/Cryptex-Finance-Wiki-9f29021042df4da6b6887553a879d691"
  const ecosystemUrl = blogView ? `${siteUrl}/#community` : "#community"
  const docsUrl = "https://docs.cryptex.finance/"

  const NavMobile = () => {
    return (
      <div className="nav-mobile">
        <Navbar fixed="top" expand="lg md sm xl">
          <Navbar.Brand className="pl-5 ml-5" as={Link} to="/#home">
            <img className="menu-logo mobile" src="/logom.svg" alt="Logo" />
            <img className="menu-logo tablet" src="/logo.svg" alt="Logo" />

            <div className="menu-logo-divider"></div>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="mobile_menu_bar"
            aria-hidden="true"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="nav-links">
              <Nav.Link
                as={Link}
                to={productsUrl}
                className="nav-links"
                title="Products"
              >
                Indexes
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} to={governanceUrl} title="Governance">
                Governance
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} to={safetyUrl} title="Safety">
                Protocol
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} to={ecosystemUrl} title="Community">
                Community
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} to={newsUrl} title="News">
                Blog
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} to={docsUrl} title="Docs">
                Docs
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link
                href={faqUrl}
                rel="noreferrer"
                target="_blank"
                title="FAQ"
              >
                Wiki
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Navbar
          fixed="top"
          collapseOnSelect
          expand="sm"
          className="responsive-app-button"
        >
          <a
            href={appEndpoint}
            target="_blank"
            rel="noreferrer"
            className="button-navbar"
          >
            Go to App
          </a>
        </Navbar>
      </div>
    )
  }

  const NavDesktop = () => {
    return (
      <div className="nav-default">
        <Navbar fixed="top" collapseOnSelect expand="lg">
          <Navbar.Brand className="pl-5 ml-5" as={Link} to="/#home">
            <img className="menu-logo" src="/logo.svg" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="mobile_menu_bar"
            aria-hidden="true"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="nav-links">
              <Nav.Link
                as={Link}
                to={productsUrl}
                className="nav-links"
                title="Products"
              >
                Indexes
              </Nav.Link>
              <Nav.Link as={Link} to={governanceUrl} title="CTX Governance">
                Governance
              </Nav.Link>
              <Nav.Link as={Link} to={safetyUrl} title="Safety">
                Protocol
              </Nav.Link>
              <Nav.Link as={Link} to={ecosystemUrl} title="Ecosystem">
                Community
              </Nav.Link>
              <Nav.Link as={Link} to={newsUrl} title="News">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to={docsUrl} title="Docs">
                Docs
              </Nav.Link>
              <Nav.Link
                href={faqUrl}
                rel="noreferrer"
                target="_blank"
                title="FAQ"
              >
                Wiki
              </Nav.Link>

              <a
                href={appEndpoint}
                target="_blank"
                rel="noreferrer"
                className="button-navbar"
              >
                Go to App
              </a>
            </Nav>
          </Navbar.Collapse>
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
