import React from "react"

import SectionMain from "./sections/SectionMain"
import SectionProducts from "./sections/products"
import SectionGovernance from "./sections/SectionGovernance"


/* const SectionMarketsLazy = React.lazy(() =>
  import("./sections/SectionMarkets")
) */

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
