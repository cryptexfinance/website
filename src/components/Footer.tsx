import React from "react";
import twitter from "../../static/website/ecosystem/x_logo.svg";
import discord from "../../static/website/ecosystem/discord.svg";
import telegram from "../../static/website/ecosystem/telegram.svg";
import youtube from "../../static/website/ecosystem/youtube.svg";
import medium from "../../static/website/ecosystem/medium.svg";
import mailLogo from "../../static/website/protocol/mail.svg";


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
    class: "x_logo",
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
    href: "https://medium.com/cryptexfinance",
    icon: medium,
    alt: "Medium Logo",
    class: "medium",
  },
  {
    href: "https://cryptex.substack.com/",
    icon: mailLogo,
    alt: "Newsletter",
    class: "",
  }
]

const Footer = () => {

  const iconItem = (item: IconType, index: number) => (
    <a
      key={index}
      href={item.href}
      rel="noreferrer"
      target="_blank"
      className={"social-item icon-link ".concat(item.class)}
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
          Decentralized platform providing cutting edge markets.
        </p>
        <div className="community">
          {socialIcons.map((socialIcon, index) => {
            return iconItem(socialIcon, index);
          })}
        </div>
      </div>
      <div className="footer-menu">
        <div className="links">
          <a className="subtitle" href="/#governance">Governance</a>
          <a
            href="https://docs.cryptex.finance"
            rel="noreferrer"
            target="_blank"
            className="subtitle"
          >
            Documentation
          </a>
          <a
            href="https://cryptexfinance.notion.site/Cryptex-Wiki-b7d2592b8f6e48538612b52c35ecddd9"
            rel="noreferrer"
            target="_blank"
            className="subtitle"
          >
            Wiki
          </a>
        </div>
        <div className="links">
          <a
            href="https://forum.cryptex.finance/"
            rel="noreferrer"
            target="_blank"
            className="subtitle"
          >
            Forum
          </a>
          <a className="subtitle" href="/blog">Blog</a>
          <a className="subtitle" href="https://v1.cryptex.finance">V1</a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
