import React from "react"
import SectionMain from "./sections/SectionMain"
import SectionMarkets from "./sections/SectionMarkets"
import SectionGovernance from "./sections/SectionGovernance"


/* const SectionMarketsLazy = React.lazy(() =>
  import("./sections/SectionMarkets")
) */

const Home = data => {
  const isSSR = typeof window === "undefined"
  
  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />
        <SectionMarkets />
        <SectionGovernance />
      </main>
    </>
  )
}

export default Home
