import React from "react"

import SectionMain from "./sections/SectionMain"
import SectionProducts from "./sections/products"
import SectionGovernance from "./sections/SectionGovernance"
import SectionSocial from "./sections/social"

const Home = data => {
  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />
        <SectionProducts />
        <SectionGovernance />
        <SectionSocial />
      </main>
    </>
  )
}

export default Home
