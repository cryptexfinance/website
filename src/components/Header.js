import React from "react"
// import { Container } from "react-bootstrap"
import Navbar from "./Navbar"

export default (props) => (
  <div className="px-0">
    <Navbar blogPost={props.blogPost} />
  </div>
)
