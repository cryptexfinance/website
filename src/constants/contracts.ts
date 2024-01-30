import { Address, getAddress, zeroAddress } from "viem"
import { arbitrum, arbitrumSepolia } from "viem/chains"

import { SupportedChainId } from "./network"

type AddressMapping = { [chain in SupportedChainId]: Address };

export const ControllerAddresses: AddressMapping = {
  [arbitrum.id]: getAddress("0xA59eF0208418559770a48D7ae4f260A28763167B"),
  [arbitrumSepolia.id]: zeroAddress,
}

export const LensAddresses: AddressMapping = {
  [arbitrum.id]: getAddress("0x1593318424df66128cb7d0c5574B1283C3A74C3d"),
  [arbitrumSepolia.id]: zeroAddress,
}

export const CollateralAddresses: AddressMapping = {
  [arbitrum.id]: getAddress("0xAF8CeD28FcE00ABD30463D55dA81156AA5aEEEc2"),
  [arbitrumSepolia.id]: zeroAddress,
}

export const MarketFactoryAddresses: AddressMapping = {
  [arbitrum.id]: getAddress('0xDaD8A103473dfd47F90168A0E46766ed48e26EC7'),
  [arbitrumSepolia.id]: getAddress('0x32F3aB7b3c5BBa0738b72FdB83FcE6bb1a1a943c'),
}

export const VaultFactoryAddresses: AddressMapping = {
  [arbitrum.id]: getAddress('0xad3565680aEcEe27A39249D8c2D55dAc79BE5Ad0'),
  [arbitrumSepolia.id]: getAddress('0x877682C7a8840D59A63a6227ED2Aeb20C3ae7FeB'),
}

export const OracleFactoryAddresses: AddressMapping = {
  [arbitrum.id]: getAddress('0x8CDa59615C993f925915D3eb4394BAdB3feEF413'),
  [arbitrumSepolia.id]: getAddress('0x9d2CaE012AAe0aE00f4d8F42CD287a6923612456'),
}

export const PythFactoryAddresses: AddressMapping = {
  [arbitrum.id]: getAddress('0x6b60e7c96B4d11A63891F249eA826f8a73Ef4E6E'),
  [arbitrumSepolia.id]: getAddress('0x92F8d5B8d0ca2fc699c7c540471Ad49724a68007'),
}

export const DSUAddresses: AddressMapping = {
  [arbitrum.id]: getAddress("0x52C64b8998eB7C80b6F526E99E29ABdcC86B841b"),
  [arbitrumSepolia.id]: getAddress('0x5FA881826AD000D010977645450292701bc2f56D'),
}

export const USDCAddresses: AddressMapping = {
  [arbitrum.id]: getAddress("0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"),
  [arbitrumSepolia.id]: getAddress('0x16b38364bA6f55B6E150cC7f52D22E89643f3535'),
}

export const BalancedVaultAlphaAddresses: Partial<AddressMapping> = {
  [arbitrum.id]: getAddress("0x5A572B5fBBC43387B5eF8de2C4728A4108ef24a6"),
}

export const BalancedVaultBravoAddresses: Partial<AddressMapping> = {
  [arbitrum.id]: getAddress("0x1960628db367281B1a186dD5B80B5dd6978F016F"),
}
