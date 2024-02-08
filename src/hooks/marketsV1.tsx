import { AbiCoder, BigNumberish, EventLog, Log, Typed } from "ethers"
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
  totalSupply: bigint
  totalAssets: bigint
  longSnapshot: ProductSnapshot
  shortSnapshot: ProductSnapshot
  longUserSnapshot: UserProductSnapshot
  shortUserSnapshot: UserProductSnapshot
};

export const vaultSnapshotFetcher = async (contracts: IArbContractsContext, vaultAddress: string): Promise<VaultSnapshot | undefined> => {
    
  if (!contracts || !contracts.tcapVault || !contracts.lensV1 || !contracts.tcapLongProduct) return undefined
        
  const vault = contracts.tcapVault
  const lens = contracts.lensV1
  const longProduct = contracts.tcapLongProduct

  const [long, short, latestVersion] = await Promise.all([
    vault.long(),
    vault.short(),
    longProduct.latestVersion(Typed.address(vaultAddress)), 
  ])

  const redemptionsQuery = vault.filters.Redemption(null, null);
  const [longSnapshot, shortSnapshot, longUserSnapshot, shortUserSnapshot, totalSupply, totalAssets, redemptionsAtVersion] =
    await Promise.all([
      lens.snapshot.staticCall(Typed.address(long)),
      lens.snapshot.staticCall(Typed.address(short)),
      lens.snapshot.staticCall(Typed.address(vaultAddress), Typed.address(long)),
      lens.snapshot.staticCall(Typed.address(vaultAddress), Typed.address(short)),
      vault.totalSupply(),
      vault.totalAssets(),
      vault.queryFilter(redemptionsQuery)
    ])

  return {
    long: long.toLowerCase(),
    short: short.toLowerCase(),
    totalSupply,
    totalAssets,
    longSnapshot,
    shortSnapshot,
    longUserSnapshot,
    shortUserSnapshot,
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