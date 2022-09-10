import React from "react";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import coinGecko from "../../../../static/website/governance/coin-gecko.svg";
import sushiLogo from "../../../../static/website/governance/sushi-logo.svg";
import dfpLogo from "../../../../static/website/governance/dfp-logo.svg";
import geminiLogo from "../../../../static/website/governance/gemini-hor-white-full.svg";
import ctx from "../../../../static/website/governance/ctx.svg";


const SectionGovernance = () => {
  const breakpoints = useBreakpoint();
    
  return (
    <div id="governance" className="section-governance">
      
      <div className="box governance-main">
        <div className="info-top">
          <h1 className="heading-secondary">
            Decentralized Governance
          </h1>
          <p className="subtitle">
            Cryptex protocol is fully decentralized and governed by
            the community. CTX holders can vote on protocol updgrades.
          </p>
          <div className="icons">
            <a href="https://www.coingecko.com/en/coins/cryptex-finance" rel="noreferrer" target="_blank">
              <img src={coinGecko} className="governance-icon gecko" alt="Coin Gecko" />
            </a>
            <a href="https://analytics.sushi.com/pairs/0x2a93167ed63a31f35ca4788e2eb9fbd9fa6089d0" rel="noreferrer" target="_blank">
              <img src={sushiLogo}  className="governance-icon uni" alt="Uni Logo" />
            </a>
            <a href="https://defipulse.com/cryptex" rel="noreferrer" target="_blank">
              <img src={dfpLogo} className="governance-icon dfp" alt="DFP"  />        
            </a>
            <a href="https://www.gemini.com/prices/cryptex?utm_source=cryptex&utm_medium=link&utm_campaign=web_referral" rel="noreferrer" target="_blank">
              <img src={geminiLogo} className="governance-icon gemini" alt="gemini logo" /> 
            </a>
          </div>
        </div>
        <div className="info-bottom">
          <div className="hl-divider" />
          <div className="prices">
          <div className="market-cap-box">
            <span className="number-pink">
              $171,729.15
            </span>
            <span className="label">
              Total CTX Market Capitalization
            </span>
          </div>
          <div  className="vl-divider" />
          <div className="price-box">
            <span className="number-blue">
              $4.13
            </span>
            <span className="label">
              CTX Price
            </span>
          </div>
          </div>
        </div>
      </div>
      <div className="governance-detail">
        <div className="box box-button governance-item">
          <h2 className="terciary-header">
            Proposals
          </h2>
          <p className="subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
          <div className="link-container">

          </div>
        </div>
        <div className="box box-button governance-item">
          <h2 className="terciary-header">
            Vote
          </h2>
          <p className="subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut.
          </p>
          <div className="link-container">

          </div>
        </div>
        <div className="box box-button governance-item">
          <h2 className="terciary-header">
            Delegate
          </h2>
          <p className="subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore.
          </p>
          <div className="link-container">

          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionGovernance
