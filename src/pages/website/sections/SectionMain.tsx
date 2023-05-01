import React from "react";
import Col from "react-bootstrap/esm/Col";
import appEndpoint from "../../../endpoint";
import bgvideo from "../../../../static/bg_main.mp4";
import bgvideowebm from "../../../../static/bg_main.webm";

const SectionMain = () => (
  <div className="section-main">
    <video
      playsInline
      autoPlay
      loop
      muted
      poster={bgvideo}
      className="video"
      id="bgvid"
    >
      <source src={bgvideowebm} type="video/webm" />
      <source src={bgvideo} type="video/mp4" />
    </video>
    <div className="main-container">
      <div className="main-info">
        <div className="main-title">
          <h1>
            This Copy Will Change
          </h1>
        </div>
        <p className="home-subheader">
          This Copy Will Change
        </p>
      </div>
      <div className="main-buttons">
        <Col sm={12} md={12} lg={12} className="main-buttons-actions">
          <div className="button-to-app">
            <a
              href={appEndpoint}
              rel="noopener noreferrer"
              className="button-outlined-purple main-button main-button-link"
              target="_blank"
            >
              Trade
            </a>
          </div>
          <div className="">
            <a
              href="https://cryptexfinance.notion.site/Cryptex-Finance-Wiki-9f29021042df4da6b6887553a879d691"
              rel="noopener noreferrer"
              className="button-outlined-purple main-button"
            >
              Provide
            </a>
          </div>
        </Col>
      </div>
    </div>
  </div>
);

export default SectionMain;
