import React, { useState } from "react";
import { Contract } from "ethers-multicall";
import { IContractsContext } from "../context";

export const useContracts = (): IContractsContext => {
  const [tcapOracleRead, setTcapOracleRead] = useState<Contract>();
  const [wethOracleRead, setWethOracleRead] = useState<Contract>();
  const [ctxUniPairRead, setCtxUniPairRead] = useState<Contract>();

  const setCurrentTcapOracleRead = React.useCallback((currentTcapOracleRead: Contract): void => {
    setTcapOracleRead(currentTcapOracleRead);
  }, []);
  const setCurrentWethOracleRead = React.useCallback((currentWethOracleRead: Contract): void => {
    setWethOracleRead(currentWethOracleRead);
  }, []);
  const setCurrentCtxUniPairRead = React.useCallback((currentCtxUniPairRead: Contract): void => {
    setCtxUniPairRead(currentCtxUniPairRead);
  }, []);

  return {
    tcapOracleRead,
    setCurrentTcapOracleRead,
    wethOracleRead,
    setCurrentWethOracleRead,
    ctxUniPairRead,
    setCurrentCtxUniPairRead,
  };
};
