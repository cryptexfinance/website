import { MarketMetadata as SDKAssetMetadata, AssetMetadataType as sdkAssetMetadataType, SupportedAsset } from '@perennial/sdk';

import arbLogo from '../../static/website/icons/arb.png'
import bnbLogo from '../../static/website/icons/bnb.png'
import btcLogo from '../../static/website/icons/btc.png'
import celestiaLogo from '../../static/website/icons/celestia.png'
import dogeLogo from '../../static/website/icons/doge.png'
import ethLogo from '../../static/website/icons/eth.png'
import euroLogo from '../../static/website/icons/euro.png'
import gbpLogo from '../../static/website/icons/gbp.png'
import goldLogo from '../../static/website/icons/gold.png'
import jpyLogo from '../../static/website/icons/jpy.png'
import jupLogo from '../../static/website/icons/jup.png'
import linkLogo from '../../static/website/icons/chainlink.png'
import makerLogo from '../../static/website/icons/maker.png'
import meemLogo from '../../static/website/icons/meem.png'
import mogLogo from '../../static/website/icons/mog.png'
import msqBtcLogo from '../../static/website/icons/msqBtc.png'
import msqEthLogo from '../../static/website/icons/msqEth.png'
import polygonLogo from '../../static/website/icons/polygon.png'
import solanaLogo from '../../static/website/icons/solana.png'
import xrpLogo from '../../static/website/icons/xrp.png'
import { zeroHash } from 'viem';


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
    tvPythSymbol: string;
    icon: string;
    pythFeedId: string;
    tvTicker: string
    isUnlisted?: boolean;
    isInverted?: boolean;
  } & sdkAssetMetadataType[SupportedAsset];
};

