import React, { useContext, useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { contractsContext, signerContext, arbContractsContext, arbSignerContext  } from "../../../context";
import { ethers } from "ethers";
import { NumericFormat } from "react-number-format";


const SectionProducts = () => {
  const [siteUrl, setSiteUrl] = useState("");
  const dataq = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }`);


  const [tcapPrice, setTcapPrice] = useState("111.30");
  const [tcapTotalCap, setTcapTotalCap] = useState("0.00");
  const [jpegzPrice, setJpegzPrice] = useState("3.10");
  const [jpegzTotalCap, setJpegzTotalCap] = useState("0.00");
  const contracts = useContext(contractsContext);
  const arbContracts = useContext(arbContractsContext);
  const arbSigner = useContext(arbSignerContext);
  const signer = useContext(signerContext);

  useEffect(() => {
    const load = async () => {
      if (signer.ethcallProvider && contracts.tcapOracleRead) {
        const tcapOraclePriceCall = await contracts.tcapOracleRead?.getLatestAnswer();
        // @ts-ignore
        const [currentTcapPrice] = await signer.ethcallProvider?.all([tcapOraclePriceCall]);
        const totalTcapPrice = currentTcapPrice.mul(10000000000);
        const tPrice = ethers.utils.formatEther(totalTcapPrice.div(10000000000));
        setTcapPrice(parseFloat(tPrice).toFixed(2));
        setTcapTotalCap(ethers.utils.formatEther(totalTcapPrice));
      }
    };
    load();

    const loadArbitrum = async() => {
      if (arbSigner.ethcallProvider && arbContracts.jpegzOracleRead) {
        const jpegzOraclePriceCall = await arbContracts.jpegzOracleRead?.getLatestAnswer();
        // @ts-ignore
        const [currentJpegzPrice] = await arbSigner.ethcallProvider?.all([jpegzOraclePriceCall]);
        const totalJpegzPrice = currentJpegzPrice.mul(10000000000);
        const jPrice = ethers.utils.formatEther(currentJpegzPrice.mul(10));
        setJpegzPrice(parseFloat(jPrice).toFixed(2));
        setJpegzTotalCap(ethers.utils.formatEther(totalJpegzPrice));
      }
    }
    loadArbitrum();

    if (typeof (dataq.site) !== "undefined") {
      setSiteUrl(dataq.site.siteMetadata.siteUrl)
    } else {
      console.log("Error with props in team");
    }
  }, [signer.ethcallProvider, arbSigner.ethcallProvider]);

  /* const item = (product: ProductType) => (
    <a
      key={product.id}
      href={siteUrl.concat(product.link)}
      rel="noreferrer"
      className="box box-button products-item"
    >
      <div className="products-info">
        <h2 className="heading-secondary">
          {product.title}
        </h2>
        <p className="subtitle">
          {product.subtitle}
        </p>
      </div>
      <div className="products-link">
        {product.id === "tcap" ?
          (
            <a
              className="link"
              href={siteUrl.concat(product.link)}
              rel="noreferrer"
            >
              Learn More
            </a>
          ) : (
            <a className="link inactive">Coming Soon</a>
          )}
      </div>
    </a>
  ); */

  return (
    <div id="solutions" className="section-solutions">
      <h1 className="header">
        Markets
      </h1>
      <div className="solutions">
        <div
          className="box box-button-unclickable solutions-item section-bg-tcap"
        >
          <div className="solutions-info">

          <h2 className="heading-secondary">
            TCAP
          </h2>

            <div className="clearfix"></div>
            <p className="subtitle">
              Total Crypto Market Cap with up to 20x leverage.{" "}
              <a className="learn-more-link" href="https://cryptexfinance.notion.site/TCAP-Total-Crypto-Market-Cap-b87f0d5331a24b0ba6796f579fe531af">Learn More.</a>
            </p>
            <div className="index-prices">
              <p className="subtitle">
                <span className="number-blue">
                <NumericFormat
                  className="number-blue"
                  value={tcapTotalCap}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  decimalScale={0}
                />
                </span>
                <br></br>
                Total Crypto Market Cap.
              </p>
              <p className="subtitle">
                <span className="number-blue">
                <NumericFormat
                  className="number-blue"
                  value={tcapPrice}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  decimalScale={2}
                />
                </span>
                <br></br>
                TCAP Price
              </p>
            </div>  
          </div>
          <div className="solutions-link inline-helper">
          <a
                className="button-outlined-purple button-hover-transparent main-button same-size-button"
                target={"_blank"}
                href="https://v2.cryptex.finance/"
                >TRADE</a>
            <a
              className="button-outlined-purple button-hover-transparent main-button pull-right same-size-button"
              href="https://v2.cryptex.finance/liquidity"
              rel="noreferrer"
              target={"_blank"}
            >
              PROVIDE
            </a>
          </div>
        </div>
        <div className="box box-button-unclickable solutions-item section-bg-jpegz">
          <div className="solutions-info">
            <h2 className="heading-secondary">
              JPEGz
            </h2>
            <p className="subtitle">
              Blue Chip NFT Market Cap with up to 20x leverage.
            </p>
            <div className="index-prices">
              <p className="subtitle">
                <span className="number-blue">
                <NumericFormat
                  className="number-blue"
                  value={jpegzTotalCap}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  decimalScale={0}
                />
                </span>
                <br></br>
                Total NFT Market Cap.
              </p>
              <p className="subtitle">
              <span className="number-blue">
                <NumericFormat
                  className="number-blue"
                  value={jpegzPrice}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  decimalScale={2}
                />
                </span>
                <br></br>
                JPEGz Price
              </p>
            </div>
          </div>
          <div className="solutions-link inline-helper">
            <h3 className="ml-auto mr-auto">Coming soon...</h3>
          </div>
          </div>
        </div>
      </div>
  );
};

export default SectionProducts;
