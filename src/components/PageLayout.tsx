import React from "react";
// import { Container } from "react-bootstrap"
import Header from "./Header";
import Footer from "./Footer";

export default ({ children }) => (
  <div className="pt-5 mt-5">
    <Header />
    {/* <div className="bg-black pt-5 mt-5 min-vh-100"> */}
      {children}
    {/* </div> */}
    <Footer />
  </div>
)
