import React from "react";
import Col from "react-bootstrap/esm/Col";
import appEndpoint from "../../../endpoint";
import bgvideo from "../../../../static/bg_main.mp4";
import bgvideowebm from "../../../../static/bg_main.webm";
import cryptexTitle from '../../../../static/website/home/cryptex_finance_v2.png'

const SectionMain = () => (
  <div className="section-main">
    <video
      autoPlay
      loop
      muted
      playsInline
      poster={bgvideo}
      className="video bgvid"
      id="bgvid"
    >
      <source src={bgvideowebm} type="video/webm" />
      <source src={bgvideo} type="video/mp4" />
    </video>
    <div className="black-overlay"></div>
    <div className="main-container col-sm-12">
      <div className="main-info">
        <div className="main-title">
          <h1 className="main-brand-text"> CRYPTEX V2 </h1>
        </div>
        <br></br>
        <p className="home-subheader">
        TRADE CUTTING EDGE PERPETUAL MARKETS <br></br> <span className="neon-green">WITH UP TO 20X LEVERAGE</span>
        </p>
      </div>
      <div className="main-buttons">
        <Col sm={12} md={12} lg={12} className="main-buttons-actions">
          <div className="button-to-app">
            <a
              href={appEndpoint}
              rel="noopener noreferrer"
              className="button-outlined-purple main-button main-button-link"
              target="https://v2.cryptex.finance/"
            >
              TRADE
            </a>
          </div>
          <div className="">
            <a
              href="https://v2.cryptex.finance/liquidity"
              rel="noopener noreferrer"
              className="button-outlined-purple main-button"
            >
              PROVIDE LIQUIDITY
            </a>
          </div>
        </Col>
      </div>
    </div>
  </div>
);

export default SectionMain;
