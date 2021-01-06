/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

//  const metaImage = require('./static/website/home/main.webp');

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `TCAP`,
    author: `Luminode | Oscar Fonseca`,
    firstName: `Oscar`,
    lastName: `Fonseca`,
    description: `TCAP is the World&apos;s First Total Cryptocurrency Market Capitalization Token created by Cryptex Finance.`,
    occupation: `Software Engineer`,
    image: `https://raw.githubusercontent.com/cryptexglobal/website/main/static/website/home/main.webp?token=ABGEJ5LMW5N6YYPYLKPLXWS72MKVM`,
    keywords: [
      `Cryptex`,
      `Blockchain`,
      `DeFi`,
      `Ethereum`,
      `Bitcoin`,
      `Projects`,
      `Work`,
    ],
    siteUrl:
      process.env.URL || process.env.DEPLOY_URL || `http://localhost:8000`,
    unemployed: true,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-5PPNHXEBWZ", // Google Analytics / GA          
        ],
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
    `gatsby-plugin-preload-link-crossorigin`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Cryptex Site`,
        short_name: `Cryptex`,
        description: `Crypto | TCAP`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `standalone`,
        icon: `${__dirname}/static/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
        showSpinner: true,
      },
    },
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     // Arbitrary name for the remote schema Query type
    //     typeName: "CRYPTEX",
    //     // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
    //     fieldName: "price",
    //     // Url to query from
    //     url: "https://api.thegraph.com/subgraphs/name/cryptexglobal/tcap-oracle-graph",
    //     // refetch interval in seconds
    //     refetchInterval: 10,
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-apollo',
    //   options: {
    //     uri: 'https://api.thegraph.com/subgraphs/name/cryptexglobal/tcap-oracle-graph'
    //   }
    // },
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://finance.us2.list-manage.com/subscribe/post?u=7bc366d2c0af3bd7b71582974&amp;id=6c20752368", // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },        
  ],
}
