import { getContract, Address, WalletClient, PublicClient } from "viem"

import { MarketAbi } from "../abi/Market.abi"
import { OracleAbi } from "../abi/Oracle.abi"
import { KeeperOracleAbi } from "../abi/KeeperOracle.abi"
import { VaultAbi } from "../abi/Vault.abi"


export function getVaultContract(
  vaultAddress: Address,
  publicClient: PublicClient
) {
  return getContract({
    abi: VaultAbi,
    address: vaultAddress,
    publicClient: publicClient,
  });
}

export function getMarketContract(
  marketAddress: Address,
  publicClient: PublicClient
) {
  return getContract({ abi: MarketAbi, address: marketAddress, publicClient });
}

export function getOracleContract(
  oracleAddress: Address,
  publicClient: PublicClient
) {
  return getContract({ abi: OracleAbi, address: oracleAddress, publicClient });
}

export function getKeeperOracleContract(
  keeperOracleAddress: Address,
  publicClient: PublicClient,
  signer?: WalletClient,
) {
  return getContract({ abi: KeeperOracleAbi, address: keeperOracleAddress, publicClient, walletClient: signer })
}

export function getPythProviderContract(
  keeperOracleAddress: Address,
  publicClient: PublicClient
) {
  return getContract({
    abi: KeeperOracleAbi,
    address: keeperOracleAddress,
    publicClient,
  });
}

export function getPythProviderContractWrite(
  keeperOracleAddress: Address,
  walletClient: WalletClient
) {
  return getContract({
    abi: KeeperOracleAbi,
    address: keeperOracleAddress,
    walletClient,
  });
}
