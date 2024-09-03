import { AssetMetadata as SDKAssetMetadata, AssetMetadataType as sdkAssetMetadataType, SupportedAsset } from '@perennial/sdk';

import arbLogo from '../../static/website/icons/arb.png'
import bnbLogo from '../../static/website/icons/bnb.png'
import btcLogo from '../../static/website/icons/btc.png'
import celestiaLogo from '../../static/website/icons/celestia.png'
import linkLogo from '../../static/website/icons/chainlink.png'
import ethLogo from '../../static/website/icons/eth.png'
import msqBtcLogo from '../../static/website/icons/msqBtc.png'
import msqEthLogo from '../../static/website/icons/msqEth.png'
import polygonLogo from '../../static/website/icons/polygon.png'
import solanaLogo from '../../static/website/icons/solana.png'
import xrpLogo from '../../static/website/icons/xrp.png'
import jupLogo from '../../static/website/icons/jup.png'


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
  } & sdkAssetMetadataType[SupportedAsset];
};

export const AssetMetadata: AssetMetadataType = {
  [SupportedAsset.btc]: {
    icon: btcLogo,
    tvPythSymbol: 'PYTH:BTCUSD',
    ...SDKAssetMetadata[SupportedAsset.btc]
  },
  [SupportedAsset.eth]: {
    icon: ethLogo,
    tvPythSymbol: 'PYTH:ETHUSD',
    ...SDKAssetMetadata[SupportedAsset.eth]
  },
  [SupportedAsset.arb]: {
    icon: arbLogo,
    tvPythSymbol: 'PYTH:ARBUSD',
    ...SDKAssetMetadata[SupportedAsset.arb]
  },
  [SupportedAsset.link]: {
    icon: linkLogo,
    tvPythSymbol: 'PYTH:LINKUSD',    
    ...SDKAssetMetadata[SupportedAsset.link]
  },
  [SupportedAsset.sol]: {
    icon: solanaLogo,
    tvPythSymbol: 'PYTH:SOLUSD',
    ...SDKAssetMetadata[SupportedAsset.sol]
  },
  [SupportedAsset.matic]: {
    icon: polygonLogo,
    tvPythSymbol: 'PYTH:MATICUSD',
    ...SDKAssetMetadata[SupportedAsset.matic]
  },
  [SupportedAsset.tia]: {
    icon: celestiaLogo,
    tvPythSymbol: 'PYTH:TIAUSD',
    ...SDKAssetMetadata[SupportedAsset.tia]
  },
  [SupportedAsset.bnb]: {
    icon: bnbLogo,
    tvPythSymbol: 'PYTH:BNBUSD',
    ...SDKAssetMetadata[SupportedAsset.bnb]
  },
  [SupportedAsset.xrp]: {
    icon: xrpLogo,
    tvPythSymbol: 'PYTH:XRPUSD',
    ...SDKAssetMetadata[SupportedAsset.xrp]
  },
  [SupportedAsset.msqBTC]: {
    icon: msqBtcLogo,
    tvPythSymbol: 'PYTH:BTCUSD',
    ...SDKAssetMetadata[SupportedAsset.msqBTC]
  },
  [SupportedAsset.cmsqETH]: {
    icon: msqEthLogo,
    tvPythSymbol: 'PYTH:ETHUSD',
    ...SDKAssetMetadata[SupportedAsset.cmsqETH]
  },
  [SupportedAsset.jup]: {
    icon: jupLogo,
    tvPythSymbol: 'PYTH:JUPUSD',
    ...SDKAssetMetadata[SupportedAsset.jup]
  },
  [SupportedAsset.rlb]: {
    icon: jupLogo,
    tvPythSymbol: 'PYTH:JUPUSD',
    ...SDKAssetMetadata[SupportedAsset.rlb]
  }
}
