import React from "react"

import SectionMain from "./sections/SectionMain"
import SectionProducts from "./sections/products"
import SectionGovernance from "./sections/SectionGovernance"
import SectionSocial from "./sections/social"
import SectionSecurity from "./sections/SectionSecurity"
import SectionSecurity2 from "./sections/SectionSecurity2"
import SectionSecurity3 from "./sections/SectionSecurity3"


const Home = data => {
  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />
        <SectionProducts />
        <SectionSecurity />
        <SectionSecurity3 />
        <SectionSecurity2 />
        <SectionGovernance />
        <SectionSocial />
      </main>
    </>
  )
}

export default Home
