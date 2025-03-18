import meemLogo from '../../static/website/icons/meem.png'

export const CryptexPricesUrl = "https://api.perps.cryptex.finance"
export const IndexesPriceFeedUrl = 'https://api.perps.cryptex.finance/price-feed';

export enum SupportedIndex {
  meem = 'meem',
  tcap = 'tcap',
}

export enum SupportedPriceFeeds {
  pyth = 'pyth',
  chainlink = 'chainlink',
}

export enum IndexProducts {
  oneToOne = 'oneToOne',
  perp = 'perp',
  vault = 'vault',
}

export type IndexMetadataType = {
  [index in SupportedIndex]: {
    icon: string
    name: string
    symbol: string
    feedId: {
      [priceFeed in SupportedPriceFeeds]: string | undefined
    }
    decimals: number
    displayDecimals: number
  }
};

export const IndexMetadata: IndexMetadataType = {
  [SupportedIndex.meem]: {
    icon: meemLogo,
    symbol: "meem",
    name: "Cryptex Meemcoin Index",
    feedId: {
      [SupportedPriceFeeds.pyth]: "0xa217ab749c14596d69a6206c34bda27188dcfaf9d38dfcd9b76a0b348e78be44",
      [SupportedPriceFeeds.chainlink]: undefined,
    },
    decimals: 18,
    displayDecimals: 4,
  },
  [SupportedIndex.tcap]: {
    icon: meemLogo,
    symbol: "meem",
    name: "Cryptex Total Crypto Market Cap Index",
    feedId: {
      [SupportedPriceFeeds.pyth]: undefined,
      [SupportedPriceFeeds.chainlink]: "0x4763b84cdBc5211B9e0a57D5E39af3B3b2440012",
    },
    decimals: 18,
    displayDecimals: 4,
  },
}
