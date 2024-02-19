import React, { useState } from "react"
import { Contract } from "ethers"
import { IArbContractsContext } from "../context"

export const useArbContracts = (): IArbContractsContext => {
  const [tcapOracle, setTcapOracle] = useState<Contract>()
  const [lensV1, setLensV1] = useState<Contract>()
  const [tcapVault, setTcapVault] = useState<Contract>()
  const [tcapLongProduct, setTcapLongProduct] = useState<Contract>()
  const [tcapShortProduct, setTcapShortProduct] = useState<Contract>()

  const setCurrentTcapOracle = React.useCallback((currentTcapOracle: Contract): void => {
    setTcapOracle(currentTcapOracle)
  }, [])
  const setCurrentLensV1 = React.useCallback((cLensV1: Contract): void => {
    setLensV1(cLensV1)
  }, [])
  const setCurrentTcapVault = React.useCallback((currenTcapVault: Contract): void => {
    setTcapVault(currenTcapVault)
  }, [])
  const setCurrentTcapLongProduct = React.useCallback((currenLongProduct: Contract): void => {
    setTcapLongProduct(currenLongProduct)
  }, [])
  const setCurrentTcapShortProduct = React.useCallback((currenShortProduct: Contract): void => {
    setTcapShortProduct(currenShortProduct)
  }, [])

  return {
    tcapOracle,
    setCurrentTcapOracle,
    lensV1,
    setCurrentLensV1,
    tcapVault,
    setCurrentTcapVault,
    tcapLongProduct,
    setCurrentTcapLongProduct,
    tcapShortProduct,
    setCurrentTcapShortProduct
  };
};
