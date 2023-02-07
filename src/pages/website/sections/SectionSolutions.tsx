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


  const [tcapPrice, setTcapPrice] = useState("0.00");
  const [tcapTotalCap, setTcapTotalCap] = useState("0.00");
  const [jpegzPrice, setJpegzPrice] = useState("0.00");
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
        setTcapPrice(tPrice);
        setTcapTotalCap(ethers.utils.formatEther(totalTcapPrice));
      }
    };
    load();

    const loadArbitrum = async() => {
      if (arbSigner.ethcallProvider && arbContracts.jpegzOracleRead) {
        const jpegzOraclePriceCall = await arbContracts.jpegzOracleRead?.getLatestAnswer();
        // @ts-ignore
        const [currentJpegzPrice] = await arbSigner.ethcallProvider?.all([jpegzOraclePriceCall]);
        const totalJpegzPrice = currentJpegzPrice.mul(100000000000);
        const jPrice = ethers.utils.formatEther(currentJpegzPrice.mul(10));
        setJpegzPrice(jPrice);
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
        Index Tokens
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
              Real time exposure to total crypto market capitalization. <a className="learn-more-link" href="#">Learn More.</a>
            </p>
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
          <div className="solutions-link inline-helper">
          <a
                className="swap-button same-size-button"
                target={"_blank"}
                href="https://app.cryptex.finance/vault"
                >Mint TCAP</a>
            <a
              className="swap-button-outline pull-right same-size-button"
              href="https://app.uniswap.org/#/swap?exactField=input&outputCurrency=0x16c52CeeCE2ed57dAd87319D91B5e3637d50aFa4"
              rel="noreferrer"
              target={"_blank"}
            >
              Swap on Uniswap
            </a>
          </div>
        </div>
        <div className="box box-button-unclickable solutions-item section-bg-jpegz">
          <div className="solutions-info">
            <h2 className="heading-secondary">
              JPEGz
            </h2>
            <p className="subtitle">
              Real time exposure to NFT market capitalization. <a className="learn-more-link" href="#">Learn More.</a>
            </p>
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
          <div className="solutions-link inline-helper">
          <a
                className="swap-button same-size-button"
                target={"_blank"}
                href="https://app.cryptex.finance/vault"
                >Mint JPEGz</a>
            <a
              className="swap-button-outline pull-right same-size-button"
              href="#"
              rel="noreferrer"
              target={"_blank"}
            >
              Swap on Uniswap
            </a>
          </div>
          </div>
        </div>
      </div>
  );
};

export default SectionProducts;
