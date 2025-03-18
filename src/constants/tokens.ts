import { Address, getAddress, getContract, WalletClient, zeroAddress } from "viem";
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  sepolia,
} from "viem/chains";

import aaveLogo from '../../static/website/icons/aave.png'
import cbBtcLogo from '../../static/website/icons/cbBTC.png'
import crvLogo from '../../static/website/icons/crv.png'
import gmxLogo from '../../static/website/icons/gmx.png'
import pendleLogo from '../../static/website/icons/pendle.png'
import stgLogo from '../../static/website/icons/stg.png'
import uniLogo from '../../static/website/icons/uniswap.png'
import lBtcLogo from '../../static/website/icons/lbtc.png'
import wethLogo from '../../static/website/icons/weth.png'
import usdcLogo from '../../static/website/icons/usdc.png'
import { ERC20Abi } from '../abi/ERC20.abi'
import { getPublicClient, SupportedChainIdType } from "./network";
import { IndexProducts } from "./indexes";


export enum SupportedTokens {
  usdc = 'usdc',
  weth = 'weth',
  cbbtc = 'cbbtc',
  lbtc = 'lbtc',
  aave = 'aave',
  gmx = 'gmx',
  uni = 'uni',
  pendle = 'pendle',
  stg = 'stg',
  crv = 'crv',
}

export type TokensMetadataType = {
  [asset in SupportedTokens]: {
    name: string;
    symbol: string;
    decimals: number;
    displayDecimals: number;
    icon: string;
    products: IndexProducts[]
  };
};

export const TokenMetadata: TokensMetadataType = {
  [SupportedTokens.usdc]: {
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
    displayDecimals: 2,
    icon: usdcLogo,
    products: [IndexProducts.oneToOne, IndexProducts.vault]
  },
  [SupportedTokens.weth]: {
    name: 'WETH',
    symbol: 'WETH',
    decimals: 18,
    displayDecimals: 2,
    icon: wethLogo,
    products: [IndexProducts.oneToOne, IndexProducts.vault]
  },
  [SupportedTokens.cbbtc]: {
    name: 'cbBtc',
    symbol: 'cbBTC',
    decimals: 8,
    displayDecimals: 2,
    icon: cbBtcLogo,
    products: [IndexProducts.vault]
  },
  [SupportedTokens.lbtc]: {
    name: 'lBTC',
    symbol: 'lBTC',
    decimals: 8,
    displayDecimals: 2,
    icon: lBtcLogo,
    products: [IndexProducts.vault]
  },
  [SupportedTokens.aave]: {
    name: 'Aave Token',
    symbol: 'AAVE',
    decimals: 18,
    displayDecimals: 4,
    icon: aaveLogo,
    products: [IndexProducts.oneToOne]
  },
  [SupportedTokens.gmx]: {
    name: 'GMX',
    symbol: 'GMX',
    decimals: 18,
    displayDecimals: 4,
    icon: gmxLogo,
    products: []
  },
  [SupportedTokens.uni]: {
    name: 'UNI',
    symbol: 'UNI',
    decimals: 18,
    displayDecimals: 4,
    icon: uniLogo,
    products: [IndexProducts.oneToOne]
  },
  [SupportedTokens.pendle]: {
    name: 'Pendle Token',
    symbol: 'PENDLE',
    decimals: 18,
    displayDecimals: 4,
    icon: pendleLogo,
    products: [IndexProducts.oneToOne]
  },
  [SupportedTokens.stg]: {
    name: 'Stargate Token',
    symbol: 'STG',
    decimals: 18,
    displayDecimals: 4,
    icon: stgLogo,
    products: [IndexProducts.oneToOne]
  },
  [SupportedTokens.crv]: {
    name: 'Curve DAO Token',
    symbol: 'CRV',
    decimals: 18,
    displayDecimals: 4,
    icon: crvLogo,
    products: [IndexProducts.oneToOne]
  }
};

