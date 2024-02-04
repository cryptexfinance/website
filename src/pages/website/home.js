import React from "react"
import SectionMain from "./sections/SectionMain"
import SectionGovernance from "./sections/SectionGovernance"


const SectionMarketsLazy = React.lazy(() =>
  import("./sections/SectionMarkets")
)

const Home = data => {
  const isSSR = typeof window === "undefined"
  
  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />
        {!isSSR && (
          <React.Suspense fallback={<div />}>
            <SectionMarketsLazy />
          </React.Suspense>
        )}
        <SectionGovernance />
      </main>
    </>
  )
}

export default Home
