import React, { useEffect, useState } from 'react'
import SectionMain from './sections/SectionMain'
import SectionAbout from './sections/SectionAbout'
import SectionFeatures from './sections/SectionFeatures'
import SectionTeam from './sections/SectionTeam'
import SectionFaq from './sections/SectionFaq'
import SectionCommunity from './sections/SectionCommunity'

const Home = (props) => {
  const [tprice, setPrice] = useState("0.0");
  const [tblog, setBlog] = useState({});

  useEffect(() => {
    if (typeof(props.data) !== `undefined`) {
      setPrice(props.data.price.tcaps[0].tcap);
      setBlog(props.data.allMarkdownRemark);
    } else {
      console.log("Error with props");
      console.log(props);
    }
    console.log(tprice);
    console.log(tblog);
  }, [props]);
  
  
    return (
      <>
        <header className="section-main">
          <SectionMain tcap={tprice} />
        </header>
        <main>
          <SectionAbout />
          <SectionFeatures />
          <SectionTeam blog={tblog}/>
          <SectionFaq />
          <SectionCommunity />
        </main>
      </>
    )
}

export default Home
