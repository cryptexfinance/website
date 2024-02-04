import { ethers } from "ethers";

export const getDefaultProvider = () => {
  const provider = new ethers.providers.InfuraProvider("mainnet", {
    infura: process.env.INFURA_ID || process.env.GATSBY_INFURA_ID,
  });

  return provider;
};

export const getArbitrumProvider = () => {
  const provider = new ethers.providers.InfuraProvider("arbitrum", {
    infura: process.env.INFURA_ID || process.env.GATSBY_INFURA_ID,
  });

  return provider;
};

export const getPriceInUSDFromPair = (
  reserves0: ethers.BigNumber,
  reservesWETH: ethers.BigNumber,
  ethPrice: number
) => {
  const one = ethers.utils.parseEther("1");

  // const reserves0 = resp[0];
  // const reservesWETH = resp[1];
  // amount of token0 required to by 1 WETH
  const amt = parseFloat(ethers.utils.formatEther(one.mul(reserves0).div(reservesWETH)));
  return ethPrice / amt;
};
