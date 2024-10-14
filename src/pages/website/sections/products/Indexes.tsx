import React from "react"
import { Accordion, Button, Col, Image, Spinner, Stack } from "react-bootstrap"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"

import { useSetTokensSnapshots } from "../../../../hooks/crypdex"
import { SetTokenMetadata, SupportedComponents, SupportedSetTokens } from "../../../../constants/crypdex"
// import { useTcapPriceChanges } from "../../../../hooks/graph"
// import { useMarketSnapshots } from "../../../../hooks/markets"

import { ProductInfoCard } from "../../../../components/ProductInfoCard"
import { Highlight, PurpleText } from "../../../../components/highlights"
import tcapLogo from '../../../../../static/website/icons/tcap.png'

 
const highlights = [
  <Highlight>
    Simplify your crypto strategy with <PurpleText>one-click</PurpleText> index products.
  </Highlight>,
  <Highlight>
    Benefit from <PurpleText>actively managed</PurpleText> and rebalanced crypto indexes.
  </Highlight>,
  <Highlight>
    Stay updated with <PurpleText>real-time pricing</PurpleText> and 24-hour change data.
  </Highlight>,
  <Highlight>
    Trade broad market indexes like <PurpleText>TCAP (Total Crypto Market Cap Index).</PurpleText>
  </Highlight>,
  <Highlight>
    Trade niche markets indexes like <PurpleText>MEEM</PurpleText> (Memecoin Index).
  </Highlight>
];


const Indexes = ({ showAll } : { showAll?: boolean }) => {
  const { t } = useTranslation()
  const { data: setTokens } = useSetTokensSnapshots()
  const [currentIndex, setCurrentIndex] = React.useState("TCAP")

  const onRowClick = (asset: string) => { 
    setCurrentIndex(asset)
  }

  return (
    <Stack direction="horizontal" className="products" gap={3} style={{ padding: "1rem 0.5rem" }} >
      {showAll && (
        <Stack direction="vertical" className="products-info" style={{ width: "50%" }}>
          <ProductInfoCard
            headline="Access diversified crypto exposure through curated indexes"
            highlights={highlights}
            totals={undefined}
          />
        </Stack>
      )}
      <Stack direction="vertical" className="products-metrics indexes" style={{ width: showAll ? "50%" : "100%" }}>
        <Accordion className="only-mobile">
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h6>Details</h6>
            </Accordion.Header>
            <Accordion.Body>
              <ProductInfoCard
                headline="Access diversified crypto exposure through curated indexes"
                highlights={highlights}
                totals={undefined}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {setTokens ? (
          <div className="products-detail-container">
            <Stack direction="horizontal" gap={0} className="products-header">
              <Col lg={6} md={5}>
                <span className="product-title asset">Asset</span>
              </Col>
              <Col lg={6} md={5} className="text-right" />
              {/* <Col lg={3} md={2} className="text-right">
                <span className="product-title">{t('price')}</span>
              </Col>
              <Col lg={3} md={2} className="text-right">
                <span className="product-title">24h Change</span>
              </Col> */}
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
  // const { data } = useSetTokenPrice(setToken)
  // const price = data ? `$${data.priceOneSetToken.toFixed(4)}` : <span>-</span>

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
            <span className="product-value lg">{assetMetada.symbol}</span>
            <span className="product-subvalue lg">{assetMetada.name}</span>
          </Stack>
        </Stack>
        {/* <span className={`product-value price only-mobile text-green`}>
          {price}
        </span> */}
      </Col>
      <Col lg={6} md={6} className="text-right">
        <PurpleText>Coming Soon</PurpleText>
      </Col>
      {/* <Col lg={3} md={2} sm={12} className="product-row-item not-on-mobile text-right">
        <span className="product-title only-mobile">{t('price')}</span>
        <span className={"product-value text-green lg"}>
          {price}
        </span>
      </Col>
      <Col lg={3} md={2} sm={12} className="product-row-item text-right">
        <span className="product-title only-mobile">24h Change</span>
        <span className="product-value text-green lg">
          1.13%
        </span>
      </Col> */}
    </Button>
  )
}

const TcapRow = ({ onRowClick }: { onRowClick: (asset: string) => void }) => {
  // const { data: pricesData, error } = useTcapPriceChanges()
  // const { data: snapshots } = useMarketSnapshots()

  /*const { currentPrice, changeIsNegative, changePercent } = useMemo(() => {
    const tcapSnapshot = snapshots?.tcapSnapshot;
    let tcapPrice = 0;
    if (pricesData && pricesData.answerUpdateds && tcapSnapshot) {
      const { longSnapshot } = tcapSnapshot
      tcapPrice = parseFloat(ethers.formatEther(longSnapshot.latestVersion.price))
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
  }, [pricesData, snapshots, error]) */

  return (
    <Button className={"product-row dark"} style={{ width: "100%" }} onClick={() => onRowClick("TCAP")}>
      <Col className="product-row-item indexes-header mobile-header" lg={8} md={8} sm={12}>
        <Stack direction="horizontal" gap={2}>
          <Image className="product-logo" src={tcapLogo} width={42} height={42} />
          <Stack direction="vertical" gap={0} className="align-items-start">
            <span className="product-value lg">TCAP</span>
            <span className="product-subvalue lg">Cryptex Total Crypto Market Cap Index</span>
          </Stack>
        </Stack>
        {/* <span className={`product-value price only-mobile text-green`}>
          ${currentPrice.toFixed(2)}
        </span> */}
      </Col>
      <Col lg={4} md={4} className="text-right">
        <PurpleText>Coming Soon</PurpleText>
      </Col>
      {/* <Col lg={3} md={2} sm={12} className="product-row-item not-on-mobile text-right">
        <span className={"product-value text-red lg"}>
          ${currentPrice.toFixed(2)}
        </span>
      </Col>
      <Col lg={3} md={2} sm={12} className="product-row-item text-right">
        <span className="product-title only-mobile">24h Change</span>
        <span className={`product-value lg ${changeIsNegative ? "text-red" : "text-green"}`}>
          {changePercent.toFixed(2)}%
        </span>
      </Col> */}
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
