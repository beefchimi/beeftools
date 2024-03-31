import type {AnyObj} from './types';

export function objFilterNullish<T = AnyObj>(obj = {}): T {
  const keys = Object.keys(obj) as Array<keyof typeof obj>;

  // NOTE: This filter function is not recursive!
  return keys.reduce<T>((accumulator, current) => {
    return obj[current] == null
      ? accumulator
      : {
          ...accumulator,
          [current]: obj[current],
        };
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
  }, {} as T);
}
