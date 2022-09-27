import React from "react";
import quanstamp from "../../../../static/website/safety/quantstamp.svg";
import weth from "../../../../static/website/safety/weth.svg";
import dework from "../../../../static/website/safety/dework.svg";

type SafetyType = {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  logo: string;
}

const safetyItems = [
  {
    id: "audit",
    title: "Audit",
    subtitle: "Review our audits.",
    link: "https://docs.cryptex.finance/audits",
    logo: quanstamp,
  },
  {
    id: "collateral",
    title: "Collateral",
    subtitle: "Check out the vault monitoring tool.",
    link: "https://app.cryptex.finance/vault-monitoring",
    logo: weth,
  },
    {
    id: "bounty",
    title: "Bounties",
    subtitle: "Explore all opportunities.",
    link: "https://app.dework.xyz/cryptex-finance",
    logo: dework,
  }
]

const SectionSafety = () => { 
  const item = (feature: SafetyType) => (
    <a
      key={feature.id}
      href={feature.link}
      rel="noreferrer"
      target="_blank"
      className="box box-button item"
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
        Protocol
      </h1>
      <div className="items">
        {safetyItems.map((sItem) => {
          return item(sItem);
        })}
      </div>
    </div>    
  );
};

export default SectionSafety;
