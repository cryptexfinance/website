import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { NumericFormat } from "react-number-format";
import { FaArrowRight } from "react-icons/fa";
import { contractsContext, signerContext } from "../../../context";
import { getPriceInUSDFromPair } from "../../../utils";
import coinGecko from "../../../../static/website/governance/coin-gecko.svg";
import sushiLogo from "../../../../static/website/governance/sushi-logo.svg";
import dfpLogo from "../../../../static/website/governance/dfp-logo.svg";
import geminiLogo from "../../../../static/website/governance/gemini-hor-white-full.svg";


type GovernanceType = {
  id: string;
  title: string;
  info: string;
  link: string;
}

const governanceItems = [
  {
    id: "1",
    title: "Proposals",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    link: "/tcap",
  },
  {
    id: "2",
    title: "Vote",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    link: "/nft",
  },
    {
    id: "3",
    title: "Delegate",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    link: "/nft",
  }
]


const SectionGovernance = () => {
  const contracts = useContext(contractsContext);
  const signer = useContext(signerContext);
  const [ctxPrice, setCtxPrice] = useState("0");

  useEffect(() => {
    const load = async () => {
      if (signer.ethcallProvider && contracts) {
        const wethOraclePriceCall = await contracts.wethOracleRead?.getLatestAnswer();
        const reservesCtxPoolCall = await contracts.ctxUniPairRead?.getReserves();  
        // @ts-ignore
        const [wethOraclePrice, reservesCtxPool] = await signer.ethcallProvider?.all([
          wethOraclePriceCall,
          reservesCtxPoolCall,
        ]);
        const currentPriceETH = ethers.utils.formatEther(wethOraclePrice.mul(10000000000));
        const currentPriceCTX = await getPriceInUSDFromPair(
          reservesCtxPool[0],
          reservesCtxPool[1],
          parseFloat(currentPriceETH)
        );
        setCtxPrice(currentPriceCTX.toString());
      }
    }; 
    load();
  }, [signer.ethcallProvider, contracts]);  

  const item = (feature: GovernanceType) => (
    <div key={feature.id} className="box box-button governance-item">
      <div className="governance-item-content">
        <h2 className="terciary-header">
          {feature.title}
        </h2>              
        <p className="subtitle">
          {feature.info}
        </p>
       </div> 
      <div className="governance-item-footer">
        <FaArrowRight className="item-icon"size={20} />
      </div>
    </div>
  );

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
              <NumericFormat
                className="number-blue"
                value={ctxPrice}
                displayType="text"
                thousandSeparator
                prefix="$"
                decimalScale={2}
              />
              <span className="label">
                CTX Price
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="governance-detail">
        {governanceItems.map((govItem) => {
          return item(govItem);
        })}
      </div>
    </div>
  )
}

export default SectionGovernance;
