import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import SearchNews from "./SearchNews";
import { tagColor } from "./utils/tags";
import { sortAlpha } from "./utils/utils";


export const BlogRoll = ({ data }) => {
  const keysDivider = "+++";
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const breakpoints = useBreakpoint();
  const [activePage, setActivePage] = useState(0);
  const [blogKeys, setBlogKeys] = useState([]);
  const [filteredBlogKeys, setFilteredBlogKeys] = useState([]);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    if (Array.isArray(data.news.edges)) {
      const bKeys = [], tList = [];
      setPosts(data.news.edges);
      data.news.edges.map(({ node }) => {
        let postTags = "";
        if (Array.isArray(node.frontmatter.tags)) {
          postTags = node.frontmatter.tags.join(keysDivider).toLowerCase();
          node.frontmatter.tags.forEach(tag => {
            if (tList.findIndex(item => item.value === tag.toLowerCase()) === -1)
              tList.push({ value: postTags.toLowerCase(), label: tag });
          });
        }
        const bkey = [node.frontmatter.title.toLowerCase(), postTags].join(keysDivider) + keysDivider;
        bKeys.push(bkey);
      });
      setBlogKeys(bKeys);
      setFilteredBlogKeys(bKeys);
      setTagList(tList.sort(sortAlpha));
    } else {
      console.log("Error with props in team");
    }

    if (Array.isArray(data.tags)) {
      console.log("Entra aqui ---------------");
      const t = [];
      data.tags.map(({ node }) => {
        t.push({
          name: node.frontmatter.tag,
          color: node.frontmatter.color
        })
      });
      setTags(t);
    }
  }, [data]);

  const postUrl = (node) => {
    if (node.excerpt.length < 100 && node.excerpt.includes("https://")) {
      return node.excerpt;
    }
    else {
      return node.fields.slug;
    }
  }

  const sliceDescription = (description) => {
    if (description.length < 300)
      return description;
    else
      return description.slice(0, 300) + "...";
  }

  const NewsItem = ({ node }) => {
    const postTags = node.frontmatter.tags.join(keysDivider).toLowerCase() + keysDivider;
    const key = [node.frontmatter.title.toLowerCase(), postTags].join(keysDivider);
    const indexOf = filteredBlogKeys.indexOf(key.toLowerCase());
    if (indexOf >= 0) {
      return (
        <Col xs={12} md={6} lg={6} className={"newsitem"}>
          <a href={postUrl(node)} target="_top" rel="noreferrer">
            <img src={node.frontmatter.featuredimage.childImageSharp.fluid.src} className="newsitem-photo" alt="News" />
          </a>
          <div className="newsitem-info">
            <div className="newsitem-tag-items">
              {Array.isArray(node.frontmatter.tags) &&
                node.frontmatter.tags.slice(0, 5).map(tag => {
                  const tColor = tagColor(tags, tag);;
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
              <div className="newsitem-title terciary-header">
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
        </Col>
      );
    }
    return <></>;
  };

  return (
    <div className="blogroll">
      <Col md={12} lg={12} className="search-content">
        <SearchNews
          blogKeys={blogKeys}
          setFilteredBlogKeys={setFilteredBlogKeys}
          tagList={tagList}
          setActivePage={setActivePage}
        />
      </Col>
      <Col md={12} lg={12} className="news">
        {posts.map(({ node }) => (
           <NewsItem node={node} />
          )
        )}
      </Col>  
    </div>
  )
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        news: allMarkdownRemark(
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
        },
        tags: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-tag" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              frontmatter {
                tag
                color  
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)