import React, { useEffect, useState } from "react"
import { Navbar, Nav } from "react-bootstrap"
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from "gatsby"
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
      console.log(dataq);
    }
  }, [dataq]);

  const blogView = (typeof props.blogPost !== "undefined" ? props.blogPost : false);
  const aboutUrl = blogView ? `${siteUrl}/#about` : "#about";
  const featuresUrl = blogView ? `${siteUrl}/#features` : "#features";
  const governanceUrl = blogView ? `${siteUrl}/#governance` : "#governance";
  const teamUrl = blogView ? `${siteUrl}/#team` : "#team";
  const newsUrl = blogView ? `${siteUrl}/#news` : "#news";
  const faqUrl = blogView ? `${siteUrl}/#faq` : "#faq";
  const communityUrl = blogView ? `${siteUrl}/#community` : "#community";


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
              <Nav.Link as={Link} href={aboutUrl} className="nav-links" title="What is TCAP?">
                What is TCAP?
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} href={featuresUrl} title="How to use TCAP?">
                How to use TCAP?
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} href={governanceUrl} title="CTX Governance">
                CTX Governance
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} href={teamUrl} title="Team">
                Team
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} href={newsUrl} title="News">
                News
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} href={faqUrl} title="FAQ">
                FAQ
              </Nav.Link>
              <div className="nav-links-divisor"></div>
              <Nav.Link as={Link} href={communityUrl} title="Community">
                Community
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
              <Nav.Link as={Link} href={aboutUrl} className="nav-links" title="What is TCAP?">
                What is TCAP?
              </Nav.Link>
              <Nav.Link as={Link} href={featuresUrl} title="How to use TCAP?">
                How to use TCAP?
              </Nav.Link>
              <Nav.Link as={Link} href={governanceUrl} title="CTX Governance">
                CTX Governance
              </Nav.Link>
              <Nav.Link as={Link} href={teamUrl} title="Team">
                Team
              </Nav.Link>
              <Nav.Link as={Link} href={newsUrl} title="News">
                News
              </Nav.Link>
              <Nav.Link as={Link} href={faqUrl} title="FAQ">
                FAQ
              </Nav.Link>
              <Nav.Link as={Link} href={communityUrl} title="Comunity">
                Community
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
