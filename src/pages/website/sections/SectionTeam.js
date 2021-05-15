import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Col from "react-bootstrap/esm/Col";

import { teamData } from '../../team/data';
import joe from '../../../../static/website/team/joe.webp';
import preston from '../../../../static/website/team/preston.webp';
import cristian from '../../../../static/website/team/cristian.webp';
import tom from '../../../../static/website/team/tom.webp';
import joem from '../../../../static/website/team/joem.webp';
import prestonm from '../../../../static/website/team/prestonm.webp';
import cristianm from '../../../../static/website/team/cristianm.webp';
import tomm from '../../../../static/website/team/tomm.webp';
import arrowInactive from '../../../../static/website/news/arrow-down.svg';
import arrowActive from '../../../../static/website/news/arrow-up.svg';


const SectionTeam = (props) => {
  const [tblog, setBlog] = useState({});
  const [activePage, setActivePage] = useState(0)
  const [teamActivePage, setTeamActivePage] = useState(0)  

  const dataq = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              featuredpost
              tags
              featuredimage {
                childImageSharp {
                  fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (typeof(dataq.allMarkdownRemark.edges) !== `undefined`) {
      setBlog(dataq.allMarkdownRemark);
    } else {
      console.log("Error with props in team");
      console.log(dataq);
    }
  }, [dataq]);
  
  const changePage = (index) => {
    setActivePage(index)
  }

  const backPage = () => {
    changePage(activePage == 0 ? 0 : activePage-1) 
  }

  const nextPage = () => {
    let pages = typeof(tblog.edges) !== `undefined` ? Math.ceil(tblog.edges.length / 3) : 0
    //let pages =  Math.ceil(edgesTest.length/3)
    changePage(activePage == pages-1 ? 0 : activePage+1) 
  }

  const titleClass = (titleLength) => {
    return "newsitem-title terciary-header" + 
           (titleLength <= 28 ? " short" : (titleLength <= 56 ? " medium" : ""));
  }

  const changeTeamPage = (index) => {
    setTeamActivePage(index)
  }

  const backTeamPage = () => {
    changeTeamPage(teamActivePage == 0 ? 0 : teamActivePage-1) 
  }

  const nextTeamPage = () => {
    let pages = 3
    changeTeamPage(teamActivePage == pages-1 ? 0 : teamActivePage+1) 
  }

  const RenderTeam = () => {
    const im = '../../../../static/website/team/joe.webp';

    return (
      teamData.map((data, index) => (
        <div className={Math.ceil((index+1) / 4) == teamActivePage+1 ? "team-box" : "team-box hide"}>
          <Flippy
            flipOnHover={true}
            flipOnClick={false}
            flipDirection="horizontal"
          >
            <FrontSide animationDuration="0">
              <>                
                <img src={data.mobile_image} className="team-box-photo-mobile" alt={data.name} />
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
        </div>
      ))
    )
  }

  const RenderTeamPagination = () => {
    let members = teamData.length;
    let pages = Math.ceil(members / 4);
    
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
      <div className={pagClass}>
        <div className="team-pagination-container">
          <button className={backClass} onClick={() => backTeamPage()}>   
            <img className={backImgClass} src={teamActivePage == 0 ? arrowInactive : arrowActive} alt="Back" />                                              
          </button>
            <div className={"items"}> 
              {items.map( (item, index) => (
                <a className={item} onClick={() => changeTeamPage(index)}></a>
              ))}
            </div>
          <button className={nextClass} onClick={() => nextTeamPage()} >                
            <img className={nextImgClass}  src={teamActivePage == pages-1 ? arrowInactive : arrowActive} alt="Next" />                                              
          </button>
        </div>  
      </div>
    )
  }

  const RenderBlog = () => {
    return typeof(tblog.edges) !== `undefined` ? tblog.edges.map (({node}, index) => (
      <div className={Math.ceil((index+1) / 3) == activePage+1 ? "newsitem" : "newsitem hide"} key={node.id}>
        <img src={node.frontmatter.featuredimage.childImageSharp.fluid.src} className="newsitem-photo" alt="News" />
        <div>
          <a href={node.excerpt} rel="noreferrer" target="_blank" className="newsitem-title-link" >
            <div className={titleClass(node.frontmatter.title.length)}>
              {node.frontmatter.title}
            </div>
          </a>
          <div className="newsitem-tag-items">
            <a href={node.excerpt} rel="noreferrer" target="_blank" className="newsitem-tagbox taglink">
              {typeof(node.frontmatter.tags) !== `undefined` ? node.frontmatter.tags.map(tag => {return tag}) : ""}
            </a>
          </div>
          <a href={node.excerpt} rel="noreferrer" target="_blank" className="newsitem-link link">Check it out</a>
        </div>  
      </div>
    )) : <div></div>;
  }

  const RenderPagination = () => {
    let edges = (typeof(tblog.edges) !== `undefined` ? tblog.edges.length : 0)
    let pages = edges > 0 ? Math.ceil(edges / 3) : 0
    let newsLastPage = pages*3 - edges

    let pagClass = "newsbox-pagination"
    if (activePage == pages-1)
      pagClass = "newsbox-pagination" + (newsLastPage == 1 ? " two" : (newsLastPage == 2 ? " one" : "")) 

    let backImgClass = "pag-arrow" + (activePage == 0 ? "" : " active") 
    let nextImgClass = "pag-arrow" + (activePage == pages-1 ? "" : " active") 
    let backClass = "pag-group pag-box back" + (activePage == 0 ? "" : " active") 
    let nextClass = "pag-group pag-box next" + (activePage == pages-1 ? "" : " active") 

    let items = []
    for (let i = 0; i < pages; i++) {
      let iClass = "pag-item" + (activePage == i ? " active" : "")
      items.push(iClass)
    }

    return pages > 1 ?
      <div className={pagClass}>
        <div className="newsbox-pagination-container">
          <button className={backClass} onClick={() => backPage()}>   
            <img className={backImgClass} src={activePage == 0 ? arrowInactive : arrowActive} alt="Back" />                                              
          </button>
            <div className="pag-items"> 
              {items.map( (item, index) => (
                <a className={item} onClick={() => changePage(index)} ></a>
              ))}
            </div>
          <button className={nextClass}  onClick={() => nextPage()}>                
            <img className={nextImgClass}  src={activePage == pages-1 ? arrowInactive : arrowActive} alt="Next" />                                              
          </button>
        </div>  
      </div>
      :
        <div></div>;
  }

  return (
    <>
      <section id="team" className="section-team">
        <div className="team-container">
          <Col xs={12} sm={12} md={12} lg={6} className="members-container">
            <div className="team-title header">
              Team
            </div>
            <div className="team-subtitle content">
              Building the investments of tomorrow, today.
            </div>
            <div className="team-members">
              <div className="team-row row">
                <RenderTeam />                
              </div>           
            </div>
            <RenderTeamPagination />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} className="team-posts">
            <div className="team-divider">
            </div>          
            <div className="newsbox">
              <div className="newsbox-title heading-secondary">Latest Posts</div>
              <div className="newsgroup">    
                <div>
                  <RenderBlog />
                </div>  
                <RenderPagination />        
              </div>                      
          </div>
          </Col>
        </div>  
      </section>
    </>
  )
}

export default SectionTeam