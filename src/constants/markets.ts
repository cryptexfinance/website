import { Address, getAddress } from "viem";
import { SupportedChainId } from "../constants/network";
import { linearTransform, centimilliPowerTwoTransform, microPowerTwoTransform } from "../utils/payoffUtils";
import { arbitrum, arbitrumSepolia } from "viem/chains";
import { notEmpty } from "../utils/arrayUtils";

import arbLogo from '../../static/website/markets/arb.png'
import bnbLogo from '../../static/website/markets/bnb.png'
import btcLogo from '../../static/website/markets/btc.png'
import celestiaLogo from '../../static/website/markets/celestia.png'
import linkLogo from '../../static/website/markets/chainlink.png'
import ethLogo from '../../static/website/markets/eth.png'
import msqBtcLogo from '../../static/website/markets/msqBtc.png'
import msqEthLogo from '../../static/website/markets/msqEth.png'
import polygonLogo from '../../static/website/markets/polygon.png'
import solanaLogo from '../../static/website/markets/solana.png'
import xrpLogo from '../../static/website/markets/xrp.png'


export enum SupportedAsset {
  btc = 'btc',
  eth = 'eth',
  arb = 'arb',
  link = 'link',
  sol = 'sol',
  matic = 'matic',
  tia = 'tia',
  bnb = 'bnb',
  xrp = 'xrp',
  msqBTC = 'btc²',
  msqETH = 'eth²',
}

export enum QuoteCurrency {
  usd = "usd",
}

export enum Currency {
  USDC = "USDC",
  DSU = "DSU",
}

export enum PositionSide2 {
  maker = "maker",
  long = "long",
  short = "short",
  none = "none",
}

export enum PositionStatus {
  open = "open",
  closed = "closed",
  opening = "opening",
  closing = "closing",
  pricing = "pricing",
  resolved = "noValue",
  failed = "failed",
  syncError = 'syncError',
}

export type AssetMetadataType = {
  [asset in SupportedAsset]: {
    name: string;
    symbol: string;
    displayDecimals: number;
    tvTicker: string;
    tvPythSymbol: string;
    icon: string;
    baseCurrency: SupportedAsset;
    quoteCurrency: QuoteCurrency;
    pythFeedId?: string;
    transform: (value: bigint) => bigint;
  };
};

export const AssetMetadata: AssetMetadataType = {
  [SupportedAsset.btc]: {
    symbol: 'BTC-USD',
    name: 'Bitcoin',
    displayDecimals: 2,
    tvTicker: 'Crypto.BTC/USD',
    tvPythSymbol: 'PYTH:BTCUSD',
    icon: btcLogo,
    baseCurrency: SupportedAsset.btc,
    quoteCurrency: QuoteCurrency.usd,
    pythFeedId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    transform: linearTransform,
  },
  [SupportedAsset.eth]: {
    symbol: 'ETH-USD',
    name: 'Ethereum',
    displayDecimals: 6,
    tvTicker: 'Crypto.ETH/USD',
    tvPythSymbol: 'PYTH:ETHUSD',
    icon: ethLogo,
    baseCurrency: SupportedAsset.eth,
    quoteCurrency: QuoteCurrency.usd,
    pythFeedId: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    transform: linearTransform,
  },
  [SupportedAsset.arb]: {
    symbol: 'ARB-USD',
    name: 'Arbitrum',
    displayDecimals: 4,
    tvTicker: 'Crypto.ARB/USD',
    tvPythSymbol: 'PYTH:ARBUSD',
    icon: arbLogo,
    baseCurrency: SupportedAsset.arb,
    quoteCurrency: QuoteCurrency.usd,
    pythFeedId: '0x3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5',
    transform: linearTransform,
  },
  [SupportedAsset.link]: {
    symbol: 'LINK-USD',
    name: 'Chainlink',
    displayDecimals: 4,
    tvTicker: 'Crypto.LINK/USD',
    tvPythSymbol: 'PYTH:LINKUSD',
    icon: linkLogo,
    baseCurrency: SupportedAsset.link,
    quoteCurrency: QuoteCurrency.usd,
    pythFeedId: '0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221',
    transform: linearTransform,
  },
  [SupportedAsset.sol]: {
    symbol: 'SOL-USD',
    name: 'Solana',
    displayDecimals: 4,
    tvTicker: 'Crypto.SOL/USD',
    tvPythSymbol: 'PYTH:SOLUSD',
    icon: solanaLogo,
    baseCurrency: SupportedAsset.sol,
    quoteCurrency: QuoteCurrency.usd,
    pythFeedId: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
    transform: linearTransform,
  },
  [SupportedAsset.matic]: {
    symbol: 'MATIC-USD',
    name: 'Polygon',
    displayDecimals: 6,
    tvTicker: 'Crypto.MATIC/USD',
    tvPythSymbol: 'PYTH:MATICUSD',
    icon: polygonLogo,
    baseCurrency: SupportedAsset.matic,
    quoteCurrency: QuoteCurrency.usd,
    pythFeedId: '0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52',
    transform: linearTransform,
  },
  [SupportedAsset.tia]: {
    symbol: 'TIA-USD',
    name: 'Celestia',
    displayDecimals: 6,
    tvTicker: 'Crypto.TIA/USD',
    icon: celestiaLogo,
    tvPythSymbol: 'PYTH:TIAUSD',
    baseCurrency: SupportedAsset.tia,
    quoteCurrency: QuoteCurrency.usd,
    pythFeedId: '0x09f7c1d7dfbb7df2b8fe3d3d87ee94a2259d212da4f30c1f0540d066dfa44723',
    transform: linearTransform,
  },
  [SupportedAsset.bnb]: {
    symbol: 'BNB-USD',
    name: 'BNB',
    displayDecimals: 6,
    tvTicker: 'Crypto.BNB/USD',
    icon: bnbLogo,
    tvPythSymbol: 'PYTH:BNBUSD',
    baseCurrency: SupportedAsset.bnb,
    quoteCurrency: QuoteCurrency.usd,
    pythFeedId: '0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f',
    transform: linearTransform,
  },
  [SupportedAsset.xrp]: {
    symbol: 'XRP-USD',
    name: 'XRP',
    displayDecimals: 6,
    tvTicker: 'Crypto.XRP/USD',
    icon: xrpLogo,
    tvPythSymbol: 'PYTH:XRPUSD',
    baseCurrency: SupportedAsset.xrp,
    quoteCurrency: QuoteCurrency.usd,
    pythFeedId: '0xec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8',
    transform: linearTransform,
  },
  [SupportedAsset.msqBTC]: {
    symbol: 'BTC²-USD',
    name: 'Bitcoin²',
    displayDecimals: 2,
    tvTicker: 'Crypto.BTC/USD',
    tvPythSymbol: 'PYTH:BTCUSD',
    icon: msqBtcLogo,
    baseCurrency: SupportedAsset.msqBTC,
    quoteCurrency: QuoteCurrency.usd,
    pythFeedId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    transform: microPowerTwoTransform,
  },
  [SupportedAsset.msqETH]: {
    symbol: 'ETH²-USD',
    name: 'Ethereum²',
    displayDecimals: 6,
    tvTicker: 'Crypto.ETH/USD',
    tvPythSymbol: 'PYTH:ETHUSD',
    icon: msqEthLogo,
    baseCurrency: SupportedAsset.msqETH,
    quoteCurrency: QuoteCurrency.usd,
    pythFeedId: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    transform: centimilliPowerTwoTransform,
  },
}

