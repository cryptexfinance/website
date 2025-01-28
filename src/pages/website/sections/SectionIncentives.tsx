import React from "react"
import { Stack } from "react-bootstrap";
// import uniswapLogo from "../../../../static/website/uniswap2.png"


const SectionIncentives = () => {
  const UniswapV3Pool = "https://app.uniswap.org/explore/pools/base/0x2B70CeA59a418d77265482564610EF4D681D5ad6";

  return (
    <Stack
      id="incentives"
      direction="vertical"
      gap={2}
      className="section-incentives align-items-center px-5"
    >
      <h1 className="header line-up">
        CTX Emissions: Rewarding TCAP's Most Active Users!
      </h1>
      <Stack direction="horizontal" gap={0} className="incentives-body py-1 px-3 justify-content-center">
        <Stack className="box incentive-box justify-content-between" gap={2}>
          <Stack direction="vertical" gap={2}>
            <h2>TCAP Liquidity Providers Emissions</h2>
            <Stack direction="vertical" className="ps-1">
              <ul>
                <li>
                  <p style={{ marginBottom: "0rem" }}>
                    A total of <span className="text-purple font-size-1 px-1 bold">178,000 CTX</span> will be distributed among
                    <span className="text-purple font-size-1 px-1 bold">TCAP/ETH pool</span> liquidity providers over six months
                  </p>  
                </li>
                <li>
                  <p style={{ marginBottom: "0rem" }}>
                    TCAP Liquidity must stay <span className="text-purple font-size-1 px-1 bold">in range</span>
                  </p>
                </li>
                <li>
                  <p style={{ marginBottom: "0rem" }}>
                    <span className="text-purple font-size-1 px-1 bold">CTX rewards</span>will be distributed weekly
                  </p>  
                </li>
              </ul>
            </Stack>
          </Stack>
          <Stack direction="horizontal" gap={2}>
            <a
              href="https://app.cryptex.finance/"
              className="button-outlined-purple main-button main-button-link text-center p-2 w-50"
              style={{ fontSize: "1.1rem", backgroundColor: "#0f0f1c", borderWidth: "1px" }}
            >
              Mint TCAP
            </a>
            <a
              href={UniswapV3Pool}
              className="button-outlined-purple main-button main-button-link text-center p-2 w-50"
              style={{ fontSize: "1.1rem", backgroundColor: "#0f0f1c", borderWidth: "1px" }}
            >
              TCAP/ETH Pool 
            </a>
          </Stack>
        </Stack>
        <Stack className="box incentive-box justify-content-between" gap={2}>
          <Stack direction="vertical" gap={2}>
            <h2>TCAP Points Program</h2>
            <Stack direction="vertical" className="ps-1">
              <ul>
                <li>
                  <p style={{ marginBottom: "0rem" }}>
                    Earn <span className="text-purple font-size-1 px-1 bold">1 point</span> with every
                    <span className="text-purple font-size-1 px-1 bold">TCAP/ETH swap</span> greater than $500 total value.
                  </p>  
                </li>
                <li>
                  <p style={{ marginBottom: "0rem" }}>
                    Earn <span className="text-purple font-size-1 px-1 bold">0.15 points</span> per day per TCAP token held in your account
                    that was purchased directly from the <span className="text-purple font-size-1 px-1 bold">Uniswap DEX pool</span>
                  </p>  
                </li>
                <li>
                  <p style={{ marginBottom: "0rem" }}>
                    Now you are ready to participate on the weekly <span className="text-purple font-size-1 px-1 bold">CTX Raffle</span>
                  </p>  
                </li>
              </ul>
            </Stack>
          </Stack>
          <Stack direction="horizontal" gap={2}>
            <a
              href="https://app.cryptex.finance/emissions"
              className="button-outlined-purple main-button main-button-link p-2 text-center w-100"
              style={{ fontSize: "1.1rem", backgroundColor: "#0f0f1c", borderWidth: "1px" }}
            >
              Raffle Comming Soon!
            </a>
          </Stack>  
        </Stack>
      </Stack>
    </Stack>    
  )  
};

export default SectionIncentives;