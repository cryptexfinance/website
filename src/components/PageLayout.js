import React, { useEffect } from "react";
import { ethers } from "ethers";
import { Contract, Provider } from "ethers-multicall";
import Header from "./Header";
import Footer from "./Footer";
import tcapOracle from "../contracts/tcapOracle.json";
import wethOracle from "../contracts/wethOracle.json";
import ctxUniPair from "../contracts/ctxUniPair.json";
import { contractsContext, signerContext } from "../context";
import { useContracts, useSigner } from "../hooks";
import { getDefaultProvider } from "../utils";

export default ({ children }) => {
  const contracts = useContracts();
  const signer = useSigner();

  useEffect(() => {
    const loadContracts = async () => {
      const provider = getDefaultProvider();
      const randomSigner = ethers.Wallet.createRandom().connect(provider);
      const ethcallProvider = new Provider(randomSigner.provider);

      await ethcallProvider.init();
      signer.setCurrentEthcallProvider(ethcallProvider);

      // Set Contracts
      const currentTcapOracleRead = new Contract(tcapOracle.address, tcapOracle.abi);
      contracts.setCurrentTcapOracleRead(currentTcapOracleRead);
      const currentWethracleRead = new Contract(wethOracle.address, wethOracle.abi);
      contracts.setCurrentWethOracleRead(currentWethracleRead);
      const currentCtxUniPairRead = new Contract(ctxUniPair.address, ctxUniPair.abi);
      contracts.setCurrentCtxUniPairRead(currentCtxUniPairRead);
    };
    loadContracts();
  }, []);

  return (
    <div className="pt-5 mt-5">
      <Header />
      <signerContext.Provider value={signer}>
        <contractsContext.Provider value={contracts}>
          {children}
        </contractsContext.Provider>  
      </signerContext.Provider>  
      <Footer />
    </div>
  );
};
