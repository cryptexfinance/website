import React from "react"
import Col from "react-bootstrap/esm/Col"
import { useTranslation } from "gatsby-plugin-react-i18next"

import appEndpoint from "../../../endpoint"
import bgMobilePoster from "../../../../static/mobile_poster.png"
import bgVideo from "../../../../static/bg_main_pi.webm"
import bgVideoMobile from "../../../../static/bg_mobile_pi.mp4"

const SectionMain = () => {
  const { t } = useTranslation()

  return (
    <div className="section-main">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={bgMobilePoster}
        className="video bgvid mobile"
        id="bgvidm"
      >
        <source src={bgVideoMobile} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video bgvid desktop"
        id="bgvid"
      >
        <source src={bgVideo} type="video/webm" />
      </video>
      <div className="black-overlay"></div>
      <div className="main-container col-sm-12">
        <div className="main-info">
          <div className="main-title">
            {/* <h1
              style={{ fontSize: "3rem", color: "#A440F2" }}
            >
              Lorem ipsum dolor.
            </h1> */}
          </div>
          <p className="home-subheader">
            {/* Sed ut perspiciatis unde omnis iste natus error sit voluptatem */}
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
                {t('launch-app')}
              </a>
            </div>
            <div className="">
              <a
                href="https://docs.cryptex.finance/"
                rel="noopener noreferrer"
                className="button-outlined-purple main-button"
              >
                {t('documentation')}
              </a>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );  
};

export default SectionMain;
