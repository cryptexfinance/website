import React, { useState } from "react";
import { Contract } from "ethers-multicall";
import { IArbContractsContext } from "../context";

export const useArbContracts = (): IArbContractsContext => {
  const [jpegzOracleRead, setJpegzOracleRead] = useState<Contract>();

  const setCurrentJpegzOracleRead = React.useCallback((currentJpegzOracleRead: Contract): void => {
    console.log("setCurrentJpegzOracleRead: ", currentJpegzOracleRead)
    setJpegzOracleRead(currentJpegzOracleRead);
  }, []);

  return {
    jpegzOracleRead,
    setCurrentJpegzOracleRead,
  };
};
