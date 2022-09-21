import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import appEndpoint from "../../../endpoint";
import bg from "../../../../static/bg.webp";
import bgvideo from "../../../../static/bg_main.mp4";

const SectionMain = () => {
  const [intervalChanged, setIntervalChanged] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const words = [
    "Innovative",
    "Secure",
    "Collateralized",
    "Trustless",
    "Decentralized",
  ]

  const setNewWord = () => {
    let cw = currentWord + 1;
    if (cw < words.length) {
      setCurrentWord(cw);
    } else {
      setCurrentWord(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIntervalChanged((prevState) => !prevState);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setNewWord();
  }, [intervalChanged]);

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
            <h1>
              Cryptex Finance
            </h1>
          </div>
          <p className="subheader2">
            {words[currentWord]} Index Tokens
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
