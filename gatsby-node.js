const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    let index = 0;
    posts.forEach((edge) => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          index
        },
      })
      index++;
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions

  createFieldExtension({
    name: 'fileByDataPath',
    extend: () => ({
      resolve: function (src, args, context, info) {
        const partialPath = src.featureImage
          if (!partialPath) {
            return null
          }

        const filePath = path.join(__dirname, 'src/data', partialPath)
        const fileNode = context.nodeModel.runQuery({
          firstOnly: true,
          type: 'File',
          query: {
            filter: {
              absolutePath: {
                eq: filePath
              }
            }
          }
        })

        if (!fileNode) {
          return null
        }

        return fileNode
      }
    })
  })

  const typeDefs = `
    type Frontmatter @infer {
      featureImage: File @fileByDataPath
    }

    type MarkdownRemark implements Node @infer {
      frontmatter: Frontmatter
    }
  `

  createTypes(typeDefs)
}