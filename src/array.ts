import type {Primitive} from './types';

export function arrayDedupe<T extends unknown[]>(...arrays: T[]) {
  // Not recursive (will not dedupe nested arrays).
  return [...new Set([...arrays.flat()])];
}

export function arrayEquals(one: Primitive[], two: Primitive[]) {
  // This utility does only a shallow comparison, and is order dependant.
  // You may need to call `.toSorted()` and/or serialize your arguments.
  const equalLength = one.length === two.length;
  return equalLength && one.every((value, index) => value === two[index]);
}

export function arrayOfLength(length = 0) {
  const safeLength = Math.max(0, length);
  const ghostArray = Array.from(Array(safeLength));

  return ghostArray.map((_item, index) => index);
}

export function arrayPaginate<T>(array: T[], pageSize = 10): T[][] {
  const shallowClone = [...array];
  const safeSize = Math.max(0, pageSize);

  if (shallowClone.length <= safeSize) return [shallowClone];

  const endLength = Math.ceil(shallowClone.length / safeSize);

  return arrayOfLength(endLength).map((index) => {
    const start = index * safeSize;
    const end = start + safeSize;
    return shallowClone.slice(start, end);
  });
}

export function arrayShuffle<T>(array: T[]): T[] {
  return array
    .map((item) => ({sort: Math.random(), value: item}))
    .sort((one, two) => one.sort - two.sort)
    .map((item) => item.value);
}

export const typedObjectKeys = Object.keys as <T extends object>(
  obj: T,
) => Array<keyof T>;
