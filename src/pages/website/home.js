import React from 'react'
import SectionMain from './sections/SectionMain'
import SectionAbout from './sections/SectionAbout'
import SectionFeatures from './sections/SectionFeatures'
import SectionTeam from './sections/SectionTeam'
import SectionFaq from './sections/SectionFaq'
import SectionCommunity from './sections/SectionCommunity'

const Home = (props) => {
  // const tprice = props.data.price.tcaps[0].tcap;
    return (
      <>
        <header className="section-main">
          <SectionMain tcap={props.data.price.tcaps[0].tcap} />
        </header>
        <main>
          <SectionAbout />
          <SectionFeatures />
          <SectionTeam blog={props.data.allMarkdownRemark}/>
          <SectionFaq />
          <SectionCommunity />
        </main>
      </>
    )
}

export default Home
