// eslint-disable-next-line no-restricted-imports
import { formatUnits, parseUnits } from 'viem'

export const BigOrZero = (value: number | bigint | string | undefined | null): bigint => {
  return BigInt(value ?? 0)
}

export const formatBig6 = (
  value: bigint = 0n,
  {
    numSigFigs = 4,
    useGrouping = true,
    minDecimals = 4,
  }: { numSigFigs?: number; useGrouping?: boolean | undefined; minDecimals?: number } = {},
) => {
  return Intl.NumberFormat('en-US', {
    minimumSignificantDigits: numSigFigs,
    maximumSignificantDigits: numSigFigs,
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: minDecimals,

    useGrouping,
    // @ts-ignore
    roundingPriority: 'morePrecision',
  }).format(Big6Math.toUnsafeFloat(value))
}

// Formats an 18 decimal bigint as a USD price
export const formatBig6USDPrice = (
  value: bigint = 0n,
  {
    compact = false,
    fromUsdc = false,
    fullPrecision = false,
  }: { compact?: boolean; fromUsdc?: boolean; fullPrecision?: boolean } = {},
) => {
  // Hardcoding this to return $0.00 because 'roundingPriority' option is not supported in node 18
  // resulting in a hydration error when the resolution occurs on first client render
  if (value === 0n) {
    return '$0.0000'
  }
  const valueToFormat = fromUsdc ? Number(formatUnits(value, 6)) : Big6Math.toUnsafeFloat(value)
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: compact ? 'compact' : undefined,
    minimumFractionDigits: 2,
    maximumFractionDigits: fullPrecision ? 6 : 2,
    minimumSignificantDigits: compact ? 2 : 6,
    maximumSignificantDigits: compact ? 2 : 6,
    // @ts-ignore
    roundingPriority: 'morePrecision',
  }).format(valueToFormat)
}

// Formats an 18 decimal bigint as a USD price
export const formatBig6Percent = (value: bigint = 0n, { numDecimals = 2 }: { numDecimals?: number } = {}) => {
  return Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: numDecimals,
    maximumFractionDigits: numDecimals,
  }).format(Big6Math.toUnsafeFloat(value))
}

export class Big6Math {
  public static FIXED_DECIMALS = 6
  public static BASE = BigInt('1000000')
  public static ZERO = 0n
  public static ONE = 1n * Big6Math.BASE
  public static TWO = 2n * Big6Math.BASE

  public static mul(a: bigint, b: bigint): bigint {
    return (a * b) / this.BASE
  }

  public static div(a: bigint, b: bigint): bigint {
    return (a * this.BASE) / b
  }

  public static add(a: bigint, b: bigint): bigint {
    return a + b
  }

  public static sub(a: bigint, b: bigint): bigint {
    return a - b
  }

  public static isZero(a: bigint): boolean {
    return this.ZERO === a
  }

  public static eq(a: bigint, b: bigint): boolean {
    return a === b
  }

  public static abs(a: bigint): bigint {
    return a < 0n ? -a : a
  }

  public static max(...values: bigint[]): bigint {
    let maxVal = values[0]
    for (const val of values) {
      maxVal = val > maxVal ? val : maxVal
    }
    return maxVal
  }

  public static min(...values: bigint[]): bigint {
    let minVal = values[0]
    for (const val of values) {
      minVal = val < minVal ? val : minVal
    }
    return minVal
  }

  public static cmp(a: bigint, b: bigint): number {
    return a === b ? 0 : a < b ? -1 : 1
  }

  public static fromFloatString(a: string, floor: boolean = false): bigint {
    if (!a || a === '.') return 0n

    if (floor) {
      return parseUnits(this.max6Decimals(a), Big6Math.FIXED_DECIMALS)
    }
    return parseUnits(a.replace(/','/g, '') as `${number}`, Big6Math.FIXED_DECIMALS)
  }

  public static toFloatString(a: bigint): string {
    return formatUnits(a, Big6Math.FIXED_DECIMALS)
  }

  public static toUnsafeFloat(a: bigint): number {
    return parseFloat(Big6Math.toFloatString(a))
  }

  public static fromDecimals(amount: bigint, decimals: number): bigint {
    return amount * 10n ** BigInt(Big6Math.FIXED_DECIMALS - decimals)
  }

  public static to18Decimals(amount: bigint): bigint {
    return amount * BigInt('1000000000000')
  }

  public static max6Decimals = (amount: string) => {
    const [first, decimals] = amount.split('.')
    if (!decimals || decimals.length <= 6) {
      return amount
    }

    return `${first}.${decimals.substring(0, 6)}`
  }
}
