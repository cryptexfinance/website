import React from "react";
import { Contract } from "ethers-multicall";

export interface IContractsContext {
  tcapOracleRead?: Contract;
  setCurrentTcapOracleRead: (currentOracle: Contract) => void;
  ctxTokenRead?: Contract;
  setCurrentCtxTokenRead: (currentToken: Contract) => void;
  wethOracleRead?: Contract;
  setCurrentWethOracleRead: (currentOracle: Contract) => void;
  ctxUniPairRead?: Contract;
  setCurrentCtxUniPairRead: (currentPair: Contract) => void;
  delegatorFactoryRead?: Contract;
  setCurrentDelegatorFactoryRead: (currentDelegator: Contract) => void;
}

export interface IArbContractsContext {
  jpegzOracleRead?: Contract;
  setCurrentJpegzOracleRead: (currentOracle: Contract) => void;
}

export const CONTRACTS_DEFAULT_VALUE = {
  setCurrentTcapOracleRead: () => {},
  setCurrentCtxTokenRead: () => {},
  setCurrentWethOracleRead: () => {},
  setCurrentCtxUniPairRead: () => {},
  setCurrentDelegatorFactoryRead: () => {},
};

export const ARB_CONTRACTS_DEFAULT_VALUE = {
  setCurrentJpegzOracleRead: () => {},
};

export const contractsContext = React.createContext<IContractsContext>(CONTRACTS_DEFAULT_VALUE);
export const arbContractsContext = React.createContext<IArbContractsContext>(ARB_CONTRACTS_DEFAULT_VALUE);
