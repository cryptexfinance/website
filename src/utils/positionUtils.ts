import { PositionSide2 } from "../constants/markets"
import { MaxUint256 } from "../constants/units"
import { MarketSnapshot } from "../hooks/markets"

import { Big6Math, formatBig6Percent } from "./big6Utils"

export const UpdateNoOp = MaxUint256;


export const calcNotional = (position: bigint, price: bigint) => {
  return Big6Math.abs(Big6Math.mul(position, price));
}

export function calcTakerLiquidity(marketSnapshot: MarketSnapshot) {
  const {
    nextPosition: { long, short, maker },
  } = marketSnapshot
  const availableLongLiquidity = Big6Math.sub(Big6Math.add(short, maker), long)
  const totalLongLiquidity = Big6Math.add(short, maker)
  const availableShortLiquidity = Big6Math.sub(Big6Math.add(long, maker), short)
  const totalShortLiquidity = Big6Math.add(long, maker)

  return {
    availableLongLiquidity,
    totalLongLiquidity,
    availableShortLiquidity,
    totalShortLiquidity,
  }
}


export function calcLpExposure(marketSnapshot?: MarketSnapshot) {
  if (!marketSnapshot) return undefined
  const {
    majorSide,
    minorSide,
    nextPosition: { long, short, maker },
  } = marketSnapshot

  const majorPosition = majorSide === PositionSide2.long ? long : short
  const minorPosition = majorSide === PositionSide2.long ? short : long

  const lpExposure = maker > 0n ? Big6Math.div(majorPosition - minorPosition, maker) : 0n

  return {
    lpExposure: lpExposure,
    formattedLpExposure: formatBig6Percent(lpExposure, { numDecimals: 2 }),
    exposureSide: minorSide,
  }
}


export function calcLpUtilization(marketSnapshot?: MarketSnapshot) {
  if (!marketSnapshot) return undefined;
  const {
    majorSide,
    minorSide,
    nextPosition: { long, short, maker },
  } = marketSnapshot;

  const majorPosition = majorSide === PositionSide2.long ? long : short;
  const minorPosition = majorSide === PositionSide2.long ? short : long;

  const lpUtilization =
    maker > 0n
      ? Big6Math.div(Big6Math.sub(majorPosition, minorPosition), maker)
      : 0n;

  return {
    lpUtilization,
    formattedLpUtilization: formatBig6Percent(lpUtilization, {
      numDecimals: 2,
    }),
    exposureSide: minorSide,
  };
}


export const calcSkew = (marketSnapshot?: MarketSnapshot) => {
  if (!marketSnapshot) return undefined
  const {
    nextPosition: { long, short },
    riskParameter: { virtualTaker },
  } = marketSnapshot
  const nextMajor = long > short ? long : short
  const skew = nextMajor + virtualTaker > 0n ? Big6Math.div(long - short, nextMajor + virtualTaker) : 0n

  const totalTaker = long + short
  const longSkew = totalTaker > 0n ? Big6Math.div(long, totalTaker) : 0n
  const shortSkew = totalTaker > 0n ? Big6Math.div(short, totalTaker) : 0n

  return {
    skew,
    longSkew,
    shortSkew,
  };
}


export const efficiency = (maker: bigint, major: bigint) => {
  return major > 0n ? Big6Math.min(Big6Math.div(maker, major), Big6Math.ONE) : Big6Math.ONE
}

