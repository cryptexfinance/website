import React from "react"
import { Container } from "react-bootstrap"
import Header from "./Header"

export default ({ children }) => (
  <>
    <Header />
    <Container fluid className="bg-dark pt-5 mt-5 text-center min-vh-100">
      {children}
    </Container>
  </>
)
