import React, { useState } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Col from "react-bootstrap/esm/Col";
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import joe from '../../../../static/website/team/joem.webp';
import preston from '../../../../static/website/team/prestonm.webp';
import cristian from '../../../../static/website/team/cristianm.webp';
import tom from '../../../../static/website/team/tomm.webp';
import jorge from '../../../../static/website/team/jorgem.png';
import cullen from '../../../../static/website/team/cullenm.png';
import james from '../../../../static/website/team/jamesm.png';
import oliver from '../../../../static/website/team/oliverm.png';
import brendan from '../../../../static/website/team/brendanm.png';
import zak from '../../../../static/website/team/zakm.png';
import don from '../../../../static/website/team/donm.png';
import arrowInactive from '../../../../static/website/news/arrow-down.svg';
import arrowActive from '../../../../static/website/news/arrow-up.svg';


const teamData  =  [
    {
        name: "Joe Sticco",
        position: "Co-Founder & CEO",
        description: "A lifelong trader and investment manager, Joseph brings immense knowledge of traditional market structure to the project. He founded Cryptex Finance with the vision of combining Wall Street with world class blockchain development in building state of the art investment solutions for tomorrow.",
        image: joe,
        mobile_image: joe    
    },
    {
        name: "Preston Van Loon",
        position: "Co-Founder & Blockchain Lead",
        description: "Preston is a co-founder of Prysmatic Labs and leads a team of dedicated blockchain developers in building critical layer one scaling solutions for Ethereum 2.0. Since January 2018, Preston and team have received nearly $2MM in grant funding to pursue these efforts from the Ethereum Foundation, Vitalik Buterin, Ethereum Community Fund, and many other community members.",
        image: preston,
        mobile_image: preston
    },
    {
        name: "Cristian Espinoza",
        position: "Blockchain Developer",
        description: "Smart Contract Developer certified by ConsenSys, Coffee Lover & Prev. Devcon Scholar at Ethereum Foundation. Leader of the Honduras Ethereum Community.",
        image: cristian,
        mobile_image: cristian
    },
    {
        name: "Thomas Matzner",
        position: "Co-Founder & CBO",
        description: "Thomas has led planning, branding and marketing initiatives at world class companies and startups. He has taken high volume and celebrity endorsed products from concept to launch with an omnichannel strategy. Thomas' passion is building brands with bold visions of leaving a legacy.",
        image: tom,
        mobile_image: tom
    },
    {
        name: "Jorge",
        position: "Full Stack Developer",
        description: "Full Stack developer with more than seven years of experience using technologies like react, react native, python, postgreSQL, among others. Jorge holds a M.S. in Computer Science degree, also he published a paper on the 2015 IEEE International Conference on Big Data.",
        image: jorge,
        mobile_image: jorge
    },
    {
        name: "Cullen",
        position: "Graphic Designer",
        description: "Writer, Director, and VFX Artist, who's done VFX for shows like Man in the High Castle, Room 104, and Silicon Valley. Born and raised in the Midwest, Cullen always had a passion for movies and storytelling. After years of studying to be a doctor, he abandoned that dream for another and moved to Hollywood. SCUBA diver, adventure seeker, and salsa dancer.",
        image: cullen,
        mobile_image: cullen
    },
    {
        name: "James",
        position: "Media Production",
        description: "A multifaceted media producer, James brings two decades of experience in content creation to the team. As a musician, sound designer, audio engineer, event organizer, and meme page administrator, James is always nurturing his creative instincts and dreaming up interesting ways to tell a story. With a vast network of cohorts, spanning all spectrums of the entertainment industry, the question isn't 'can it be done', its 'what's your budget'.",
        image: james,
        mobile_image: james
    },
    {
        name: "Oliver",
        position: "Music Production",
        description: "Most likely cuddling with your girlfriend or wife when he isn't making beats.",
        image: oliver,
        mobile_image: oliver
    },
    {
        name: "Brendan",
        position: "Brand Manager",
        description: "Brendan builds and nurtures a DeFi community with a passion for education and social media development. A blockchain enthusiast, he is skilled in video editing, enjoys music, and pursues photography.",
        image: brendan,
        mobile_image: brendan
    },
    {
        name: "Zak",
        position: "Advisor",
        description: "Co-Founder and CTO, Slingshot. Zak serves as technical advisor to several blockchain related companies such as DeFi Pulse and the Syscoin foundation. Previously Zak founded Whiteblock, which specialized in blockchain protocol testing, research and development.",
        image: zak,
        mobile_image: zak
    },
    {
        name: "Don",
        position: "Advisor",
        description: "Co-Founder and Managing Director, Quantstamp. Don is an investor and entrepreneur with global perspectives and cross functional experiences supporting investments, product, and growth. Don previously worked at IDG Ventures and PNP Ventures where he helped launch Nexla, Ayasdi, and the Los Angeles Football Club.",
        image: don,
        mobile_image: don
    }
];


