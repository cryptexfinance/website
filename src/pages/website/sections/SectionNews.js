import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Col from "react-bootstrap/esm/Col";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import arrowInactive from "../../../../static/website/news/arrow-down.svg";
import arrowActive from "../../../../static/website/news/arrow-up.svg";
import SearchNews from "../../../components/SearchNews";
import { tagColor } from "../../../components/utils/tags";
import { sortAlpha } from "../../../components/utils/utils";


const SectionNews = (props) => {
  const itemsPerPage = 6;
  const keysDivider = "+++";
  const breakpoints = useBreakpoint();
  const [tblog, setBlog] = useState({});
  const [activePage, setActivePage] = useState(0);
  const [blogKeys, setBlogKeys] = useState([]);
  const [filteredBlogKeys, setFilteredBlogKeys] = useState([]);
  const [tagList, setTagList] = useState([]);

  const dataq = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        limit: 70 
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
    if (typeof (dataq.allMarkdownRemark.edges) !== "undefined") {
      const bKeys = [], tList = [];
      setBlog(dataq.allMarkdownRemark);
      dataq.allMarkdownRemark.edges.map(({ node }) => {
        let tags = "";
        if (Array.isArray(node.frontmatter.tags)) {
          tags = node.frontmatter.tags.join(keysDivider).toLowerCase();
          node.frontmatter.tags.forEach(tag => {
            if (tList.findIndex(item => item.value === tag.toLowerCase()) === -1)
              tList.push({ value: tag.toLowerCase(), label: tag });
          });
        }
        const bkey = [node.frontmatter.title.toLowerCase(), tags].join(keysDivider) + keysDivider;
        bKeys.push(bkey);
      });
      setBlogKeys(bKeys);
      setFilteredBlogKeys(bKeys);
      setTagList(tList.sort(sortAlpha));      
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

  const sliceDescription = (description) => {
    if (description.length < 90)
      return description;
    else
      return description.slice(0, 90) + "...";
  }

  const postUrl = (node) => {
    if (node.excerpt.length < 100 && node.excerpt.includes("https://")) {
      return node.excerpt;
    }
    else {
      return node.fields.slug;
    }
  }

  const NewsItem = (node) => {
    const tags = node.frontmatter.tags.join(keysDivider).toLowerCase() + keysDivider;
    const key = [node.frontmatter.title.toLowerCase(), tags].join(keysDivider);
    const indexOf = filteredBlogKeys.indexOf(key.toLowerCase());
    if (indexOf >= 0) {
      return(
        <div className={Math.ceil((indexOf + 1) / itemsPerPage) == activePage + 1 ? "newsitem" : "newsitem hide"} key={node.id}>
          <a className="imglink" href={postUrl(node)} target="_top" rel="noreferrer">
            <img src={node.frontmatter.featuredimage.childImageSharp.fluid.src} className="newsitem-photo" alt="News" />
          </a>  
          <div className="newsitem-info">
            <div className="newsitem-tag-items">
              {Array.isArray(node.frontmatter.tags) &&     
                node.frontmatter.tags.slice(0,4).map(tag => {
                  const tColor = tagColor(props.tagsColor, tag);
                  return <a
                          rel="noreferrer"
                          className="newsitem-tagbox taglink"
                          style={{ color: tColor, borderColor: tColor }} 
                        >
                          {tag}
                        </a>
                })              
              }
            </div>
            <a href={postUrl(node)} className="newsitem-title-link" >
              <div className={titleClass(node.frontmatter.title.length)}>
                {node.frontmatter.title}
              </div>
            </a>
            <a href={postUrl(node)} className="newsitem-title-link" >
              <p className="newsitem-brief">
                  {sliceDescription(node.frontmatter.description)}              
              </p>
            </a>  
            <a href={postUrl(node)} className="newsitem-link link">Check it out</a>
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
          <SearchNews
            blogKeys={blogKeys}
            setFilteredBlogKeys={setFilteredBlogKeys}
            tagList={tagList}
            setActivePage={setActivePage}
          />
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
