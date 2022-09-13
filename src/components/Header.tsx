import React from "react";
import Navbar from "./Navbar";

export default (props) => (
  <div className="px-0">
    <Navbar blogPost={props.blogPost} />
  </div>
);
