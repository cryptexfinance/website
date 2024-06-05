import { getContract, Address, PublicClient } from "viem"

import { KeeperOracleAbi } from "../abi/KeeperOracle.abi"
import { VaultAbi } from "../abi/Vault.abi"


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

export function getKeeperOracleContract(
  keeperOracleAddress: Address,
  publicClient: PublicClient,
) {
  return getContract({ abi: KeeperOracleAbi, address: keeperOracleAddress, client: { public: publicClient } })
}