export const AssetMetadata: AssetMetadataType = {
  [SupportedAsset.meem]: {
    icon: meemLogo,
    tvPythSymbol: 'PYTH:JUPUSD',
    tvTicker: 'Crypto.MKR/USD',
    pythFeedId: SDKAssetMetadata.meem.providerId,
    ...SDKAssetMetadata[SupportedAsset.meem],
  },
  [SupportedAsset.btc]: {
    icon: btcLogo,
    tvPythSymbol: 'PYTH:BTCUSD',
    tvTicker: 'Crypto.BTC/USD',
    pythFeedId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    ...SDKAssetMetadata[SupportedAsset.btc]
  },
  [SupportedAsset.eth]: {
    icon: ethLogo,
    tvPythSymbol: 'PYTH:ETHUSD',
    tvTicker: 'Crypto.ETH/USD',
    pythFeedId: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    ...SDKAssetMetadata[SupportedAsset.eth]
  },
  [SupportedAsset.arb]: {
    icon: arbLogo,
    tvPythSymbol: 'PYTH:ARBUSD',
    tvTicker: 'Crypto.ARB/USD',
    pythFeedId: '0x3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5',
    ...SDKAssetMetadata[SupportedAsset.arb]
  },
  [SupportedAsset.link]: {
    icon: linkLogo,
    tvPythSymbol: 'PYTH:LINKUSD',
    tvTicker: 'Crypto.LINK/USD',
    pythFeedId: '0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221',
    ...SDKAssetMetadata[SupportedAsset.link]
  },
  [SupportedAsset.sol]: {
    icon: solanaLogo,
    tvPythSymbol: 'PYTH:SOLUSD',
    tvTicker: 'Crypto.SOL/USD',
    pythFeedId: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
    ...SDKAssetMetadata[SupportedAsset.sol]
  },
  [SupportedAsset.pol]: {
    icon: polygonLogo,
    tvPythSymbol: 'PYTH:MATICUSD',
    tvTicker: 'Crypto.POL/USD',
    pythFeedId: '0xffd11c5a1cfd42f80afb2df4d9f264c15f956d68153335374ec10722edd70472',
    ...SDKAssetMetadata[SupportedAsset.pol]
  },
  [SupportedAsset.tia]: {
    icon: celestiaLogo,
    tvPythSymbol: 'PYTH:TIAUSD',
    tvTicker: 'Crypto.TIA/USD',
    pythFeedId: '0x09f7c1d7dfbb7df2b8fe3d3d87ee94a2259d212da4f30c1f0540d066dfa44723',
    ...SDKAssetMetadata[SupportedAsset.tia]
  },
  [SupportedAsset.bnb]: {
    icon: bnbLogo,
    tvPythSymbol: 'PYTH:BNBUSD',
    tvTicker: 'Crypto.BNB/USD',
    pythFeedId: '0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f',
    ...SDKAssetMetadata[SupportedAsset.bnb]
  },
  [SupportedAsset.xrp]: {
    icon: xrpLogo,
    tvPythSymbol: 'PYTH:XRPUSD',
    tvTicker: 'Crypto.XRP/USD',
    pythFeedId: '0xec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8',
    ...SDKAssetMetadata[SupportedAsset.xrp]
  },
  [SupportedAsset.msqBTC]: {
    icon: msqBtcLogo,
    tvPythSymbol: 'PYTH:BTCUSD',
    tvTicker: 'Crypto.BTC/USD',
    pythFeedId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    ...SDKAssetMetadata[SupportedAsset.msqBTC]
  },
  [SupportedAsset.cmsqETH]: {
    icon: msqEthLogo,
    tvPythSymbol: 'PYTH:ETHUSD',
    tvTicker: 'Crypto.ETH/USD',
    pythFeedId: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    ...SDKAssetMetadata[SupportedAsset.cmsqETH]
  },
  [SupportedAsset.jup]: {
    icon: jupLogo,
    tvPythSymbol: 'PYTH:JUPUSD',
    tvTicker: 'Crypto.JUP/USD',
    pythFeedId: '0x0a0408d619e9380abad35060f9192039ed5042fa6f82301d0e48bb52be830996',
    ...SDKAssetMetadata[SupportedAsset.jup]
  },
  [SupportedAsset.rlb]: {
    icon: jupLogo,
    tvPythSymbol: 'PYTH:JUPUSD',
    tvTicker: 'Crypto.JUP/USD',
    pythFeedId: '0x2f2d17abbc1e781bd87b4a5d52c8b2856886f5c482fa3593cebf6795040ab0b6',
    isUnlisted: true,
    ...SDKAssetMetadata[SupportedAsset.rlb]
  },
  [SupportedAsset.xau]: {
    icon: goldLogo,
    tvPythSymbol: 'PYTH:XAUUSD',
    tvTicker: 'Metal.XAU/USD',
    isUnlisted: true,
    pythFeedId: '0x765d2ba906dbc32ca17cc11f5310a89e9ee1f6420508c63861f2f8ba4ee34bb2',
    ...SDKAssetMetadata[SupportedAsset.xau],
  },
  [SupportedAsset.mog]: {
    icon: mogLogo,
    tvPythSymbol: 'PYTH:MOGUSD',
    tvTicker: 'Crypto.MOG/USD',
    pythFeedId: SDKAssetMetadata.mog.providerId,
    ...SDKAssetMetadata[SupportedAsset.mog],
  },
  [SupportedAsset.jpy]: {
    icon: jpyLogo,
    tvPythSymbol: 'PYTH:JPYUSD',
    tvTicker: 'FX.USD/JPY',
    pythFeedId: SDKAssetMetadata.jpy.providerId,
    isInverted: true,
    isUnlisted: true,
    ...SDKAssetMetadata[SupportedAsset.jpy],
  },
  [SupportedAsset.mkr]: {
    icon: makerLogo,
    tvPythSymbol: 'PYTH:MKRUSD',
    tvTicker: 'Crypto.MKR/USD',
    pythFeedId: SDKAssetMetadata.mkr.providerId,
    ...SDKAssetMetadata[SupportedAsset.mkr],
  },
  [SupportedAsset.doge]: {
    icon: dogeLogo,
    tvPythSymbol: 'PYTH:DOGEUSD',
    tvTicker: 'Crypto.DOGE/USD',
    pythFeedId: SDKAssetMetadata.doge.providerId,
    isUnlisted: true,
    ...SDKAssetMetadata[SupportedAsset.doge],
  },
  [SupportedAsset.eur]: {
    icon: euroLogo,
    tvPythSymbol: 'PYTH:EURUSD',
    tvTicker: 'FX.EUR/USD',
    pythFeedId: SDKAssetMetadata.eur.providerId,
    isUnlisted: true,
    ...SDKAssetMetadata[SupportedAsset.eur],
  },
  [SupportedAsset.gbp]: {
    icon: gbpLogo,
    tvPythSymbol: 'PYTH:GBPUSD',
    tvTicker: 'FX.GBP/USD',
    pythFeedId: SDKAssetMetadata.gbp.providerId,
    isUnlisted: true,
    ...SDKAssetMetadata[SupportedAsset.gbp],
  },
  [SupportedAsset.aero]: {
    icon: gbpLogo,
    tvPythSymbol: 'PYTH:AEROUSD',
    tvTicker: 'FX.AERO/USD',
    pythFeedId: SDKAssetMetadata.aero.providerId,
    isUnlisted: true,
    ...SDKAssetMetadata[SupportedAsset.aero],
  },
  [SupportedAsset.popcat]: {
    icon: gbpLogo,
    tvPythSymbol: 'PYTH:POPCATUSD',
    tvTicker: 'FX.POPCAT/USD',
    pythFeedId: SDKAssetMetadata.popcat.providerId,
    isUnlisted: true,
    ...SDKAssetMetadata[SupportedAsset.popcat],
  },
  [SupportedAsset.unknown]: {
    icon: solanaLogo,
    tvPythSymbol: 'PYTH:JUPUSD',
    tvTicker: 'Unknown',
    pythFeedId: zeroHash,
    ...SDKAssetMetadata[SupportedAsset.unknown],
  },
}
