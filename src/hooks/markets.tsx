import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'

import { useQuery } from '@tanstack/react-query'
import {
  Address,
  Hex,
  decodeFunctionResult,
  encodeFunctionData,
  encodePacked,
  getAddress,
  getContractAddress,
  keccak256,
  pad,
  parseEther, 
  PublicClient, // eslint-disable-line no-restricted-imports
  toHex,
  zeroAddress,
} from 'viem'
import { usePublicClient } from 'wagmi'

import { MarketFactoryAddresses } from '../constants/contracts'
import { SupportedAsset } from '../constants/markets'
import { PositionSide2, addressToAsset2, chainAssetsWithAddress } from '../constants/markets'
import { DefaultChain, SupportedChainId } from '../constants/network'
import { MaxUint256 } from '../constants/units'
import { notEmpty } from '../utils/arrayUtils'
import { Big6Math } from '../utils/big6Utils'
import { getMarketContract, getOracleContract, getPythFactoryContract } from '../utils/contractUtils'
import { buildCommitmentsForOracles } from '../utils/pythUtils'

import { Lens2Abi } from '../abi/Lens2.abi'

import LensArtifact from '../abi/artifacts/Lens.json'
import { usePyth, useRPCProviderUrl } from './network'


export type MarketOracles = NonNullable<ReturnType<typeof useMarketOracles>['data']>
export const useMarketOracles = (publicClient: PublicClient) => {
  const chainId = DefaultChain.id as SupportedChainId
  const pythFactory = getPythFactoryContract(publicClient)

  return useQuery({
    queryKey: ['marketOracles2', chainId],
    queryFn: async () => {
      const markets = chainAssetsWithAddress(chainId)

      const fetchMarketOracles = async (asset: SupportedAsset, marketAddress: Address) => {
        const market = getMarketContract(marketAddress, publicClient)
        const oracleAddress = await market.read.oracle()

        // Fetch oracle data
        const oracle = getOracleContract(oracleAddress, publicClient)
        const global = await oracle.read.global()
        const [keeperOracle] = await oracle.read.oracles([global[0]])

        // KeeperOracle -> Feed
        const feedEvents = await pythFactory.getEvents.OracleCreated(
          { oracle: keeperOracle },
          {
            fromBlock: 0n,
            toBlock: 'latest',
          },
        )
        const feed = feedEvents[0].args.id
        if (!feed) throw new Error(`No feed found for ${keeperOracle}`)

        const [validFrom, underlyingId] = await Promise.all([
          pythFactory.read.validFrom(),
          pythFactory.read.toUnderlyingId([feed]),
        ])

        return {
          asset,
          marketAddress,
          address: oracleAddress,
          providerFactoryAddress: pythFactory.address,
          providerAddress: keeperOracle,
          providerId: feed,
          underlyingId,
          minValidTime: validFrom,
        }
      }

      const marketData = await Promise.all(
        markets.map(({ asset, marketAddress }) => {
          return fetchMarketOracles(asset as SupportedAsset, marketAddress)
        }),
      )

      return marketData.reduce((acc, market) => {
        acc[market.asset] = market
        return acc
      }, {} as Record<SupportedAsset, Awaited<ReturnType<typeof fetchMarketOracles>>>)
    },
  })
}

export type MarketSnapshot = ChainMarketSnapshot & {
  pre: ChainMarketSnapshot
  major: bigint
  majorSide: PositionSide2
  minor: bigint
  minorSide: PositionSide2
  nextMajor: bigint
  nextMajorSide: PositionSide2
  nextMinor: bigint
  nextMinorSide: PositionSide2
  socializationFactor: bigint
  isSocialized: boolean
}

export type MarketSnapshots = NonNullable<Awaited<ReturnType<typeof useMarketSnapshots>>['data']>

