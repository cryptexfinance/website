import React from 'react'
import { Link } from 'gatsby'
// import { Container } from 'react-bootstrap'
import image from '../../../../static/website/about/about.png'
import audit from '../../../../static/website/about/audit.svg'
import code from '../../../../static/website/about/code.svg'
import oracles from '../../../../static/website/about/oracles.svg'
import whitepaper from '../../../../static/website/about/whitepaper.svg'

const SectionAbout = () => {
  return (
      <section id="about" className="section-about">
            <div className="about-title header">
              What is TCAP?
            </div>
            <div className="about-content">
              Like a conventional index fund, TCAP.X gives investors real-time price exposure to the total cryptocurrency market cap. Our tokenized investment product is synched via the Cryptex Oracle and Nomics, the market leader in transparent crypto data. Like a conventional index fund, TCAP.X gives investors real-time price exposure to the total cryptocurrency market cap
            </div>
            <div className="about-image">
              <img src={image} alt="About" className="about-image" />
            </div>
            <div className="about-details">
              <div className="about-details-item">
                <Link to="#" className="about-details-text"><img src={whitepaper} className="about-details-icons" alt="Whitepaper" />Whitepaper</Link>
              </div>
              <div className="about-details-divisor"></div>
              <div className="about-details-item">
                <Link to="#" className="about-details-text"><img src={code} className="about-details-icons" alt="Code" />Code</Link>
              </div>
              <div className="about-details-divisor"></div>
              <div className="about-details-item">
                <Link to="#" className="about-details-text"><img src={oracles} className="about-details-icons" alt="Oracles" />Oracles</Link>
              </div>
              <div className="about-details-divisor"></div>
              <div className="about-details-item">
                <Link to="#" className="about-details-text"><img src={audit} className="about-details-icons" alt="Audit" />Audit</Link>
              </div>
            </div>
      </section>
  )
}

export default SectionAbout
