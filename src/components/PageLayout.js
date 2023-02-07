import React, { useEffect } from "react"
import { ethers } from "ethers"
import { Contract, Provider } from "ethers-multicall"
import Header from "./Header"
import Footer from "./Footer"
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

      const currentJpegzOracleRead = new Contract(
        jpegzOracle.address,
        jpegzOracle.abi
      )
      arbContracts.setCurrentJpegzOracleRead(currentJpegzOracleRead)

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
