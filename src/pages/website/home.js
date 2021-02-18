import React from 'react'
import SectionMain from './sections/SectionMain'
import SectionAbout from './sections/SectionAbout'
import SectionGovernance from './sections/SectionGovernance'
import SectionFeatures from './sections/SectionFeatures'
import SectionTeam from './sections/SectionTeam'
import SectionFaq from './sections/SectionFaq'
import SectionCommunity from './sections/SectionCommunity'

const Home = (data) => {
  // console.log(data);
    return (
      <>
        <header id="home" className="section-main">
          {/* <SectionMain price={data.price}/> */}
          <SectionMain />
        </header>
        <main>
          <SectionAbout />
          <SectionFeatures />
          <SectionGovernance />
          <SectionTeam />
          <SectionFaq />
          <SectionCommunity />
        </main>
      </>
    )
}

export default Home
