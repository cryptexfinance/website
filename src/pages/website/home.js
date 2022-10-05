import React from "react";
import SectionMain from "./sections/SectionMain";
import SectionSolutions from "./sections/SectionSolutions";
import SectionGovernance from "./sections/SectionGovernance";
import SectionProtocol from "./sections/SectionProtocol";
import SectionEcosystem from "./sections/SectionEcosystem";

const Home = (data) => {

  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />   
        <SectionSolutions />
        <SectionGovernance />
        <SectionProtocol />
        <SectionEcosystem />
      </main>
    </>
  )
}

export default Home;
