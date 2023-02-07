import React from "react";
import quanstamp from "../../../../static/website/protocol/quantstamp.svg";
import weth from "../../../../static/website/protocol/weth.svg";
import dework from "../../../../static/website/protocol/dework.svg";
import chainlink from "../../../../static/website/protocol/chainlink.svg";
import twitterLogo from "../../../../static/website/protocol/twitter-logo.svg";
import discordLogo from "../../../../static/website/protocol/discord-logo.svg";
import telegramLogo from "../../../../static/website/protocol/telegram-logo.svg";
import mailLogo from "../../../../static/website/protocol/mail.svg";
import { FaArrowRight } from "react-icons/fa";
import sewagFruit from "../../../../static/website/ecosystem/sewage-fruit.png";



type SafetyType = {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  logo: string;
}

const safetyItems = [
  {
    id: "twitter",
    title: "Twitter",
    subtitle: "Follow us on Twitter.",
    link: "https://docs.cryptex.finance/audits",
    logo: twitterLogo,
  },
  {
    id: "discord",
    title: "Discord",
    subtitle: "Join the Discord Server.",
    link: "https://app.cryptex.finance/vault-monitoring",
    logo: discordLogo,
  },
  {
    id: "telegram",
    title: "Telegram",
    subtitle: "Get announcements on Telegram.",
    link: "https://app.dework.xyz/cryptex-finance",
    logo: telegramLogo,
  },
  {
    id: "newsletter",
    title: "Newsletter",
    subtitle: "Subscribe to our newsletter.",
    link: "https://docs.cryptex.finance/tcap#oracles",
    logo: mailLogo,
  }
]

const SectionSafety = () => {
  const item = (feature: SafetyType) => (
    <a
      key={feature.id}
      href={feature.link}
      rel="noreferrer"
      target="_blank"
      className="green-box box-button-green item"
    >
      <div className="items-info">
        <h2 className="terciary-header">
          {feature.title}
        </h2>
        <p className="subtitle">
          {feature.subtitle}
        </p>
        <div className="items-logo-container">
          <img
            src={feature.logo}
            className="safety-logo"
            alt={feature.title}
          />
        </div>
      </div>
    </a>
  );

  return (
    <div id="protocol" className="section-protocol">
      <h1 className="header">
        Community
      </h1>
      <div className="items">
        {safetyItems.map((sItem) => {
          return item(sItem);
        })}
      </div>
      {/*
      <div className="ecosystem-content">
        <div className="box main">
          <div className="subscribe">
            <form>
              <p className="subtitle">Subscribe to the Weekly Newsletter</p>
              <div className="subscribe-data">
                <input
                  id="email"
                  className="subscribe-input"
                  placeholder="Subscribe to Newsletter"
                />
                <button className="subscribe-button button-pink">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
        <a
          className="box box-button sewagefruit"
          href="https://app.cryptex.finance/sewagefruitz"
          target="_blank"
          rel="noreferrer"
        >
          <h2 className="heading-secondary">
            Go on a Quest
            <FaArrowRight className="sewagefruit-icon" size={24} />
          </h2>
          <img src={sewagFruit} alt="Sewage Fruitz" />
        </a>
      </div>
      */}
    </div>
  );
};

export default SectionSafety;
