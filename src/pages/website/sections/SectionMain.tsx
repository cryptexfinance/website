import React from "react";
import Col from "react-bootstrap/esm/Col";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import appEndpoint from "../../../endpoint";
import bgMobilePoster from "../../../../static/mobile_poster.png";
import bgVideo from "../../../../static/bg_main_pi.webm";
import bgVideoMobile from "../../../../static/bg_mobile_pi.mp4";

const SectionMain = () => {
  const breakpoints = useBreakpoint();

  return (
    <div className="section-main">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={!breakpoints.sm ? bgVideo : bgMobilePoster}
        className="video bgvid"
        id="bgvid"
      >
        {!breakpoints.sm ? <source src={bgVideo} type="video/webm" /> : <source src={bgVideoMobile} type="video/mp4" />}
      </video>
      <div className="black-overlay"></div>
      <div className="main-container col-sm-12">
        <div className="main-info">
          <div className="main-title">
            <img className="cryptex-logo" src="/logo.svg" alt="Logo" />
          </div>
          <p className="home-subheader">
            CUTTING EDGE PERPETUAL MARKETS <br /><br />
          </p>
        </div>
        <div className="main-buttons">
          <Col sm={12} md={12} lg={12} className="main-buttons-actions">
            <div className="button-to-app">
              <a
                href={appEndpoint}
                rel="noopener noreferrer"
                className="button-outlined-purple main-button main-button-link"
                target="https://app.cryptex.finance/"
              >
                Launch App
              </a>
            </div>
            <div className="">
              <a
                href="https://docs.cryptex.finance/"
                rel="noopener noreferrer"
                className="button-outlined-purple main-button"
              >
                Documentation
              </a>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );  
};

export default SectionMain;
