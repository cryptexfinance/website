import React from "react";
import NavbarMenu from "./Navbar";
import { graphql } from "gatsby"

export default (props) => (
  <div className="px-0">
    <NavbarMenu blogPost={props.blogPost} />
  </div>
);
