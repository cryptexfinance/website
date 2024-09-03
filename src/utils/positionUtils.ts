import { formatEther, parseEther } from "viem";
import { PositionStruct, PrePositionStruct } from "../hooks/marketsV1";


// v1 utils
export const BigMath = {
  abs(x: bigint) {
    return x < 0n ? -x : x
  },
  sign(x: bigint) {
    if (x === 0n) return 0n
    return x < 0n ? -1n : 1n
  },
  pow(base: bigint, exponent: bigint) {
    return base ** exponent
  },
}

export const nextPosition = (pre: PrePositionStruct, pos: PositionStruct): PositionStruct => {
  return {
    maker: pos.maker + pre.openPosition.maker - pre.closePosition.maker,
    taker: pos.taker + pre.openPosition.taker - pre.closePosition.taker,
  }
}

export const addPositions = (a: PositionStruct, b: PositionStruct): PositionStruct => {
  return {
    maker: a.maker + b.maker,
    taker: a.taker + b.taker,
  }
}

export const calculateLeverageBN = (price: bigint, position: bigint, collateral: bigint): bigint => {
  if (position === 0n || collateral === 0n) return 0n;
  const notional = BigMath.abs(price) * position;
  return notional / collateral;
}

export const calculateFunding = (leverage: bigint, rate: bigint, globalPosition: PositionStruct) => {
  if (globalPosition.maker === 0n) return 0n

  const lev = parseFloat(formatEther(leverage));
  const r = parseFloat(formatEther(rate));

  const taker = parseFloat(formatEther(globalPosition.taker));
  const maker = parseFloat(formatEther(globalPosition.maker));
  const funding = lev * r * taker / maker;

  return parseEther(funding.toFixed(17));
}
