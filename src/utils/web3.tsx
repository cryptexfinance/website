import { ethers } from "ethers";

export const getDefaultProvider = () => {
  const provider = ethers.getDefaultProvider("mainnet", {
    infura: process.env.REACT_APP_INFURA_ID,
    alchemy: process.env.REACT_APP_ALCHEMY_KEY,
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
