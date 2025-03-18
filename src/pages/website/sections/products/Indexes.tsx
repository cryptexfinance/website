import React, { useMemo } from "react"
import { Image, Stack } from "react-bootstrap"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import { useIndexDataFromGraph } from "../../../../hooks/indexes"
import { SupportedIndex } from "../../../../constants/indexes"

import tcapLogo from '../../../../../static/website/icons/tcap.png'
import ethLogo from '../../../../../static/website/icons/eth.png'
import usdcLogo from '../../../../../static/website/icons/usdc.png'
import cbBtcLogo from '../../../../../static/website/icons/cbbtc.png'
import lBtcLogo from '../../../../../static/website/icons/lbtc.png'

import aaveMarkLogo from '../../../../../static/website/ecosystem/aavemark-purple.png'
import baseLogo from '../../../../../static/website/ecosystem/base-wordmark.png'
import chainlinkLogo from '../../../../../static/website/ecosystem/chainlink-white.png'
import uniswapLogo from '../../../../../static/website/ecosystem/uniswap_light.png'



const collateralsIcons = [ethLogo, usdcLogo, cbBtcLogo, lBtcLogo]

const Indexes = () => {
  const { t } = useTranslation()
  
  return (
    <Stack
      direction="vertical"
      className="justify-content-between line-down fast products tcap-v2 ps-4 pe-1"
      gap={2}
      style={{ flex: "unset", height: "25rem" }}
    >
      <Stack className="tcapv2-top">
        <Stack direction="vertical" gap={1} style={{ flex: "unset" }}>
          <Stack direction="horizontal" gap={2} className="tcapv2-header">
            <Image className="index-icon align-items-center" src={tcapLogo} width={38} height={38} />
            <h1 className="mb-0">Total Crypto Market Cap Index</h1>
          </Stack>
          <p className="ps-2 text-grey-light">
            TCAP is an ERC20 token that tokenizes the Total market capitalization of the entire cryptocurrency market.
            You can acquire TCAP by minting it through vaults or purchasing it from the Uniswap ETH/TCAP DEX pool.
          </p>
        </Stack>
        <div className="products-detail-container w-100">
          <Stack direction="horizontal" gap={0} className="products-header">
            <Stack className="w-40">
              <span className="product-title asset">TCAP Vaults Collaterals</span>
            </Stack>
            <Stack className="w-30 text-right">
              <span className="product-title asset">TCAP Price</span>
            </Stack>
            <Stack className="w-30 text-right">
              <span className="product-title asset">24h Price Change</span>
            </Stack>
          </Stack>
          <div className="products-detail" style={{ minHeight: "5rem", overflowY: "unset" }}>
            <TcapRow />
          </div>
        </div>
        <Stack direction="horizontal" gap={2} className="aave-info align-items-center px-2">
          <Image className="aave-icon" src={aaveMarkLogo} width={26} />
          <h6 className="mb-0 text-grey-light">
            With TCAP 2.0 earn real-world yield on your collateral via AAVE pass-through vaults.
          </h6>
        </Stack>
      </Stack>
      <Stack direction="horizontal" gap={1} className="partners align-self-center align-items-center justify-content-end px-5 w-90">
        <Stack direction="vertical" gap={1} className="partner-item align-items-center justify-content-center">
          <span className="text-grey text-center bold">Live On</span>
          <Image src={baseLogo} width={85} />
        </Stack>
        <Stack direction="vertical" gap={0} className="partner-item align-items-center justify-content-center">
          <span className="w-100 text-grey text-center bold">Powered By</span>
          <Image src={chainlinkLogo} width={120} />
        </Stack>
        <Stack direction="vertical" gap={0} className="partner-item align-items-center justify-content-center">
          <span className="text-grey bold">Deployed On</span>
          <Image src={uniswapLogo} width={130} />
        </Stack>
      </Stack>
    </Stack>
  )
}


const TcapRow = () => {
  const { data } = useIndexDataFromGraph(SupportedIndex.tcap)
  const breakpoints = useBreakpoint();

  const { currentPrice, percentChange, isPositiveChange } = useMemo(() => {
    if (!data) return { currentPrice: "-", percentChange: "-", isPositiveChange: true }

    return {
      currentPrice: `$${data.lastPrice.value.toFixed(2)}`,
      percentChange: `${data.percent24hChange.change.toFixed(2)}%`,
      isPositiveChange: data.percent24hChange.isPositive,
    }
  }, [data])

  return (
    <a
      className="w-100 mx-0 product-row dark my-0 px-3"
      href={"https://app.cryptex.finance/"}
      target="_blank"
      rel="noreferrer"
    >
      <Stack
        direction="horizontal"
        className={`product-row-item indexes-header mobile-header ${!breakpoints.sm ? "w-40" : "w-100"}`}
        gap={2}
      >
        <span className="product-title only-mobile">TCAP Collaterals</span>
        <Stack direction="horizontal" gap={!breakpoints.sm ? 2 : 4}>
          {collateralsIcons.map((icon, index) => (
            <Image key={`cr-${index.toString()}`} src={icon} height={32} width={32} />
          ))}
        </Stack>  
      </Stack>
      <Stack direction="horizontal" className={`product-row-item text-right ${!breakpoints.sm ? "w-30" : "w-100"}`}>
        <span className="product-title only-mobile">TCAP Price</span>
        <span className={`product-value w-100 text-right ${isPositiveChange ? "text-green" : "text-red"}`} style={{ fontSize: "1.1rem" }}>
          {currentPrice}
        </span>
      </Stack>
      <Stack className={`product-row-item text-right justify-content-center ${!breakpoints.sm ? "w-30" : "w-100"}`}>
        <span className="product-title only-mobile">24h Change</span>
        <span className={`product-value ${isPositiveChange ? "text-green" : "text-red"}`} style={{ fontSize: "1.1rem" }}>
          {percentChange}
        </span>
      </Stack>
    </a>
  )
}

export default Indexes

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
