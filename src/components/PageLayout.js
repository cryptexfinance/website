import React, { useEffect } from "react"
import { ethers } from "ethers"
import { Contract, Provider } from "ethers-multicall"
import Header from "./Header"
import Footer from "./Footer"
import agregatorAbi from "../contracts/agregatorAbi.json"
import tcapOracle from "../contracts/tcapOracle.json"
import jpegzOracle from "../contracts/jpegzOracle.json"
import ctxToken from "../contracts/ctx.json"
import wethOracle from "../contracts/wethOracle.json"
import ctxUniPair from "../contracts/ctxUniPair.json"
import delegatorFactory from "../contracts/delegatorFactory.json"
import { contractsContext, signerContext, arbContractsContext, arbSignerContext } from "../context"
import { useContracts, useSigner, useArbContracts, useArbSigner } from "../hooks"
import { getDefaultProvider, getArbitrumProvider } from "../utils"

const PageLayout = ({ children }) => {
  const contracts = useContracts()
  const signer = useSigner()

  const arbContracts = useArbContracts()
  const arbSigner = useArbSigner()

  const pepeAggregatorAddress = "0x02DEd5a7EDDA750E3Eb240b54437a54d57b74dBE";
  const ethAggregatorAddress = "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612";

  useEffect(() => {
    const loadContracts = async () => {
      const provider = getDefaultProvider()
      const randomSigner = ethers.Wallet.createRandom().connect(provider)
      const ethcallProvider = new Provider(randomSigner.provider)

      const arbitrumProvider = getArbitrumProvider()
      const arbiSigner = ethers.Wallet.createRandom().connect(arbitrumProvider)
      const arbiEthcallProvider = new Provider(arbiSigner.provider)

      await ethcallProvider.init()
      signer.setCurrentEthcallProvider(ethcallProvider)

      await arbiEthcallProvider.init()
      arbSigner.setCurrentEthcallProvider(arbiEthcallProvider)


      // Set Contracts
      const currentTcapOracleRead = new Contract(
        tcapOracle.address,
        tcapOracle.abi
      )
      contracts.setCurrentTcapOracleRead(currentTcapOracleRead)

      const currentCtxTokenRead = new Contract(ctxToken.address, ctxToken.abi)
      contracts.setCurrentCtxTokenRead(currentCtxTokenRead)
      const currentWethracleRead = new Contract(
        wethOracle.address,
        wethOracle.abi
      )
      contracts.setCurrentWethOracleRead(currentWethracleRead)
      const currentCtxUniPairRead = new Contract(
        ctxUniPair.address,
        ctxUniPair.abi
      )
      contracts.setCurrentCtxUniPairRead(currentCtxUniPairRead)
      const currentDelegatorRead = new Contract(
        delegatorFactory.address,
        delegatorFactory.abi
      )
      contracts.setCurrentDelegatorFactoryRead(currentDelegatorRead)

      // Arb contracts
      const currentJpegzOracleRead = new Contract(
        jpegzOracle.address,
        jpegzOracle.abi
      );
      arbContracts.setCurrentJpegzOracleRead(currentJpegzOracleRead);

      const currentPepeOracleRead = new Contract(
        pepeAggregatorAddress,
        agregatorAbi
      )
      arbContracts.setCurrentPepeOracleRead(currentPepeOracleRead);

      const currentEthOracleRead = new Contract(
        ethAggregatorAddress,
        agregatorAbi
      )
      arbContracts.setCurrentEthOracleRead(currentEthOracleRead);
    }
    loadContracts()
  }, [])

  return (
    <div className="pt-5 mt-5">
      <Header />
      <arbContractsContext.Provider value={arbContracts}>
        <arbSignerContext.Provider value={arbSigner}>
          <signerContext.Provider value={signer}>
            <contractsContext.Provider value={contracts}>
              {children}
            </contractsContext.Provider>
          </signerContext.Provider>
        </arbSignerContext.Provider>
      </arbContractsContext.Provider>
      <Footer />
    </div>
  )
}

export default PageLayout
