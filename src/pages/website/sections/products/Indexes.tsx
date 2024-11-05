import React from "react"
import { Button, Col, Image, Spinner, Stack } from "react-bootstrap"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"

import { useSetTokensSnapshots } from "../../../../hooks/crypdex"
import { SetTokenMetadata, SupportedComponents, SupportedSetTokens } from "../../../../constants/crypdex"

import tcapLogo from '../../../../../static/website/icons/tcap.png'


const Indexes = () => {
  const { t } = useTranslation()
  const { data: setTokens } = useSetTokensSnapshots()
  
  return (
    <Stack direction="horizontal" className="line-down fast products" gap={3}>
      {setTokens ? (
        <div className="products-detail-container w-100">
          <Stack direction="horizontal" gap={0} className="products-header">
            <Col lg={6} md={5}>
              <span className="product-title asset">Asset</span>
            </Col>
            <Col lg={6} md={5} className="text-right" />
          </Stack>
          <div className="products-detail">
            <TcapRow />
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
  )
}

const IndexRow = ({
  index,
  setToken,
} : {
  index: number,
  setToken: SupportedSetTokens,
  components: Array<SupportedComponents>
}) => {
  const { t } = useTranslation()
  const assetMetada = SetTokenMetadata[setToken]
  const darkRow = index % 2 === 0
  // const { data } = useSetTokenPrice(setToken)
  // const price = data ? `$${data.priceOneSetToken.toFixed(4)}` : <span>-</span>

  return (
    <Button
      key={`ir-${index.toString()}`}
      className={"w-100 mx-0 product-row ".concat(darkRow ? "" : "")}
      onClick={() => {}}
    >
      <Col className="product-row-item indexes-header mobile-header" lg={6} md={5} sm={12}>
        <Stack direction="horizontal" gap={2}>
          <Image className="product-logo" src={assetMetada.icon} width={42} height={42} />
          <Stack direction="vertical" gap={0} className="align-items-start">
            <span className="product-value lg">{assetMetada.symbol}</span>
            <span className="product-subvalue lg">{assetMetada.name}</span>
          </Stack>
        </Stack>
        {/* <span className={`product-value price only-mobile text-green`}>
          {price}
        </span> */}
      </Col>
      <Col lg={6} md={6} className="text-right">
        <span className="text-purple" style={{ fontSize: "1.1rem" }}>
          Coming Soon
        </span>
      </Col>
    </Button>
  )
}

const TcapRow = () => {
  return (
    <Button className={"w-100 mx-0 product-row dark"} onClick={() => {}}>
      <Col className="product-row-item indexes-header mobile-header" lg={8} md={8} sm={12}>
        <Stack direction="horizontal" gap={2}>
          <Image className="product-logo" src={tcapLogo} width={42} height={42} />
          <Stack direction="vertical" gap={0} className="align-items-start">
            <span className="product-value lg">TCAP 2.0</span>
            <span className="product-subvalue lg">Cryptex Total Crypto Market Cap Index</span>
          </Stack>
        </Stack>
        {/* <span className={`product-value price only-mobile text-green`}>
          ${currentPrice.toFixed(2)}
        </span> */}
      </Col>
      <Col lg={4} md={4} className="text-right">
        <span className="text-purple" style={{ fontSize: "1.1rem" }}>
          Coming Soon
        </span>
      </Col>
    </Button>
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
