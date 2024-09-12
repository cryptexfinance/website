import { SupportedChainId } from "@perennial/sdk";
import { Address, getAddress, getContract, zeroAddress } from "viem"
import { arbitrum, arbitrumSepolia, base, mainnet } from "viem/chains"
import { SupportedChainIdType, getPublicClient } from "./network";

import { ERC20Abi } from '../abi/ERC20.abi'

type AddressMappingPerennial = { [chain in SupportedChainId]: Address };

export type AddressMappingType = { [chain in SupportedChainIdType]: Address };

export const UsdcAddresses: AddressMappingType = {
  [mainnet.id]: getAddress('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'),
  [arbitrum.id]: getAddress("0xaf88d065e77c8cC2239327C5EDb3A432268e5831"),
  [arbitrumSepolia.id]: zeroAddress,
}

export const LensAddresses: AddressMappingPerennial = {
  [arbitrum.id]: getAddress("0x1593318424df66128cb7d0c5574B1283C3A74C3d"),
  [arbitrumSepolia.id]: zeroAddress,
}

export const MarketFactoryAddresses: AddressMappingPerennial = {
  [arbitrum.id]: getAddress('0xDaD8A103473dfd47F90168A0E46766ed48e26EC7'),
  [arbitrumSepolia.id]: getAddress('0x32F3aB7b3c5BBa0738b72FdB83FcE6bb1a1a943c'),
}

export const OracleFactoryAddresses: AddressMappingPerennial = {
  [arbitrum.id]: getAddress('0x8CDa59615C993f925915D3eb4394BAdB3feEF413'),
  [arbitrumSepolia.id]: getAddress('0x9d2CaE012AAe0aE00f4d8F42CD287a6923612456'),
}

export const PythFactoryAddresses: AddressMappingPerennial = {
  [arbitrum.id]: getAddress('0x6b60e7c96B4d11A63891F249eA826f8a73Ef4E6E'),
  [arbitrumSepolia.id]: getAddress('0x92F8d5B8d0ca2fc699c7c540471Ad49724a68007'),
}

// V1 Addresses
export const LensV1Contract = {
  [arbitrum.id]: getAddress("0x1593318424df66128cb7d0c5574B1283C3A74C3d"),
  [arbitrumSepolia.id]: zeroAddress
}

export const TcapVaultContract = {
  [arbitrum.id]: getAddress("0xEa281a4c70Ee2ef5ce3ED70436C81C0863A3a75a"),
  [arbitrumSepolia.id]: zeroAddress,
  [base.id]: zeroAddress
}

export const TcapLongMarketContract = {
  [arbitrum.id]: getAddress("0x1cD33f4e6EdeeE8263aa07924c2760CF2EC8aAD0"),
  [arbitrumSepolia.id]: zeroAddress
};

export const TcapShortMarketContract = {
  [arbitrum.id]: getAddress("0x4243b34374cfB0a12f184b92F52035d03d4f7056"),
  [arbitrumSepolia.id]: zeroAddress
};

export const getERC20Contract = (chainId: SupportedChainIdType, address: Address) => { 
  const publicClient = getPublicClient(chainId)

  return getContract({
    address,
    abi: ERC20Abi,
    client: publicClient,
  })
}
