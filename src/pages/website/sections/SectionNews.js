import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Col from "react-bootstrap/esm/Col";
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import arrowInactive from '../../../../static/website/news/arrow-down.svg';
import arrowActive from '../../../../static/website/news/arrow-up.svg';


const SectionNews = (props) => {
  const itemsPerPage = 6;
  const breakpoints = useBreakpoint();
  const [tblog, setBlog] = useState({});
  const [activePage, setActivePage] = useState(0);
  const [blogKeys, setBlogKeys] = useState([]);
  const [filteredBlogKeys, setFilteredBlogKeys] = useState([]);
  const [search, setSearch] = useState();

  const dataq = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        limit: 21 
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
              description
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
    if (typeof (dataq.allMarkdownRemark.edges) !== `undefined`) {
      const bKeys = [];
      setBlog(dataq.allMarkdownRemark);
      dataq.allMarkdownRemark.edges.map(({ node }) => {
        const tags = node.frontmatter.tags.join("+++").toLowerCase();
        const bkey = [node.frontmatter.title.toLowerCase(), tags].join("+++");
        bKeys.push(bkey); 
      });
      setBlogKeys(bKeys);
      setFilteredBlogKeys(bKeys);
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
    let pages = typeof (tblog.edges) !== `undefined` ? Math.ceil(tblog.edges.length / itemsPerPage) : 0;
    changePage(activePage == pages - 1 ? 0 : activePage + 1);
  }

  const titleClass = (titleLength) => {
    return "newsitem-title terciary-header" + 
           (titleLength <= 28 ? " short" : (titleLength <= 56 ? " medium" : ""));
  }

  const onSearchChange = (criteria) => {
    setActivePage(0);
    const filterKeys = blogKeys.filter(key => key.includes(criteria.toLowerCase()));
    setFilteredBlogKeys(filterKeys);
  }

  const sliceDescription = (description) => {
    if (description.length < 90)
      return description;
    else
      return description.slice(0, 90) + "...";
  }

  const NewsItem = (node) => {
    const tags = node.frontmatter.tags.join("+++").toLowerCase();
    const key = [node.frontmatter.title.toLowerCase(), tags].join("+++");
    const indexOf = filteredBlogKeys.indexOf(key.toLowerCase());
    if (indexOf >= 0) {
      return(
        <div className={Math.ceil((indexOf + 1) / itemsPerPage) == activePage + 1 ? "newsitem" : "newsitem hide"} key={node.id}>
          <img src={node.frontmatter.featuredimage.childImageSharp.fluid.src} className="newsitem-photo" alt="News" />
          <div className="newsitem-info">
            <div className="newsitem-tag-items">
              <a href={node.excerpt} rel="noreferrer" target="_blank" className="newsitem-tagbox taglink">
                {typeof (node.frontmatter.tags) !== `undefined` ? node.frontmatter.tags.map(tag => { return tag }) : ""}
              </a>
            </div>
            <a href={node.excerpt} rel="noreferrer" target="_blank" className="newsitem-title-link" >
              <div className={titleClass(node.frontmatter.title.length)}>
                {node.frontmatter.title}
              </div>
            </a>
            <p className="newsitem-brief">
              {sliceDescription(node.frontmatter.description)}
            </p>
            <a href={node.excerpt} rel="noreferrer" target="_blank" className="newsitem-link link">Check it out</a>
          </div>
        </div>
      )
    }
  }

  const News = () => {
    return typeof (tblog.edges) !== `undefined` ?
      tblog.edges.map(({ node }, index) => (
        NewsItem(node)
      ))
    :
      <div></div>;
  }

  const Pagination = () => {
    let edges = (typeof(tblog.edges) !== `undefined` ? filteredBlogKeys.length : 0)
    let pages = edges > 0 ? Math.ceil(edges / itemsPerPage) : 0
    let newsLastPage = pages*itemsPerPage - edges

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
      <section id="news" className="section-news">
        <div className="newsbox-title heading-secondary">News</div>
        <Col sm={12} md={8} lg={8} className="newsbox-subtitle content">
          Building the investments of tomorrow, today.
        </Col>  
        <div className="newsbox-inputs">
          <FaSearch />
          <input id="news-search" value={search} onChange={(e) => onSearchChange(e.target.value)} className="newsbox-search" placeholder="Search" />
          
          {!breakpoints.mdesp && <Pagination />}
        </div>
        <div className="news-container">
          <div className="newsbox">
            <News />
          </div>
          {breakpoints.mdesp && <Pagination />}
        </div>  
      </section>
    </>
  )
}

export default SectionNews;