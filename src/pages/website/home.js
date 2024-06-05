import React from "react"
import Loadable from "@loadable/component"

import SectionMain from "./sections/SectionMain"
// import SectionProducts from "./sections/products"
import SectionGovernance from "./sections/SectionGovernance"

const SectionProducts = Loadable(() => import("./sections/products"))


const Home = data => {
  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />
        <SectionProducts />
        <SectionGovernance />
      </main>
    </>
  )
}

export default Home
