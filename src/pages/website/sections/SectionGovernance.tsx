import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { NumericFormat } from "react-number-format";
import { FaArrowRight } from "react-icons/fa";
import parse from "html-react-parser";
import { contractsContext, signerContext } from "../../../context";
import {
  getPriceInUSDFromPair,
  FOUNDERS_ADDRESS,
  LIQUIDITY_REWARD_ADDRESS,
  LIQUIDITY_REWARD2_ADDRESS,
  MULTISIG_ADDRESS,
  TREASURY_ADDRESS
} from "../../../utils";
import ctxIcon from "../../../../static/website/ctx.svg";
import geminiLogo from "../../../../static/website/governance/gemini.svg";
import sushiLogo from "../../../../static/website/governance/sushi-logo.svg";
import uniLogo from "../../../../static/website/governance/uni-logo.svg";
import coinbaseLogo from "../../../../static/website/governance/coinbase.svg";
import huobiLogo from "../../../../static/website/governance/huobi.svg";
import arbitrum from "../../../../static/website/protocol/arbitrum.svg";


type GovernanceType = {
  id: string;
  title: string;
  info: string;
  link: string;
}
type IconType = {
  href: string;
  icon: string;
  alt: string;
  class: string;
}

const governanceItems = [
  {
    id: "1",
    title: "Proposals",
    info: "Browse the latest proposals.",
    link: "https://forum.cryptex.finance/c/proposals/5",
  },
  {
    id: "2",
    title: "Vote",
    info: "Vote on active proposals.",
    link: "https://www.tally.xyz/governance/eip155:1:0x874C5D592AfC6803c3DD60d6442357879F196d5b",
  },
    {
    id: "3",
    title: "Single Siding Staking",
    info: `Stake and delegate your CTX to a Crypt Keeper to earn <span class="number-span">{apr_value}</span> APR in CTX governance tokens.`,
    link: "https://app.cryptex.finance/governance",
  }
]

const governanceIcons = [
  {
    href: "https://arbitrum.io/",
    icon: arbitrum,
    alt: "Arbitrum Logo",
    class: "",
  },
  {
    href: "https://www.coinbase.com/price/cryptex-finance",
    icon: coinbaseLogo,
    alt: "Coinbase logo",
    class: "",
  },
  {
    href: " https://www.gemini.com/prices/cryptex",
    icon: geminiLogo,
    alt: "Gemini Logo",
    class: "gemini",
  },
  {
    href: "https://www.huobi.com/en-us/asset-introduction/details?currency=ctx",
    icon: huobiLogo,
    alt: "Huobi Logo",
    class: "huobi",
  },
  {
    href: "https://app.uniswap.org/#/add/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/0x16c52CeeCE2ed57dAd87319D91B5e3637d50aFa4/3000?chain=mainnet&maxPrice=25.713616",
    icon: uniLogo,
    alt: "Uniswap Logo",
    class: "uniswap",
  },
  {
    href: "https://analytics.sushi.com/pairs/0xa87e2c5d5964955242989b954474ff2eb08dd2f5",
    icon: sushiLogo,
    alt: "Sushiswap Logo",
    class: "",
  },
]

