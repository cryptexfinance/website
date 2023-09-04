import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ description, lang, meta, image: img, title, pathname }) => {
  const { site } = useStaticQuery(query)

  const metaDescription = description || site.siteMetadata.description
  //  const image = img && img.src ? `${site.siteMetadata.siteUrl}${img.src}` : null

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : "https://cryptex.finance/"

  const links = [
    { rel: `canonical`, href: canonical },
    { rel: `icon`, href: `${site.siteMetadata.siteUrl}/favicon.ico` },
    { rel: `apple-touch-icon`, href: `${site.siteMetadata.siteUrl}/cryptex512.png` },
    { rel: `apple-touch-icon`, sizes: "256x256", href: `${site.siteMetadata.siteUrl}/cryptex256.png` },
    { rel: `apple-touch-icon`, sizes: "128x128", href: `${site.siteMetadata.siteUrl}/crytpex128.png` },
    { rel: `apple-touch-icon`, sizes: "64x64", href: `${site.siteMetadata.siteUrl}/crytpex64.png` },
    { rel: `apple-touch-icon`, sizes: "32x32", href: `${site.siteMetadata.siteUrl}/crytpex32.png` },
  ];

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={site.siteMetadata.title}
      link={links}
      meta={[
        { name: "description", content: metaDescription },
        { name: "keywords", content: site.siteMetadata.keywords.join(`,`) },
        { property: "og:site_name", content: "Cryptex Finance." },
        { property: "og:title", content: "Cryptex Finance" },
        { property: "og:description", content: metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        {
          property: "og:image",
          content: "https://cryptex-public-images.s3.us-east-2.amazonaws.com/cryptexv2-min.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@CryptexFinance" },
        { name: "twitter:title", content: "Cryptex Finance" },
        { name: "twitter:description", content: metaDescription },
        {
          name: "twitter:image",
          content: "https://cryptex-public-images.s3.us-east-2.amazonaws.com/cryptexv2-min.png",
        },        
      ].concat(meta)}
    />
  )
}

export default Seo;

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  pathname: PropTypes.string,
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        description
        keywords
        siteUrl
      }
    }
  }
`
