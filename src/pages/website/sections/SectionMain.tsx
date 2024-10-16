import React from "react"
import Col from "react-bootstrap/esm/Col"
import { useTranslation } from "gatsby-plugin-react-i18next"

import appEndpoint from "../../../endpoint"
// import bgMobilePoster from "../../../../static/mobile_poster.png"
import bgVideo from "../../../../static/bg_main_pi.webm"

const SectionMain = () => {
  const { t } = useTranslation()

  return (
    <div className="section-main">
      <video
        id="bgvidm"
        autoPlay
        loop
        muted
        playsInline
        className="video bgvid"
      >
        <source src={bgVideo} type="video/webm" />
      </video>
      <div className="black-overlay"></div>
      <div className="main-container col-sm-12">
        <div className="main-info">
          <h1 className="main-title">
            <span>DeFi</span>{" "}<span>United</span>
          </h1>
          <h2 className="main-subtitle line-up">
            Indexes, Spot, Perps, all on one app.
          </h2>
        </div>
        <div className="main-buttons">
          <Col sm={12} md={12} lg={12} className="main-buttons-actions">
            <div className="button-to-app line-up">
              <a
                href={appEndpoint}
                rel="noopener noreferrer"
                className="button-outlined-purple main-button main-button-link"
                target="_blank"
              >
                {t('launch-app')}
              </a>
            </div>
            <div className="line-up">
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
