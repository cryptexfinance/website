import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Col from "react-bootstrap/esm/Col"
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"
import Header from "../components/Header"
import NextNews from "../components/NextNews"
import ShareSocial from "../components/ShareSocial"
import { tagColor } from "../components/utils/tags"

export const BlogPostTemplate = ({
  postIndex,
  content,
  contentComponent,
  tags,
  title,
  author,
  date,
  helmet,
  slug,
  tagsColorAll,
}) => {
  const PostContent = contentComponent || Content
  const [tagsColor, setTagsColor] = useState([])

  useEffect(() => {
    if (typeof tagsColorAll.edges !== "undefined") {
      const tags = []
      tagsColorAll.edges.map(({ node }) => {
        tags.push({ name: node.frontmatter.tag, color: node.frontmatter.color })
        return 0
      })
      setTagsColor(tags)
    }
  }, [tagsColorAll.edges])

  return (
    <section id="news" className="section-blogpost">
      <Col sm={12} md={12} lg={8} className="post">
        {tags && tags.length ? (
          <div className="tags">
            {tags.map(tag => {
              const tColor = tagColor(tagsColor, tag)
              return (
                <span
                  className="tagbox"
                  style={{ color: tColor, borderColor: tColor }}
                >
                  {tag}
                </span>
              )
            })}
          </div>
        ) : null}
        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
          {title}
        </h1>
        <h6 className="post-date">
          {date} | {author}
        </h6>
        <PostContent content={content} />
        <ShareSocial title={title} shareSlug={slug} tags={tags} />
      </Col>
      <NextNews postIndex={postIndex} tagsColor={tagsColor} />
    </section>
  )
}

BlogPostTemplate.propTypes = {
  postIndex: PropTypes.number,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  slug: PropTypes.string,
}

const BlogPost = ({ data, pageContext }) => {
  const { markdownRemark: post } = data
  const { allMarkdownRemark: tagsColor } = data

  return (
    <Layout>
      <header id="home">
        <Header blogPost={true} />
      </header>
      <BlogPostTemplate
        postIndex={pageContext.index}
        content={post.html}
        contentComponent={HTMLContent}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        author={post.frontmatter.author}
        date={post.frontmatter.date}
        slug={post.fields.slug}
        tagsColorAll={tagsColor}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(
      id: { eq: $id }
      frontmatter: { templateKey: { eq: "blog-post" } }
    ) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
        description
        tags
      }
    }
    allMarkdownRemark(
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
`
