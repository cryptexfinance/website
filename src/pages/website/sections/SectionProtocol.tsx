import React from "react";
import quanstamp from "../../../../static/website/protocol/quantstamp.svg";
import weth from "../../../../static/website/protocol/weth.svg";
import dework from "../../../../static/website/protocol/dework.svg";
import chainlink from "../../../../static/website/protocol/chainlink.svg";

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
    title: "Unique Perpetual Markets.",
    link: "https://docs.cryptex.finance/audits",
    logo: quanstamp,
  },
  {
    id: "collateral",
    title: "Low Latency Price Feeds.",
    link: "https://app.cryptex.finance/vault-monitoring",
    logo: chainlink,
  },
  {
    id: "bounty",
    title: "Powerful trading for makers & takers.",
    link: "https://app.dework.xyz/cryptex-finance",
    logo: dework,
  },
  {
    id: "oracles",
    title: "Available on DeFi’s preferred network.",
    link: "https://docs.cryptex.finance/tcap#oracles",
    logo: chainlink,
  }
]

const SectionSafety = () => { 
  const item = (feature: SafetyType) => (
    <a
      key={feature.id}
      href={feature.link}
      rel="noreferrer"
      target="_blank"
      className="box box-button-permanent-hover item"
    >
      <div className="items-info">
        <h2 className="terciary-header">
          {feature.title}
        </h2>
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
        Why Cryptex
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
