import React from "react"
import SectionMain from "./sections/SectionMain"
import SectionGovernance from "./sections/SectionGovernance"


const Home = data => {
  return (
    <>
      <header id="home" />
      <main>
        <SectionMain />
        <SectionGovernance />
      </main>
    </>
  )
}

export default Home
