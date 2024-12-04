import type {AnyObj} from './types';

export function isObject(
  value?: unknown,
  requireSize = false,
): value is AnyObj {
  const passed =
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    typeof value !== 'function';

  return requireSize && passed ? Object.keys(value).length > 0 : passed;
}

export function objFilterNullish<T = AnyObj>(obj = {}): T {
  const keys = Object.keys(obj) as (keyof typeof obj)[];

  // NOTE: This filter function is not recursive!
  return keys.reduce<T>((accumulator, current) => {
    return obj[current] == null
      ? accumulator
      : {
          ...accumulator,
          [current]: obj[current],
        };
  }, {} as T);
}
