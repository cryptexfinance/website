import React, { useState } from "react";
import { Contract } from "ethers-multicall";
import { IArbContractsContext } from "../context";

export const useArbContracts = (): IArbContractsContext => {
  const [jpegzOracleRead, setJpegzOracleRead] = useState<Contract>();
  const [pepeOracleRead, setPepeOracleRead] = useState<Contract>();
  const [ethOracleRead, setEthOracleRead] = useState<Contract>();
  const [arbOracleRead, setArbOracleRead] = useState<Contract>();

  const setCurrentJpegzOracleRead = React.useCallback((currentJpegzOracleRead: Contract): void => {
    setJpegzOracleRead(currentJpegzOracleRead);
  }, []);
  const setCurrentPepeOracleRead = React.useCallback((currentPepeOracleRead: Contract): void => {
    setPepeOracleRead(currentPepeOracleRead);
  }, []);
  const setCurrentEthOracleRead = React.useCallback((currentEthOracleRead: Contract): void => {
    setEthOracleRead(currentEthOracleRead);
  }, []);
  const setCurrentArbOracleRead = React.useCallback((currentArbOracleRead: Contract): void => {
    setArbOracleRead(currentArbOracleRead);
  }, []);

  return {
    jpegzOracleRead,
    setCurrentJpegzOracleRead,
    pepeOracleRead,
    setCurrentPepeOracleRead,
    ethOracleRead,
    setCurrentEthOracleRead,
    arbOracleRead,
    setCurrentArbOracleRead,
  };
};
