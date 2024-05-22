import React from "react"

import SectionMain from "./sections/SectionMain"
import SectionMain2 from "./sections/SectionMain2"
import SectionMain3 from "./sections/SectionMain3"
import SectionMarkets2 from "./sections/SectionMarkets2"
import SectionMarkets3 from "./sections/SectionMarkets3"
import SectionGovernance from "./sections/SectionGovernance"
import { ProductsInfo } from "./sections/Info"


/* const SectionMarketsLazy = React.lazy(() =>
  import("./sections/SectionMarkets")
) */

const Home = data => {
  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />
        {/* <ProductsInfo /> */}
        <SectionMarkets2 />
        <SectionGovernance />
      </main>
    </>
  )
}

export default Home
