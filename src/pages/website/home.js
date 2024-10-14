import React from "react"

import SectionMain from "./sections/SectionMain"
import SectionProducts from "./sections/products"
import SectionProducts2 from "./sections/products2"
import SectionGovernance from "./sections/SectionGovernance"
import SectionSocial from "./sections/social"
import SectionSecurity from "./sections/SectionSecurity"


const Home = data => {
  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />
        <SectionProducts2 />
        <SectionSecurity />
        <SectionGovernance />
        <SectionSocial />
      </main>
    </>
  )
}

export default Home
