import React from "react";
import twitter from "../../static/website/community/twitter.svg";
import discord from "../../static/website/community/discord.svg";
import telegram from "../../static/website/community/telegram.svg";
import youtube from "../../static/website/community/youtube.svg";
import medium from "../../static/website/community/medium.svg";

type IconType = {
  href: string;
  icon: string;
  alt: string;
  class: string;
}

const socialIcons = [
  {
    href: "https://twitter.com/cryptexfinance",
    icon: twitter,
    alt: "Twitter",
    class: "",
  },
  {
    href: "https://discord.gg/cryptex",
    icon: discord,
    alt: "Discord Logo",
    class: "",
  },
  {
    href: "https://t.me/cryptexfinance",
    icon: telegram,
    alt: "Telegram Logo",
    class: "",
  },
  {
    href: "https://www.youtube.com/channel/UCdN17zdr5MCDph75srdhutQ",
    icon: youtube,
    alt: "Youtube logo",
    class: "",
  },
  {
    href: "https://medium.com/cryptexfinance",
    icon: medium,
    alt: "Medium Logo",
    class: "medium",
  }
]

const Footer = () => {

  const iconItem = (item: IconType, index: number) => (
    <a
      key={index}
      href={item.href}
      rel="noreferrer"
      target="_blank"
      className="social-item icon-link"
    >
      <img
        src={item.icon}
        className={"social-item-icon ".concat(item.class)}
        alt={item.alt}
      />
    </a>
  );

  return (
    <section id="footer" className="footer">
      <div className="footer-info">
        <img className="menu-logo" src="/logo.svg" alt="Logo" />
        <p className="subtitle">
          Innovative, open-source DeFi solutions for the global crypto community.
        </p>
        <div className="community">
          {socialIcons.map((socialIcon, index) => {
            return iconItem(socialIcon, index);
          })}
        </div>
      </div>
      <div className="footer-menu">
        <div className="links">
          <a className="subtitle" href="/#solutions">Solutions</a>
          <a className="subtitle" href="/#governance">Governance</a>
          <a className="subtitle" href="/#protocol">Protocol</a>
          <a className="subtitle" href="/#ecosystem">Ecosystem</a>
        </div>
        <div className="links">
          <a className="subtitle" href="/blog">Blog</a>
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
          <a
            href="https://forum.cryptex.finance/"
            rel="noreferrer"
            target="_blank"
            className="subtitle"
          >
            Forum
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
