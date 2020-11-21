/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Cryptex Website`,
    author: `Oscar Fonseca`,
    firstName: `Oscar`,
    lastName: `Fonseca`,
    description: `Cryptex Website`,
    occupation: `Software Engineer`,
    keywords: [`Cryptex`, `Blockchain`, `DeFi`, `Ethereum`, `Bitcoin`, `Projects`, `Work`],
    siteUrl:
      process.env.URL || process.env.DEPLOY_URL || `http://localhost:8000`,
    unemployed: true,
  },
  plugins: [
    `gatsby-plugin-preload-link-crossorigin`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "images",
        path: `${__dirname}/static/`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-transformer-remark`,
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
        icon: `${__dirname}/static/favicon.ico`, // This path is relative to the root of the site.
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
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "CRYPTEX",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "price",
        // Url to query from
        url: "https://api.thegraph.com/subgraphs/name/cryptexglobal/tcap-oracle-graph",
        // refetch interval in seconds
        refetchInterval: 60,
      },
    },
  ],
}
