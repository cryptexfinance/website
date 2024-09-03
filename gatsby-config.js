/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

if (process.env.NODE_ENV === "development") {
  require("dotenv").config({
    path: `.env`,
  }) 
} else {
  require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  }) 
}

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Cryptex Finance",
    author: "Cryptex Finance",
    description: "Decentralized platform providing cutting edge markets.",
    image: "https://cryptex-public-images.s3.us-east-2.amazonaws.com/cryptex_cutting-edge-markets.png",
    keywords: [
      "Cryptex",
      "Blockchain",
      "DeFi",
      "Ethereum",
      "Bitcoin",
      "Projects",
      "Work",
      "TCAP",
      "Perpetuals"
    ],
    siteUrl:
      process.env.SITE_URL || process.env.DEPLOY_URL || "http://localhost:8000",
  },
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-5PPNHXEBWZ", // Google Analytics / GA
        ],
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/pages/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/pages/tags`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    "gatsby-plugin-catch-links",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              path: `${__dirname}/static/img`,
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
        showSpinner: true,
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://finance.us1.list-manage.com/subscribe/post?u=1cb08bbc3427b6daa4cc0ba8e&amp;id=7e4519bdcf", // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                image
              }
            }
          }
        `,
        feeds: [
          {
            title: "Cryptex Finance News Feed",
            feed_url: "https://cryptex.finance/news-rss.xml",
            site_url: "https://cryptex.finance",
            image_url:
              "https://raw.githubusercontent.com/cryptexglobal/website/main/static/website/home/main.webp",
            output: "news-rss.xml",
            query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
              ) {
                nodes {
                  id
                  excerpt(pruneLength: 400)
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    author
                    description
                    templateKey
                    date(formatString: "MMMM DD, YYYY")
                    tags
                    featuredimage {
                      childImageSharp {
                        fluid(maxWidth: 600) {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
            `,
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign(
                  {},
                  {
                    title: node.frontmatter.title,
                    description: node.frontmatter.description,
                    author: node.frontmatter.author,
                    date: node.frontmatter.date,
                    url: `${site.siteMetadata.siteUrl}${node.fields.slug}`,
                    guid: `${site.siteMetadata.siteUrl}${node.fields.slug}`,
                    custom_elements: [
                      { tags: node.frontmatter.tags.join(",") },
                      {
                        image_url: `${site.siteMetadata.siteUrl}${node.frontmatter.featuredimage.childImageSharp.fluid.src}`,
                      },
                      { "content:encoded": node.html },
                    ],
                  }
                )
              })
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: ['en', 'es', 'pt', 'tr'],
        defaultLanguage: 'en',
        siteUrl: 'https://cryptex.finance',
        // if you are using trailingSlash gatsby config include it here, as well (the default is 'always')
        trailingSlash: 'always',
        // you can pass any i18next options
        i18nextOptions: {
          interpolation: {
            escapeValue: false // not needed for react as it escapes by default
          },
          nsSeparator: false
        },
        pages: [
          {
            matchPath: '/:lang?/blog/:uid',
            getLanguageFromPath: true
          },
        ]
      }
    }
  ],
}
