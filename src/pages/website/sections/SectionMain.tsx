import React from "react";
import Col from "react-bootstrap/esm/Col";
import appEndpoint from "../../../endpoint";
import twitter from "../../../../static/website/home/twitter.svg";
import discord from "../../../../static/website/home/discord.svg";
import telegram from "../../../../static/website/home/telegram.svg";
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h3>
          </div>
          <p className="subheader">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
          </p>
        </div>
        <div className="main-buttons">
          <Col sm={12} md={8} lg={8} className="main-buttons-actions">
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
          <Col sm={12} md={4} lg={4} className="main-buttons-social">
            <a href="https://twitter.com/cryptexfinance" rel="noreferrer" target="_blank" className="social-item">
              <img src={twitter} className="social-item-icon" alt="Twitter" />
            </a>
            <a href="https://discord.gg/cryptex" rel="noreferrer" target="_blank" className="social-item">
              <img src={discord} className="social-item-icon" alt="Discord" />
            </a>
            <a href="https://t.me/cryptexfinance" rel="noreferrer" target="_blank" className="social-item">
              <img src={telegram} className="social-item-icon" alt="Telegram" />
            </a>
          </Col>
        </div>
      </div>
    </div>
  )
}

export default SectionMain;
