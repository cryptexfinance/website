import React from 'react'
import governance from '../../../../static/website/governance/governance.png'
import coinGecko from '../../../../static/website/governance/coin-gecko.svg'
import uniLogo from '../../../../static/website/governance/uni-logo.svg'
import dfpLogo from '../../../../static/website/governance/dfp-logo.svg'
import ctx from '../../../../static/website/governance/ctx.svg'
import docs from '../../../../static/website/governance/docs.svg'
import forum from '../../../../static/website/governance/forum.svg'
import voting from '../../../../static/website/governance/voting.svg'


const SectionGovernance = () => {

  return (
    <section id="governance" className="section-governance">

         
        <div className="governance-title header">What Governs TCAP?</div>
        <div className="governance-content">
            Like a conventional index fund, TCAP.X gives 
            investors real-time price exposure to the total 
            cryptocurrency market cap. Our tokenized 
            investment product is synched via the Cryptex 
            Oracle and Nomics, the market leader in 
            transparent crypto data.
        </div>
        <div className="governance-buttons">
            <a>
                <img src={coinGecko} className="governance-icon gecko" alt="Coin Gecko" />
            </a>
            <a>
                <img src={uniLogo}  className="governance-icon uni" alt="Uni Logo" />
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
                 href="./White_Paper.pdf" 
                 target="_blank"
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
                href="#"
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
                href="#"
                rel="noreferrer"
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
            href="#"
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