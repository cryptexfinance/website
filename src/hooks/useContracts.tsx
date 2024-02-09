import React, { useState } from "react";
import { Contract } from "ethers"
import { IContractsContext } from "../context";

export const useContracts = (): IContractsContext => {
  const [tcapOracleRead, setTcapOracleRead] = useState<Contract>();
  const [ctxTokenRead, setCtxTokenRead] = useState<Contract>();
  const [wethOracleRead, setWethOracleRead] = useState<Contract>();
  const [ctxUniPairRead, setCtxUniPairRead] = useState<Contract>();
  const [delegatorFactoryRead, setDelegatorFactoryRead] = useState<Contract>();

  const setCurrentTcapOracleRead = React.useCallback((currentTcapOracleRead: Contract): void => {
    setTcapOracleRead(currentTcapOracleRead);
  }, []);
  const setCurrentCtxTokenRead = React.useCallback((currentCtxTokenRead: Contract): void => {
    setCtxTokenRead(currentCtxTokenRead);
  }, []);
  const setCurrentWethOracleRead = React.useCallback((currentWethOracleRead: Contract): void => {
    setWethOracleRead(currentWethOracleRead);
  }, []);
  const setCurrentCtxUniPairRead = React.useCallback((currentCtxUniPairRead: Contract): void => {
    setCtxUniPairRead(currentCtxUniPairRead);
  }, []);
  const setCurrentDelegatorFactoryRead = React.useCallback((currentDelegatorRead: Contract): void => {
    setDelegatorFactoryRead(currentDelegatorRead);
  }, []);

  return {
    tcapOracleRead,
    setCurrentTcapOracleRead,
    ctxTokenRead,
    setCurrentCtxTokenRead,
    wethOracleRead,
    setCurrentWethOracleRead,
    ctxUniPairRead,
    setCurrentCtxUniPairRead,
    delegatorFactoryRead,
    setCurrentDelegatorFactoryRead,
  };
};
