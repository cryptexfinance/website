import React, { useState } from "react";
import { Contract } from "ethers-multicall";
import { IArbContractsContext } from "../context";

export const useArbContracts = (): IArbContractsContext => {
  const [jpegzOracleRead, setJpegzOracleRead] = useState<Contract>();
  const [pepeOracleRead, setPepeOracleRead] = useState<Contract>();

  const setCurrentJpegzOracleRead = React.useCallback((currentJpegzOracleRead: Contract): void => {
    setJpegzOracleRead(currentJpegzOracleRead);
  }, []);
  const setCurrentPepeOracleRead = React.useCallback((currentPepeOracleRead: Contract): void => {
    setPepeOracleRead(currentPepeOracleRead);
  }, []);

  return {
    jpegzOracleRead,
    setCurrentJpegzOracleRead,
    pepeOracleRead,
    setCurrentPepeOracleRead,
  };
};
