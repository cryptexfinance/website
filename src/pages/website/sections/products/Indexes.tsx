import React from "react"
import { Button, Col, Image, Spinner, Stack } from "react-bootstrap"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"

import ProductInfoCard from "./common"
import { useSetTokenPrice, useSetTokensSnapshots } from "../../../../hooks/crypdex"
import { SetTokenMetadata, SupportedComponents, SupportedSetTokens } from "../../../../constants/crypdex"
import tcapLogo from '../../../../../static/website/icons/tcap.png'

 
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
];


const Indexes = () => {
  const { t } = useTranslation()
  const { data: setTokens } = useSetTokensSnapshots()
  const [currentIndex, setCurrentIndex] = React.useState("TCAP")

  const onRowClick = (asset: string) => { 
    setCurrentIndex(asset)
  }

  return (
    <Stack direction="horizontal" className="products" gap={3} style={{ padding: "1rem 0.5rem" }} >
      <Stack direction="vertical" className="products-metrics" style={{ width: "50%" }}>
        {setTokens ? (
          <div className="products-detail-container">
            <Stack direction="horizontal" gap={0} className="products-header">
              <Col lg={6} md={5}>
                <span className="product-title asset">Asset</span>
              </Col>
              <Col lg={3} md={2} className="text-right">
                <span className="product-title">{t('price')}</span>
              </Col>
              <Col lg={3} md={2} className="text-right">
                <span className="product-title">24h Change</span>
              </Col>
            </Stack>
            <div className="products-detail" style={{ paddingRight: "1rem" }}>
              <TcapRow onRowClick={onRowClick} />
              {Object.keys(setTokens.setTokens).map((setToken, index) => {
                const components = setTokens.setTokens[setToken as SupportedSetTokens].components;
                return <IndexRow key={index} index={index} setToken={setToken as SupportedSetTokens} onRowClick={onRowClick} components={components} />
              })}
            </div>
          </div>
        ) : (
          <Stack direction="vertical" className="products-loading">
            <Spinner animation="border" variant="primary" />
          </Stack>  
        )}
      </Stack>
      <Stack direction="vertical" className="products-info indexes" style={{ width: "50%" }}>
        {currentIndex === "TCAP" ? (
          <ProductInfoCard headline="Ut enim ad minim veniam, quis nostrud exercitation." highlights={highlights} totals={undefined} />
        ) : (
          <IndexesInfo />
        )}
      </Stack>
    </Stack>
  )
}

const IndexRow = ({
  index,
  setToken,
  components,
  onRowClick,
} : {
  index: number,
  setToken: SupportedSetTokens,
  components: Array<SupportedComponents>
  onRowClick: (asset: string) => void
}) => {
  const { t } = useTranslation()
  const assetMetada = SetTokenMetadata[setToken]
  const darkRow = index % 2 === 0
  const { data } = useSetTokenPrice(setToken)
  const price = data ? `$${data.priceOneSetToken.toFixed(4)}` : <span>-</span>

  return (
    <Button
      key={`ir-${index.toString()}`}
      className={"product-row ".concat(darkRow ? "" : "")}
      style={{ width: "100%" }}
      onClick={() => onRowClick(assetMetada.symbol)}
    >
      <Col className="product-row-item indexes-header mobile-header" lg={6} md={5} sm={12}>
        <Stack direction="horizontal" gap={2}>
          <Image className="product-logo" src={assetMetada.icon} width={42} height={42} />
          <Stack direction="vertical" gap={0} className="align-items-start">
            <span className="product-value" style={{ fontSize: "1.3rem" }}>{assetMetada.symbol}</span>
            <span className="product-subvalue" style={{ fontSize: "0.9rem" }}>{assetMetada.name}</span>
          </Stack>
        </Stack>
        <span className={`product-value price only-mobile text-green`}>
          {price}
        </span>
      </Col>
      <Col lg={3} md={2} sm={12} className="product-row-item not-on-mobile text-right">
        <span className="product-title only-mobile">{t('price')}</span>
        <span className={"product-value text-green"} style={{ fontSize: "1.2rem" }}>
          {price}
        </span>
      </Col>
      {/* <div className="h-separator" /> */}
      <Col lg={3} md={2} sm={12} className="product-row-item text-right">
        <span className="product-value text-green" style={{ fontSize: "1.2rem" }}>
          1.13%
        </span>
      </Col>
      {/* <Col lg={3} md={3} sm={12} className="product-row-item text-right">
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Image key={`cimg-${index}`} className="market-logo" src={ethLogo} width={30} height={30} />
          <Image key={`cimg-${index}`} className="market-logo" src={baseLogo} width={30} height={30} />
        </Stack>
      </Col> */}
      {/* <Col lg={3} md={3} sm={12} className="product-row-item text-right">
        <RowButton title="Issue" />
        <RowButton title="Trade" />
      </Col> */}
    </Button>
  )
}