const SectionTeam = (props) => {
  const breakpoints = useBreakpoint();
  const [teamActivePage, setTeamActivePage] = useState(0);

  const changeTeamPage = (index) => {
    setTeamActivePage(index);
  }

  const backTeamPage = () => {
    changeTeamPage(teamActivePage == 0 ? 0 : teamActivePage - 1);
  }

  const nextTeamPage = (pages) => {
    changeTeamPage(teamActivePage == pages - 1 ? 0 : teamActivePage + 1);
  }

  const teamBoxClass = (index, itemsPerPage) => {
    const pageNumber = Math.ceil((index + 1) / itemsPerPage);
    let cname = pageNumber == teamActivePage + 1 ? "team-box  " : "team-box hide";
    return cname + " page" + pageNumber;
  }

  const TeamLarge = () => {
    return <Team itemsPerPage={8} />
  }

  const TeamMobile = () => {
    return <Team itemsPerPage={4} />
  }

  const Team = (props) => {
    return (
      teamData.map((data, index) => (
        <Col className={teamBoxClass(index, props.itemsPerPage)} sm={6} md={6} lg={3} >
          <Flippy
            flipOnHover={true}
            flipOnClick={false}
            flipDirection="horizontal"
          >
            <FrontSide animationDuration="0">
              <>                
                <img src={data.image} className="team-box-photo" alt={data.name} />
              </>
              <p className="team-box-name">{data.name}</p>
              <p className="team-box-position">{data.position}</p>
            </FrontSide>
            <BackSide animationDuration="0">
              <p className="team-box-name">{data.name}</p>
              <p className="team-box-description">{data.description}</p>
            </BackSide>
          </Flippy>
        </Col>
      ))
    )
  }

  const PaginationMobile = () => {
    return <Pagination itemsPerPage={4} />
  }

  const PaginationLarge = () => {
    return <Pagination itemsPerPage={8} />
  }

  const Pagination = (props) => {
    let members = teamData.length;
    let pages = Math.ceil(members / props.itemsPerPage);
    let items = []
    for (let i = 0; i < pages; i++) {
      let iClass = "item" + (teamActivePage == i ? " active" : "")
      items.push(iClass)
    }

    let pagClass = "team-pagination";
    if (teamActivePage == pages - 1)
      pagClass = " team-pagination two";
    
    let backImgClass = "arrow" + (teamActivePage == 0 ? "" : " active") 
    let nextImgClass = "arrow" + (teamActivePage == pages-1 ? "" : " active") 
    let backClass = "group box back" + (teamActivePage == 0 ? "" : " active") 
    let nextClass = "group box next" + (teamActivePage == pages-1 ? "" : " active") 

    return (
      <Col sm={12} md={12} lg={4} className={pagClass}>
        <div className="team-pagination-container">
          <button className={backClass} onClick={() => backTeamPage()}>   
            <img className={backImgClass} src={teamActivePage == 0 ? arrowInactive : arrowActive} alt="Back" />                                              
          </button>
            <div className={"items"}> 
              {items.map( (item, index) => (
                <a className={item} onClick={() => changeTeamPage(index)}></a>
              ))}
            </div>
          <button className={nextClass} onClick={() => nextTeamPage(pages)} >                
            <img className={nextImgClass}  src={teamActivePage == pages-1 ? arrowInactive : arrowActive} alt="Next" />                                              
          </button>
        </div>  
      </Col>
    )
  }

  return (
    <>
      <section id="team" className="section-team">
        <div className="team-container">
          <Col md={12} lg={12} className="members-container">
            <Col md={12} lg={12} className="team-title header">
              Team
            </Col>
            <Col md={12} lg={12} className="team-subheader">
              <Col sm={12} md={8} lg={8} className="team-subtitle content">
                Building the investments of tomorrow, today.
              </Col>  
              {breakpoints.mdmin && <PaginationLarge />}
            </Col>
            <div className="team-members">
              {breakpoints.md ?
                <TeamMobile />
                :
                <TeamLarge />
              }
            </div>
            {breakpoints.md ? <PaginationMobile /> : null }
          </Col>          
        </div>  
      </section>
    </>
  )
}

export default SectionTeam