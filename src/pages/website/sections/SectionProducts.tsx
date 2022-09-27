import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";

type ProductType = {
  id: string;
  title: string;
  subtitle: string;
  link: string;
}

/* const products = [
  {
    id: "tcap",
    title: "TCAP",
    subtitle: "Real time exposure to the crypto market.",
    link: "/tcap"
  },
  {
    id: "jpegz",
    title: "JPEGZ",
    subtitle: "Real time exposure to the NFT market.",
    link: "/nft"
  }
] */

const SectionProducts = () => {
  const [siteUrl, setSiteUrl] = useState("");
  const dataq = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }`);
  
  useEffect(() => {
    if (typeof (dataq.site) !== "undefined") {
      setSiteUrl(dataq.site.siteMetadata.siteUrl)
    } else {
      console.log("Error with props in team");
    }
  }, [dataq]);
  
  /* const item = (product: ProductType) => (
    <a
      key={product.id}
      href={siteUrl.concat(product.link)}
      rel="noreferrer"
      className="box box-button products-item"
    >
      <div className="products-info">
        <h2 className="heading-secondary">
          {product.title}
        </h2>
        <p className="subtitle">
          {product.subtitle}
        </p>
      </div>
      <div className="products-link">
        {product.id === "tcap" ?
          (
            <a
              className="link"
              href={siteUrl.concat(product.link)}
              rel="noreferrer"
            >
              Learn More
            </a>
          ) : (
            <a className="link inactive">Coming Soon</a>
          )}
      </div>
    </a>
  ); */

  return (
    <div id="solutions" className="section-products">
      <h1 className="header">
        Index Tokens
      </h1>
      <div className="products">
        <a
          href={siteUrl.concat("/tcap")}
          rel="noreferrer"
          className="box box-button products-item"
        >
          <div className="products-info">
            <h2 className="heading-secondary">
              TCAP
            </h2>
            <p className="subtitle">
              Real time exposure to total crypto market capitalization.
            </p>
          </div>
          <div className="products-link">
            <a
              className="link"
              href={siteUrl.concat("/tcap")}
              rel="noreferrer"
            >
              Learn More
            </a>
          </div>
        </a>
        <div className="box box-button products-item">
          <div className="products-info">
            <h2 className="heading-secondary">
              JPEGz
            </h2>
            <p className="subtitle">
              Real time exposure to NFT market capitalization.
            </p>
          </div>
          <div className="products-link">
            <a className="link inactive">Coming Soon</a>
          </div>
        </div>
      </div>
    </div>    
  );
};

export default SectionProducts; 
