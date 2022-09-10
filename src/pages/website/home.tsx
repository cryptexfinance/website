import React from "react";
import SectionMain from "./sections/SectionMain";
import SectionProducts from "./sections/SectionProducts";
import SectionGovernance from "./sections/SectionGovernance";
import SectionSafety from "./sections/SectionSafety";

const Home = (data) => {

  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />   
        <SectionProducts />
        <SectionGovernance />
        <SectionSafety />
      </main>
    </>
  )
}

export default Home;
