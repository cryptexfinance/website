import React from "react"
// import { Container } from "react-bootstrap"
import Header from "./Header"

export default ({ children }) => (
  <div className="pt-5 mt-5">
    <Header />
    {/* <div className="bg-black pt-5 mt-5 min-vh-100"> */}
      {children}
    {/* </div> */}
  </div>
)