const TcapRow = ({ onRowClick } : { onRowClick: (asset: string) => void }) => (
  <Button className={"product-row dark"} style={{ width: "100%" }} onClick={() => onRowClick("TCAP")}>
    <Col className="product-row-item indexes-header mobile-header" lg={6} md={5} sm={12}>
      <Stack direction="horizontal" gap={2}>
        <Image className="product-logo" src={tcapLogo} width={42} height={42} />
        <Stack direction="vertical" gap={0} className="align-items-start">
          <span className="product-value" style={{ fontSize: "1.2rem" }}>TCAP</span>
          <span className="product-subvalue" style={{ fontSize: "0.9rem" }}>Total Crypto Market Cap</span>
        </Stack>
      </Stack>
      <span className={`product-value price only-mobile text-green`} style={{ fontSize: "1.3rem" }}>
        $247.59
      </span>
    </Col>
    <Col lg={3} md={2} sm={12} className="product-row-item not-on-mobile text-right">
      <span className={"product-value text-red"} style={{ fontSize: "1.2rem" }}>
        $247.59
      </span>
    </Col>
    <Col lg={3} md={2} sm={12} className="product-row-item text-right">
      <span className="product-value text-red" style={{ fontSize: "1.2rem" }}>
        -0.54%
      </span>
    </Col>
    {/* <Col lg={3} md={3} sm={12} className="product-row-item text-right">
      <Stack direction="horizontal" gap={2} className="justify-content-end">
        <Image className="market-logo" src={ethLogo} width={30} height={30} />
        <Image className="market-logo" src={arbLogo} width={30} height={30} />
      </Stack>
    </Col> */}
    {/* <Col lg={3} md={3} sm={12} className="product-row-item text-right">
      <RowButton title="Trade" />
    </Col> */}
  </Button>
)

const IndexesInfo = () => (
  <Stack
    direction="vertical"
    gap={4}
    className="product-info-card p-3 w-100"
  >
    <h3 className="text-purple">MEEM Index</h3>
    <p>
      MEEM is an equally-weighted basket index comprising the most popular memecoins on the Ethereum blockchain, plus ETH.
      It offers diversified exposure to the top assets in this dynamic sector.
    </p>
    <Stack direction="vertical" gap={2}>
      <h6 className="text-purple">Criteria:</h6>
      <p>To be included in MEEM, a component must:</p>
      <ol>
        <li>Be classified as a memecoin (except ETH)</li>
        <li>Rank in the top 100 by market cap on CoinGecko or CoinMarketCap</li>
        <li>Have sufficient liquidity on the Ethereum blockchain</li>
      </ol>
    </Stack>
    <Stack direction="vertical" gap={2}>
      <h6 className="text-purple">Components</h6>
      <ul>
        <li>
          20% Dogecoin (DOGE)
        </li>
        <li>20% Shiba Inu (SHIB)</li>
        <li>20% Pepe (PEPE)</li>
        <li>20% Floki Inu (FLOKI)</li>
        <li>20% Ethereum (ETH)</li>
      </ul>
    </Stack>
    <Stack direction="vertical" gap={2}>
      <p>
        The quantities of each token required to create the MEEM index were chosen based on the following prices from the 12th of July:
      </p>
      <ul>
        <li>Doge: $0.1069</li>
        <li>Shib: $0.00001628</li>
        <li>Pepe: $0.000009016</li>
        <li>Floki: $0.0001446</li>
        <li>Eth: $3107.44</li>
      </ul>
      <p>
        Subsequently, the weights were calculated to achieve a total index price of $10.
      </p>
    </Stack>
    <Stack direction="vertical" gap={2}>
      <h6 className="text-purple">Rebalancing:</h6>
      <p>
        The index is rebalanced monthly at the end of each calendar month.
      </p>
    </Stack>
    <Stack direction="vertical" gap={2}>
      <h6 className="text-purple">Management:</h6>
      <p>
        The Cryptex DAO oversees MEEM, maintaining component weightings and managing inclusions or exclusions to ensure the
        index remains representative of the ethereum memecoin market.
      </p>
    </Stack>
    <Stack direction="vertical" gap={2}>
      <h6 className="text-purple">Fees:</h6>
      <p>
        The protocol will apply a streaming fee equivalent to 0.75% APR of the Total Value Locked (TVL) as rebalancing charges.
        The fee charged for managing the MEEM index will be sent to the cryptex treasury.
      </p>
    </Stack>
  </Stack>
)

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