export const useMarketSnapshots = () => {
  const chainId = DefaultChain.id as SupportedChainId
  const publicClient = usePublicClient({ chainId })
  const { data: marketOracles } = useMarketOracles(publicClient)
  const pyth = usePyth()
  const providerUrl = useRPCProviderUrl()
  const address = zeroAddress

  return useQuery({
    queryKey: ['marketSnapshots', chainId],
    enabled: !!address && !!marketOracles,
    queryFn: async () => {
      if (!address || !marketOracles) return

      const snapshotData = await fetchMarketSnapshotsAfterSettle(chainId, publicClient, address, marketOracles, providerUrl, pyth)
      const marketSnapshots = snapshotData.market.reduce((acc, snapshot) => {
        const major = Big6Math.max(snapshot.position.long, snapshot.position.short)
        const nextMajor = Big6Math.max(snapshot.nextPosition.long, snapshot.nextPosition.short)
        const minor = Big6Math.min(snapshot.position.long, snapshot.position.short)
        const nextMinor = Big6Math.min(snapshot.nextPosition.long, snapshot.nextPosition.short)
        const socializationFactor = !Big6Math.isZero(major)
          ? Big6Math.min(Big6Math.div(minor + snapshot.nextPosition.maker, major), Big6Math.ONE)
          : Big6Math.ONE
        acc[snapshot.asset] = {
          ...snapshot,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          pre: snapshotData.marketPre.find((pre) => pre.asset === snapshot.asset)!,
          major,
          majorSide: major === snapshot.position.long ? PositionSide2.long : PositionSide2.short,
          nextMajor,
          nextMajorSide: nextMajor === snapshot.nextPosition.long ? PositionSide2.long : PositionSide2.short,
          minor,
          minorSide: minor === snapshot.position.long ? PositionSide2.long : PositionSide2.short,
          nextMinor,
          nextMinorSide: nextMinor === snapshot.nextPosition.long ? PositionSide2.long : PositionSide2.short,
          socializationFactor,
          isSocialized: socializationFactor < Big6Math.ONE,
        }
        return acc
      }, {} as { [key in SupportedAsset]?: MarketSnapshot })
  
      return {
        markets: marketSnapshots,
        commitments: snapshotData.commitments,
        updates: snapshotData.updates,
      }
    },
  })
}

export type ChainMarketSnapshot = Awaited<ReturnType<typeof fetchMarketSnapshotsAfterSettle>>['market'][number]

const fetchMarketSnapshotsAfterSettle = async (
  chainId: SupportedChainId,
  publicClient: PublicClient,
  address: Address,
  marketOracles: MarketOracles,
  providerUrl: string,
  pyth: EvmPriceServiceConnection,
  onPythError?: () => void,
  resetPythError?: () => void,
) => {
  const lensAddress = getContractAddress({ from: address, nonce: MaxUint256 })
  const priceCommitments = await buildCommitmentsForOracles({
    publicClient,
    marketOracles: Object.values(marketOracles),
    pyth,
    onError: onPythError,
    onSuccess: resetPythError,
  })

  const marketAddresses = Object.values(marketOracles).map(({ marketAddress }) => marketAddress)
  const ethCallPayload = {
    to: lensAddress,
    from: address,
    data: encodeFunctionData({
      abi: Lens2Abi,
      functionName: 'snapshot',
      args: [priceCommitments, marketAddresses, address],
    }),
  }

  // Update marketFactory operator storage to allow lens to update address
  // Operator storage mapping is at index 1
  const operatorStorage = keccak256(encodePacked(['bytes32', 'bytes32'], [pad(address), toHex(1n, { size: 32 })]))
  const operatorStorageIndex = keccak256(encodePacked(['bytes32', 'bytes32'], [pad(lensAddress), operatorStorage]))

  const alchemyRes = await fetch(providerUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'eth_call', // use a manual eth_call here to use state overrides
      params: [
        ethCallPayload,
        'latest',
        {
          // state diff overrides
          [lensAddress]: {
            code: LensArtifact.deployedBytecode,
            balance: toHex(parseEther('10000')),
          },
          [MarketFactoryAddresses[chainId]]: {
            stateDiff: {
              [operatorStorageIndex]: pad(toHex(true)), // Set the deployed lens as an approved operator
            },
          },
        },
      ],
    }),
  })

  const batchRes = (await alchemyRes.json()) as { result: Hex }
  const lensRes = decodeFunctionResult({ abi: Lens2Abi, functionName: 'snapshot', data: batchRes.result })

  return {
    commitments: lensRes.commitmentStatus,
    updates: lensRes.updateStatus,
    market: lensRes.postUpdate.marketSnapshots
      .map((s) => {
        const asset = addressToAsset2(getAddress(s.market))
        if (!asset) return undefined;
        return {
          ...s,
          asset,
        }
      })
      .filter(notEmpty),
    marketPre: lensRes.preUpdate.marketSnapshots
      .map((s) => {
        const asset = addressToAsset2(getAddress(s.market))
        if (!asset) return undefined;
        return {
          ...s,
          asset,
        }
      })
      .filter(notEmpty),
    user: lensRes.postUpdate.marketAccountSnapshots
      .map((s) => {
        const asset = addressToAsset2(getAddress(s.market))
        if (!asset) return undefined;
        return {
          ...s,
          asset,
        }
      })
      .filter(notEmpty),
    userPre: lensRes.preUpdate.marketAccountSnapshots
      .map((s) => {
        const asset = addressToAsset2(getAddress(s.market))
        if (!asset) return undefined;
        return {
          ...s,
          asset,
        }
      })
      .filter(notEmpty),
  }
}
