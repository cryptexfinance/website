import React from "react"

import SectionMain from "./sections/SectionMain"
import SectionProducts from "./sections/products"
import SectionGovernance from "./sections/SectionGovernance"
import SectionSocial from "./sections/social"
import SectionSecurity from "./sections/SectionSecurity"
import SectionIncentives from "./sections/SectionIncentives"


const Home = data => {
  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />
        <SectionProducts />
        <SectionIncentives />
        <SectionSecurity />
        <SectionGovernance />
        <SectionSocial />
      </main>
    </>
  )
}

export default Home