const SectionGovernance = () => {
  const contracts = useContext(contractsContext);
  const signer = useContext(signerContext);
  // const breakpoints = useBreakpoint();
  const [ctxPrice, setCtxPrice] = useState("0");
  const [marketCap, setMarketCap] = useState("0.0");
  const [totalStaked, setTotalStaked] = useState("0.0");
  const sixMonthCtxRewardAmount = 12654;
  const apyShowDate = new Date(1633654800 * 1000);

  useEffect(() => {
    const load = async () => {
      if (signer.ethcallProvider && contracts) {
        const wethOraclePriceCall = await contracts.wethOracleRead?.getLatestAnswer();
        const reservesCtxPoolCall = await contracts.ctxUniPairRead?.getReserves();
        const totalSupplyCall = await contracts.delegatorFactoryRead?.totalSupply();

        const ctxTotalSupplyCall = await contracts.ctxTokenRead?.totalSupply();
        const foundersTotalCall = await contracts.ctxTokenRead?.balanceOf(FOUNDERS_ADDRESS);
        const initialIncentiveCall = await contracts.ctxTokenRead?.balanceOf(LIQUIDITY_REWARD_ADDRESS);
        const initialIncentiveCall2 = await contracts.ctxTokenRead?.balanceOf(LIQUIDITY_REWARD2_ADDRESS);
        const multisigCall = await contracts.ctxTokenRead?.balanceOf(MULTISIG_ADDRESS);
        const treasuryTotalCall = await contracts.ctxTokenRead?.balanceOf(TREASURY_ADDRESS);

        // @ts-ignore
        const [
          wethOraclePrice,
          reservesCtxPool,
          totalSupply,
          ctxTotalSupply,
          foundersTotal,
          initialIncentive,
          initialIncentive2,
          multisig,
          treasuryTotal,
        ] = await signer.ethcallProvider?.all([
          wethOraclePriceCall,
          reservesCtxPoolCall,
          totalSupplyCall,
          ctxTotalSupplyCall,
          foundersTotalCall,
          initialIncentiveCall,
          initialIncentiveCall2,
          multisigCall,
          treasuryTotalCall,
        ]);
        const currentPriceETH = ethers.utils.formatEther(wethOraclePrice.mul(10000000000));
        const currentPriceCTX = await getPriceInUSDFromPair(
          reservesCtxPool[0],
          reservesCtxPool[1],
          parseFloat(currentPriceETH)
        );
        setCtxPrice(currentPriceCTX.toString());
        setTotalStaked(ethers.utils.formatEther(totalSupply));

        const circulatingSupply =
          ctxTotalSupply
            .sub(foundersTotal)
            .sub(initialIncentive)
            .sub(initialIncentive2)
            .sub(multisig)
            .sub(treasuryTotal);
        const marketCap = parseFloat(ethers.utils.formatEther(circulatingSupply)) * currentPriceCTX;
        setMarketCap(marketCap.toFixed(4));
      }
    }; 
    load();
  }, [signer.ethcallProvider, contracts]);  

  const apr = (): string => {
    const currentDate = new Date();
    if (parseFloat(totalStaked) > 0 && currentDate > apyShowDate) {
      const a = Math.round(((4 * sixMonthCtxRewardAmount) / parseFloat(totalStaked)) * 100);
      return a
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        .concat("%");
    }
    return "-";
  };

  const iconItem = (item: IconType, index: number) => (
    <a
      key={index}
      href={item.href}
      rel="noreferrer"
      target="_blank"
      className="icon-link"
    >
      <img
        src={item.icon}
        className={"governance-icon ".concat(item.class)}
        alt={item.alt}
      /> 
    </a>
  )

  const item = (feature: GovernanceType) => (
    <a
      key={feature.id}
      href={feature.link}
      rel="noreferrer"
      target="_blank"
      className="box box-button governance-item"
    >
      <div className="governance-item-content">
        <h3 className="terciary-header">
          {feature.title}
        </h3>              
        <p className="subtitle">
          {parse(feature.info.replace("{apr_value}", apr()))}
        </p>
       </div> 
      <div className="governance-item-footer">
        <FaArrowRight className="item-icon"size={20} />
      </div>
    </a>
  );
  
  return (
    <div id="governance" className="section-governance">
      <h1 className="header">
        CTX: Decentralized Protocol Governance
      </h1>
      <div className="governance-content">
        <div className="box governance-main">
          <div className="info-top">
            <p className="subtitle">
              CTX is an ERC-20 utility and governance token with various use cases within
              the Cryptex Finance ecosystem. CTX token holders can vote on upgrades and management
              of the Cryptex treasury, create proposals and vote on said proposals, such as
              continued incentives for product development and other solutions to advance the
              Cryptex decentralized autonomous organization (DAO).
            </p>
            <div className="icons">
              {governanceIcons.map((govIcon, index) => {
                return iconItem(govIcon, index);
              })}
            </div>
          </div>
          <div className="info-bottom">
            <div className="hl-divider" />
            <div className="prices">
              <div className="market-cap-box">
                <NumericFormat
                  className="number-pink"
                  value={marketCap}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  decimalScale={2}
                />
                <span className="label-all">
                  CTX Market Cap.
                </span>
              </div>
              <div  className="vl-divider" />
              <div className="price-box">
                <div className="price-value">
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
                  <span className="label label-mobile">
                    CTX Price
                  </span>
                </div>
                <img src={ctxIcon} className="coin-icon" alt="CTX" />
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
    </div>
  )
}

export default SectionGovernance;
