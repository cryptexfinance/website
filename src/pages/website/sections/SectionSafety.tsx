import React from "react";
import quanstamp from "../../../../static/website/safety/quantstamp.svg";
import weth from "../../../../static/website/safety/weth.svg";
import immunefi from "../../../../static/website/safety/immunefi.svg";

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
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    link: "/tcap",
    logo: quanstamp,
  },
  {
    id: "collateral",
    title: "Collateral",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    link: "/nft",
    logo: weth,
  },
    {
    id: "bounty",
    title: "Bounties",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    link: "/nft",
    logo: immunefi,
  }
]

const SectionSafety = () => { 
  const item = (feature: SafetyType) => (
    <div key={feature.id} className="box item">
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
    </div>
  );

  return (
    <div id="safety" className="section-safety">
      <h1 className="header">
        Security and Safety
      </h1>
      <p className="subheader">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="items">
        {safetyItems.map((sItem) => {
          return item(sItem);
        })}
      </div>
    </div>    
  );
};

export default SectionSafety;
