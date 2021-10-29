import React from "react"

export const faq = [
  {
    group_key: "tcap",
    group_name: "What is TCAP?",
    questions: [
      {
        question: "Is TCAP live yet?",
        answer:
          <div className="answer">
            TCAP is live! You can use TCAP by visiting app.cryptex.finance. We recommend you give our testnet a spin first to get familiar with the protocol by visiting{" "}
            <a href="https://medium.com/cryptexfinance/how-to-use-tcap-on-testnet-a0cef1c1f19c" target="_blank">
              https://medium.com/cryptexfinance/how-to-use-tcap-on-testnet-a0cef1c1f19c
            </a>
          </div>,
      },
      {
        question: "TCAP includes EVERY coin and token?",
        answer:
          <div className="answer">
            TCAP includes every coin and token supported by the following 9 oracles and 5 data providers{" "}
            <a href="https://data.chain.link/ethereum/mainnet/indexes/mcap-usd" target="_blank">
               https://data.chain.link/ethereum/mainnet/indexes/mcap-usd.
            </a>        
          </div>  
      },
      {
        question: "Who is TCAP for?",
        answer:
          <div className="answer">
            TCAP is for users that want to speculate in the total cryptocurrency market by buying a token that is the representation of the entire market.
            It’s also for DeFi users that want to earn fees by minting TCAP tokens and adding liquidity on decentralized exchanges or taking advantage of
            arbitrage opportunities.
          </div>
      },
      {
        question: "Is TCAP decentralized?",
        answer:
          <div className="answer">
            TCAP uses Developer Keys to pause deposits and minting in case of a bug to protect users, this can only be activated once per vault.
            To change protocol parameters a governance token CTX is used in combination with a Timelock contract.
          </div>
      },
      {
        question: "Where can I get TCAP?",
        answer: <div className="answer">TCAP is available to be minted on the Cryptex app, or traded on Sushiswap. TCAP is also available on Gemini for custody.</div>
      },
    ]  
  },
  {
    group_key: "tcap-work",    
    group_name: "How does TCAP work?",
    questions: [
      {
        question: "Is TCAP audited?",
        answer:
          <div className="answer">
            Yes! TCAP is audited by Quantstamp, the leader in blockchain security. See{" "}
            <a href="https://cryptex.finance/Cryptex_-_Final_Report.pdf" target="_blank">https://cryptex.finance/Cryptex_-_Final_Report.pdf.</a>
          </div>
      },
      {
        question: "What is TCAP backed by?",
        answer: <div className="answer">Each TCAP is collateralized by more than 150% corresponding amount of ETH or DAI.</div>
      },
      {
        question: "How is TCAP pegged to the price of total crypto market cap?",
        answer:
          <div className="answer">
            TCAP uses Chainlink oracles which enables Cryptex to aggregate multiple data points from the top crypto data providers in the world,
            bringing that data on chain using Ethereum smart contracts.
          </div>
      },
      {
        question: "Why would I mint TCAP over trading it? (note collateral ratio)",
        answer:
          <div className="answer">
            There are various strategies that can be employed when minting TCAP.Traders may use TCAP to speculate longing/ shorting the total crypto market
            cap. Remember when minting TCAP that there is a 150 % minimum collateral ratio to prevent users from getting liquidated.
          </div>    
      },
      {
        question: "Why is the TCAP market price different from the oracle price?",
        answer:
          <div className="answer">
            The Cryptex protocol is able to control the price to which TCAP is minted at, but not for what it sells at on the secondary market.
            The team is currently building Vaults V2 which will help keep TCAP closer to its peg.
          </div>
      },
      {
        question: "Are there any fees?",
        answer:
          <div className="answer">
            There are no fees for buying, selling, or holding TCAP on the secondary market. There are also no fees for minting new TCAP within the Cryptex protocol,
            however there is a 1% burn fee which goes towards funding future Cryptex DAO activities.
          </div>      
      },
    ]    
  },
  {
    group_key: "ctx",    
    group_name: "CTX FAQ",
    questions: [
      {
        question: "What is CTX (and Cryptex as a DAO)?",
        answer:
          <div className="answer">
            CTX is an ERC20 token powering the Cryptex protocol.The Cryptex protocol is a DAO specializing in bringing traditional assets to the decentralized world.
            You can vote on DAO proposals with the CTX token.
          </div>    
      },
      {
        question: "Who is CTX for?",
        answer: <div className="answer">CTX is for anyone wishing to participate in governance for the Cryptex DAO. Holders can vote on and create proposals.</div>,
      },
      {
        question: "Where can I find CTX?",
        answer: <div className="answer">CTX is currently available on Gemini and Sushiswap for trading.</div>,
      },
      {
        question: "What's the total supply of CTX, and how much is in circulation?",
        answer:
          <div className="answer">
            CTX has a max supply of 10,000,000. Of the max supply, the circulating supply is reduced by:<br /><br />
            <ul>
              <li>The DAO treasury itself, which is controlled by Crypt Keeper delegators.</li>
              <li>The time-locked Founder's Fund.</li>
              <li>Initial Protocol Incentives.</li>
            </ul>
            Furthermore, a maximum 2% supply inflation is hardcoded into the protocol, which, in the case of a black swan event, is available only
            by governance proposals. For more information, please see the detailed breakdown of the circulating supply available on CoinGecko.
          </div>,
      },
    ]
  },
  {
    group_key: "cryptex",  
    group_name: "Cryptex FAQ",
    questions: [
      {
        question: "Is there a whitepaper?",
        answer:
          <div className="answer">
            Yes! See <a href="https://cryptex.finance/White_Paper.pdf" target="_blank">https://cryptex.finance/White_Paper.pdf.</a>
          </div>,
      },
      {
        question: "Did Joe really pitch the Winklevoss twins?",
        answer:
          <div className="answer">
            People ask all the time how we got on Gemini; Joe just tells them: Well, I was eating pizza in the west village in 2019, the twins ran by me,
            I chased them 6 blocks and pitched them in the middle of the street. I lost half a slice that day, it was like 95 out and I had to run my
            ass off because those two “jog” like I run. Thankfully the light turned red. They were very polite and cordial. Asked if I had a card,
            I said no I was just eating pizza. They gave me someone on their team to email and it went from there for 2 years.
          </div>,
      },
      {
        question: "How did the team meet?",
        answer:
          <div className="answer">
            The story involves hiding out in the basement of a deli gathering intel as part of an investigation, but we don't want to spoil
            it... check out TCAP's backstory on{" "}
            <a href="https://defiprime.com/tcap" target="_blank">https://defiprime.com/tcap.</a>
          </div>,
      },
      {
        question: "When did the team start building TCAP?",
        answer: <div className="answer">We started building Cryptex in October of 2018, and launched it on April 8th, 2021.</div>, 
      },
      {
        question: "What is Cryptex's mission?",
        answer:
          <div className="answer">
            The mission of Cryptex is to get TCAP, CTX, and any subsequent launches that we have, into the hands of as many people around the world as we can.
            We want to do that safely, we want to do that securely, and we want to do that on a trustless basis. That’s something that we work
            for every minute of every day accomplishing as a decentralized community.
          </div>,
      },
      {
        question: "How can I work with Cryptex?",
        answer:
          <div className="answer">
            The Cryptex DAO is always looking for contributors. Are you a developer, artist, writer, or looking to help in any way?
            Hop in the Cryptex Discord and send us a message{" "}
            <a href="https://discord.gg/cryptex" target="_blank">https://discord.gg/cryptexs.</a>
          </div>,
      },
    ]  
  }
];