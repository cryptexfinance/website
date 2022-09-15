import React from "react";
import twitter from "../../static/website/home/twitter.svg";
import discord from "../../static/website/home/discord.svg";
import telegram from "../../static/website/home/telegram.svg";

const Footer = () => {
  return (
    <section id="footer" className="footer">
      <div className="footer-info">
        <img className="menu-logo" src="/logo.svg" alt="Logo" />
        <p className="subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod.
        </p>
        <div className="community">
          <a
            href="https://twitter.com/cryptexfinance"
            rel="noreferrer"
            target="_blank"
            className="social-item"
          >
            <img src={twitter} className="social-item-icon" alt="Twitter" />
          </a>
          <a
            href="https://discord.gg/cryptex"
            rel="noreferrer"
            target="_blank"
            className="social-item"
          >
            <img src={discord} className="social-item-icon" alt="Discord" />
          </a>
          <a
            href="https://t.me/cryptexfinance"
            rel="noreferrer"
            target="_blank"
            className="social-item"
          >
            <img src={telegram} className="social-item-icon" alt="Telegram" />
          </a>
        </div>
      </div>
      <div className="footer-menu">
        <div className="links">
          <a className="subtitle" href="/#products">Products</a>
          <a className="subtitle" href="/#governance">Governance</a>
          <a className="subtitle" href="/#safety">Safety</a>
        </div>
        <div className="links">
          <a className="subtitle" href="/#ecosystem">Ecosystem</a>
          <a className="subtitle" href="/education">Academy</a>
          <a className="subtitle" href="/blog">News</a>
        </div>
        <div className="links">
          <a 
            href="https://docs.cryptex.finance"
            rel="noreferrer"
            target="_blank"
            className="subtitle"
          >
            Documentation
          </a>
          <a
            href="https://docs.cryptex.finance/faq"
            rel="noreferrer"
            target="_blank"
            className="subtitle"
          >
            FAQ
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;