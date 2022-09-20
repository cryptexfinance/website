import React from "react";
import Col from "react-bootstrap/esm/Col";
import appEndpoint from "../../../endpoint";
import bg from "../../../../static/bg.webp";
import bgvideo from "../../../../static/bg_main.mp4";

const SectionMain = () => {

  return ( 
    <div className="section-main">
      <video
        playsInline
        autoPlay
        loop
        muted
        poster={bg}
        className="video"
        id="bgvid"
      >
        <source src={bgvideo} type="video/mp4" />
      </video>
      <div className="main-container">
        <div className="main-info">
          <div className="main-title">
            <h3>
              Cryptex Finance
            </h3>
          </div>
          <p className="subheader">
            Innovative, Secure, Collateralized, Trustless and Decentralized Index Tokens
          </p>
        </div>
        <div className="main-buttons">
          <Col sm={12} md={12} lg={12} className="main-buttons-actions">
            <div className="button-to-app">
              <a
                href={appEndpoint}
                rel="noopener noreferrer"
                className="button-pink main-button main-button-link"
                target="_blank"
              >
                Go to App
              </a>
            </div>
            <div className="button-learn-more">
              <a
                href="/#products"
                rel="noopener noreferrer"
                className="button-dark main-button main-button-link"
              >
                Learn More
              </a>
            </div>
          </Col>
        </div>
      </div>
    </div>
  )
}

export default SectionMain;
