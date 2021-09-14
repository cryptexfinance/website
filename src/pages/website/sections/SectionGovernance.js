import React from 'react'
import Col from "react-bootstrap/esm/Col";
import governance from '../../../../static/website/governance/governance.png'
import coinGecko from '../../../../static/website/governance/coin-gecko.svg'
import sushiLogo from '../../../../static/website/governance/sushi-logo.svg'
import dfpLogo from '../../../../static/website/governance/dfp-logo.svg'
import geminiLogo from '../../../../static/website/governance/gemini-hor-white-full.svg'
import ctx from '../../../../static/website/governance/ctx.svg'
import docs from '../../../../static/website/governance/docs.svg'
import forum from '../../../../static/website/governance/forum.svg'
import voting from '../../../../static/website/governance/voting.svg'


const SectionGovernance = () => {

  return (
    <section id="governance" className="section-governance">
      <Col xs={12} sm={12} md={6} lg={4} className="governance-info">
        <div className="governance-title header">Introducing CTX: <br/>Decentralized Governance</div>
        <div className="governance-content">
            CTX is a governance token that powers and secures the Cryptex protocol. 
            Holders of CTX can vote on protocol upgrades for TCAP as well as all 
            future products within the Cryptex ecosystem.
        </div>
        <div className="governance-buttons">
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
      </Col>
      <Col xs={12} sm={12} md={12} lg={5} className="governance-img-container" >
        <div className="governance-image">            
          <img src={governance} alt="Governance" className="governance-image" />
        </div>
      </Col>
      <Col xs={12} sm={12} md={6} lg={3} className="governance-details">
        <div className="governance-details">
            <div className="governance-details-item">
                <a
                 rel="noopener noreferrer"
                 target="_blank"
                 href="https://medium.com/cryptexfinance/introducing-ctx-governance-powering-the-tcap-protocol-c1b32ce084bc"     
                 className="governance-details-text"
                >
                <img
                    src={ctx}
                    className="governance-details-icons"
                    alt="CTX Token"
                />
                    CTX Token
                </a>
            </div>
            <div className="about-details-item">
                <a
                rel="noreferrer"
                target="_blank"
                href=" https://www.withtally.com/governance/cryptex"      
                className="governance-details-text"
                >
                <img src={voting} className="governance-details-icons" alt="Voting" />
                    Voting
                </a>
            </div>
            <div className="governance-details-item">
                <a
                rel="noreferrer"
                href="https://docs.cryptex.finance/"
                target="_blank"      
                className="governance-details-text"
                >
                <img src={docs} className="governance-details-icons" alt="Documentation" />
                    Documentation
                </a>
            </div>
            <div className="governance-details-item">
                <a
                rel="noopener noreferrer"
                href="https://forum.cryptex.finance/"
                target="_blank"
                className="governance-details-text"
                >
                <img src={forum} className="governance-details-icons" alt="Forum" />
                    Forum
                </a>  
            </div>
        </div>
      </Col> 
    </section>
  )
}

export default SectionGovernance
