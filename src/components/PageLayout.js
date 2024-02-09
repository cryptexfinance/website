import React, { useEffect } from "react"
import { Contract } from "ethers"

import Header from "./Header"
import Footer from "./Footer"
import agregatorAbi from "../abi/artifacts/AgregatorAbi.json"
import ctxToken from "../abi/artifacts/Ctx.json"
import wethOracle from "../abi/artifacts/WethOracle.json"
import ctxUniPair from "../abi/artifacts/CtxUniPair.json"
import delegatorFactory from "../abi/artifacts/DelegatorFactory.json"
import LensV1Abi from "../abi/artifacts/LensV1Abi.json"
import productV1Abi from "../abi/artifacts/ProductV1Abi.json"
import vaultV1Abi from "../abi/artifacts/VaultV1Abi.json"
import tcapOracle from "../abi/artifacts/TcapOracle.json"
import { contractsContext, arbContractsContext } from "../context"
import { useContracts, useArbContracts } from "../hooks"
import { getDefaultProvider, getArbitrumProvider } from "../utils"
import { LensV1Contract, TcapVaultContract, TcapLongMarketContract, TcapShortMarketContract } from "../constants/contracts"
import { DefaultChain } from "../constants/network"


const PageLayout = ({ children }) => {
  const contracts = useContracts()
  const arbContracts = useArbContracts()

  const tcapAggregatorAddress = "0x4763b84cdBc5211B9e0a57D5E39af3B3b2440012";

  useEffect(() => {
    const loadContracts = async () => {
      const mainnetProvider = getDefaultProvider()
      const arbitrumProvider = getArbitrumProvider()

      // Set Contracts
      const currentTcapOracleRead = new Contract(
        tcapOracle.address,
        tcapOracle.abi,
        mainnetProvider
      )
      contracts.setCurrentTcapOracleRead(currentTcapOracleRead)

      const currentCtxTokenRead = new Contract(ctxToken.address, ctxToken.abi, mainnetProvider)
      contracts.setCurrentCtxTokenRead(currentCtxTokenRead)
      const currentWethracleRead = new Contract(
        wethOracle.address,
        wethOracle.abi,
        mainnetProvider
      )
      contracts.setCurrentWethOracleRead(currentWethracleRead)
      const currentCtxUniPairRead = new Contract(
        ctxUniPair.address,
        ctxUniPair.abi,
        mainnetProvider
      )
      contracts.setCurrentCtxUniPairRead(currentCtxUniPairRead)
      const currentDelegatorRead = new Contract(
        delegatorFactory.address,
        delegatorFactory.abi,
        mainnetProvider
      )
      contracts.setCurrentDelegatorFactoryRead(currentDelegatorRead)

      // Arb contracts
      arbContracts.setCurrentLensV1(new Contract(
        LensV1Contract[DefaultChain.id],
        LensV1Abi,
        arbitrumProvider
      ))
      arbContracts.setCurrentTcapOracle(new Contract(
        tcapAggregatorAddress,
        agregatorAbi,
        arbitrumProvider
      ))
      arbContracts.setCurrentTcapVault(new Contract(
        TcapVaultContract[DefaultChain.id],
        vaultV1Abi,
        arbitrumProvider
      ))
      arbContracts.setCurrentTcapLongProduct(new Contract(
        TcapLongMarketContract[DefaultChain.id],
        productV1Abi,
        arbitrumProvider
      ))
      arbContracts.setCurrentTcapShortProduct(new Contract(
        TcapShortMarketContract[DefaultChain.id],
        productV1Abi,
        arbitrumProvider
      ))
    }
    loadContracts()
  },
    // eslint-disable-next-line
    []
  )

  return (
    <div className="pt-5 mt-5">
      <Header />
      <arbContractsContext.Provider value={arbContracts}>
        <contractsContext.Provider value={contracts}>
          {children}
        </contractsContext.Provider>
      </arbContractsContext.Provider>
      <Footer />
    </div>
  )
}

export default PageLayout
