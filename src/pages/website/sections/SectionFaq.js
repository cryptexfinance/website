import React, { useState } from 'react'
import Toggle from '../components/Toggle'

const SectionFaq = () => {
  const [expanded, setExpanded] = useState(0)

  const addToExpanded = (num) => {
    setExpanded(expanded+num)
  }

  const className = (expanded == 0 ? "section-faq" : (expanded == 1 ? "section-faq expand1"
                      : (expanded <= 2 ? "section-faq expand2" : (expanded <= 4 ? "section-faq expand4" : "section-faq expand6"))))

  return (
      <section id="faq" className={className}>
        <div className="row">
          <div className="faq-title header">
            FAQ
          </div>
          <div className="faq-subtitle content">Common questions we are asked.</div>
        </div>
        <div className="faq-row row">
          <div className="faq-box">
            
            <Toggle title="Is TCAP decentralized?" addToExpanded={addToExpanded}> 
              <div className="answer">TCAP uses Admin Keys to pause deposits and minting in case of a bug to protect users, also uses the key to change state variables, we are securing this process by adding a timelock of three days, allowing users to see which value is going to change ahead of time. We expect to further decentralize TCAP as time goes on.</div>
            </Toggle>

            <Toggle title="What is TCAP backed by?" addToExpanded={addToExpanded}>
              <div className="answer">Each TCAP is collateralized by more than 250% corresponding amount of ETH, WBTC or DAI.</div>
            </Toggle>

            <Toggle title="TCAP includes EVERY coin and token?" addToExpanded={addToExpanded}>
              <div className="answer">TCAP includes every coin and token supported in one of our crypto data providers.</div>
            </Toggle>
          </div>

          <div className="faq-main-divider"></div>

          <div className="faq-box">

            <Toggle title="Is TCAP live yet?" addToExpanded={addToExpanded}>
              <div className="answer">TCAP is currently live on Rinkeby Testnet, you can try TCAP by going to app.cryptex.finance</div>
            </Toggle>

            <Toggle title="Who is TCAP for?" addToExpanded={addToExpanded}>
              <div className="answer">TCAP is for users that want to speculate in the total crypto currency market by buying a token that it’s the representation of the market. It’s also for DeFi users that want to earn fees by minting TCAP tokens and adding liquidity on decentralized exchanges or taking advantage of arbitrage opportunities.</div>
            </Toggle>

            <Toggle title="How is TCAP pegged to the price of total crypto market cap?" addToExpanded={addToExpanded}> 
              <div className="answer">TCAP uses Chainlink oracles which enables Cryptex to aggregate multiple data points from the top crypto data providers in the world, bringing that data on chain using Ethereum smart contract.</div>
            </Toggle>
          </div>

        </div>
      </section>
  )
}

export default SectionFaq