import { ethers } from "ethers";
import { MulticallWrapper } from "ethers-multicall-provider";
import { PerpetualsDefaultChain } from "../constants/network";

export const getDefaultProvider = () => {
  const provider = new ethers.InfuraProvider(
    "mainnet",
    process.env.INFURA_ID || process.env.GATSBY_INFURA_ID,
  )

  return MulticallWrapper.wrap(provider)
}

export const getArbitrumProvider = () => {
  const provider = new ethers.InfuraProvider(PerpetualsDefaultChain.id,
    process.env.INFURA_ID || process.env.GATSBY_INFURA_ID,
  )

  return MulticallWrapper.wrap(provider)
}

export const getPriceInUSDFromPair = (
  reserves0: bigint,
  reservesWETH: bigint,
  ethPrice: number
) => {
  const one = ethers.parseEther("1");
  const amt = parseFloat(ethers.formatEther(one * reserves0 / reservesWETH))
  return ethPrice / amt
}
