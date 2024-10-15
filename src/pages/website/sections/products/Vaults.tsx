import React, { useMemo } from "react"
import { Col, Image, Spinner, Stack } from "react-bootstrap"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"
import { formatEther } from "viem"
import { NumericFormat } from "react-number-format"
import {
  PerennialVaultType,
  SupportedAsset,
  VaultMetadata,
  VaultSnapshot,
  formatBig18,
  formatBig18USDPrice,
  formatBig6,
  formatBig6Percent,
  formatBig6USDPrice,
} from "@perennial/sdk"

import { useExposureAndFunding, useVault7dMarketData, useVaultSnapshots } from "../../../../hooks/markets"
import { usePerpetualsChainId } from "../../../../hooks/network"
import { AssetMetadata } from "../../../../constants/markets"
import { addPositions, calculateFunding, calculateLeverageBN, nextPosition } from "../../../../utils/positionUtils"
import { useVaultSnapshot } from "../../../../hooks/marketsV1"
import tcapLogo from '../../../../../static/website/icons/tcap.png'


const Vaults = () => {
  const { t } = useTranslation()
  const snapshots = useVaultSnapshots()

  const { vaults } = useMemo(() => {
    if (!snapshots) return { vaults: undefined }

    return {
      vaults: snapshots.data?.vault,
    }
  }, [snapshots])

  return (
    <Stack direction="horizontal" className="products" gap={3} style={{ padding: "1rem 0.5rem" }}>
      <Stack direction="vertical" className="products-metrics vaults w-100" >
        {vaults ? (
          <div className="products-detail-container">
            <Stack direction="horizontal" gap={0} className="products-header">
              <Col lg={5} md={5}>
                <span className="product-title asset">Vault</span>
              </Col>
              <Col lg={4} md={4} className="text-right">
                <span className="product-title asset">Liquidity</span>
              </Col>

              <Col lg={3} md={3} className="text-right">
                <span className="product-title">APR</span>
              </Col>
            </Stack>
            <div className="products-detail">
              {Object.values(vaults ?? {}).map((vaultSnapshot, index) => (
                <VaultItem key={index} index={index} vaultSnapshot={vaultSnapshot} />
              ))}
              <TcapVaultItem index={2} />
            </div>
          </div>
        ) : (
          <Stack direction="vertical" className="products-loading">
            <Spinner animation="border" variant="primary" />
          </Stack>    
        )}
      </Stack>
    </Stack>
  )
}

const VaultItem = ({ index, vaultSnapshot }: { index: number, vaultSnapshot: VaultSnapshot }) => {
  const darkRow = index % 2 === 0
  const { t } = useTranslation()
  const chainId = usePerpetualsChainId()
  const { vaultType, totalAssets, parameter: { cap: maxCollateral } } = vaultSnapshot
  const metadata = VaultMetadata[chainId]?.[vaultType as PerennialVaultType]
  
  const vaultMarketData = useVault7dMarketData()
  const exposureData = useExposureAndFunding({
    chainId,
    vault: vaultSnapshot,
    marketData: vaultMarketData.find((v) => v.data?.vault.vaultAddress === vaultSnapshot.vault)?.data?.marketData,
  })

  const { vaultApr } = useMemo(() => {
    if (!exposureData) return { vaultApr: 0n }

    return {
      vaultApr: (exposureData?.totalFeeAPR || 0n) + (exposureData?.totalFundingAPR || 0n)
    }
  }, [exposureData])

  if (!metadata) return <></>

  return (
    <a
      key={`mr-${metadata.name}`}
      className={"product-row ".concat(darkRow ? "dark" : "")}
      href={`https://app.cryptex.finance/vaults/?vault-type=${vaultType}`}
      target="_blank"
    >
      <Col lg={5} md={5} className="product-row-item mobile-header">
        <Stack direction="horizontal" gap={1}>
          {vaultSnapshot.markets.map((market) => {
            if (vaultType === PerennialVaultType.alpha && market.market === SupportedAsset.btc) {
              return null
            }

            return (
              <Image
                key={"imv-".concat(market.market)}
                className="token-icon margin-right"
                src={AssetMetadata[market.market].icon}
                height={25}
                width={25}
              />
            )
          })}
          <span className="product-value ms-2">{metadata.name}</span>
        </Stack>
      </Col>
      <Col lg={4} md={4} className="product-row-item text-right">
        <span className="product-title only-mobile">Liquidity</span>
        <Stack direction="horizontal" gap={1} className="justify-content-end">
          <NumericFormat
            className="product-value"
            value={formatBig6(totalAssets)}
            displayType="text"
            prefix="$"
            thousandSeparator=","
            decimalScale={0}
          />
          <span className="product-value ms-2 me-2">/</span>
          <span className="product-value">{formatBig6USDPrice(maxCollateral, { compact: true })}</span>
        </Stack>  
      </Col>
      <Col lg={3} md={3} className="product-row-item text-right flex-sm-row">
        <span className="product-title only-mobile">APR</span>
        <span className="product-value text-green">{formatBig6Percent(vaultApr)}</span>
      </Col>
    </a>
  )
}

