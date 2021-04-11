import React from 'react'
import governance from '../../../../static/website/governance/governance.png'
import coinGecko from '../../../../static/website/governance/coin-gecko.svg'
import sushiLogo from '../../../../static/website/governance/sushi-logo.svg'
import dfpLogo from '../../../../static/website/governance/dfp-logo.svg'
import ctx from '../../../../static/website/governance/ctx.svg'
import docs from '../../../../static/website/governance/docs.svg'
import forum from '../../../../static/website/governance/forum.svg'
import voting from '../../../../static/website/governance/voting.svg'


const SectionGovernance = () => {

  return (
    <section id="governance" className="section-governance"> 
        <div className="governance-title header">Introducing CTX: <br/>Decentralized Governance</div>
        <div className="governance-content">
            CTX is a governance token that powers and secures the Cryptex protocol. 
            Holders of CTX can vote on protocol upgrades for TCAP as well as all 
            future products within the Cryptex ecosystem.
        </div>
        <div className="governance-buttons">
            <a>
                <img src={coinGecko} className="governance-icon gecko" alt="Coin Gecko" />
            </a>
            <a>
                <img src={sushiLogo}  className="governance-icon uni" alt="Uni Logo" />
            </a>
            <a>
                <img src={dfpLogo} className="governance-icon dfp" alt="DFP"  />        
            </a>
        </div>
        <div className="governance-image">            
            <img src={governance} alt="Governance" className="governance-image" />
        </div>
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
            href="https://discord.com/invite/p3FSPxAxcm"
            target="_blank"
            className="governance-details-text"
            >
            <img src={forum} className="governance-details-icons" alt="Forum" />
                Forum
            </a>
            
        </div>
        </div>
    </section>
  )
}

export default SectionGovernance
