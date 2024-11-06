import React from "react";
import NavbarMenu from "./Navbar";

export default (props) => (
  <div className="px-0">
    <NavbarMenu blogPost={props.blogPost} />
  </div>
);
