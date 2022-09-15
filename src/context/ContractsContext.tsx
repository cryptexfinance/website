import React from "react";
import { Contract } from "ethers-multicall";

export interface IContractsContext {  
  tcapOracleRead?: Contract;
  setCurrentTcapOracleRead: (currentOracle: Contract) => void;
  wethOracleRead?: Contract;
  setCurrentWethOracleRead: (currentOracle: Contract) => void;
  ctxUniPairRead?: Contract;
  setCurrentCtxUniPairRead: (currentPair: Contract) => void;
}

export const CONTRACTS_DEFAULT_VALUE = {
  setCurrentTcapOracleRead: () => {},
  setCurrentWethOracleRead: () => {},
  setCurrentCtxUniPairRead: () => {},
};

export const contractsContext = React.createContext<IContractsContext>(CONTRACTS_DEFAULT_VALUE);
