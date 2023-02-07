import React from "react"
import SectionMain from "./sections/SectionMain"
import SectionSolutions from "./sections/SectionSolutions"
import SectionGovernance from "./sections/SectionGovernance"
import SectionProtocol from "./sections/SectionProtocol"
import SectionEcosystem from "./sections/SectionEcosystem"
import SectionNewEcosystem from "./sections/SectionNewEcosystem"

const Home = data => {
  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />
        <SectionSolutions />
        <SectionGovernance />
        <SectionProtocol />
        <SectionNewEcosystem />
      </main>
    </>
  )
}

export default Home
