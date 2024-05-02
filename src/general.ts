import {objFilterNullish} from './object';

export function noop() {}

export function isEmpty(
  value?:
    | unknown[]
    | Record<string, unknown>
    | Map<unknown, unknown>
    | Set<unknown>
    | string
    | number
    | bigint
    | boolean
    | null,
) {
  // Loosely capturing anything nullish or numberish,
  // but strictly checking against boolean.
  if (
    value == null ||
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    typeof value === 'bigint'
  ) {
    return true;
  }

  if (Array.isArray(value) || typeof value === 'string') {
    return !value.length;
  }

  if (value instanceof Map || value instanceof Set) {
    return !value.size;
  }

  const filteredObj = objFilterNullish(value);
  const objKeys = Object.keys(filteredObj);

  return !objKeys.length;
}
