interface CalcProgressOptions {
  min?: number;
  max?: number;
  // Consider: boolean | 'floor' | 'ceil' | 'trim';
  round?: boolean;
}

export function assertNumber(value?: unknown): value is number {
  // Both `NaN` and `Infinity` are of type `number`,
  // but will not pass the `isFinite()` check.
  return typeof value === 'number' && isFinite(value);
}

export function assertInteger(value?: unknown): value is number {
  return assertNumber(value) && Number.isInteger(value);
}

export function assertFloat(value?: unknown): value is number {
  return assertNumber(value) && !Number.isInteger(value);
}

export function calcProgress(value = 0, options: CalcProgressOptions = {}) {
  const {min = 0, max = 100, round = false} = options;

  const range = max - min;
  const adjustedValue = value - min;
  const percentage = (adjustedValue / range) * 100;
  const result = assertNumber(percentage) ? percentage : 0;

  return round ? Math.floor(result) : result;
}

export function clamp(min = 0, preference = 0.5, max = 1) {
  const result = Math.min(Math.max(min, preference), max);
  return assertNumber(result) ? result : 0;
}

export function flipNumberSign(value = 0) {
  if (Object.is(value, -0)) return 0;
  return value ? -value : value;
}

export function roundNumber(value = 0, decimals = 0) {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

export function trimDecimals(value = 0, decimals = 2) {
  if (decimals === 0) return Math.trunc(value);

  const parts = `${value}`.split('.').filter((part) => part !== '.');

  if (parts.length <= 1) return value;

  // TODO: `first/last` are only necessary because TypeScript
  // cannot determine that the `parts.length` condition guards
  // against each segment being `undefined`.
  const first = parts[0] ?? '';
  const last = parts[1] ?? '';

  const trimmedDecimals = last.slice(0, decimals);
  const joined = [first, trimmedDecimals].join('.');

  return parseFloat(joined);
}
