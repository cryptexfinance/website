import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { zeroAddress } from 'viem'

import { usePerennialSDKContext } from '../context/perennialSdkContext'
import { arbContractsContext } from '../context'
import { usePerpetualsChainId } from './network'
import { vaultSnapshotFetcher } from './marketsV1'
import { TcapVaultContract } from '../constants/contracts'


export const useProtocolParameter = () => {
  const chainId = usePerpetualsChainId()
  const sdk = usePerennialSDKContext()
  return useQuery({
    queryKey: ['protocolParameter2', chainId, sdk],
    enabled: !!chainId && !!sdk,
    queryFn: async () => {
      if (!sdk) return 

      return sdk.contracts.getMarketFactoryContract().read.parameter()
    },
  })
}

export const useMarketOracles = () => {
  const chainId = usePerpetualsChainId()
  const sdk = usePerennialSDKContext()
  return useQuery({
    queryKey: ['marketOracles', chainId, sdk],
    queryFn: async () => {
      if (!sdk) return 

      const marketOracles = await sdk.markets.read.marketOracles()
      return marketOracles
    },
  })
}

export const useMarketSnapshots = () => {
  const chainId = usePerpetualsChainId()
  const { data: marketOracles } = useMarketOracles()
  const sdk = usePerennialSDKContext()
  const vaultAddress = TcapVaultContract[chainId]
  const contracts = useContext(arbContractsContext)
  const address = zeroAddress

  return useQuery({
    queryKey: ['marketSnapshots', chainId, address],
    enabled: !!address && !!marketOracles,
    queryFn: async () => {
      if (!sdk || !marketOracles) return

      const marketSnapshots = await sdk.markets.read.marketSnapshots({
        marketOracles,
        address,
      })

      const tcapData = await vaultSnapshotFetcher(contracts, vaultAddress)

      return {
        markets: marketSnapshots,
        tcapSnapshot: tcapData,
      }
    },
  })
}
