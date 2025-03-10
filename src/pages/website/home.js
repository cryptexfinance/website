import React from "react"

import SectionMain from "./sections/SectionMain"
import SectionProducts from "./sections/products"
import SectionGovernance from "./sections/SectionGovernance"
import SectionSecurity from "./sections/SectionSecurity"


const Home = data => {
  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />
        <SectionProducts />
        <SectionSecurity />
        <SectionGovernance />
      </main>
    </>
  )
}

export default Home
