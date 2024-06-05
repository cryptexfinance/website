import React from 'react'
import PerennialSdk from '@perennial/sdk'
import { createContext, useContext, useMemo } from 'react'
import { useWalletClient } from 'wagmi'

import { GraphUrls, PythMainnetUrl } from '../constants/network'
import { useChainId, useRPCProviderUrl } from '../hooks/network'

const SDKContext = createContext<PerennialSdk | null>(null)

export const PerennialSDKProvider = ({ children }: { children: React.ReactNode }) => {
  const chainId = useChainId()
  const walletClient = useWalletClient({ chainId })
  const rpcUrl = useRPCProviderUrl()

  const sdk = useMemo(() => {
    if (!PythMainnetUrl) throw new Error('Missing PythMainnetUrl')

    return new PerennialSdk({
      chainId,
      rpcUrl,
      walletClient: walletClient.data ?? undefined,
      graphUrl: GraphUrls[chainId],
      pythUrl: PythMainnetUrl,
    })
  }, [rpcUrl, walletClient, chainId])

  return <SDKContext.Provider value={sdk}>{children}</SDKContext.Provider>
}

export const usePerennialSDKContext = () => {
  const context = useContext(SDKContext)
  /* if (!context) {
    throw new Error('useSDKContext must be used within a SDKContext provider')
  } */
  return context
}