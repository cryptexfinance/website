import { Address, WalletClient, getAddress, getContract, zeroAddress } from "viem";
import {
  arbitrum,
  arbitrumSepolia,
  base,
  mainnet,
} from "viem/chains";

import arfiLogo from '../../static/website/icons/arfi.png'
import aaveLogo from '../../static/website/icons/aave.png'
import btcLogo from '../../static/website/icons/btc.png'
import crvLogo from '../../static/website/icons/crv.png'
import dogeLogo from '../../static/website/icons/doge.png'
import ethLogo from '../../static/website/icons/eth.png'
import gmxLogo from '../../static/website/icons/gmx.png'
import flokiLogo from '../../static/website/icons/floki.png'
import pendleLogo from '../../static/website/icons/pendle.png'
import pepeLogo from '../../static/website/icons/pepe.png'
import stgLogo from '../../static/website/icons/stg.png'
import shibLogo from '../../static/website/icons/shib.png'
import uniLogo from '../../static/website/icons/uniswap.png'

import { SupportedChainIdType, getPublicClient } from "./network";
import { OracleAbi } from '../abi/Oracle.abi'
import { SetTokenAbi } from '../abi/SetToken.abi'
import { notEmpty } from "../utils/arrayUtils";
import { AddressMappingType } from "./contracts";
import { BasicIssuanceModuleAbi } from "../abi/BasicIssuanceModule.abi";


export const DefaultChainId = mainnet.id

export enum SupportedSetTokens {
  arfi = 'arfi', 
}

export enum SupportedComponents {
  aave = 'aave',
  gmx = 'gmx',
  uni = 'uni',
  pendle = 'pendle',
  stg = 'stg',
  crv = 'crv',
  doge = 'doge',
  shib = 'shib',
  pepe = 'pepe',
  floki = 'floki',
  weth = 'weth',
  wbtc = 'wbtc',
}

export type SetTokenMetadataType = {
  [asset in SupportedSetTokens]: {
    name: string;
    symbol: string;
    decimals: number;
    displayDecimals: number;
    icon: string;
    components: SupportedComponents[];
  };
};

export const SetTokenMetadata: SetTokenMetadataType = {
  [SupportedSetTokens.arfi]: {
    name: 'Cryptex ARFI Index',
    symbol: 'ARFI',
    decimals: 18,
    displayDecimals: 4,
    icon: arfiLogo,
    components: [
      SupportedComponents.aave,
      SupportedComponents.gmx,
      SupportedComponents.uni,
      SupportedComponents.pendle,
      SupportedComponents.stg,
      SupportedComponents.crv,
    ],
  }
};

export const ChainSetTokens: { [chainId in SupportedChainIdType]: {
    [asset in SupportedSetTokens]?: { token: Address };
  };
} = {
  [mainnet.id]: {},
  [base.id]: {},
  [arbitrum.id]: {
    [SupportedSetTokens.arfi]: {
      token: getAddress('0xC0e8d7a022cFfff1EE9d9351fE9BfC917004D9f8'),
    }
  },
  [arbitrumSepolia.id]: {},
}

