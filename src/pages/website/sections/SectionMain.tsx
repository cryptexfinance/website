import React from "react";
import Col from "react-bootstrap/esm/Col";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import appEndpoint from "../../../endpoint";
import bgVideo from "../../../../static/bg_main_pi.webm";
import bgVideoMobile from "../../../../static/bg_mobile_pi.webm";
import cryptexTitle from '../../../../static/website/home/cryptex_finance_v2.png'

const SectionMain = () => {
  const breakpoints = useBreakpoint();

  return (
    <div className="section-main">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={bgVideo}
        className="video bgvid"
        id="bgvid"
      >
        {!breakpoints.sm ? <source src={bgVideo} type="video/webm" /> : <source src={bgVideoMobile} type="video/webm" />}
      </video>
      <div className="black-overlay"></div>
      <div className="main-container col-sm-12">
        <div className="main-info">
          <div className="main-title">
            <h1 className="main-brand-text"> CRYPTEX V2 </h1>
          </div>
          <br></br>
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
                Launch APP
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
