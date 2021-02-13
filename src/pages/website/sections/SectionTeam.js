import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
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
  const [edgesTest, setEdgesTest] = useState([])

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


  const RenderBlog = () => {
    return typeof(tblog.edges) !== `undefined` ? tblog.edges.map (({node}, index) => (
      <div className={Math.ceil((index+1) / 3)  == activePage+1 ? "newsitem " : "newsitem hide"} key={node.id}>
        <img src={node.frontmatter.featuredimage.childImageSharp.fluid.src} className="newsitem-photo" alt="News" />
        <div className="newsitem-title terciary-header">{node.frontmatter.title}</div>
        
        <div className="newsitem-tag-items">
          <a href={node.excerpt} rel="noreferrer" target="_blank" className="newsitem-tagbox taglink">
            {typeof(node.frontmatter.tags) !== `undefined` ? node.frontmatter.tags.map(tag => {return tag}) : ""}
          </a>
        </div>
        <a href={node.excerpt} rel="noreferrer" target="_blank" className="newsitem-link link">Check it out</a>
      </div>
    )) : <div></div>;
  }

  const RenderBlogTest = () => {
    return edgesTest.map ((node, index) => (

      <div className={Math.ceil((index+1) / 3)  == activePage+1 ? "newsitem " : "newsitem hide"} key={node.id}>
        <img src={node.src} className="newsitem-photo" alt="News" />
        <div className="newsitem-title terciary-header">{node.title}</div>
        
        <div className="newsitem-tag-items">
          <a rel="noreferrer" target="_blank" className="newsitem-tagbox taglink">            
          </a>
        </div>
        <a rel="noreferrer" target="_blank" className="newsitem-link link">Check it out</a>
      </div>
    ));
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

    let itemsClass = ["pag-items", "pag-items", "pag-items three", "pag-items four", "pag-items five"]
    let itemClass = ["pag-item", "pag-item second", "pag-item third", "pag-item fourth", "pag-item fifth"]
    let items = []
    for (let i = 0; i < pages; i++) {
      let iClass = itemClass[i] + (activePage == i ? " active" : "")
      items.push(iClass)
    }

    return pages > 1 ?
      <div className={pagClass}>
        <button className={backClass} onClick={() => backPage()}>   
          <img className={backImgClass} src={activePage == 0 ? arrowInactive : arrowActive} alt="Back" />                                              
        </button>
          <div className={itemsClass[pages-1]}> 
            {items.map( (item, index) => (
              <a className={item} onClick={() => changePage(index)} ></a>
            ))}
          </div>
        <button className={nextClass}  onClick={() => nextPage()}>                
          <img className={nextImgClass}  src={activePage == pages-1 ? arrowInactive : arrowActive} alt="Next" />                                              
        </button>
      </div>
      :
        <div></div>;
  }

  return (
    <>
      <section id="team" className="section-team">
        <div className="row">
          <div className="team-title header">
            Team
          </div>
          <div className="team-subtitle content">
            Building the investments of tomorrow, today.
          </div>
          <div className="team-row row">
            <div className="team-box">
              <Flippy
                  flipOnHover={true} 
                  flipOnClick={false}
                  flipDirection="horizontal" 
                >
                  <FrontSide animationDuration="0">
                  <>
                    <img src={joem} className="team-box-photo-mobile" alt="Joseph Sticoo" /> 
                    <img src={joe} className="team-box-photo" alt="Joseph Sticoo" />        
                  </>              
                  <p className="team-box-name">Joe Sticco</p>
                  <p className="team-box-position">Co-Founder &amp; CEO</p>
                </FrontSide>
                <BackSide animationDuration="0">
                  <p className="team-box-name">Joe Sticco</p>
                  <p className="team-box-description">A lifelong trader and investment manager, Joseph brings immense knowledge of traditional market structure to the project. He founded Cryptex Finance with the vision of combining Wall Street with world class blockchain development in building state of the art investment solutions for tomorrow.</p>
               </BackSide>
              </Flippy>
            </div>
            <div className="team-box">
              <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                >
                <FrontSide animationDuration="0">
                  <>
                    <img src={prestonm} className="team-box-photo-mobile" alt="Preston Van Loon" /> 
                    <img src={preston} className="team-box-photo" alt="Preston Van Loon" />
                  </> 
                  <p className="team-box-name">Preston Van Loon</p>
                  <p className="team-box-position">Co-Founder &amp; Blockchain Lead</p>
                </FrontSide>
                <BackSide animationDuration="0">
                  <p className="team-box-name">Preston Van Loon</p>
                  <p className="team-box-description">Preston is CEO and co-founder of Prysmatic Labs and leads a team of dedicated blockchain developers in building critical layer one scaling solutions for Ethereum 2.0. Since January 2018, Preston and team have received nearly $2MM in grant funding to pursue these efforts from the Ethereum Foundation, Vitalik Buterin, Ethereum Community Fund, and many other community members. </p>
                </BackSide>
              </Flippy>
            </div>
            <div className="team-box">
              <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                >
                <FrontSide animationDuration="0">
                  <>
                    <img src={cristianm} className="team-box-photo-mobile" alt="Cristian Espinoza" />
                    <img src={cristian} className="team-box-photo" alt="Cristian Espinoza" />
                  </>
                  <p className="team-box-name">Cristian Espinoza</p>
                  <p className="team-box-position">Blockchain Developer</p>
                </FrontSide>
                <BackSide animationDuration="0">
                  <p className="team-box-name">Cristian Espinoza</p>
                  <p className="team-box-description">Smart Contract Developer certified by ConsenSys, Coffee Lover & Prev. Devcon Scholar at Ethereum Foundation. Leader of the Honduras Ethereum Community.</p>
                </BackSide>
              </Flippy>
            </div>
            <div className="team-box">
              <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                >
                <FrontSide animationDuration="0">
                  <>
                    <img src={tomm} className="team-box-photo-mobile" alt="Thomas Matzner" />
                    <img src={tom} className="team-box-photo" alt="Thomas Matzner" />
                  </>
                  <p className="team-box-name">Thomas Matzner</p>
                  <p className="team-box-position">Co-Founder &amp; CBO</p>
                </FrontSide>
                <BackSide animationDuration="0">
                  <p className="team-box-name">Thomas Matzner</p>
                  <p className="team-box-description">Thomas has led planning, branding and marketing initiatives at world class companies and startups. He has taken high volume and celebrity endorsed products from concept to launch with an omnichannel strategy. Thomas' passion is building brands with bold visions of leaving a legacy.</p>
                </BackSide>
              </Flippy>
            </div>
          </div>

          <div className="team-divider">
          </div>
          
          <div className="newsbox">
            <div className="newsbox-title heading-secondary">Latest Posts</div>
            <div className="newsgroup">    
              <RenderBlog />    
              <RenderPagination />        
            </div>                      
          </div>
        </div>
      </section>
    </>
  )
}

export default SectionTeam