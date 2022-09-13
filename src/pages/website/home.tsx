import React from "react";
import SectionMain from "./sections/SectionMain";
import SectionProducts from "./sections/SectionProducts";
import SectionGovernance from "./sections/SectionGovernance";
import SectionSafety from "./sections/SectionSafety";
import SectionEcosystem from "./sections/SectionEcosystem";

const Home = (data) => {

  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />   
        <SectionProducts />
        <SectionGovernance />
        <SectionSafety />
        <SectionEcosystem />
      </main>
    </>
  )
}

export default Home;
