import meemLogo from '../../static/website/icons/meem.png'

export const CryptexPricesUrl = "https://api.perps.cryptex.finance"
export const IndexesPriceFeedUrl = 'https://api.perps.cryptex.finance/price-feed';

export enum SupportedIndex {
  meem = 'meem',
}

export type IndexMetadataType = {
  [index in SupportedIndex]: {
    icon: string
    name: string
    symbol: string
    feedId: string
    decimals: number
    displayDecimals: number
  }
};

export const IndexMetadata: IndexMetadataType = {
  [SupportedIndex.meem]: {
    icon: meemLogo,
    symbol: "meem",
    name: "Cryptex Meemcoin Index",
    feedId: "0xa217ab749c14596d69a6206c34bda27188dcfaf9d38dfcd9b76a0b348e78be44",
    decimals: 18,
    displayDecimals: 4,
  },
}
