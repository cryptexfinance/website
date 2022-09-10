import React from "react";

type SafetyType = {
  id: string;
  title: string;
  subtitle: string;
  link: string;
}

const safetyItems = [
  {
    id: "audit",
    title: "Audit",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    link: "/tcap"
  },
  {
    id: "collateral",
    title: "Collateral",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    link: "/nft"
  },
    {
    id: "bounty",
    title: "Bounties",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    link: "/nft"
  }
]

const SectionSafety = () => { 
  const item = (product: SafetyType) => (
    <div id={product.id} className="box item">
      <div className="items-info">
        <h2 className="terciary-header">
          {product.title}
        </h2>
        <p className="subtitle">
          {product.subtitle}
        </p>
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
