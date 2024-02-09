import React from "react"
import { Contract } from "ethers"

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
  lensV1?: Contract;
  setCurrentLensV1: (lens: Contract) => void;
  tcapOracle?: Contract;
  setCurrentTcapOracle: (currentOracle: Contract) => void;
  tcapVault?: Contract;
  setCurrentTcapVault: (vault: Contract) => void;
  tcapLongProduct?: Contract;
  setCurrentTcapLongProduct: (c: Contract) => void;
  tcapShortProduct?: Contract;
  setCurrentTcapShortProduct: (c: Contract) => void;
}

export const CONTRACTS_DEFAULT_VALUE = {
  setCurrentTcapOracleRead: () => {},
  setCurrentCtxTokenRead: () => {},
  setCurrentWethOracleRead: () => {},
  setCurrentCtxUniPairRead: () => {},
  setCurrentDelegatorFactoryRead: () => {},
};

export const ARB_CONTRACTS_DEFAULT_VALUE = {
  setCurrentLensV1: () => {},
  setCurrentTcapOracle: () => {},
  setCurrentTcapVault: () => {},
  setCurrentTcapLongProduct: () => {},
  setCurrentTcapShortProduct: () => {},
};

export const contractsContext = React.createContext<IContractsContext>(CONTRACTS_DEFAULT_VALUE);
export const arbContractsContext = React.createContext<IArbContractsContext>(ARB_CONTRACTS_DEFAULT_VALUE);
