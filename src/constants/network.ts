import { arbitrum, arbitrumSepolia } from "viem/chains"
import { Chain, } from "viem"
import { EvmPriceServiceConnection } from "@perennial/sdk";
// const { EvmPriceServiceConnection } = require('@pythnetwork/pyth-evm-js')

export const chains = [arbitrum];

export const SupportedChainIds = [
  arbitrum.id,
  arbitrumSepolia.id,
] as const;

export type SupportedChainId = (typeof SupportedChainIds)[number];

export const Chains: { [chainId in SupportedChainId]: Chain } = {
  [arbitrum.id]: arbitrum,
  [arbitrumSepolia.id]: arbitrumSepolia,
};

export const isSupportedChain = (chainId?: number) =>
  chainId !== undefined &&
  SupportedChainIds.includes(chainId as SupportedChainId);

export const DefaultChain = chains[0];

export const GraphUrls: { [chainId in SupportedChainId]: string } = {
  [arbitrum.id]: process.env.GATSBY_GRAPH_URL_ARBITRUM || process.env.GRAPH_URL_ARBITRUM || "",
  [arbitrumSepolia.id]: process.env.GATSBY_GRAPH_URL_ARBITRUM_SEPOLIA ?? "",
};

export const ExplorerNames: { [chainId in SupportedChainId]: string } = {
  [arbitrum.id]: arbitrum.blockExplorers.default.name,
  [arbitrumSepolia.id]: arbitrumSepolia.blockExplorers.default.name,
}

export const ExplorerURLs: { [chainId in SupportedChainId]: string } = {
  [arbitrum.id]: arbitrum.blockExplorers.default.url,
  [arbitrumSepolia.id]: arbitrumSepolia.blockExplorers.default.url,
};

export const PythMainnetUrl = "https://hermes.pyth.network/"
export const PythTestnetUrl = "https://hermes.pyth.network/"
export const PythDataFeedUrl = "https://benchmarks.pyth.network/v1/shims/tradingview"

export const BackupPythClient = new EvmPriceServiceConnection(
  `${typeof window !== 'undefined' ? window.location.origin : 'https://app.perennial.finance'}/api/pyth`,
  {
    timeout: 30000,
    priceFeedRequestConfig: { binary: true },
  },
)
