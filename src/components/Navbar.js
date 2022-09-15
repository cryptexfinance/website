import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import appEndpoint from '../endpoint';


export default (props) => {
  const [siteUrl, setSiteUrl] = useState("");
  const dataq = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }`);
  
  useEffect(() => {
    if (typeof (dataq.site) !== "undefined") {
      setSiteUrl(dataq.site.siteMetadata.siteUrl)
    } else {
      console.log("Error with props in team");
    }
  }, [dataq]);

  const blogView = (typeof props.blogPost !== "undefined" ? props.blogPost : false);
  const productsUrl = blogView ? `${siteUrl}/#products` : "#products";
  const academyUrl = `${siteUrl}/education`;
  const governanceUrl = blogView ? `${siteUrl}/#governance` : "#governance";
  const safetyUrl = blogView ? `${siteUrl}/#safety` : "#safety";
  const newsUrl = `${siteUrl}/blog`;
  const faqUrl = "https://docs.cryptex.finance/faq";
  const ecosystemUrl = blogView ? `${siteUrl}/#ecosystem` : "#ecosystem";


  const NavMobile = () => {
    return (
      <div className="nav-mobile">  
        <Navbar fixed="top" expand="lg md sm xl">
          <Navbar.Brand className="pl-5 ml-5" as={Link} to="/#home">
             <img className="menu-logo mobile" src="/logom.svg" alt="Logo" /> 
             <img className="menu-logo tablet" src="/logo.svg" alt="Logo" /> 
            
            <div className="menu-logo-divider"></div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mobile_menu_bar" aria-hidden="true"/>
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="nav-links">
              <Nav.Link as={Link} to={productsUrl} className="nav-links" title="Products">
                Products
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} to={governanceUrl} title="Governance">
                Governance
              </Nav.Link>
              <Nav.Link as={Link} to={safetyUrl} title="Safety">
                Safety
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} to={ecosystemUrl} title="Ecosystem">
                Ecosystem
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} to={academyUrl} title="Academy">
                Academy
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} to={newsUrl} title="News">
                News
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} to={faqUrl} title="FAQ">
                FAQ
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Navbar fixed="top" collapseOnSelect expand="sm" className="responsive-app-button">
          <a href={appEndpoint} target="_blank" rel="noreferrer" className="button-navbar">
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mobile_menu_bar" aria-hidden="true"/>
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className="nav-links">
              <Nav.Link as={Link} to={productsUrl} className="nav-links" title="Products">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to={governanceUrl} title="CTX Governance">
                Governance
              </Nav.Link>
              <Nav.Link as={Link} to={safetyUrl} title="Safety">
                Safety
              </Nav.Link>
              <Nav.Link as={Link} to={ecosystemUrl} title="Ecosystem">
                Ecosystem
              </Nav.Link>
              <Nav.Link as={Link} to={academyUrl} title="Academy">
                Academy
              </Nav.Link>
              <Nav.Link as={Link} to={newsUrl} title="News">
                News
              </Nav.Link>
              <Nav.Link as={Link} to={faqUrl} title="FAQ">
                FAQ
              </Nav.Link>
              
              <a href={appEndpoint} target="_blank" rel="noreferrer" className="button-navbar">
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
        <NavMobile/>       
        <NavDesktop/>                
      </>
  )
}
