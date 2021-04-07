import React from 'react'
import mint from '../../../../static/website/features/mint.svg'
import trade from '../../../../static/website/features/trade.svg'
import pool from '../../../../static/website/features/pool.svg'
import farm from '../../../../static/website/features/farm.svg'
import appEndpoint from '../../../endpoint';

const SectionFeatures = () => {
  // const appEndpoint = "https://rinkeby.cryptex.finance/";
  return (
      <section id="features" className="section-features">
          <div className="features-title header">
            How to Use TCAP
          </div>
          <div className="features-row row">
            <a href="https://app.cryptex.finance/vault" rel="noreferrer" target="_blank">
              <div className="features-box-mint">
                <img src={mint} className="features-icons" alt="Mint" />
                <div className="features-subtitle heading-secondary">Mint</div>
                <p className="features-content content">Create and approve a vault, add collateral and begin minting TCAP.</p>
              </div>
            </a>
            <a href="https://app.sushi.com/pair/0xa87e2c5d5964955242989b954474ff2eb08dd2f5" rel="noreferrer" target="_blank">
              <div className="features-box-trade">
                <img src={trade} className="features-icons" alt="Trade" />
                <div className="features-subtitle heading-secondary">Trade</div>
                <p className="features-content content">Buy and sell TCAP on Sushiswap.</p>
              </div>
            </a>
            <a href="https://app.cryptex.finance/pools" rel="noreferrer" target="_blank">
              <div className="features-box-pool">
                <img src={pool} className="features-icons" alt="Pool" />
                <div className="features-subtitle heading-secondary">Pool</div>
                <p className="features-content content">Provide liquidity to TCAP pairs on Sushiswap and earn a portion of the trading fees.</p>
              </div>
            </a>
            <a href="https://app.cryptex.finance/farm" rel="noreferrer" target="_blank">
              <div className="features-box-farm">
                <img src={farm} className="features-icons" alt="Farm" />
                <div className="features-subtitle heading-secondary">Farm</div>
                <p className="features-content content">Earn CTX Rewards for minting TCAP tokens and Staking TCAP LP tokens.</p>
              </div>
            </a>
          </div>
      </section>
  )
}

export default SectionFeatures