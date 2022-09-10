import React from "react";
import { PageLayout } from "../../components";
import { SEO } from "../../utils";
import mintIcon from "../../../static/website/features/mint.svg";
import tradeIcon from "../../../static/website/features/trade.svg";
import poolIcon from "../../../static/website/features/pool.svg";
import farmIcon from "../../../static/website/features/farm.svg";

type FeatureType = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

const features = [
  {
    id: "mint",
    title: "Mint",
    subtitle: "Create and approve a vault, add collateral and begin minting TCAP.",
    icon: mintIcon
  },
  {
    id: "trade",
    title: "Trade",
    subtitle: "Buy and sell TCAP on Uniswap.",
    icon: tradeIcon
  },
  {
    id: "pool",
    title: "Pool",
    subtitle: "Provide liquidity to TCAP pairs on Uniswap and earn a portion of the trading fees.",
    icon: poolIcon
  },
  {
    id: "farm",
    title: "Farm",
    subtitle: "Earn CTX Rewards for minting TCAP tokens and Staking TCAP LP tokens.",
    icon: farmIcon
  }
];


const Tcap = () => {

  const item = (feature: FeatureType) => (
    <div id={feature.id} className="box feature-item">
      <div className="feature-info">
        <div className="icon-container">
          <img src={feature.icon} className="feature-icon" alt="Mint" />
        </div>
        <h2 className="heading-secondary">
          {feature.title}
        </h2>
      </div>
      <div className="feature-content">
        <p className="subtitle">
          {feature.subtitle}
        </p>
      </div>
    </div>
  );

  return (
    <PageLayout>
      <SEO title="Cryptex TCAP index" />
      <div className="products">
        <h1 className="header">
          TCAP: The World’s first Crypto Token Index 
        </h1>
        <div className="content">
          <div className="box main">
            <div className="info-top">
              <h2 className="heading-secondary">
                What is TCAP?
              </h2>
              <p className="subtitle">
                TCAP gives holders real-time price exposure to total cryptocurrency market cap. It's a new,
                200% fully backed, fully collateralized asset that’s both audited and accurately
                representative of the entire cryptocurrency complex by total market capitalization.
              </p>
              <div className="icons">

              </div>
            </div>
            <div className="info-bottom">
              <div className="hl-divider" />
              <div className="prices">
              <div className="market-cap-box">
                <span className="number-pink">
                  $1,017,307,072,838
                </span>
                <span className="label">
                  Total Crypto Market Capitalization
                </span>
              </div>
              <div  className="vl-divider" />
              <div className="price-box">
                <span className="number-blue">
                  $101.73
                </span>
                <span className="label">
                  TCAP Price
                </span>
              </div>
              </div>
            </div>
          </div>
          <div className="features">
            {features.map((feature) => {
              return item(feature);
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );    
};

export default Tcap;
