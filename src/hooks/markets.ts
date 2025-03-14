import { useContext, useMemo } from 'react'
import { useQuery, useQueries } from '@tanstack/react-query'
import { Address, zeroAddress } from 'viem'
import { useBlockNumber } from 'wagmi'
import {
  addressToAsset,
  Big6Math,
  calcMakerExposure,
  chainVaultsWithAddress,
  VaultSnapshot, sum as sumBI,
  last7dBounds,
  SupportedAsset,
  addressToMarket,
  calcMakerStats,
  SupportedChainId,
} from '@perennial/sdk'

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
  const vaultAddress = TcapVaultContract[chainId]
  const contracts = useContext(arbContractsContext)
  const address = zeroAddress

  return useQuery({
    queryKey: ['marketSnapshots', chainId, address],
    enabled: !!address,
    queryFn: async () => {
      const tcapData = await vaultSnapshotFetcher(contracts, vaultAddress)

      return {
        tcapSnapshot: tcapData,
      }
    },
  })
}

export const useVaultSnapshots = () => {
  const chainId = usePerpetualsChainId()
  const sdk = usePerennialSDKContext()
  const vaults = chainVaultsWithAddress(chainId)
  const { data: marketOracles } = useMarketOracles()

  return useQuery({
    enabled: !!vaults && !!vaults.length && !!marketOracles,
    queryKey: ['vaultSnapshots2', chainId],
    queryFn: async () => {
      if (!sdk || !marketOracles) return

      const vaultSnapshots = await sdk.vaults.read.vaultSnapshots({
        address: zeroAddress,
        onError: () => {},
        onSuccess: () => {},
      })
      return vaultSnapshots
    },
  })
}

export const useExposureAndFunding = ({
  chainId,
  vault,
  marketData,
}: {
  chainId: SupportedChainId
  vault?: VaultSnapshot
  marketData?: VaultMarketData['marketData']
}) => {
  const exposureAndFunding = useMemo(() => {
    if (!vault) {
      return
    }

    const { registrations, marketSnapshots, marketVaultSnapshots } = vault
    const marketExposures = registrations.map((registration) => {
      const marketSnapshot = marketSnapshots.find((v) => v.marketAddress === registration.market)
      const marketVaultSnapshot = marketVaultSnapshots.find((v) => v.marketAddress === registration.market)
      const price = marketSnapshot?.global.latestPrice ?? 0n
      const vaultMakerPosition = marketVaultSnapshot?.nextPosition.maker ?? 0n

      const exposure = calcMakerExposure(
        vaultMakerPosition,
        marketSnapshot?.nextPosition.maker ?? 0n,
        marketSnapshot?.nextPosition.long ?? 0n,
        marketSnapshot?.nextPosition.short ?? 0n,
      )
      const usdExposure = Big6Math.mul(exposure, price)
      const assets = marketVaultSnapshot?.local.collateral ?? 0n

      const marketStats = marketData?.[registration.market]
      const makerStats = calcMakerStats({
        funding: marketStats?.makerAccumulation.funding ?? 0n,
        interest: marketStats?.makerAccumulation.interest ?? 0n,
        positionFee: marketStats?.makerAccumulation.positionFee ?? 0n,
        positionSize: marketVaultSnapshot?.nextPosition.maker ?? 0n,
        collateral: marketVaultSnapshot?.local.collateral ?? 0n,
      })

      return {
        asset: addressToMarket(chainId, registration.market),
        usdExposure,
        assets,
        exposurePct: assets > 0n ? Big6Math.toUnsafeFloat(Big6Math.div(usdExposure, assets)) * 100 : 0,
        weight: registration.weight,
        makerStats,
      }
    })

    const netUSDExposure = sumBI(marketExposures.map(({ usdExposure }) => usdExposure))
    const netExposurePct = Big6Math.toUnsafeFloat(Big6Math.div(netUSDExposure, vault.totalAssets)) * 100

    const totalFundingAPR = marketExposures.reduce(
      (acc, curr) => acc + Big6Math.mul(curr.makerStats.fundingAPR + curr.makerStats.interestAPR, curr.weight),
      0n,
    )
    const totalFeeAPR = marketExposures.reduce(
      (acc, curr) => acc + Big6Math.mul(curr.makerStats.positionFeeAPR, curr.weight),
      0n,
    )

    return {
      marketExposures,
      exposure: Math.abs(netExposurePct),
      isLongExposure: netExposurePct > 0n,
      totalFundingAPR,
      totalFeeAPR,
      totalWeight: registrations.reduce((acc, curr) => acc + curr.weight, 0n),
    }
  },
    // eslint-disable-next-line
    [vault, marketData]
  )

  return exposureAndFunding
}


export type VaultMarketData = NonNullable<Awaited<ReturnType<typeof useVault7dMarketData>>[number]['data']>
export const useVault7dMarketData = () => {
  const chainId = usePerpetualsChainId()
  const { data: vaultSnapshots, isLoading: vaultSnapshotsLoading } = useVaultSnapshots()
  const vaults = chainVaultsWithAddress(chainId)
  const { data: blockNumber } = useBlockNumber()
  const { data: market7dData } = useMarket7dData()

  return useQueries({
    queries: vaults.map((vault) => {
      return {
        queryKey: ['vault7dMarketData', chainId, vault.vaultAddress],
        enabled: !vaultSnapshotsLoading && !!vaultSnapshots?.vault?.[vault.vault] && !!blockNumber && !!market7dData,
        queryFn: async () => {
          const vaultSnapshot = vaultSnapshots?.vault[vault.vault]
          if (!vaultSnapshot || !blockNumber || !market7dData) return

          const marketData = vaultSnapshot.registrations.reduce((acc, registration) => {
            const asset = addressToAsset(chainId, registration.market)
            if (!asset || !market7dData[asset]) return acc
            acc[registration.market] = market7dData[asset]
            return acc
          }, {} as Record<Address, (typeof market7dData)[SupportedAsset]>)

          return { vault, marketData }
        },
      }
    }),
  })
}

export const useMarket7dData = () => {
  const chainId = usePerpetualsChainId()
  const sdk = usePerennialSDKContext()

  return useQuery({
    queryKey: ['market7dData', chainId],
    queryFn: async () => {
      const { from, to } = last7dBounds()
      if (!sdk) return

      return sdk.markets.read.marketsHistoricalData({
        fromTs: BigInt(from),
        toTs: BigInt(to),
      })
    },
  })
}
