import React, { useMemo } from "react"
import { Image, Spinner, Stack } from "react-bootstrap"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import arfiLogo from '../../../../../static/website/icons/arfi.png'
import baseLogo from '../../../../../static/website/ecosystem/arbitrum-logo-full.png'
import { useSetTokenPrice } from "../../../../hooks/arfi"
import { ComponentMetadata, SetTokenMetadata, SupportedSetTokens } from "../../../../constants/arfi"


const Arfi = () => {
  const { t } = useTranslation()
    
  return (
    <Stack
      direction="vertical"
      className="justify-content-between line-down fast products arfi ps-4 pe-1 mt-3"
      gap={2}
      style={{ flex: "unset", height: "25rem" }}
    >
      <Stack className="tcapv2-top">
        <Stack direction="vertical" gap={1} style={{ flex: "unset" }}>
          <Stack direction="horizontal" gap={2} className="tcapv2-header">
            <Image className="index-icon align-items-center" src={arfiLogo} width={38} height={38} />
            <h1 className="mb-0">Arbitrum DeFi Index</h1>
          </Stack>
          <p className="ps-2 text-grey-light">
            ARFI is an equally-weighted basket index comprising the most popular DeFi tokens on
            the Arbitrum blockchain. It offers diversified exposure to the top assets in this dynamic sector.
          </p>
        </Stack>
        <div className="products-detail-container w-100 mt-4">
          <Stack direction="horizontal" gap={0} className="products-header">
            <Stack className="w-50">
              <span className="product-title asset">ARFI Components</span>
            </Stack>
            <Stack className="w-50 text-right">
              <span className="product-title asset">ARFI Price</span>
            </Stack>
          </Stack>
          <div className="products-detail" style={{ minHeight: "5rem", overflowY: "unset" }}>
            <ArfiRow />
          </div>
        </div>
      </Stack>
      <Stack direction="horizontal" gap={1} className="partners align-self-center align-items-center justify-content-end px-5 w-90">
        <Stack direction="vertical" gap={1} className="partner-item align-items-center justify-content-center">
          <span className="text-grey text-center bold">Live On</span>
          <Image src={baseLogo} width={160} />
        </Stack>
      </Stack>
    </Stack>
  )
}

const ArfiRow = () => {
  const breakpoints = useBreakpoint();
  const { data: setTokenPriceData } = useSetTokenPrice(SupportedSetTokens.arfi);
  const setTokenMetadata = SetTokenMetadata[SupportedSetTokens.arfi];
    
  const { currentPrice } = useMemo(() => {
    if (!setTokenPriceData) return { currentPrice: "-" }

    return {
      currentPrice: `$${setTokenPriceData.priceOneSetToken.toFixed(2)}`,
    }
  }, [setTokenPriceData])

  return (
    <a
      className="w-100 mx-0 product-row dark my-0 px-3"
      href={"https://app.cryptex.finance/arfi"}
      target="_blank"
      rel="noreferrer"
    >
      <Stack
        direction="horizontal"
        className={`product-row-item indexes-header mobile-header ${!breakpoints.sm ? "w-50" : "w-100"}`}
        gap={2}
      >
        <span className="product-title only-mobile">Components</span>
        <Stack direction="horizontal" gap={!breakpoints.sm ? 2 : 4}>
          {setTokenMetadata.components.map((token, index) => (
            <Image key={`cr-${index.toString()}`} className="component-icon" src={ComponentMetadata[token].icon} height={32} width={32} />
          ))}
        </Stack>  
      </Stack>
      <Stack direction="horizontal" className={`product-row-item text-right ${!breakpoints.sm ? "w-50" : "w-100"}`}>
        <span className="product-title only-mobile">ARFI Price</span>
        <span className={`product-value w-100 text-right text-green`} style={{ fontSize: "1.1rem" }}>
          {currentPrice !== "-" ? (
            <>{currentPrice}</>
          ) : (
            <Spinner animation="border" size="sm" className="spinner-green small" />      
          )}  
        </span>
      </Stack>
    </a>
  )
}

export default Arfi;
