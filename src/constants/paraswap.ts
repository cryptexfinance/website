import { OptimalRate, SwapSide, ParaSwapVersion } from "@paraswap/core";
import { Address } from "viem";

import { SupportedChainIdType } from "./network";


export const ParaswapApiUrl = "https://api.paraswap.io";

export const ParaswapPricesEndpoint = "/prices";

export const ParaswapTokensEndpoint = "/tokens";

export const ParaswapPartner = "chucknorrisv6";

export const ParaswapSlippage = 1; // 1%

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
  partner: string;
  version: ParaSwapVersion;
  maxImpact: string;
};

export type TokensType = {
  symbol: string;
  address: Address;
  decimals: number;
  img: string;
  network: number;
}
