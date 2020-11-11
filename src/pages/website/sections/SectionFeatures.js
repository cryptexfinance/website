import React from 'react'
import { Link } from 'gatsby'
import mint from '../../../../static/website/features/mint.svg'
import trade from '../../../../static/website/features/trade.svg'
import pool from '../../../../static/website/features/pool.svg'
import farm from '../../../../static/website/features/farm.svg'

const SectionFeatures = () => {
  return (
      <section id="features" className="section-features">
          <div className="features-title header">
            How to Use TCAP
          </div>
          <div className="features-row row">
            <Link to="https://app.cryptex.finance/" target="_blank" >
              <div className="features-box-mint">
                <img src={mint} className="features-icons" alt="Mint" />
                <div className="features-subtitle heading-secondary">Mint</div>
                <p className="features-content content">Create and approve a vault, add collateral and begin minting TCAP.</p>
              </div>
            </Link>
            <Link to="https://app.uniswap.org/#/swap" target="_blank" >
              <div className="features-box-trade">
                <img src={trade} className="features-icons" alt="Trade" />
                <div className="features-subtitle heading-secondary">Trade</div>
                <p className="features-content content">Buy and sell TCAP on Uniswap.</p>
              </div>
            </Link>
            <Link to="https://app.uniswap.org/#/pool" target="_blank" >
              <div className="features-box-pool">
                <img src={pool} className="features-icons" alt="Pool" />
                <div className="features-subtitle heading-secondary">Pool</div>
                <p className="features-content content">Provide liquidity to TCAP pairs on Uniswap and earn a portion of the trading fees.</p>
              </div>
            </Link>
            <div>
              <div className="features-box-farm">
                <img src={farm} className="features-icons" alt="Farm" />
                <div className="features-subtitle heading-secondary">Farm</div>
                <p className="features-content content">Coming soon!</p>
              </div>
            </div>
          </div>
      </section>
  )
}

export default SectionFeatures