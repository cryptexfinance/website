import { BigNumberish, Typed } from "ethers"
import { useQuery } from "@tanstack/react-query"

import { TcapVaultContract } from "../constants/contracts"
import { DefaultChain } from "../constants/network"
import { IArbContractsContext, arbContractsContext } from "../context"
import { useContext } from "react"


export type PositionStruct = {
  maker: bigint;
  taker: bigint;
}

export type PrePositionStruct = {
  oracleVersion: BigNumberish;
  openPosition: PositionStruct;
  closePosition: PositionStruct;
}

export type ProductSnapshot = {
  productInfo: any
  address: string
  rate: bigint
  dailyRate: bigint
  latestVersion: any
  maintenance: bigint
  collateral: bigint
  shortfall: bigint
  pre: PrePositionStruct
  position: PositionStruct
  productFee: bigint
  protocolFee: bigint
  openInterest: PositionStruct
}

export type UserProductSnapshot = {
  productAddress: string;
  userAddress: string;
  collateral: bigint;
  maintenance: BigNumberish;
  pre: PrePositionStruct;
  position: PositionStruct;
  liquidatable: boolean;
  liquidating: boolean;
  openInterest: PositionStruct;
  fees: BigNumberish;
  exposure: BigNumberish;
}

export type VaultSnapshot = {
  long: string
  short: string
  longSnapshot: ProductSnapshot
  shortSnapshot: ProductSnapshot
};

export const vaultSnapshotFetcher = async (contracts: IArbContractsContext, vaultAddress: string): Promise<VaultSnapshot | undefined> => {
    
  if (!contracts || !contracts.tcapVault || !contracts.lensV1 || !contracts.tcapLongProduct) return undefined
        
  // const vault = contracts.tcapVault
  const lens = contracts.lensV1

  const long = "0x1cD33f4e6EdeeE8263aa07924c2760CF2EC8aAD0"
  const short = "0x4243b34374cfB0a12f184b92F52035d03d4f7056"
  const [longSnapshot, shortSnapshot] =
    await Promise.all([
      lens.snapshot.staticCall(Typed.address(long)),
      lens.snapshot.staticCall(Typed.address(short))
    ])

  return {
    long: long.toLowerCase(),
    short: short.toLowerCase(),
    longSnapshot,
    shortSnapshot
  }
}

export const useVaultSnapshot = () => {
  const chainId = DefaultChain.id
  const vaultAddress = TcapVaultContract[DefaultChain.id]
  const contracts = useContext(arbContractsContext)

  return useQuery<VaultSnapshot | undefined>({
    queryKey: ['vaultV1Snapshot', chainId],
    enabled: !!contracts,
    queryFn: async () => {
      return vaultSnapshotFetcher(contracts, vaultAddress)
    }
  })
}