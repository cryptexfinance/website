/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

//  const metaImage = require('./static/website/home/main.webp');

const CustomMediaQueries = {
  xs: "(max-width: 320px)",
  smm: "(max-width: 600px)",
  sm: "(max-width: 720px)",
  smmin: "(min-width: 721px)",
  mdesp: "(max-width: 800px)",
  md: "(max-width: 1024px)",
  mdmin: "(min-width: 1025px)",
  l: "(max-width: 1536px)",
  xl: "(max-width: 2000px)",
  portrait: "(orientation: portrait)",
};

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "TCAP - By Cryptex Finance",
    author: "Cryptex Finance",
    description: "TCAP is the World's First Total Cryptocurrency Market Capitalization Token created by Cryptex Finance.",
    image: "https://raw.githubusercontent.com/cryptexglobal/website/main/static/website/home/main.webp",
    keywords: [
      "Cryptex",
      "Blockchain",
      "DeFi",
      "Ethereum",
      "Bitcoin",
      "Projects",
      "Work",
      "TCAP",
    ],
    siteUrl:
      process.env.URL || process.env.DEPLOY_URL || "http://localhost:8000",
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
    "gatsby-plugin-preload-link-crossorigin",
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
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
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
      resolve: "gatsby-plugin-breakpoints",
      options: {
        queries: CustomMediaQueries,
      },
    },
  ],
}
