import React from "react";
import chainlink from "../../../../static/website/protocol/chainlink.svg";
import cryptex from "../../../../static/website/protocol/cryptex.svg";
import arbitrum from "../../../../static/website/protocol/arbitrum.svg";
import perennial from "../../../../static/website/protocol/perennial.svg";

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
    logo: cryptex,
  },
  {
    id: "collateral",
    title: "Low Latency Price Feeds at 0.5%",
    logo: chainlink,
  },
  {
    id: "bounty",
    title: "Powerful trading for makers & takers.",
    logo: perennial,
  },
  {
    id: "oracles",
    title: "Available on DeFi’s preferred network.",
    logo: arbitrum,
  }
]

const SectionSafety = () => { 
  const item = (feature: SafetyType) => (
    <a
      key={feature.id}
      rel="noreferrer"
      target="_blank"
      className="box box-button-permanent-hover item"
    >
      <div className="items-info">
        <h2 className="terciary-header text-center">
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
