import React from "react"
import Col from "react-bootstrap/esm/Col"
import { useTranslation } from "gatsby-plugin-react-i18next"

import appEndpoint from "../../../endpoint"
import bgMobilePoster from "../../../../static/mobile_poster.png"
import bgVideo from "../../../../static/bg_main_pi.webm"
import bgVideoMobile from "../../../../static/bg_mobile_pi.mp4"
import { Stack } from "react-bootstrap"
import SectionGlobal from "./SectionGlobal"

const SectionMain2 = () => {
  const { t } = useTranslation()

  return (
    <div className="section-main" style={{ height: "100vh", alignItems: "flex-start" }}>
      <video
        id="bgvidm"
        autoPlay
        loop
        muted
        playsInline
        poster={bgMobilePoster}
        className="video bgvid mobile"
        style={{ height: "75vh" }}
      >
        <source src={bgVideoMobile} type="video/mp4" />
      </video>
      <video
        id="bgvid"
        autoPlay
        loop
        muted
        playsInline
        className="video bgvid desktop"
        style={{ height: "77vh" }}
      >
        <source src={bgVideo} type="video/webm" />
      </video>
      
      <div className="main-container col-sm-12" style={{ height: "68vh", justifyContent: "flex-end" }}>
        <div className="main-info" style={{ marginBottom: "2rem" }}>
          {/* <div className="main-title">
            <img className="cryptex-logo" src="/logo.svg" alt="Logo" style={{ width: "310px" }} />
          </div> */}
          <p className="home-subheader">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
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
                style={{ width: "15rem", height: "3.5rem" }}
              >
                {t('launch-app')}
              </a>
            </div>
            <div className="">
              <a
                href="https://docs.cryptex.finance/"
                rel="noopener noreferrer"
                className="button-outlined-purple main-button"
                style={{ width: "15rem", height: "3.5rem" }}
              >
                {t('documentation')}
              </a>
            </div>
          </Col>
        </div>
      </div>
      <SectionGlobal />
    </div>
  );  
};

export default SectionMain2;
