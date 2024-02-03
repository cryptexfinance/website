import { getContract, Address, PublicClient } from "viem"

import { MarketAbi } from "../abi/Market.abi"
import { OracleAbi } from "../abi/Oracle.abi"
import { KeeperOracleAbi } from "../abi/KeeperOracle.abi"
import { VaultAbi } from "../abi/Vault.abi"
import { PythFactoryAbi } from "../abi/PythFactory.abi"
import { PythFactoryAddresses } from "../constants/contracts"
import { DefaultChain } from "../constants/network"


export function getVaultContract(
  vaultAddress: Address,
  publicClient: PublicClient
) {
  return getContract({
    abi: VaultAbi,
    address: vaultAddress,
    client: { public: publicClient }
  });
}

export function getMarketContract(
  marketAddress: Address,
  publicClient: PublicClient
) {
  return getContract({ abi: MarketAbi, address: marketAddress, client: { public: publicClient } });
}

export function getOracleContract(
  oracleAddress: Address,
  publicClient: PublicClient
) {
  return getContract({ abi: OracleAbi, address: oracleAddress, client: { public: publicClient } });
}

export function getKeeperOracleContract(
  keeperOracleAddress: Address,
  publicClient: PublicClient,
) {
  return getContract({ abi: KeeperOracleAbi, address: keeperOracleAddress, client: { public: publicClient } })
}

export function getPythProviderContract(
  keeperOracleAddress: Address,
  publicClient: PublicClient
) {
  return getContract({
    abi: KeeperOracleAbi,
    address: keeperOracleAddress,
    client: { public: publicClient }
  });
}

export function getPythFactoryContract(
  publicClient: PublicClient
) {
  return getContract({
    abi: PythFactoryAbi,
    address: PythFactoryAddresses[DefaultChain.id],
    client: { public: publicClient }
  })
}

/* export function getPythProviderContractWrite(
  keeperOracleAddress: Address
) {
  return getContract({
    abi: KeeperOracleAbi,
    address: keeperOracleAddress
  });
} */
