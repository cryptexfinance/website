import { arbitrum, arbitrumSepolia, base, mainnet } from "viem/chains"
import { Chain, createPublicClient, http } from "viem"
import { HermesClient, SupportedChainId as PerennialSupportedChainId } from "@perennial/sdk";


const AlchemyKey = process.env.GATSBY_ALCHEMY_KEY || process.env.ALCHEMY_KEY || "";
const AlchemyArbitrumKey = process.env.GATSBY_ALCHEMY_KEY_ARBITRUM || process.env.ALCHEMY_KEY_ARBITRUM || "";
const AlchemyArbitrumSepoliaKey = process.env.GATSBY_ALCHEMY_KEY_ARBITRUM_SEPOLIA || process.env.ALCHEMY_KEY_ARBITRUM_SEPOLIA || "";

export const chains = [arbitrum, arbitrumSepolia, mainnet];

export const SupportedChainIds = [
  arbitrum.id,
  arbitrumSepolia.id,
  mainnet.id,
] as const;

export const chainIdToChainMap = {
  [mainnet.id]: mainnet,
  [arbitrum.id]: arbitrum,
  [arbitrumSepolia.id]: arbitrumSepolia,
  [base.id]: base,
}

export type SupportedChainIdType = (typeof SupportedChainIds)[number];

export const Chains: { [chainId in SupportedChainIdType]: Chain } = {
  [arbitrum.id]: arbitrum,
  [arbitrumSepolia.id]: arbitrumSepolia,
  [mainnet.id]: mainnet,
};

export const isSupportedChain = (chainId?: number) =>
  chainId !== undefined &&
  SupportedChainIds.includes(chainId as SupportedChainIdType);


export const rpcUrls: { [chainId in SupportedChainIdType]: string } = {
  [arbitrum.id]: `https://arb-mainnet.g.alchemy.com/v2/${AlchemyArbitrumKey}`,
  [arbitrumSepolia.id]: `https://arb-sepolia.g.alchemy.com/v2/${AlchemyArbitrumSepoliaKey}`,
  [mainnet.id]: `https://eth-mainnet.g.alchemy.com/v2/${AlchemyKey}`,
}

export const getPublicClient = (chainId: SupportedChainIdType) => { 
  return createPublicClient({
    batch: {
      multicall: true,
    },
    chain: chainIdToChainMap[chainId],
    transport: http(rpcUrls[chainId])
  })
}

export const PerpetualsDefaultChain = chains[0];

export const CrypdexDefaultChain = chains[2];

export const GraphUrls: { [chainId in PerennialSupportedChainId]: string } = {
  [arbitrum.id]: process.env.GATSBY_GRAPH_URL_ARBITRUM || process.env.GRAPH_URL_ARBITRUM || "",
  [arbitrumSepolia.id]: process.env.GATSBY_GRAPH_URL_ARBITRUM_SEPOLIA ?? "",
};

export const ExplorerNames: { [chainId in SupportedChainIdType]: string } = {
  [arbitrum.id]: arbitrum.blockExplorers.default.name,
  [arbitrumSepolia.id]: arbitrumSepolia.blockExplorers.default.name,
  [mainnet.id]: mainnet.blockExplorers.default.name,
}

export const ExplorerURLs: { [chainId in SupportedChainIdType]: string } = {
  [arbitrum.id]: arbitrum.blockExplorers.default.url,
  [arbitrumSepolia.id]: arbitrumSepolia.blockExplorers.default.url,
  [mainnet.id]: mainnet.blockExplorers.default.url,
};

const PythBenchmarkUrlVersion = 'v1'
const PythBenchmarkUrl = "benchmarks.pyth.network" 
export const CryptexPriceFeedUrl = 'https://api.perps.cryptex.finance/price-feed'
export const PythMainnetUrl = "https://perennial.rpc.p2p.world"
export const PythTestnetUrl = "https://perennial.rpc.p2p.world"
export const PythDataFeedUrl = `https://${PythBenchmarkUrl}/${PythBenchmarkUrlVersion}/shims/tradingview`
export const PythPriceFeedUrl = `https://${PythBenchmarkUrl}/${PythBenchmarkUrlVersion}/price_feeds`

export const BackupPythClient = new HermesClient(
  `${typeof window !== 'undefined' ? window.location.origin : 'https://app.perennial.finance'}/api/pyth`,
  {
    timeout: 30000,
  },
)
