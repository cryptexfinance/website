import { useContext, useMemo } from 'react'
import { useQuery, useQueries } from '@tanstack/react-query'
import { zeroAddress } from 'viem'
import { useBlockNumber } from 'wagmi'
import { addressToAsset, Big6Math, BigOrZero, calcMakerExposure, chainVaultsWithAddress, VaultSnapshot, sum as sumBI } from '@perennial/sdk'

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
  vault,
  accumulations,
}: {
  vault?: VaultSnapshot
  accumulations?: VaultAccumulations
}) => {
  const exposureAndFunding = useMemo(() => {
    if (!vault) {
      return
    }

    const { registrations, marketSnapshots, marketVaultSnapshots } = vault

    const marketExposures = registrations.map((registration) => {
      const marketSnapshot = marketSnapshots.find((v) => v.market === registration.market)
      const marketVaultSnapshot = marketVaultSnapshots.find((v) => v.market === registration.market)
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

      const marketAccumulations = accumulations?.marketValues.find((v) => v.market === registration.market)

      return {
        asset: addressToAsset(registration.market),
        usdExposure,
        assets,
        exposurePct: assets > 0n ? Big6Math.toUnsafeFloat(Big6Math.div(usdExposure, assets)) * 100 : 0,
        weight: registration.weight,
        ...marketAccumulations,
      }
    })

    const netUSDExposure = sumBI(marketExposures.map(({ usdExposure }) => usdExposure))
    const netExposurePct = Big6Math.toUnsafeFloat(Big6Math.div(netUSDExposure, vault.totalAssets)) * 100

    const totalFundingAPR =
      marketExposures.reduce((acc, curr) => acc + BigOrZero(curr.weightedAverageFundingInterest), 0n)
    const totalFeeAPR =
      marketExposures.reduce((acc, curr) => acc + BigOrZero(curr.weightedAverageMakerPositionFees), 0n)

    return {
      marketExposures,
      exposure: Math.abs(netExposurePct),
      isLongExposure: netExposurePct > 0n,
      totalFundingAPR,
      totalFeeAPR,
      totalWeight: registrations.reduce((acc, curr) => acc + curr.weight, 0n),
    }
  }, [vault, accumulations])

  return exposureAndFunding
}

export type VaultAccumulations = NonNullable<Awaited<ReturnType<typeof useVaults7dAccumulations>>[number]['data']>
export const useVaults7dAccumulations = () => {
  const chainId = usePerpetualsChainId()
  const { data: vaultSnapshots, isLoading: vaultSnapshotsLoading } = useVaultSnapshots()
  const vaults = chainVaultsWithAddress(chainId)
  const { data: blockNumber } = useBlockNumber()
  const sdk = usePerennialSDKContext()

  return useQueries({
    queries: vaults.map((vault) => {
      return {
        queryKey: ['vaults7dAccumulations', chainId, vault.vaultAddress],
        enabled: !vaultSnapshotsLoading && !!vaultSnapshots?.vault?.[vault.vault] && !!blockNumber,
        queryFn: async () => {
          if (!sdk) return

          const vaultSnapshot = vaultSnapshots?.vault[vault.vault]
          if (!vaultSnapshot || !blockNumber) return

          const vault7dAccumulations = await sdk.vaults.read.vault7dAccumulations({
            vaultAddress: vault.vaultAddress,
            vaultSnapshot,
            latestBlockNumber: blockNumber,
          })

          return vault7dAccumulations
        },
      }
    }),
  })
}

export type VaultAccumulation = NonNullable<Awaited<ReturnType<typeof useVault7dAccumulations>>['data']>
export const useVault7dAccumulations = (vaultSnapshot: VaultSnapshot) => {
  const chainId = usePerpetualsChainId()
  const { data: blockNumber } = useBlockNumber()
  const sdk = usePerennialSDKContext()

  return useQuery({
    queryKey: ['vault7dAccumulations', chainId, vaultSnapshot.vault],
    enabled: !!blockNumber,
    queryFn: async () => {
      if (!sdk) return
      if (!vaultSnapshot || !blockNumber) return

      const vault7dAccumulations = await sdk.vaults.read.vault7dAccumulations({
        vaultAddress: vaultSnapshot.vault,
        vaultSnapshot,
        latestBlockNumber: blockNumber,
      })

      return vault7dAccumulations
    },
  })
}
