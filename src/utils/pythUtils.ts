
import { PriceServiceConnection } from "@pythnetwork/price-service-client"
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import { Address, Hex, PublicClient } from "viem"

import { getKeeperOracleContract } from './contractUtils'
import { nowSeconds } from './timeUtils'
import { BackupPythClient } from "../constants/network"


export const getRecentVaa = async ({
  pyth,
  feeds,
  useBackupOnError = true,
}: {
  pyth: EvmPriceServiceConnection
  feeds: { underlyingId: string; minValidTime: bigint }[]
  useBackupOnError?: boolean
}): Promise<
  {
    feedId: string
    vaa: string
    publishTime: number
    version: bigint
  }[]
> => {
  try {
    const priceFeeds = await pyth.getLatestPriceFeeds(feeds.map(({ underlyingId }) => underlyingId))
    if (!priceFeeds) throw new Error('No price feeds found')
    
    const formattedPriceFeeds = priceFeeds.map((priceFeed) => {
      const vaa = priceFeed.getVAA()
      if (!vaa) throw new Error('No VAA found')

      const publishTime = priceFeed.getPriceUnchecked().publishTime
      const minValidTime = feeds.find(({ underlyingId }) => `0x${underlyingId}` === priceFeed.id)?.minValidTime

      return {
        feedId: priceFeed.id,
        vaa: `0x${Buffer.from(vaa, 'base64').toString('hex')}`,
        publishTime,
        version: BigInt(publishTime) - (minValidTime ?? 4n),
      }
    })

    return formattedPriceFeeds
  } catch (err: any) {
    console.error('Pyth Recent VAA Error', `Use backup: ${useBackupOnError}`, err)
    // Only use backup if we are on mainnet
    if (useBackupOnError) {
      return getRecentVaa({ pyth: BackupPythClient, feeds, useBackupOnError: false })
    }

    throw err
  }
}

const getVaaForPublishTime = async ({
  pyth,
  feed,
  requestedPublishTime,
}: {
  pyth: PriceServiceConnection
  requestedPublishTime: bigint
  feed: { underlyingId: string; minValidTime: bigint }
}) => {
  const [vaa, publishTime] = await pyth.getVaa(feed.underlyingId, Number(requestedPublishTime))
  if (!vaa) throw new Error('No VAA found')

  return {
    feedId: feed.underlyingId,
    vaa: `0x${Buffer.from(vaa, 'base64').toString('hex')}`,
    publishTime,
    version: BigInt(publishTime) - feed.minValidTime,
  }
}


export const buildCommitmentsForOracles = async ({
  publicClient,
  pyth,
  marketOracles,
  useBackupOnError,
  onError,
  onSuccess,
}: {
  publicClient: PublicClient
  pyth: EvmPriceServiceConnection
  marketOracles: {
    providerAddress: Address
    providerFactoryAddress: Address
    underlyingId: Hex
    providerId: Hex
    minValidTime: bigint
  }[]
  useBackupOnError?: boolean
  onError?: () => void
  onSuccess?: () => void
}): Promise<
  {
    keeperFactory: Address
    version: bigint
    value: bigint
    ids: Hex[]
    updateData: Address
  }[]
> => {

  try {
    const now = BigInt(nowSeconds())
    const feedIds = marketOracles.map(({ underlyingId, minValidTime }) => ({
      underlyingId,
      minValidTime,
    }))
    // Get current VAAs for each price feed
    const priceFeedUpdateData = await getRecentVaa({ pyth, feeds: feedIds })
    console.log("priceFeedUpdateData: ", priceFeedUpdateData)

    const commitments = Promise.all(
      Object.values(marketOracles).map(
        async ({ providerFactoryAddress, providerAddress, underlyingId, providerId, minValidTime }) => {
          const contract = getKeeperOracleContract(providerAddress, publicClient)
          let updateData = priceFeedUpdateData.find(({ feedId }) => `0x${feedId}` === underlyingId)
          if (!updateData) throw new Error('No update data found')

          const [global, next, timeout] = await Promise.all([
            contract.read.global(),
            contract.read.next(),
            contract.read.timeout(),
          ])
          let indexToCommit = global.latestIndex + 1n
          let version = next
          let withinGracePeriod = version > 0n ? now - version < timeout : true

          // Scan forward through the version list until we find a version that is within it's grace period
          // or we reach the end of the list
          while (!withinGracePeriod && indexToCommit < global.currentIndex) {
            indexToCommit = indexToCommit + 1n
            version = indexToCommit < global.currentIndex ? await contract.read.versions([indexToCommit]) : 0n
            withinGracePeriod = version > 0n ? now - version < timeout : true
          }

          // If version is non-zero and before existing update publish time
          // find a VAA with a publish time before version
          if (version > 0n && version < updateData.publishTime) {
            updateData = await getVaaForPublishTime({
              pyth,
              feed: { underlyingId, minValidTime },
              requestedPublishTime: version - minValidTime,
            })
          }

          return {
            keeperFactory: providerFactoryAddress,
            version: updateData.version,
            value: 1n,
            ids: [providerId],
            updateData: updateData.vaa as Hex,
          }
        },
      ),
    )
    
    console.log("commitments: ", commitments)

    onSuccess?.()

    return commitments
  } catch (err: any) {
    if (onError) {
      onError()
    }
    throw err
  }
}


export function pythPriceToBig6(price: bigint, expo: number) {
  const normalizedExpo = price ? 6 + expo : 0
  const normalizedPrice =
    normalizedExpo >= 0 ? price * 10n ** BigInt(normalizedExpo) : price / 10n ** BigInt(Math.abs(normalizedExpo))
  return normalizedPrice
}