export const ChainTokens: { [chainId in SupportedChainIdType]: {
    [asset in SupportedTokens]: Address;
  };
} = {
  [mainnet.id]: {
    [SupportedTokens.cbbtc]: getAddress('0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf'),
    [SupportedTokens.lbtc]: getAddress('0x8236a87084f8B84306f72007F36F2618A5634494'),
    [SupportedTokens.usdc]: getAddress('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'),
    [SupportedTokens.weth]: getAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'),
    [SupportedTokens.aave]: zeroAddress,
    [SupportedTokens.gmx]: zeroAddress,
    [SupportedTokens.uni]: zeroAddress,
    [SupportedTokens.pendle]: zeroAddress,
    [SupportedTokens.stg]: zeroAddress,
    [SupportedTokens.crv]: zeroAddress,
  },
  [base.id]: {
    [SupportedTokens.cbbtc]: getAddress('0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf'),
    [SupportedTokens.lbtc]: getAddress('0xecAc9C5F704e954931349Da37F60E39f515c11c1'),
    [SupportedTokens.usdc]: getAddress('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'),
    [SupportedTokens.weth]: getAddress('0x4200000000000000000000000000000000000006'),
    [SupportedTokens.aave]: zeroAddress,
    [SupportedTokens.gmx]: zeroAddress,
    [SupportedTokens.uni]: zeroAddress,
    [SupportedTokens.pendle]: zeroAddress,
    [SupportedTokens.stg]: zeroAddress,
    [SupportedTokens.crv]: zeroAddress,
  },
  [arbitrum.id]: {
    [SupportedTokens.usdc]: getAddress('0xaf88d065e77c8cC2239327C5EDb3A432268e5831'),
    [SupportedTokens.weth]: getAddress('0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'),
    [SupportedTokens.aave]: getAddress('0xba5DdD1f9d7F570dc94a51479a000E3BCE967196'),
    [SupportedTokens.gmx]: getAddress('0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a'),
    [SupportedTokens.uni]: getAddress('0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0'),
    [SupportedTokens.pendle]: getAddress('0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8'),
    [SupportedTokens.stg]: getAddress('0x6694340fc020c5E6B96567843da2df01b2CE1eb6'),
    [SupportedTokens.crv]: getAddress('0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978'),
    [SupportedTokens.cbbtc]: getAddress('0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf'),
    [SupportedTokens.lbtc]: zeroAddress,
  },
  [arbitrumSepolia.id]: {
    [SupportedTokens.cbbtc]: getAddress('0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf'),
    [SupportedTokens.lbtc]: getAddress('0xecAc9C5F704e954931349Da37F60E39f515c11c1'),
    [SupportedTokens.usdc]: getAddress('0xaf88d065e77c8cC2239327C5EDb3A432268e5831'),
    [SupportedTokens.weth]: getAddress('0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'),
    [SupportedTokens.aave]: zeroAddress,
    [SupportedTokens.gmx]: zeroAddress,
    [SupportedTokens.uni]: zeroAddress,
    [SupportedTokens.pendle]: zeroAddress,
    [SupportedTokens.stg]: zeroAddress,
    [SupportedTokens.crv]: zeroAddress,
  },
}

export const getERC20Contract = (chainId: SupportedChainIdType, token: SupportedTokens, signer?: WalletClient) => { 
  const publicClient = getPublicClient(chainId)
  let tokenAddress = ChainTokens[chainId][token as SupportedTokens]
   
  return getContract({
    address: tokenAddress,
    abi: ERC20Abi,
    client: signer ? { public: publicClient, wallet: signer } : publicClient,
  })
}

export const getERC20ContractByAddress = (chainId: SupportedChainIdType, address: Address, signer?: WalletClient) => { 
  const publicClient = getPublicClient(chainId)

  return getContract({
    address,
    abi: ERC20Abi,
    client: signer ? { public: publicClient, wallet: signer } : publicClient,
  })
}
