import React from "react"
import { Col, Image, Spinner, Stack } from "react-bootstrap"
import { useTranslation } from "react-i18next"

import { ProductInfoCard } from "./common"
import { useSetTokenPrice, useSetTokensSnapshots } from "../../../../hooks/crypdex"
import { ComponentMetadata, SetTokenMetadata, SupportedComponents, SupportedSetTokens } from "../../../../constants/crypdex"
import { CustomTooltip } from "../../../../components/Tooltip"


const highlights = [
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Lorem <span className="text-purple" style={{ fontSize: "1.1rem" }}>ipsum dolor</span> sit amet, consectetur.
  </p>,
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Excepteur sint <span className="text-purple" style={{ fontSize: "1.1rem" }}>occaecat cupidatat</span> non proident.
  </p>,
  <p className="no-margin" style={{ fontSize: "1.1rem" }}>
    Sunt in culpa qui officia deserunt <span className="text-purple" style={{ fontSize: "1.1rem" }}> mollit anim</span>.
  </p>
]

export const Indexes = () => {
  const { t } = useTranslation()
  const { data: setTokens } = useSetTokensSnapshots()

  return (
    <Stack direction="horizontal" className="products" gap={3} style={{ padding: "1rem 0.5rem" }} >
      <Stack direction="vertical" className="products-info" style={{ width: "45%" }}>
        <ProductInfoCard
          headline="Ut enim ad minim veniam, quis nostrud exercitation."
          highlights={highlights}
        />
      </Stack>
      <Stack direction="vertical" className="products-metrics" style={{ width: "55%" }}>
        {setTokens ? (
          <div className="products-detail-container">
            <Stack direction="horizontal" gap={0} className="products-header">
              <Col lg={5} md={5}>
                <span className="product-title asset">SetToken</span>
              </Col>
              <Col lg={2} md={2} className="text-right">
                <span className="product-title">{t('price')}</span>
              </Col>
              <Col lg={5} md={5} className="text-right">
                <span className="product-title">Underlying Tokens</span>
              </Col>
            </Stack>
            <div className="products-detail">
              {Object.keys(setTokens.setTokens).map((setToken, index) => {
                const components = setTokens.setTokens[setToken as SupportedSetTokens].components;
                return <IndexRow key={index} index={index} setToken={setToken as SupportedSetTokens} components={components} />
              })}
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

const IndexRow = ({ index, setToken, components }: { index: number, setToken: SupportedSetTokens, components: Array<SupportedComponents> }) => {
  const { t } = useTranslation()
  const assetMetada = SetTokenMetadata[setToken]
  const darkRow = index % 2 === 0
  const { data } = useSetTokenPrice(setToken)
  const price = data ? `$${data.priceOneSetToken.toFixed(4)}` : <span>-</span>

  return (
    <a
      key={`ir-${index.toString()}`}
      className={"product-row ".concat(darkRow ? "dark" : "")}
      href={`https://app.cryptex.finance/?index=${setToken}`}
      target="_blank"
    >
      <Col className="product-row-item indexes-header mobile-header" lg={5} md={5} sm={12}>
        <Stack direction="horizontal" gap={2}>
          <Image className="product-logo" src={assetMetada.icon} width={36} height={36} />
          <Stack direction="vertical" gap={0}>
            <span className="product-value">{assetMetada.symbol}</span>
            <span className="product-subvalue">{assetMetada.name}</span>
          </Stack>
        </Stack>
        <span className={`product-value price only-mobile text-green`}>
          {price}
        </span>
      </Col>
      <Col lg={2} md={2} sm={12} className="product-row-item not-on-mobile text-right">
        <span className="product-title only-mobile">{t('price')}</span>
        <span className={"product-value text-green"}>
          {price}
        </span>
      </Col>
      <div className="h-separator" />
      <Col lg={5} md={5} sm={12} className="product-row-item text-right">
        <Stack direction="horizontal" className="only-mobile" >
          <span className="product-value">Underlying Tokens</span>
        </Stack>
        <Stack direction="horizontal" gap={3} className="justify-content-end">
          {components.map((component, index) => (
            <CustomTooltip
              id={`ct-${index}`}
              msg={ComponentMetadata[component].name}
            >
              <Image key={`cimg-${index}`} className="market-logo" src={ComponentMetadata[component].icon} width={28} height={28} />
            </CustomTooltip>  
          ))}
        </Stack>  
      </Col>
    </a>
  )
}