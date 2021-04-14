import React, { useState } from "react"
import Toggle from "../components/Toggle"

const SectionFaq = () => {
  const [expanded, setExpanded] = useState(0)

  const addToExpanded = num => {
    setExpanded(expanded + num)
  }

  const className =
    expanded == 0
      ? "section-faq"
      : expanded == 1
      ? "section-faq expand1"
      : expanded <= 2
      ? "section-faq expand2"
      : expanded <= 4
      ? "section-faq expand4"
      : "section-faq expand6"

  return (
    <section id="faq" className={className}>
      <div className="row">
        <div className="faq-title header">FAQ</div>
        <div className="faq-subtitle content">
          Common questions we are asked.
        </div>
      </div>
      <div className="faq-row row">
        <div className="faq-box">
          <Toggle title="Is TCAP decentralized?" addToExpanded={addToExpanded}>
            <div className="answer">
              TCAP uses Developer Keys to pause deposits and minting in case of
              a bug to protect users, this can only be activated once per vault.
              To change protocol parameters a governance token CTX is used in
              combination with a Timelock contract.
            </div>
          </Toggle>

          <Toggle title="What is TCAP backed by?" addToExpanded={addToExpanded}>
            <div className="answer">
              Each TCAP is collateralized by more than 200% corresponding amount
              of ETH or DAI.
            </div>
          </Toggle>

          <Toggle
            title="TCAP includes EVERY coin and token?"
            addToExpanded={addToExpanded}
          >
            <div className="answer">
              TCAP includes every coin and token supported in one of our crypto
              data providers.
            </div>
          </Toggle>
        </div>

        <div className="faq-main-divider"></div>

        <div className="faq-box">
          <Toggle title="Is TCAP live yet?" addToExpanded={addToExpanded}>
            <div className="answer">
              TCAP is live! You can use TCAP by visiting{" "}
              <a href="https://app.cryptex.finance" target="_blank">
                app.cryptex.finance
              </a>
              . We recommend you give our testnet a spin first to get familiar
              with the protocol by visiting{" "}
              <a
                href="https://medium.com/cryptexfinance/how-to-use-tcap-on-testnet-a0cef1c1f19c"
                target="_blank"
              >
                https://medium.com/cryptexfinance/how-to-use-tcap-on-testnet-a0cef1c1f19c
              </a>
            </div>
          </Toggle>

          <Toggle title="Who is TCAP for?" addToExpanded={addToExpanded}>
            <div className="answer">
              TCAP is for users that want to speculate in the total
              cryptocurrency market by buying a token that is the
              representation of the entire market. It’s also for DeFi
              users that want to earn fees by minting TCAP tokens and
              adding liquidity on decentralized exchanges or taking
              advantage of arbitrage opportunities.
            </div>
          </Toggle>

          <Toggle
            title="How is TCAP pegged to the price of total crypto market cap?"
            addToExpanded={addToExpanded}
          >
            <div className="answer">
              TCAP uses Chainlink oracles which enables Cryptex to aggregate
              multiple data points from the top crypto data providers in the
              world, bringing that data on chain using Ethereum smart contract.
            </div>
          </Toggle>
        </div>
      </div>
    </section>
  )
}

export default SectionFaq
