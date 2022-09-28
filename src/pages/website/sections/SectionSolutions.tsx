import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import tcapImg from "../../../../static/website/solutions/tcap.png";
import jpegzImg from "../../../../static/website/solutions/jpegz.png";


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
    <div id="solutions" className="section-solutions">
      <h1 className="header">
        Index Tokens
      </h1>
      <div className="solutions">
        <a
          href={siteUrl.concat("/tcap")}
          rel="noreferrer"
          className="box box-button solutions-item"
        >
          <div className="solutions-info">
            <h2 className="heading-secondary">
              TCAP
            </h2>
            <p className="subtitle">
              Real time exposure to total crypto market capitalization.
            </p>
            <div className="solution-img-container">
              <img
                src={tcapImg}
                className="solution-img"
                alt="TCAP"
              />
            </div>  
          </div>
          <div className="solutions-link">
            <a
              className="link"
              href={siteUrl.concat("/tcap")}
              rel="noreferrer"
            >
              Learn More
            </a>
          </div>
        </a>
        <div className="box box-button solutions-item">
          <div className="solutions-info">
            <h2 className="heading-secondary">
              JPEGz
            </h2>
            <p className="subtitle">
              Real time exposure to NFT market capitalization.
            </p>
            <div className="solution-img-container">
              <img
                src={jpegzImg}
                className="solution-img"
                alt="JPEGz"
              />
            </div>
          </div>
          <div className="solutions-link">
            <a className="link inactive">Coming Soon</a>
          </div>
        </div>
      </div>
    </div>    
  );
};

export default SectionProducts; 
