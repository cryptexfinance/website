import React from 'react'
import SectionMain from './sections/SectionMain'
import SectionAbout from './sections/SectionAbout'
import SectionFeatures from './sections/SectionFeatures'
import SectionTeam from './sections/SectionTeam'
import SectionFaq from './sections/SectionFaq'
import SectionCommunity from './sections/SectionCommunity'

const Home = (data) => {
  // console.log(data);
    return (
      <>
        <header className="section-main">
          {/* <SectionMain price={data.price}/> */}
          <SectionMain />
        </header>
        <main>
          <SectionAbout />
          <SectionFeatures />
          <SectionTeam />
          <SectionFaq />
          <SectionCommunity />
        </main>
      </>
    )
}

export default Home
