import React, { useEffect } from "react"
import { ethers } from "ethers"
import { Contract, Provider } from "ethers-multicall"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Header from "./Header"
import Footer from "./Footer"
import agregatorAbi from "../abi/artifacts/agregatorAbi.json"
import tcapOracle from "../abi/artifacts/tcapOracle.json"
import jpegzOracle from "../abi/artifacts/jpegzOracle.json"
import ctxToken from "../abi/artifacts/ctx.json"
import wethOracle from "../abi/artifacts/wethOracle.json"
import ctxUniPair from "../abi/artifacts/ctxUniPair.json"
import delegatorFactory from "../abi/artifacts/delegatorFactory.json"
import { contractsContext, signerContext, arbContractsContext, arbSignerContext } from "../context"
import { useContracts, useSigner, useArbContracts, useArbSigner } from "../hooks"
import { getDefaultProvider, getArbitrumProvider } from "../utils"
import { Hour } from "../utils/timeUtils"


const tanstackQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number(1n * Hour) * 1000, // 1 hour in ms
    },
  },
})

const PageLayout = ({ children }) => {
  const contracts = useContracts()
  const signer = useSigner()

  const arbContracts = useArbContracts()
  const arbSigner = useArbSigner()

  const arbAggregatorAddress = "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6";
  const ethAggregatorAddress = "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612";
  const pepeAggregatorAddress = "0x02DEd5a7EDDA750E3Eb240b54437a54d57b74dBE";
  const tcapAggregatorAddress = "0x4763b84cdBc5211B9e0a57D5E39af3B3b2440012";

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
      const currentArbOracleRead = new Contract(
        arbAggregatorAddress,
        agregatorAbi
      );
      arbContracts.setCurrentArbOracleRead(currentArbOracleRead);

      const currentEthOracleRead = new Contract(
        ethAggregatorAddress,
        agregatorAbi
      );
      arbContracts.setCurrentEthOracleRead(currentEthOracleRead);  

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

      const currentTcapArbOracleRead = new Contract(
        tcapAggregatorAddress,
        agregatorAbi
      )
      arbContracts.setCurrentTcapOracleRead(currentTcapArbOracleRead);
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
              <QueryClientProvider client={tanstackQueryClient}>
                {children}
              </QueryClientProvider>
            </contractsContext.Provider>
          </signerContext.Provider>
        </arbSignerContext.Provider>
      </arbContractsContext.Provider>
      <Footer />
    </div>
  )
}

export default PageLayout