export const chainSetTokensWithAddress = (
  chainId: SupportedChainIdType
): Array<{ asset: SupportedSetTokens; setTokenAddress: { token: `0x${string}` } }> => {
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
// Supported Components order, at least for now, like they appear on the smart contract
export type ComponentMetadataType = {
  [asset in SupportedComponents]: {
    name: string;
    symbol: string;
    decimals: number;
    displayDecimals: number;
    icon: string;
    payloadIndex: number;
  };
};

export const ComponentMetadata: ComponentMetadataType = {
  [SupportedComponents.weth]: {
    name: 'Wrapped Eth',
    symbol: 'WETH',
    decimals: 18,
    displayDecimals: 4,
    icon: ethLogo,
    payloadIndex: 4,
  },
  [SupportedComponents.aave]: {
    name: 'Aave Token',
    symbol: 'AAVE',
    decimals: 18,
    displayDecimals: 4,
    icon: aaveLogo,
    payloadIndex: 0,
  },
  [SupportedComponents.gmx]: {
    name: 'GMX',
    symbol: 'GMX',
    decimals: 18,
    displayDecimals: 4,
    icon: gmxLogo,
    payloadIndex: 1,
  },
  [SupportedComponents.uni]: {
    name: 'Uniswap',
    symbol: 'UNI',
    decimals: 18,
    displayDecimals: 4,
    icon: uniLogo,
    payloadIndex: 2,
  },
  [SupportedComponents.pendle]: {
    name: 'Pendle',
    symbol: 'PENDLE',
    decimals: 18,
    displayDecimals: 4,
    icon: pendleLogo,
    payloadIndex: 3,
  },
  [SupportedComponents.stg]: {
    name: 'Stargate Token',
    symbol: 'STG',
    decimals: 18,
    displayDecimals: 4,
    icon: stgLogo,
    payloadIndex: 4,
  },
  [SupportedComponents.crv]: {
    name: 'Curve DAO Token',
    symbol: 'CRV',
    decimals: 18,
    displayDecimals: 4,
    icon: crvLogo,
    payloadIndex: 5,
  },
  [SupportedComponents.doge]: {
    name: 'Dogecoin',
    symbol: 'DOGE',
    decimals: 8,
    displayDecimals: 4,
    icon: dogeLogo,
    payloadIndex: 0,
  },
  [SupportedComponents.floki]: {
    name: 'Floki',
    symbol: 'FLOKI',
    decimals: 9,
    displayDecimals: 4,
    icon: flokiLogo,
    payloadIndex: 3,
  },
  [SupportedComponents.pepe]: {
    name: 'Pepe',
    symbol: 'PEPE',
    decimals: 18,
    displayDecimals: 4,
    icon: pepeLogo,
    payloadIndex: 2,
  },
  [SupportedComponents.shib]: {
    name: 'Shiba Inu',
    symbol: 'SHIB',
    decimals: 18,
    displayDecimals: 4,
    icon: shibLogo,
    payloadIndex: 1,
  },
  [SupportedComponents.wbtc]: {
    name: 'Wrapped BTC',
    symbol: 'BTC',
    decimals: 8,
    displayDecimals: 4,
    icon: btcLogo,
    payloadIndex: 1,
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
  [base.id]: {},
  [arbitrum.id]: {
    [SupportedComponents.aave]: {
      token: getAddress('0xba5DdD1f9d7F570dc94a51479a000E3BCE967196'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    },
    [SupportedComponents.gmx]: {
      token: getAddress('0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    },
    [SupportedComponents.uni]: {
      token: getAddress('0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    },
    [SupportedComponents.pendle]: {
      token: getAddress('0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    },
    [SupportedComponents.stg]: {
      token: getAddress('0x6694340fc020c5E6B96567843da2df01b2CE1eb6'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    },
    [SupportedComponents.crv]: {
      token: getAddress('0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978'),
      oracle: getAddress('0x7d328adff97228542d7F69e09855A020A243C0cF'),
    },
  },
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


export const getSetTokenContract = (chainId: SupportedChainIdType, address: Address, signer?: WalletClient) => { 
  const publicClient = getPublicClient(chainId)

  return getContract({
    address,
    abi: SetTokenAbi,
    client: signer ? { public: publicClient, wallet: signer } : publicClient,
  })
}

export const getSetTokenOracleContract = (chainId: SupportedChainIdType, address: Address, signer?: WalletClient) => { 
  const publicClient = getPublicClient(chainId)

  return getContract({
    address,
    abi: OracleAbi,
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

export const BasicIssuanceModuleAddresses: AddressMappingType = {
  [mainnet.id]: zeroAddress,
  [arbitrum.id]: getAddress('0x675144f4A7895264F4AAb8E20b292dD877F9b812'),
  [arbitrumSepolia.id]: zeroAddress,
  [base.id]: zeroAddress,
}

export const getBasicIssuanceModuleContract = (chainId: SupportedChainIdType, signer?: WalletClient) => { 
  const publicClient = getPublicClient(chainId);

  return getContract({
    address: BasicIssuanceModuleAddresses[chainId],
    abi: BasicIssuanceModuleAbi,
    client: signer ? { public: publicClient, wallet: signer } : publicClient,
  })
}
