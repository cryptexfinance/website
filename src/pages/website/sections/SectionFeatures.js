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
              <div className="features-box-mint">
                <img src={mint} className="features-icons" alt="Mint" />
                <Link href="#" className="features-subtitle heading-secondary">Mint</Link>
                <p className="features-content content">Gain secure access to state of the art cryptocurrency products with Cryptex, a new digital asset management firm.</p>
              </div>
              <div className="features-box-trade">
                <img src={trade} className="features-icons" alt="Trade" />
                <Link href="#" className="features-subtitle heading-secondary">Trade</Link>
                <p className="features-content content">Gain secure access to state of the art cryptocurrency products with Cryptex, a new digital asset management firm.</p>
              </div>
              <div className="features-box-pool">
                <img src={pool} className="features-icons" alt="Pool" />
                <Link href="#" className="features-subtitle heading-secondary">Pool</Link>
                <p className="features-content content">Gain secure access to state of the art cryptocurrency products with Cryptex, a new digital asset management firm.</p>
              </div>
              <div className="features-box-farm">
                <img src={farm} className="features-icons" alt="Farm" />
                <Link href="#" className="features-subtitle heading-secondary">Farm</Link>
                <p className="features-content content">Gain secure access to state of the art cryptocurrency products with Cryptex, a new digital asset management firm.</p>
              </div>
          </div>
      </section>
  )
}

export default SectionFeatures