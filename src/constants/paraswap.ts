import { OptimalRate, SwapSide, ParaSwapVersion } from "@paraswap/core";
import { arbitrum, arbitrumSepolia, base, mainnet } from "viem/chains";
import { Address, getAddress } from "viem";

import { SupportedChainIdType } from "./network";

export const ParaswapApiUrl = "https://api.paraswap.io";

export const ParaswapPricesEndpoint = "/prices";

export const ParaswapSwapEndpoint = "/swap";

export const ParaswapTokensEndpoint = "/tokens";

export const ParaswapPartner = "cryptex-finance";

export const ParaswapSlippage = "1000"; // 1%

export const LocalStorageVars = {
  arfiSlippage: "arfi_slippage",
  arfiMaxPriceImpact: "arfi_max_price_impact",
}

export const AugustusSwapperAddress: { [chainId in SupportedChainIdType]: Address } = {
  [arbitrum.id]: getAddress("0x6A000F20005980200259B80c5102003040001068"),
  [base.id]: getAddress("0x6A000F20005980200259B80c5102003040001068"),
  [mainnet.id]: getAddress("0x6A000F20005980200259B80c5102003040001068"),
  [arbitrumSepolia.id]: getAddress("0x6A000F20005980200259B80c5102003040001068"),
} 

export const DummyAddress = "0x9B733ed4CDb40E41eeB4F79ABB0EA0812Cd1dd5f";

export interface MinTokenData {
  decimals: number;
  symbol: string;
  address: Address;
}

export interface TransactionParams {
  to: Address;
  from: Address;
  value: string;
  data: string;
  gasPrice: string;
  gas?: string;
  chainId: number;
}

export interface Swapper {
  getRate(params: {
    srcToken: TokensType;
    destToken: TokensType;
    amount: bigint;
    side: SwapSide;
    partner?: string;
  }): Promise<OptimalRate>;
  buildSwap(params: {
    srcToken: TokensType;
    destToken: TokensType;
    amount: bigint;
    minAmount: bigint;
    side: SwapSide;
    priceRoute: OptimalRate;
    userAddress: Address;
    receiver?: Address;
    partner?: string;
  }): Promise<TransactionParams>;
}

export interface SwapTxInput {
  srcToken: TokensType;
  destToken: TokensType;
  amount: bigint; // in srcToken denomination
  side: SwapSide;
  networkID: SupportedChainIdType;
  slippage?: number;
  partner?: string;
  userAddress: Address;
  receiver?: Address;
}

export type PriceQueryParams = {
  srcToken: string;
  destToken: string;
  srcDecimals: string;
  destDecimals: string;
  amount: string;
  side: SwapSide;
  network: string;
  version: ParaSwapVersion;
  userAddress?: string;
  includeDEXS?: string;
  excludeDEXS?: string;
  slippage?: string;
  partner?: string;
  maxImpact?: string;
  excludeContractMethods?: string;
};

export type TokensType = {
  symbol: string;
  address: Address;
  decimals: number;
  img: string;
  network: number;
}

export const AllowedSellTokens: { [chainId in SupportedChainIdType]: Array<string> } = {
  [arbitrum.id]: [],
  [base.id]: [],
  [mainnet.id]: [
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  ],
  [arbitrumSepolia.id]: [],
};


export const ParaswapErrorMessages = (code: String) => {
  if (code === "ESTIMATED_LOSS_GREATER_THAN_MAX_IMPACT") {
    return "Estimated loss is greater than max impact";
  }
  return code;
}
