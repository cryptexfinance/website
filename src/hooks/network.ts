import { useEffect, useState } from 'react'
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import EventEmitter from 'events'
import { GraphQLClient } from 'graphql-request'
import { PublicClient, createPublicClient, webSocket } from 'viem'
// eslint-disable-next-line no-restricted-imports
import { useNetwork, usePublicClient, useAccount as useWagmiAccount } from 'wagmi'

import {
  PythMainnetUrl,
  PythTestnetUrl,
  SupportedChainId,
  isSupportedChain,
  DefaultChain,
  GraphUrls
} from '../constants/network'


export const useAddress = () => {
  const { address: wagmiAddress } = useWagmiAccount()

  const [addressInfo, setAddressInfo] = useState<{ address: `0x${string}` | undefined; overriding: boolean }>({
    address: undefined,
    overriding: false,
  })

  useEffect(() => {
    setAddressInfo({ address: wagmiAddress, overriding: false })
  }, [wagmiAddress])

  return addressInfo
}

export const useChainId = () => {
  return DefaultChain.id as SupportedChainId
}


export const useOnSupportedChain = () => {
  let { chain } = useNetwork()
  if (chain) {
    return { isUsingSupportedChain: isSupportedChain(chain.id) }
  }
  return { isUsingSupportedChain: true }
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

export const useRPCProviderUrl = (): string => {
  const chainId = DefaultChain.id as SupportedChainId
  const { transport } = usePublicClient({ chainId })

  return transport.transports[1].value.url // Taken from https://wagmi.sh/core/ethers-adapters
}

const graphClients = new Map<SupportedChainId, GraphQLClient>()
export const useGraphClient = () => {
  const chainId = DefaultChain.id as SupportedChainId

  if (!graphClients.has(chainId)) graphClients.set(chainId, new GraphQLClient(GraphUrls[chainId]))

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return graphClients.get(chainId)!
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
