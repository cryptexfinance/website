import React, { useEffect, useMemo, useState } from "react"
import { ethers } from "ethers"
import { Col, Image, Spinner, Stack } from "react-bootstrap"
import { Big6Math, formatBig6USDPrice } from "@perennial/sdk"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import tcapLogo from '../../../../../static/website/icons/tcap.png'
import { useMarketSnapshots } from "../../../../hooks/markets"
import { VaultSnapshot } from "../../../../hooks/marketsV1"
import { useTcapPriceChanges } from "../../../../hooks/graph"

import { nextPosition } from "../../../../utils/positionUtils"


const MarketTcapRow = ({ index, tcapSnapshot, showOI }: { index: number, tcapSnapshot: VaultSnapshot, showOI: boolean }) => {
  const darkRow = index % 2 === 0
  const { data: pricesData, error } = useTcapPriceChanges()
  const { longSnapshot, shortSnapshot } = tcapSnapshot
  const tcapPrice = parseFloat(ethers.formatEther(longSnapshot.latestVersion.price))
  const longGlobalPosition = nextPosition(longSnapshot.pre, longSnapshot.position)
  const shortGlobalPosition = nextPosition(shortSnapshot.pre, shortSnapshot.position)
  const tcapLiquidity = {
    long: Big6Math.fromFloatString((parseFloat(ethers.formatEther(longGlobalPosition.maker)) * tcapPrice).toString()),
    short: Big6Math.fromFloatString((parseFloat(ethers.formatEther(shortGlobalPosition.maker)) * tcapPrice).toString())
  }
  const globalOpenInterest = {
    long: Big6Math.fromFloatString(ethers.formatEther(longSnapshot.openInterest.taker)),
    short: Big6Math.fromFloatString(ethers.formatEther(shortGlobalPosition.taker))
  }

  const { currentPrice, changeIsNegative, changePercent } = useMemo(() => {
    if (pricesData && pricesData.answerUpdateds) {
      const prices = pricesData.answerUpdateds

      if (prices.length > 0) {
        const currentPrice = parseFloat(ethers.formatEther(BigInt(prices[0].answer)))
        const price24H = prices.length > 1
          ? parseFloat(ethers.formatEther(BigInt(prices[prices.length - 1].answer)))
          : currentPrice
        
        return {
          currentPrice,
          changeIsNegative: currentPrice - price24H < 0,
          changePercent: ((currentPrice - price24H) / currentPrice) * 100
        }
      }      
    }

    return {
      currentPrice: tcapPrice,
      changeIsNegative: false,
      changePercent: 0
    }
  }, [pricesData, error])

  return (
    <a
      key={index.toString()}
      className={"product-row tcap-row ".concat(darkRow ? "dark" : "")}
      href={"https://app.cryptex.finance/perpetuals/?market=tcap"}
      target="_blank"
      rel="noreferrer"
    >
      <Col className="product-row-item tcap-item mobile-header" lg={showOI ? 2 : 4} md={showOI ? 2 : 4} sm={12}>
        <Stack direction="horizontal" gap={2}>
          <Image className="product-logo" src={tcapLogo} width={36} height={36} />
          <Stack direction="vertical" gap={0}>
            <span className="product-value tcap">Total Crypto Market Cap</span>
            <span className="product-subvalue">TCAP-USD</span>
          </Stack>
        </Stack>
        <span className={`product-value price only-mobile ${!changeIsNegative ? "text-green" : "text-red"}`}>
          ${currentPrice.toFixed(2)}
        </span>
      </Col>
      <Col lg={2} md={2} sm={12} className="product-row-item not-on-mobile text-right">
        <span className="product-title only-mobile">Price</span>
        <span className={`product-value price ${!changeIsNegative ? "text-green" : "text-red"}`}>
          ${currentPrice.toFixed(2)}
        </span>
      </Col>
      <Col lg={2} md={2} sm={12} className="product-row-item text-right">
        <span className="product-title only-mobile">24h Change</span>
        <span className={`product-value ${!changeIsNegative ? "text-green" : "text-red"}`}>
          {changePercent.toFixed(2)}%
        </span>
      </Col>
      <Col lg={showOI ? 3 : 4} md={showOI ? 3 : 4} sm={12} className="product-row-item text-right">
        <span className="product-title only-mobile">L/S Liquidity</span>
        <span className="product-value">
          {formatBig6USDPrice(tcapLiquidity.long, { compact: true })} / {formatBig6USDPrice(tcapLiquidity.short, { compact: true })}
        </span>
      </Col>
      {showOI && (
        <Col lg={3} md={3} sm={12} className="product-row-item text-right">
          <span className="product-title only-mobile">L/S Open Interest</span>
          <span className="product-value">
            {formatBig6USDPrice(globalOpenInterest.long, { compact: true })} / {formatBig6USDPrice(globalOpenInterest.short, { compact: true })}
          </span>
        </Col>
      )}
    </a> 
  )  
}

const Perpetuals = () => {
  const { t } = useTranslation()
  const snapshots = useMarketSnapshots()

  const { tcapMarket } = useMemo(() => {
    if (snapshots && snapshots.data) {

      return {
        tcapMarket: snapshots.data?.tcapSnapshot,
      }
    }

    return { tcapMarket: undefined }
  }, [snapshots, snapshots.status])

  return (
    <Stack direction="horizontal" gap={2} className="line-down fast products">
      {tcapMarket ? (
        <div className="products-detail-container w-100">
          <Stack direction="horizontal" gap={0} className="products-header">
            <Col lg={4} md={4}>
              <span className="product-title asset">{t('asset')}</span>
            </Col>
            <Col lg={2} md={2} className="text-right">
              <span className="product-title">{t('price')}</span>
            </Col>
            <Col lg={2} md={2} className="text-right">
              <span className="product-title">{t('chagen24h')}</span>
            </Col>
            <Col lg={4} md={4} className="text-right">
              <span className="product-title">{t('ls-liquidity')}</span>
            </Col>
          </Stack>
          <div className="products-detail">
            <MarketTcapRow key="tcap" index={0} tcapSnapshot={tcapMarket} showOI={false} />
          </div>
        </div>
      ) : (
        <Stack direction="vertical" className="products-loading">
          <Spinner animation="border" variant="primary" />
        </Stack>
      )}
    </Stack>
  )
}

export default Perpetuals


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
