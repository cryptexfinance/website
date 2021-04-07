import React from "react"
import image from "../../../../static/website/about/about.webp"
import audit from "../../../../static/website/about/audit.svg"
import code from "../../../../static/website/about/code.svg"
import oracles from "../../../../static/website/about/oracles.svg"
import whitepaper from "../../../../static/website/about/whitepaper.svg"

const SectionAbout = () => {
  return (
    <section id="about" className="section-about">
      <div className="about-title header">What is TCAP?</div>
      <div className="about-content">
        TCAP gives holders real-time price exposure to total cryptocurrency
        market cap. It's a new, 250% fully backed, fully collateralized asset
        that’s both audited and accurately representative of the entire
        cryptocurrency complex by total market capitalization.
      </div>
      <div className="about-image">
        <img src={image} alt="About" className="about-image" />
      </div>
      <div className="about-details">
        <div className="about-details-item">
          <a
            rel="noopener noreferrer"
            href="./White_Paper.pdf" //{withPrefix('/White_Paper.pdf')}
            target="_blank"
            className="about-details-text"
          >
            <img
              src={whitepaper}
              className="about-details-icons"
              alt="Whitepaper"
            />
            Whitepaper
          </a>
          {/* <Link to="/White_Paper.pdf" rel="noreferrer" target="_blank" className="about-details-text"><img src={whitepaper} className="about-details-icons" alt="Whitepaper" />Whitepaper</Link> */}
        </div>
        <div className="about-details-item">
          <a
            href="https://github.com/cryptexfinance"
            rel="noreferrer"
            target="_blank"
            className="about-details-text"
          >
            <img src={code} className="about-details-icons" alt="Code" />
            Code
          </a>
        </div>
        <div className="about-details-item">
          <a
            href="https://medium.com/cryptexfinance/cryptex-selects-chainlink-to-power-its-flagship-token-tcap-71461e73579f"
            rel="noreferrer"
            target="_blank"
            className="about-details-text"
          >
            <img src={oracles} className="about-details-icons" alt="Oracles" />
            Oracles
          </a>
        </div>
        <div className="about-details-item">
          <a
            rel="noopener noreferrer"
            href="./Cryptex_-_Final_Report.pdf"
            target="_blank"
            className="about-details-text"
          >
            <img src={audit} className="about-details-icons" alt="Audit" />
            Audit
          </a>
          {/* <Link to={auditPDF} rel="noreferrer" target="_blank" className="about-details-text"><img src={audit} className="about-details-icons" alt="Audit" />Audit</Link> */}
        </div>
      </div>
    </section>
  )
}

export default SectionAbout
