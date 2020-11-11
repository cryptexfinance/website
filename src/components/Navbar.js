import React from "react"
// import ThemeContext from "../utils/theme"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby"
// import "./Fontawesome.js"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { image } from ""

export default () => {
  // const { toString } = useContext(ThemeContext)
  return (
    <Navbar variant={toString()} fixed="top" collapseOnSelect expand="md">
      <Navbar.Brand className="pl-5 ml-5" as={Link} to="/">
        <img className="menu-logo" src="/logo.svg" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav className="nav-links">
          <Nav.Link as={Link} to="#about" className="nav-links" activeClassName="nav-active" title="What is TCAP?">
            What is TCAP?
          </Nav.Link>
          <Nav.Link as={Link} to="#features" title="How to use TCAP?">
            How to use TCAP?
          </Nav.Link>
          <Nav.Link as={Link} to="#team" title="Team">
            Team
          </Nav.Link>
          <Nav.Link as={Link} to="#faq" title="FAQ">
            FAQ
          </Nav.Link>
          <Nav.Link as={Link} to="#community" title="Comunity">
            Community
          </Nav.Link>
          <a href="https://app.cryptex.finance" target="_blank" rel="noreferrer" className="button-navbar">
            Go to App
          </a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
