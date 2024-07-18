import { Address, WalletClient, getAddress, getContract, zeroAddress } from "viem";
import { arbitrum, arbitrumSepolia, mainnet } from "viem/chains";


import meemLogo from '../../static/website/icons/meem.png'
import dogeLogo from '../../static/website/icons/doge.png'
import flokiLogo from '../../static/website/icons/floki.png'
import pepeLogo from '../../static/website/icons/pepe.png'
import shibLogo from '../../static/website/icons/shib.png'
import ethLogo from '../../static/website/icons/eth.png'
import btcLogo from '../../static/website/icons/btc.png'
import usdcLogo from '../../static/website/icons/usdc.png'

import { SetTokenAbi } from '../abi/SetToken.abi'
import { BasicIssuanceModuleAbi } from '../abi/BasicIssuanceModule.abi'
import { notEmpty } from "../utils/arrayUtils";
import { SupportedChainIdType, getPublicClient } from "./network";
import { AddressMappingType } from "./contracts";

export const DefaultChainId = mainnet.id

export enum SupportedSetTokens {
  meem = 'meem', 
}

export type SetTokenMetadataType = {
  [asset in SupportedSetTokens]: {
    name: string;
    symbol: string;
    decimals: number;
    displayDecimals: number;
    icon: string;
  };
};

export const SetTokenMetadata: SetTokenMetadataType = {
  [SupportedSetTokens.meem]: {
    name: 'Cryptex Memecoin Index',
    symbol: 'MEEM',
    decimals: 18,
    displayDecimals: 4,
    icon: meemLogo,
  }
};

export const ChainSetTokens: { [chainId in SupportedChainIdType]: {
    [asset in SupportedSetTokens]?: { token: Address, oracle: Address };
  };
} = {
  [mainnet.id]: {
    [SupportedSetTokens.meem]: {
      token: getAddress('0xA544b3F0c46c15F0B2b00ba3D67b56C250287905'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    }
  },
  [arbitrum.id]: {},
  [arbitrumSepolia.id]: {},
}

export const chainSetTokensWithAddress = (
  chainId: SupportedChainIdType
): Array<{ asset: SupportedSetTokens; setTokenAddress: { token: `0x${string}`, oracle: `0x${string}` } }> => {
  return Object.entries(ChainSetTokens[chainId])
    .map(([asset, setTokenAddress]) =>
      !!setTokenAddress
        ? {
            asset: asset as SupportedSetTokens,
            setTokenAddress,
          }
        : null
    )
    .filter(notEmpty);
};

export const addressToSetToken = (address: Address) => {
  for (const chainId of Object.keys(ChainSetTokens)) {
    for (const asset of Object.keys(
      ChainSetTokens[Number(chainId) as SupportedChainIdType]
    )) {
      if (
        ChainSetTokens[Number(chainId) as SupportedChainIdType][
          asset as SupportedSetTokens
        ]?.token === address
      ) {
        return asset as SupportedSetTokens;
      }
    }
  }
}

// Components Constants
export enum SupportedComponents {
  weth = 'weth',
  doge = 'doge',
  floki = 'floki',
  pepe = 'pepe',
  shib = 'shib',
  wbtc = 'wbtc',
}

export type ComponentMetadataType = {
  [asset in SupportedComponents]: {
    name: string;
    symbol: string;
    decimals: number;
    displayDecimals: number;
    icon: string;
  };
};

export const ComponentMetadata: ComponentMetadataType = {
  [SupportedComponents.weth]: {
    name: 'Wrapped Eth',
    symbol: 'WETH',
    decimals: 18,
    displayDecimals: 4,
    icon: ethLogo,
  },
  [SupportedComponents.doge]: {
    name: 'Dogecoin',
    symbol: 'DOGE',
    decimals: 8,
    displayDecimals: 4,
    icon: dogeLogo,
  },
  [SupportedComponents.floki]: {
    name: 'Floki',
    symbol: 'FLOKI',
    decimals: 9,
    displayDecimals: 4,
    icon: flokiLogo,
  },
  [SupportedComponents.pepe]: {
    name: 'Pepe',
    symbol: 'PEPE',
    decimals: 18,
    displayDecimals: 4,
    icon: pepeLogo,
  },
  [SupportedComponents.shib]: {
    name: 'Shiba Inu',
    symbol: 'SHIB',
    decimals: 18,
    displayDecimals: 4,
    icon: shibLogo,
  },
  [SupportedComponents.wbtc]: {
    name: 'Wrapped BTC',
    symbol: 'BTC',
    decimals: 8,
    displayDecimals: 4,
    icon: btcLogo,
  },
};

export const ChainComponentsTokens: { [chainId in SupportedChainIdType]: {
    [asset in SupportedComponents]?: { token: Address, oracle: Address };
  };
} = {
  [mainnet.id]: {
    [SupportedComponents.doge]: {
      token: getAddress('0x4206931337dc273a630d328dA6441786BfaD668f'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    },
    [SupportedComponents.floki]: {
      token: getAddress('0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    },
    [SupportedComponents.pepe]: {
      token: getAddress('0x6982508145454Ce325dDbE47a25d4ec3d2311933'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    },
    [SupportedComponents.shib]: {
      token: getAddress('0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    },
    [SupportedComponents.weth]: {
      token: getAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    },
  },
  [arbitrum.id]: {},
  [arbitrumSepolia.id]: {},
}

export const addressToComponent = (address: Address) => {
  for (const chainId of Object.keys(ChainComponentsTokens)) {
    for (const asset of Object.keys(
      ChainComponentsTokens[Number(chainId) as SupportedChainIdType]
    )) {
      if (
        ChainComponentsTokens[Number(chainId) as SupportedChainIdType][
          asset as SupportedComponents
        ]?.token === address
      ) {
        return asset as SupportedComponents;
      }
    }
  }
}

// Crypdex Contracts

export const BasicIssuanceModuleAddresses: AddressMappingType = {
  [mainnet.id]: getAddress('0x9330d0F979af5c8a5f2380f7bc41234A7d8A15de'),
  [arbitrum.id]: zeroAddress,
  [arbitrumSepolia.id]: zeroAddress,
}


export const getSetTokenContract = (chainId: SupportedChainIdType, address: Address, signer?: WalletClient) => { 
  const publicClient = getPublicClient(chainId)

  return getContract({
    address,
    abi: SetTokenAbi,
    client: signer ? { public: publicClient, wallet: signer } : publicClient,
  })
}

export const getBasicIssuanceModuleContract = (chainId: SupportedChainIdType, signer?: WalletClient) => { 
  const publicClient = getPublicClient(chainId);

  return getContract({
    address: BasicIssuanceModuleAddresses[chainId],
    abi: BasicIssuanceModuleAbi,
    client: signer ? { public: publicClient, wallet: signer } : publicClient,
  })
}

export type UserComponentsUnitsType = Record<
  SupportedComponents,
  {
    address: Address,
    units: bigint
    balances?: { balance: bigint, allowance: bigint }
  }
  >

export type UserComponentsStatusType = Record<
  SupportedComponents, { isApproving: boolean, approvalError: boolean, hasAllowance: boolean }
>

// Usdc Constants
export const UsdcMetadata = {
  name: 'USDC',
  symbol: 'USDC',
  decimals: 6,
  displayDecimals: 2,
  icon: usdcLogo,
}