export const ChainMarkets: {
  [chainId in SupportedChainId]: {
    [asset in SupportedAsset]?: Address;
  };
} = {
  [arbitrum.id]: {
    [SupportedAsset.eth]: getAddress('0x90A664846960AaFA2c164605Aebb8e9Ac338f9a0'),
    [SupportedAsset.btc]: getAddress('0xcC83e3cDA48547e3c250a88C8D5E97089Fd28F60'),
    [SupportedAsset.msqBTC]: getAddress('0x768a5909f0B6997efa56761A89344eA2BD5560fd'),
    [SupportedAsset.arb]: getAddress('0x3D1D603073b3CEAB5974Db5C54568058a9551cCC'),
    [SupportedAsset.sol]: getAddress('0x02258bE4ac91982dc1AF7a3D2C4F05bE6079C253'),
    [SupportedAsset.matic]: getAddress('0x7e34B5cBc6427Bd53ECFAeFc9AC2Cad04e982f78'),
    [SupportedAsset.tia]: getAddress('0x2CD8651b0dB6bE605267fdd737C840442A96fAFE'),
//    [SupportedAsset.link]: getAddress('0xD9c296A7Bee1c201B9f3531c7AC9c9310ef3b738'),
    [SupportedAsset.bnb]: getAddress('0x362c6bC2A4EA2033063bf20409A4c5E8C5754056'),
//    [SupportedAsset.xrp]: getAddress('0x2402E92f8C58886F716F5554039fA6398d7A1EfB'),
//    [SupportedAsset.msqETH]: getAddress('0x004E1Abf70e4FF99BC572843B63a63a58FAa08FF'),
  },
  [arbitrumSepolia.id]: {
    [SupportedAsset.eth]: getAddress('0x0142a8bfF8D887Fc4f04469fCA6c66F5e0936Ea7'),
  },
};

export const chainAssetsWithAddress = (
  chainId: SupportedChainId
): Array<{ asset: SupportedAsset; marketAddress: `0x${string}` }> => {
  return Object.entries(ChainMarkets[chainId])
    .map(([asset, marketAddress]) =>
      !!marketAddress
        ? {
            asset: asset as SupportedAsset,
            marketAddress,
          }
        : null
    )
    .filter(notEmpty);
};

export const addressToAsset2 = (address: Address) => {
  for (const chainId of Object.keys(ChainMarkets)) {
    for (const asset of Object.keys(
      ChainMarkets[Number(chainId) as SupportedChainId]
    )) {
      if (
        ChainMarkets[Number(chainId) as SupportedChainId][
          asset as SupportedAsset
        ] === address
      ) {
        return asset as SupportedAsset;
      }
    }
  }
};
