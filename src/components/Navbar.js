import React, { useEffect, useState } from "react"
import { Dropdown, Navbar, Nav } from "react-bootstrap"
import { MdOutlineLanguage } from "react-icons/md";
import { useStaticQuery, graphql } from "gatsby"

import { Link, useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import appEndpoint from "../endpoint"
import hamburgerIcon from "../../static/burger-icon.svg"

const languagesInfo = {
  'en': {
    country: 'US',
    name: 'English',
  },
  'es': {
    country: 'ES',
    name: 'Español'
  },
  'pt': {
    country: 'BR',
    name: 'Português'
  },
  'tr': {
    country: 'TR',
    name: 'Türkçe'
  }
}

const NavbarMenu = props => {
  const { languages, originalPath, t } = useI18next()
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
  const productsUrl = blogView ? `${siteUrl}/#markets` : "#markets"

  const LangDropdown = () => (
    <Dropdown className="language-dropdown">
      <Dropdown.Toggle>
        <MdOutlineLanguage size={28} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {languages.map((lang) => (
          <Dropdown.Item key={lang}>
            <Link to={originalPath} language={lang !== 'us' ? lang : undefined} className="lang-link">
              <span className="lang-text">{languagesInfo[lang].name}</span>
            </Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>  
    </Dropdown>
  )

  const NavMobile = () => {
    return (
      <div className="nav-mobile">
        <Navbar fixed="top" expand="lg md sm xl">
          <Navbar.Brand className="pl-5 ml-5" as={Link} to="/#home">
            <img className="menu-logo mobile" src="/logom.svg" alt="Logo" />
            <img className="menu-logo tablet" src="/logo.svg" alt="Logo" />
          </Navbar.Brand>
          <div className="navbar-right">
            <LangDropdown />
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="mobile_menu_bar"
              aria-hidden="true"
            >
              <img className="hamburger-icon-custom" src={hamburgerIcon} alt="C"></img>
            </Navbar.Toggle>
          </div>  
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-start"
          >
            <Nav className="nav-links">
              <Nav.Link as={Link} to={productsUrl} title="Products">
                Products
              </Nav.Link>
              <div className="nav-links-divisor" />
            </Nav>     
            <Nav className="nav-links">
              <Nav.Link as={Link} to={governanceUrl} title="Governance">
                {t('governance')}
              </Nav.Link>
              <div className="nav-links-divisor" />
            </Nav>
          </Navbar.Collapse>          
        </Navbar>
      </div>
    )
  }

  const NavDesktop = () => {
    const { t } = useTranslation()

    return (
      <div className="nav-default">
        <Navbar fixed="top" collapseOnSelect expand="lg" variant="dark">
          <Navbar.Brand className="pl-3 ml-3" as={Link} to="/#home">
            <img className="menu-logo tablet" src="/logo.svg" alt="Logo" />
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
              <Nav.Link as={Link} to={productsUrl} title="Markets">
                Markets
              </Nav.Link>
              <Nav.Link as={Link} to={governanceUrl} title="CTX Governance">
                {t('governance')}
              </Nav.Link>         
            </Nav>
          </Navbar.Collapse>
          <a
            href={appEndpoint}
            target="_blank"
            rel="noreferrer"
            className="btn button-navbar helvetica-neue-font"
          >
            {t('launch-app')}
          </a>
          <LangDropdown /> 
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

