import { ethers } from "ethers";

export const getDefaultProvider = () => {
  const provider = ethers.getDefaultProvider("mainnet", {
    infura: process.env.REACT_APP_INFURA_ID,
    alchemy: process.env.REACT_APP_ALCHEMY_KEY,
  });
  
  return provider;
};