const TcapVaultItem = ({ index } : { index: number }) => {
  const darkRow = index % 2 === 0
  const { data: vaultSnapshot } = useVaultSnapshot()

  const { maxCollateral, totalAssets, vaultApr } = useMemo(() => {
    if (!vaultSnapshot) return { vaultApr: 0, totalAssets: 0n, maxCollateral: 0n }

    const { longSnapshot, longVaultSnapshot, shortSnapshot, shortVaultSnapshot, totalAssets } = vaultSnapshot

    const price = longSnapshot.latestVersion.price
    const longGlobalPosition = nextPosition(longSnapshot.pre, longSnapshot.position);
    const shortGlobalPosition = nextPosition(shortSnapshot.pre, shortSnapshot.position);
    const userLongPosition = nextPosition(longVaultSnapshot.pre, longVaultSnapshot.position);
    const userShortPosition = nextPosition(shortVaultSnapshot.pre, shortVaultSnapshot.position);
    const userTotalPosition = addPositions(userLongPosition, userShortPosition);
    const leverage = calculateLeverageBN(price, userTotalPosition.maker, totalAssets);

    // Funding = Long(Utilization * Rate * Leverage) + Short(Utilization * Rate * Leverage)
    const longFunding = calculateFunding(
      leverage,
      longSnapshot.rate,
      longGlobalPosition
    )
    const shortFunding = calculateFunding(
      leverage,
      shortSnapshot.rate,
      shortGlobalPosition
    )
    const funding = (longFunding + shortFunding) / 2n
    const fundingApr = formatEther(funding * (60n * 60n * 24n * 365n) * 100n)

    return {
      vaultApr: parseFloat(fundingApr).toFixed(2),
      totalAssets: vaultSnapshot.totalAssets,
      maxCollateral : vaultSnapshot.maxCollateral
    }  
  }, [vaultSnapshot])

  return (
    <a
      key={`mr-tcap`}
      className={"product-row ".concat(darkRow ? "dark" : "")}
      href={`https://app.cryptex.finance/vaults/?vault-type=tcap`}
      target="_blank"
    >
      <Col lg={5} md={5} className="product-row-item">
        <Stack direction="horizontal" gap={1}>  
          <Image key={"imv-tcap"} className="token-icon margin-right" src={tcapLogo} height={25} width={25} />
          <span className="product-value ms-1">TCAP Vault</span>
        </Stack>
      </Col>
      <Col lg={4} md={4} className="product-row-item text-right">
        <span className="product-title only-mobile">Liquidity</span>
        <Stack direction="horizontal" gap={1} className="justify-content-end">
          <NumericFormat
            className="product-value"
            value={formatBig18(totalAssets)}
            displayType="text"
            prefix="$"
            thousandSeparator=","
            decimalScale={0}
          />
          <span className="product-value ms-2 me-2">/</span>
          <span className="product-value">{formatBig18USDPrice(maxCollateral, { compact: true })}</span>
        </Stack>  
      </Col>
      <Col lg={3} md={3} className="product-row-item text-right flex-sm-row">
        <span className="product-title only-mobile">APR</span>
        <span className="product-value text-green">{vaultApr}%</span>
      </Col>
    </a>
  )
}

export default Vaults;

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
