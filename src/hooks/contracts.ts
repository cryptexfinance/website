import { WalletClient } from 'viem'
import { getContract } from 'wagmi/actions'

import {
  DSUAddresses,
  MarketFactoryAddresses,
  PythFactoryAddresses,
  USDCAddresses,
  VaultFactoryAddresses,
} from '../constants/contracts'
import { useChainId } from '../hooks/network'

import { ERC20Abi } from '../abi/ERC20.abi'
import { MarketFactoryAbi } from '../abi/MarketFactory.abi'
import { VaultFactoryAbi } from '../abi/VaultFactory.abi'
import { PythFactoryAbi } from '../abi/PythFactory.abi'


export const useDSU = (signer?: WalletClient) => {
  const chainId = useChainId()

  return getContract({
    address: DSUAddresses[chainId],
    abi: ERC20Abi,
    chainId,
    walletClient: signer,
  })
}

export const useUSDC = (signer?: WalletClient) => {
  const chainId = useChainId()

  return getContract({
    address: USDCAddresses[chainId],
    abi: ERC20Abi,
    chainId,
    walletClient: signer,
  })
}

export const useMarketFactory = (signer?: WalletClient) => {
  const chainId = useChainId()

  return getContract({
    address: MarketFactoryAddresses[chainId],
    abi: MarketFactoryAbi,
    chainId,
    walletClient: signer,
  })
}

export const useVaultFactory = (signer?: WalletClient) => {
  const chainId = useChainId()

  return getContract({
    address: VaultFactoryAddresses[chainId],
    abi: VaultFactoryAbi,
    chainId,
    walletClient: signer,
  })
}

export const usePythFactory = (signer?: WalletClient) => {
  const chainId = useChainId()

  return getContract({
    address: PythFactoryAddresses[chainId],
    abi: PythFactoryAbi,
    chainId,
    walletClient: signer,
  })
}
