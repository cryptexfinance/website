import { arbitrum, arbitrumSepolia } from "viem/chains"
import { createPublicClient, Chain, http, PublicClient } from "viem"
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
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

export const getViemClient = (): PublicClient => {
  const transport = http('https://arb-mainnet.g.alchemy.com/v2/ZI3cEsskU3h2yXFr8XvEW9NNI2ChosQ3', {
    batch: true
  })
  return createPublicClient({
    chain: arbitrum,
    transport,
  })
}

export const GraphUrls: { [chainId in SupportedChainId]: string } = {
  [arbitrum.id]: process.env.REACT_APP_GRAPH_URL_ARBITRUM ?? "",
  [arbitrumSepolia.id]: process.env.REACT_APP_GRAPH_URL_ARBITRUM_SEPOLIA ?? "",
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
