import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import twitter from "../../static/website/ecosystem/x_logo.svg"
import discord from "../../static/website/ecosystem/discord.svg"
import telegram from "../../static/website/ecosystem/telegram.svg"
import medium from "../../static/website/ecosystem/medium.svg"
import mailLogo from "../../static/website/protocol/mail.svg"


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
  }
]

const Footer = () => {
  const { t } = useTranslation()

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
          {t('site-description')}
        </p>
        <div className="community">
          {socialIcons.map((socialIcon, index) => {
            return iconItem(socialIcon, index);
          })}
        </div>
      </div>
      <div className="footer-menu">
        <div className="links">
          <a className="subtitle" href="/#markets">{t('markets')}</a>
          <a className="subtitle" href="/#governance">{t('governance')}</a>
          <a
            href="https://docs.cryptex.finance"
            rel="noreferrer"
            target="_blank"
            className="subtitle"
          >
            {t('documentation')}
          </a>
          <a
            href="https://cryptexfinance.notion.site/Cryptex-Wiki-b7d2592b8f6e48538612b52c35ecddd9"
            rel="noreferrer"
            target="_blank"
            className="subtitle"
          >
            {t('wiki')}
          </a>
        </div>
        <div className="links">
          <a
            href="https://forum.cryptex.finance/"
            rel="noreferrer"
            target="_blank"
            className="subtitle"
          >
            {t('forum')}
          </a>
          <a className="subtitle" href="/blog">{t('blog')}</a>
          <a className="subtitle" href="https://v1.cryptex.finance">V1</a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
