import React, { useContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import { NumericFormat } from "react-number-format"
import { FaArrowRight } from "react-icons/fa"
import { useTranslation } from "gatsby-plugin-react-i18next"

import ctxIcon from "../../../../static/website/ctx.svg"
import geminiLogo from "../../../../static/website/governance/gemini.svg"
import sushiLogo from "../../../../static/website/governance/sushi-logo.svg"
import uniLogo from "../../../../static/website/governance/uni-logo.svg"
import coinbaseLogo from "../../../../static/website/governance/coinbase.svg"
import huobiLogo from "../../../../static/website/governance/huobi.svg"
import camelotLogo from "../../../../static/website/governance/camelot.svg"
import coingeckoLogo from "../../../../static/website/governance/coingecko.svg"
import traderJoeLogo from "../../../../static/website/governance/traderjoe.png"
import { FOUNDERS_ADDRESS, LIQUIDITY_REWARD2_ADDRESS, LIQUIDITY_REWARD_ADDRESS, MULTISIG_ADDRESS, TREASURY_ADDRESS, getPriceInUSDFromPair } from "../../../utils"
import { contractsContext } from "../../../context"


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
    title: "ctx-governance.proposals",
    info: "ctx-governance.proposals-description",
    link: "https://forum.cryptex.finance/c/proposals/5",
  },
  {
    id: "2",
    title: "ctx-governance.vote",
    info: "ctx-governance.vote-description",
    link: "https://www.tally.xyz/governance/eip155:1:0x874C5D592AfC6803c3DD60d6442357879F196d5b",
  },
  {
    id: "3",
    title: "ctx-governance.staking",
    info: "ctx-governance.staking-description",
    link: "https://v1.cryptex.finance/governance",
  }
]

const governanceIcons = [
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
    href: "https://app.uniswap.org/#/tokens/ethereum/0x321c2fe4446c7c963dc41dd58879af648838f98d",
    icon: uniLogo,
    alt: "Uniswap Logo",
    class: "uniswap",
  },
  {
    href: "https://www.sushi.com/pools/1:0x2a93167ed63a31f35ca4788e2eb9fbd9fa6089d0",
    icon: sushiLogo,
    alt: "Sushiswap Logo",
    class: "",
  },
  {
    href: "https://app.camelot.exchange/nitro/0x444D45d5d9612aBB596420fE81DA41a1aA98CeBa",
    icon: camelotLogo,
    alt: "Camelot Logo",
    class: "",
  },
  {
    href: "https://www.coingecko.com/en/coins/cryptex-finance",
    icon: coingeckoLogo,
    alt: "Coingecko Logo",
    class: "",
  },
  {
    href: "https://traderjoexyz.com/arbitrum/pool/v21/0x84f5c2cfba754e76dd5ae4fb369cfc920425e12b/ETH/50",
    icon: traderJoeLogo,
    alt: "Trader Joe Logo",
    class: "trader-joe",
  },
]

const SectionGovernance = () => {
  const { t } = useTranslation()
  const contracts = useContext(contractsContext)
  const [ctxPrice, setCtxPrice] = useState("0")
  const [marketCap, setMarketCap] = useState("0.0")
  const [totalStaked, setTotalStaked] = useState("0.0")
  // const sixMonthCtxRewardAmount = 12654
  // const apyShowDate = new Date(1633654800 * 1000)

  useEffect(() => {
    const load = async () => {
      if (contracts) {
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
        ] = await Promise.all([
          contracts.wethOracleRead?.getLatestAnswer(),
          contracts.ctxUniPairRead?.getReserves(),
          contracts.delegatorFactoryRead?.totalSupply(),
          contracts.ctxTokenRead?.totalSupply(),
          contracts.ctxTokenRead?.balanceOf(FOUNDERS_ADDRESS),
          contracts.ctxTokenRead?.balanceOf(LIQUIDITY_REWARD_ADDRESS),
          contracts.ctxTokenRead?.balanceOf(LIQUIDITY_REWARD2_ADDRESS),
          contracts.ctxTokenRead?.balanceOf(MULTISIG_ADDRESS),
          contracts.ctxTokenRead?.balanceOf(TREASURY_ADDRESS),
        ])

        if (wethOraclePrice && reservesCtxPool) {
          const currentPriceETH =  ethers.formatEther(BigInt(wethOraclePrice) * 10000000000n)
          const currentPriceCTX = getPriceInUSDFromPair(
            reservesCtxPool[0],
            reservesCtxPool[1],
            parseFloat(currentPriceETH)
          )
          setCtxPrice(currentPriceCTX.toString())
          setTotalStaked(ethers.formatEther(totalSupply))
          const circulatingSupply =
            ctxTotalSupply - foundersTotal - initialIncentive - initialIncentive2 - multisig - treasuryTotal
          const marketCap = parseFloat(ethers.formatEther(circulatingSupply)) * currentPriceCTX
          setMarketCap(marketCap.toFixed(4))
        }
      }
    }; 
    load();
  }, [contracts]);

  /* const apr = (): string => {
    const currentDate = new Date();
    if (parseFloat(totalStaked) > 0 && currentDate > apyShowDate) {
      const a = Math.round(((4 * sixMonthCtxRewardAmount) / parseFloat(totalStaked)) * 100);
      return a
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        .concat("%");
    }
    return "-";
  }; */

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
          {t(feature.title)}
        </h3>              
        <p className="subtitle">
          {t(feature.info)}
          {/* parse(feature.info.replace("{apr_value}", apr())) */}
        </p>
       </div> 
      <div className="governance-item-footer">
        <FaArrowRight className="item-icon"size={20} />
      </div>
    </a>
  )
  
  return (
    <div id="governance" className="section-governance">
      <h1 className="header">
        {t('ctx-governance.title')}
      </h1>
      <div className="governance-content">
        <div className="box governance-main">
          <div className="info-top">
            <p className="subtitle">
              {t('ctx-governance.description')}
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
                  {t('ctx-market-cap')}
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
                    {t('ctx-price')}
                  </span>
                  <span className="label label-mobile">
                    {t('ctx-price')}
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
