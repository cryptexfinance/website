import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import Col from "react-bootstrap/esm/Col";
import { graphql, StaticQuery } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import PropTypes from "prop-types"
import SearchNews from "./SearchNews"
import { tagColor } from "./utils/tags"
import { sortAlpha } from "./utils/utils"


export const BlogRoll = ({ data }) => {
  const { t } = useTranslation()
  const itemsPerPage = 9
  const keysDivider = "+++"
  const [postsCount, setPostsCount] = useState(itemsPerPage)
  const [tags, setTags] = useState([])
  const [posts, setPosts] = useState([])
  const [blogKeys, setBlogKeys] = useState([])
  const [filteredBlogKeys, setFilteredBlogKeys] = useState([])
  const [tagList, setTagList] = useState([])

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

        return 0;
      });
      setBlogKeys(bKeys);
      setFilteredBlogKeys(bKeys);
      setTagList(tList.sort(sortAlpha));
    } else {
      console.log("Error with props in team");
    }

    if (Array.isArray(data.tags)) {
      const t = [];
      data.tags.map(({ node }) => {
        t.push({
          name: node.frontmatter.tag,
          color: node.frontmatter.color
        })
        return 0;
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
    if (description.length < 200)
      return description;
    else
      return description.slice(0, 120) + "...";
  }

  const PostItem = ({ node }) => {
    const postTags = node.frontmatter.tags.join(keysDivider).toLowerCase() + keysDivider;
    const key = [node.frontmatter.title.toLowerCase(), postTags].join(keysDivider);
    const indexOf = filteredBlogKeys.indexOf(key.toLowerCase());
    let className = "post-item";
    if (indexOf >= postsCount) {
      className = "post-item hide";
    }

    if (indexOf >= 0) {
      return (
        <div key={key} className={className}>
          <div className="post-img-container">
            <img
              src={node.frontmatter.featuredimage.childImageSharp.fluid.src}
              className="post-item-image"
              alt="Cryptex Post "
            />
          </div>
          <div className="info-container">
            <div className="post-item-content">
              <div className="tag-items">
                {Array.isArray(node.frontmatter.tags) &&
                  node.frontmatter.tags.slice(0, 5).map(tag => {
                    const tColor = tagColor(tags, tag);
                    return (
                      <span
                        className="post-tagbox taglink"
                        style={{ color: tColor, borderColor: tColor }}
                      >
                        {tag}
                      </span>
                    )
                  })
                }
              </div>
              <div className="title">
                <a href={postUrl(node)}>{node.frontmatter.title}</a>
              </div>
              <div className="excerpt">
                <p>
                  {sliceDescription(node.frontmatter.description)}
                </p>  
              </div>
            </div>
            <div className="post-item-footer">
              <a href={postUrl(node)} className="post-item-link">
                Check it out
              </a>
            </div>
          </div>  
        </div>
      );
    }
    return <></>;
  };

  const onLoadMoreClick = () => {
    let pc = postsCount + itemsPerPage;
    if (pc > filteredBlogKeys.length) { 
      pc = filteredBlogKeys.length;
    }
    setPostsCount(pc);
  };
 
  return (
    <div className="blogroll">
      <Col md={12} lg={12} className="search-content">
        <SearchNews
          blogKeys={blogKeys}
          setFilteredBlogKeys={setFilteredBlogKeys}
          tagList={tagList}
          setPostsCount={setPostsCount}
        />
      </Col>
      <Col md={12} lg={12} className="posts">
        {posts.map(({ node }) => (
           <PostItem node={node} />
          )
        )}
      </Col>
      <Col md={12} lg={12} className="pagination">
        {postsCount < filteredBlogKeys.length && (
          <Button
            className="button-dark"
            variant="secondary"
            onClick={onLoadMoreClick}
          >
            {t('load-more')}
          </Button>
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
