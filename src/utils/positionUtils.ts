import { PositionStruct, PrePositionStruct } from "../hooks/marketsV1";


// v1 utils
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
