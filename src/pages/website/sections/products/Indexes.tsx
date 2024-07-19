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
    <Stack direction="horizontal" className="indexes" gap={3} style={{ padding: "1rem 0.5rem" }} >
      <Stack direction="vertical" className="indexes-info" style={{ width: "45%" }}>
        <ProductInfoCard
          headline="Ut enim ad minim veniam, quis nostrud exercitation."
          highlights={highlights}
        />
      </Stack>
      <Stack direction="vertical" className="indexes-metrics" style={{ width: "55%" }}>
        {setTokens ? (
          <div className="markets-detail-container">
            <Stack direction="horizontal" gap={0} className="markets-header">
              <Col lg={5} md={5}>
                <span className="market-title asset">SetToken</span>
              </Col>
              <Col lg={2} md={2} className="text-right">
                <span className="market-title">{t('price')}</span>
              </Col>
              <Col lg={5} md={5} className="text-right">
                <span className="market-title">Underlying Tokens</span>
              </Col>
            </Stack>
            <div className="markets-detail">
              {Object.keys(setTokens.setTokens).map((setToken, index) => {
                const components = setTokens.setTokens[setToken as SupportedSetTokens].components;
                return <IndexRow key={index} index={index} setToken={setToken as SupportedSetTokens} components={components} />
              })}
            </div>
          </div>
        ) : (
          <Stack direction="vertical" className="markets-loading">
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

  return (
    <a
      key={index.toString()}
      className={"market-row ".concat(darkRow ? "dark" : "")}
      href={`https://app.cryptex.finance/?index=${setToken}`}
      target="_blank"
    >
      <Col className="market-row-item mobile-header" lg={5} md={5} sm={12}>
        <Stack direction="horizontal" gap={2}>
          <Image className="market-logo" src={assetMetada.icon} width={36} height={36} />
          <Stack direction="vertical" gap={0}>
            <span className="market-value">{assetMetada.symbol}</span>
            <span className="market-subvalue">{assetMetada.name}</span>
          </Stack>
        </Stack>
        <span className={`market-value price only-mobile text-green`}>
          $10
        </span>
      </Col>
      <Col lg={2} md={2} sm={12} className="market-row-item not-on-mobile text-right">
        <span className="market-title only-mobile">{t('price')}</span>
        <span className={"market-value text-green"}>
          {data ? `$${data.priceOneSetToken.toFixed(4)}` : <span>-</span>}
        </span>
      </Col>
      <Col lg={5} md={5} sm={12} className="market-row-item text-right">
        <Stack direction="horizontal" gap={2} className="justify-content-end">
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