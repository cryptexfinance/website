import React, { useContext, useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { contractsContext, signerContext, arbContractsContext, arbSignerContext  } from "../../../context";
import { ethers, utils } from "ethers";
import { NumericFormat } from "react-number-format";
import { getVaultContract } from "../../../components/utils/utils";
import { TOKENS_SYMBOL, VAULTS } from "../../../utils";


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
  // const [jpegzPrice, setJpegzPrice] = useState("3.10");
  // const [jpegzTotalCap, setJpegzTotalCap] = useState("0.00");
  const [pepePrice, setPepePrice] = useState("0.000001262");
  const [ethPrice, setEthPrice] = useState("0.00000");
  const [arbPrice, setArbPrice] = useState("0.00000");
  const [vaultsLiquidity, setVaultsLiquidity] = useState(
    {
      [TOKENS_SYMBOL.arb]: {
        currentLiquidity: 0,
        capacity: 500000,
      },
      [TOKENS_SYMBOL.eth]: {
        currentLiquidity: 0,
        capacity: 6000000,
      },
      [TOKENS_SYMBOL.pepe]: {
        currentLiquidity: 0,
        capacity: 3000000,
      },
      [TOKENS_SYMBOL.tcap]: {
        currentLiquidity: 0,
        capacity: 3000000,
      }
    }
  );
  const [loadingVaultsData, setLoadingVaultsData] = useState(true);
  const contracts = useContext(contractsContext);
  const arbContracts = useContext(arbContractsContext);
  const arbSigner = useContext(arbSignerContext);
  const signer = useContext(signerContext);

  useEffect(() => {
    const loadArbitrum = async () => {
      if (arbSigner.ethcallProvider && arbContracts.arbOracleRead) {
        // const jpegzOraclePriceCall = await arbContracts.jpegzOracleRead?.getLatestAnswer();
        const arbOraclePriceCall = await arbContracts.arbOracleRead?.latestAnswer();
        const ethOraclePriceCall = await arbContracts.ethOracleRead?.latestAnswer();
        const pepeOraclePriceCall = await arbContracts.pepeOracleRead?.latestAnswer();
        const tcapOraclePriceCall = await arbContracts.tcapOracleRead?.latestAnswer();

        // @ts-ignore
        const [currentArbPrice, currentPepePrice, currentEthPrice, currentTcapPrice] = await arbSigner.ethcallProvider?.all([
          arbOraclePriceCall,
          pepeOraclePriceCall,
          ethOraclePriceCall,
          tcapOraclePriceCall,
        ]);
        // const totalJpegzPrice = currentJpegzPrice.mul(10000000000);
        // const jPrice = ethers.utils.formatEther(currentJpegzPrice.mul(10));
        // setJpegzPrice(parseFloat(jPrice).toFixed(2));
        // setJpegzTotalCap(ethers.utils.formatEther(totalJpegzPrice));

        const pPrice = ethers.utils.formatEther(currentPepePrice);
        setPepePrice(parseFloat(pPrice).toFixed(9));
        setEthPrice(ethers.utils.formatEther(currentEthPrice.mul(10000000000)));
        setArbPrice(ethers.utils.formatEther(currentArbPrice.mul(10000000000)));

        const totalTcapPrice = currentTcapPrice.mul(10000000000);
        const tPrice = ethers.utils.formatEther(totalTcapPrice.div(10000000000));
        setTcapPrice(parseFloat(tPrice).toFixed(2));
        setTcapTotalCap(ethers.utils.formatEther(totalTcapPrice));
      }
    }
    loadArbitrum();

    if (typeof (dataq.site) !== "undefined") {
      setSiteUrl(dataq.site.siteMetadata.siteUrl)
    } else {
      console.log("Error with props in team");
    }
  }, [signer.ethcallProvider, arbSigner.ethcallProvider]);

  useEffect(() => {
    const loadVaultsLiquidity = async () => {
      if (arbSigner.ethcallProvider) {
        const vLiquidity = vaultsLiquidity;
        const arbVault = getVaultContract(VAULTS.arbAddress);
        const ethVault = getVaultContract(VAULTS.ethAddress);
        const pepeVault = getVaultContract(VAULTS.pepeAddress);
        const tcapVault = getVaultContract(VAULTS.tcapAddress);

        const liquidityCalls = [
          await arbVault.totalAssets(),
          await arbVault.maxCollateral(),
          await ethVault.totalAssets(),
          await ethVault.maxCollateral(),
          await pepeVault.totalAssets(),
          await pepeVault.maxCollateral(),
          await tcapVault.totalAssets(),
          await tcapVault.maxCollateral(),
        ];

        // @ts-ignore
        const [
          arbCurrentLiquidity,
          arbCapacity,
          ethCurrentLiquidity,
          ethCapacity,
          pepeCurrentLiquidity,
          pepeCapacity,
          tcapCurrentLiquidity,
          tcapCapacity,
        ] = await arbSigner.ethcallProvider?.all(liquidityCalls);


        vaultsLiquidity[TOKENS_SYMBOL.arb].currentLiquidity = parseFloat(utils.formatEther(arbCurrentLiquidity));
        vaultsLiquidity[TOKENS_SYMBOL.arb].capacity = parseFloat(utils.formatEther(arbCapacity));
        vaultsLiquidity[TOKENS_SYMBOL.eth].currentLiquidity = parseFloat(utils.formatEther(ethCurrentLiquidity));
        vaultsLiquidity[TOKENS_SYMBOL.eth].capacity = parseFloat(utils.formatEther(ethCapacity));
        vaultsLiquidity[TOKENS_SYMBOL.pepe].currentLiquidity = parseFloat(utils.formatEther(pepeCurrentLiquidity));
        vaultsLiquidity[TOKENS_SYMBOL.pepe].capacity = parseFloat(utils.formatEther(pepeCapacity));
        vaultsLiquidity[TOKENS_SYMBOL.tcap].currentLiquidity = parseFloat(utils.formatEther(tcapCurrentLiquidity));
        vaultsLiquidity[TOKENS_SYMBOL.tcap].capacity = parseFloat(utils.formatEther(tcapCapacity));

        setVaultsLiquidity(vLiquidity);
        setLoadingVaultsData(false);
      }
    };

    loadVaultsLiquidity();
  }, [arbSigner.ethcallProvider]);

  return (
    <div id="solutions" className="section-solutions">
      <h1 className="header">
        Markets
      </h1>
      <div className="solutions">
        <div className="box box-button-unclickable solutions-item section-bg-tcap">
          <div className="solutions-info">
            <h2 className="heading-secondary">
              TCAP
            </h2>
            <div className="clearfix" />
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
              <p className="subtitle">
                <span className="number-blue">
                  <NumericFormat
                    className="number-blue"
                    value={
                      !loadingVaultsData ? vaultsLiquidity[TOKENS_SYMBOL.tcap].currentLiquidity : 0
                    }
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                    suffix=" / "
                    decimalScale={0}
                  />
                </span>
                <span className="number-blue">
                  <NumericFormat
                    className="number-blue"
                    value={
                      !loadingVaultsData ? vaultsLiquidity[TOKENS_SYMBOL.tcap].capacity : 3000000
                    }
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                    decimalScale={0}
                  />
                </span>
                <br></br>
                Market Liquidity
              </p>
            </div>  
          </div>
          <div className="solutions-link inline-helper">
            <a
              className="button-outlined-purple button-hover-transparent main-button same-size-button"
              target={"_blank"}
              href="https://v2.cryptex.finance/"
            >
              TRADE
            </a>
            <a
              className="button-outlined-purple button-hover-transparent main-button pull-right same-size-button"
              href="https://v2.cryptex.finance/liquidity"
              rel="noreferrer"
              target={"_blank"}
            >
              PROVIDE LIQUIDITY
            </a>
          </div>
        </div>
        <div className="box box-button-unclickable solutions-item section-bg-perpe">
          <div className="solutions-info">
            <h2 className="heading-secondary">
              PERPE
            </h2>
            <p className="subtitle">
              PEPE Perpetual Market with up to 20x leverage.{" "}
              <a className="learn-more-link" href="https://cryptex.finance/blog/2023-08-10-introducing-perpe/">Learn More.</a>
            </p>
            <div className="index-prices">
              <p className="subtitle">
                <span className="number-blue">
                  <NumericFormat
                    className="number-blue"
                    value={pepePrice}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                    decimalScale={9}
                  />
                </span>
                <br></br>
                PEPE Price
              </p>
              <p className="subtitle">
                <span className="number-blue">
                  <NumericFormat
                    className="number-blue"
                    value={
                      !loadingVaultsData ? vaultsLiquidity[TOKENS_SYMBOL.pepe].currentLiquidity : 0
                    }
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                    suffix=" / "
                    decimalScale={0}
                  />
                </span>
                <span className="number-blue">
                  <NumericFormat
                    className="number-blue"
                    value={
                      !loadingVaultsData ? vaultsLiquidity[TOKENS_SYMBOL.pepe].capacity : 3000000
                    }
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                    decimalScale={0}
                  />
                </span>
                <br></br>
                Market Liquidity
              </p>
            </div>
          </div>
          <div className="solutions-link inline-helper">
            <a
              className="button-outlined-purple button-hover-transparent main-button same-size-button"
              target={"_blank"}
              href="https://v2.cryptex.finance/pepe"
            >
              TRADE
            </a>
            <a
              className="button-outlined-purple button-hover-transparent main-button pull-right same-size-button"
              href="https://v2.cryptex.finance/liquidity/pepe"
              rel="noreferrer"
              target={"_blank"}
            >
              PROVIDE LIQUIDITY
            </a>
          </div>
        </div>
        <div className="box box-button-unclickable solutions-item section-bg-eth">
          <div className="solutions-info">
            <h2 className="heading-secondary">
              ETHER
            </h2>
            <p className="subtitle">
              Ethereum Perpetual Market with up to 20x leverage.{" "}
              <a className="learn-more-link" href="https://cryptex.finance/blog/2023-08-24-eth-perpetuals/">Learn More.</a>
            </p>
            <div className="index-prices">
              <p className="subtitle">
                <span className="number-blue">
                <NumericFormat
                  className="number-blue"
                  value={ethPrice}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  decimalScale={2}
                />
                </span>
                <br></br>
                ETH Price
              </p>
              <p className="subtitle">
                <span className="number-blue">
                  <NumericFormat
                    className="number-blue"
                    value={vaultsLiquidity[TOKENS_SYMBOL.eth].currentLiquidity}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                    suffix=" / "
                    decimalScale={0}
                  />
                </span>
                <span className="number-blue">
                  <NumericFormat
                    className="number-blue"
                    value={vaultsLiquidity[TOKENS_SYMBOL.eth].capacity}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                    decimalScale={0}
                  />
                </span>
                <br></br>
                Market Liquidity
              </p>
            </div>
          </div>
          <div className="solutions-link inline-helper">
            <a
              className="button-outlined-purple button-hover-transparent main-button same-size-button"
              target={"_blank"}
              href="https://v2.cryptex.finance/eth"
            >
              TRADE
            </a>
            <a
              className="button-outlined-purple button-hover-transparent main-button pull-right same-size-button"
              href="https://v2.cryptex.finance/liquidity/eth"
              rel="noreferrer"
              target={"_blank"}
            >
              PROVIDE LIQUIDITY
            </a>
          </div>
        </div>
        <div className="box box-button-unclickable solutions-item section-bg-arb">
          <div className="solutions-info">
            <h2 className="heading-secondary">
              ARBITRUM
            </h2>
            <p className="subtitle">
              Arbitrum Perpetual Market with up to 20x leverage.{" "}
              <a className="learn-more-link" href="https://cryptex.finance/blog/2023-08-31-arb-perpetuals/">Learn More.</a>
            </p>
            <div className="index-prices">
              <p className="subtitle">
              <span className="number-blue">
                <NumericFormat
                  className="number-blue"
                  value={arbPrice}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  decimalScale={2}
                />
                </span>
                <br></br>
                ARB Price
              </p>
              <p className="subtitle">
                <span className="number-blue">
                  <NumericFormat
                    className="number-blue"
                    value={vaultsLiquidity[TOKENS_SYMBOL.arb].currentLiquidity}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                    suffix=" / "
                    decimalScale={0}
                  />
                </span>
                <span className="number-blue">
                  <NumericFormat
                    className="number-blue"
                    value={vaultsLiquidity[TOKENS_SYMBOL.arb].capacity}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                    decimalScale={0}
                  />
                </span>
                <br></br>
                Market Liquidity
              </p>
            </div>
          </div>
          <div className="solutions-link inline-helper">
            <a
              className="button-outlined-purple button-hover-transparent main-button same-size-button"
              target={"_blank"}
              href="https://v2.cryptex.finance/arb"
            >
              TRADE
            </a>
            <a
              className="button-outlined-purple button-hover-transparent main-button pull-right same-size-button"
              href="https://v2.cryptex.finance/liquidity/arb"
              rel="noreferrer"
              target={"_blank"}
            >
              PROVIDE LIQUIDITY
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionProducts;
