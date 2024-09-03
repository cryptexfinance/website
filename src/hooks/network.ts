import { HermesClient, PriceUpdate, SupportedChainId as PerennialSupportedChainId } from '@perennial/sdk'
import EventEmitter from 'events'
import { GraphQLClient } from 'graphql-request'
import { PublicClient, createPublicClient, webSocket } from 'viem'

import {
  PythMainnetUrl,
  PythTestnetUrl,
  SupportedChainIdType,
  PerpetualsDefaultChain,
  CrypdexDefaultChain,
  GraphUrls
} from '../constants/network'


export const useCrypdexChainId = () => {
  return CrypdexDefaultChain.id as SupportedChainIdType
}


export const usePerpetualsChainId = () => {
  return PerpetualsDefaultChain.id as PerennialSupportedChainId
}

const viemWsClients = new Map<PerennialSupportedChainId, PublicClient>()
// We need to create a WS public client directly instead of using Wagmi's hooks because the wagmi hook
// returns a Fallback provider which does not support eth_subscribe
export const useViemWsClient = () => {
  const chainId = usePerpetualsChainId()
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
  const alchemyKey = process.env.ALCHEMY_KEY_ARBITRUM || process.env.GATSBY_ALCHEMY_KEY_ARBITRUM
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

const graphClients = new Map<PerennialSupportedChainId, GraphQLClient>()
export const useGraphClient = () => {
  const chainId = PerpetualsDefaultChain.id as PerennialSupportedChainId

  if (!graphClients.has(chainId)) graphClients.set(chainId, new GraphQLClient(GraphUrls[chainId]))

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return graphClients.get(chainId)!
}

const graphClientsV1 = new Map<PerennialSupportedChainId, GraphQLClient>()
export const useGraphClientV1 = () => {
  const chainId = PerpetualsDefaultChain.id as PerennialSupportedChainId
  if (!graphClients.has(chainId)) {
    graphClientsV1.set(
      chainId,
      new GraphQLClient("https://subgraph.satsuma-prod.com/f8dfbcd260e8/cryptex--personal--24138/cryptex-arbitrum/api")
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return graphClientsV1.get(chainId)!
}

const pythClients = {
  mainnet: new HermesClient(PythMainnetUrl, { timeout: 30000 }),
  testnet: new HermesClient(PythTestnetUrl, { timeout: 30000}),
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
    emitter.setMaxListeners(20)
    pythSubscriptions.set(key, emitter)
    

    const stream = pyth.getPriceUpdatesStream(feedIds, { parsed: true })
    stream.then((eventSource) => {
      eventSource.onmessage = ({ data }: { data: string }) => {
        emitter.emit('updates', JSON.parse(data) as PriceUpdate)
      }
      eventSource.onerror = () => {
        eventSource.close()
        pythSubscriptions.delete(key)
      }
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return pythSubscriptions.get(key)!
}
