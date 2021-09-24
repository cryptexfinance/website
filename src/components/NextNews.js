import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Col from "react-bootstrap/esm/Col";
import { tagColor } from "./utils/tags";

const NextNews = (props) => {
  const [tblog, setBlog] = useState({});

  const dataq = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        limit: 42 
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
    if (typeof (dataq.allMarkdownRemark) !== "undefined" &&
          typeof (dataq.allMarkdownRemark.edges) !== "undefined") {
      setBlog(dataq.allMarkdownRemark);
    } else {
      console.log("Error with props in team");
      console.log(dataq);
    }
  }, [dataq]);
  
  const titleClass = (titleLength) => {
    return "newsitem-title terciary-header" + 
           (titleLength <= 28 ? " short" : (titleLength <= 56 ? " medium" : ""));
  }

  const postUrl = (node) => {
    if (node.excerpt.length < 100 && node.excerpt.includes("https://")) {
      return node.excerpt;
    }
    else {
      return node.fields.slug;
    }
  }

  const NewsItem = (node, index) => {
    if (index > props.postIndex && index <= props.postIndex + 4)
      return (
        <div className={"newsitem"} key={node.id}>
          <a href={postUrl(node)} target="_top" rel="noreferrer" className="newsitem-title-link" >
            <img src={node.frontmatter.featuredimage.childImageSharp.fluid.src} className="newsitem-photo" alt="News" />
          </a>  
          <div className="newsitem-info">
            <div className="newsitem-tag-items">
              {Array.isArray(node.frontmatter.tags) &&
                node.frontmatter.tags.slice(0, 2).map(tag => {
                  const tColor = tagColor(tag);  
                  return <a
                            className="newsitem-tagbox taglink"
                            style={{ color: tColor, borderColor: tColor }}
                          >
                            {tag}
                          </a>
                })
              }
            </div>
            <a href={postUrl(node)} target="_top"  rel="noreferrer" className="newsitem-title-link" >
              <div className={titleClass(node.frontmatter.title.length)}>
                {node.frontmatter.title}
              </div>
            </a>
            <a href={postUrl(node)} target="_top" rel="noreferrer" className="newsitem-link link">Check it out</a>
          </div>
        </div>
      );
    else
      return null;
  }  
    
  const News = () => {
    return typeof (tblog.edges) !== `undefined` ?
      tblog.edges.map(({ node }, index) => (
         NewsItem(node, index)
      ))
    :
      <div></div>;
  } 
    
  return (
    <>
      <Col id="next-news" sm={12} md={12} lg={4} className="next-news">
        <div className="next-newsbox">
          <div className="next-news-title heading-secondary">Read Next</div>
          <News />
        </div>
      </Col>
    </>
  )
}

export default NextNews;