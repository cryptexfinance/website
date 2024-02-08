import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import EventEmitter from 'events'
import { GraphQLClient } from 'graphql-request'
import { PublicClient, createPublicClient, webSocket } from 'viem'


import {
  PythMainnetUrl,
  PythTestnetUrl,
  SupportedChainId,
  DefaultChain,
  GraphUrls
} from '../constants/network'


export const useChainId = () => {
  return DefaultChain.id as SupportedChainId
}


const viemWsClients = new Map<SupportedChainId, PublicClient>()
// We need to create a WS public client directly instead of using Wagmi's hooks because the wagmi hook
// returns a Fallback provider which does not support eth_subscribe
export const useViemWsClient = () => {
  const chainId = useChainId()
  const providerUrl = useRPCProviderUrl()

  if (!viemWsClients.has(chainId)) {
    viemWsClients.set(chainId, createPublicClient({ transport: webSocket(providerUrl.replace('https://', 'wss://')) }))
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return viemWsClients.get(chainId)!
}

const randomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const useRPCProviderUrl = (): string => {
  const alchemyKey = process.env.ALCHEMY_KEY || process.env.GATSBY_ALCHEMY_KEY
  const alchemyKey2 = process.env.ALCHEMY_KEY_2 || process.env.GATSBY_ALCHEMY_KEY_2
  const alchemyKey3 = process.env.ALCHEMY_KEY_3 || process.env.GATSBY_ALCHEMY_KEY_3

  const n = randomInteger(0, 2)
  const keys = [alchemyKey, alchemyKey2, alchemyKey3]

  return `https://arb-mainnet.g.alchemy.com/v2/${keys[n]}`
}

/* export const useRPCProviderUrl = (): string => {
  const pc = getViemClient()
  return pc.transport.url
} */

const graphClients = new Map<SupportedChainId, GraphQLClient>()
export const useGraphClient = () => {
  const chainId = DefaultChain.id as SupportedChainId

  if (!graphClients.has(chainId)) graphClients.set(chainId, new GraphQLClient(GraphUrls[chainId]))

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return graphClients.get(chainId)!
}

const graphClientsV1 = new Map<SupportedChainId, GraphQLClient>()
export const useGraphClientV1 = () => {
  const chainId = DefaultChain.id as SupportedChainId
  if (!graphClients.has(chainId)) {
    graphClientsV1.set(
      chainId,
      new GraphQLClient("https://api.thegraph.com/subgraphs/name/cryptexfinance/cryptex-arbitrum")
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return graphClientsV1.get(chainId)!
}

const pythClients = {
  mainnet: new EvmPriceServiceConnection(PythMainnetUrl, { timeout: 10000, priceFeedRequestConfig: { binary: true } }),
  testnet: new EvmPriceServiceConnection(PythTestnetUrl, { timeout: 10000, priceFeedRequestConfig: { binary: true } }),
}

export const usePyth = () => {
  return pythClients.mainnet
}

const pythSubscriptions = new Map<string, EventEmitter>()
export const usePythSubscription = (feedIds: string[]) => {
  const pyth = usePyth()
  const key = feedIds.sort().join(',')
  if (!pythSubscriptions.has(key)) {
    const emitter = new EventEmitter()
    pyth.subscribePriceFeedUpdates(feedIds, (updates) => {
      emitter.emit('updates', updates)
    })
    pythSubscriptions.set(key, emitter)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return pythSubscriptions.get(key)!
}
