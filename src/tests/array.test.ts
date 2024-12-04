import {describe, it, expect} from 'vitest';

import {
  arrayDedupe,
  arrayEquals,
  arrayOfLength,
  arrayPaginate,
  arrayShuffle,
  typedObjectKeys,
} from '../array';

describe('array utilities', () => {
  describe('arrayDedupe()', () => {
    it('removes duplicates within a single array', async () => {
      const result = arrayDedupe([1, 2, 3, 1, 2, 3]);
      expect(result).toStrictEqual([1, 2, 3]);
    });

    it('removes duplicates across multiple arrays', async () => {
      const result = arrayDedupe([1, 2, 3], [3, 2, 1], [4, 2, 0]);
      expect(result).toStrictEqual([1, 2, 3, 4, 0]);
    });
  });

  describe('arrayEquals()', () => {
    it('returns `true` when matching', async () => {
      const result = arrayEquals(
        [true, false, null, undefined, 0, 1, 'end'],
        [true, false, null, undefined, 0, 1, 'end'],
      );
      expect(result).toBe(true);
    });

    it('returns `false` when at least one value is unmatched', async () => {
      const result = arrayEquals([true, false], [false, true]);
      expect(result).toBe(false);
    });

    it('returns `true` when sorting is applied ahead of time', async () => {
      const original1 = ['a', 'B', 'c', 'D', 'e', 'F'];
      const original2 = ['F', 'e', 'D', 'c', 'B', 'a'];

      const resultBefore = arrayEquals(original1, original2);
      expect(resultBefore).toBe(false);

      const sorted1 = original1.toSorted();
      const sorted2 = original2.toSorted();

      const resultAfter = arrayEquals(sorted1, sorted2);
      expect(resultAfter).toBe(true);
    });
  });

  describe('arrayOfLength()', () => {
    it('returns an empty array by default', async () => {
      const result = arrayOfLength();
      expect(result).toStrictEqual([]);
    });

    it('returns an array of incremented index values', async () => {
      const mockLength = 6;
      const result = arrayOfLength(mockLength);

      expect(result).toStrictEqual([0, 1, 2, 3, 4, 5]);
      expect(result).toHaveLength(mockLength);
    });
  });

  describe('arrayPaginate()', () => {
    it('returns matching array if `pageSize` is less than or equal to the original array', async () => {
      const original = [0, 1, 2, 3, 4];
      const paginated = arrayPaginate(original);

      expect(paginated).toHaveLength(1);
      expect(arrayEquals(original, paginated[0])).toBe(true);
    });

    it('paginates the array', async () => {
      const original = [0, 1, 2, 3, 4];
      const paginated = arrayPaginate(original, 2);

      expect(paginated).toHaveLength(3);
      expect(paginated[0]).toStrictEqual([0, 1]);
      expect(paginated[1]).toStrictEqual([2, 3]);
      expect(paginated[2]).toStrictEqual([4]);
    });
  });

  describe('arrayShuffle()', () => {
    // Since the shuffle is randomized, it is possible that
    // this test could occasionally fail.
    it('returns a shuffled array with all equivalent values at difference indices', async () => {
      const original = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const result = arrayShuffle(original);

      expect([...original]).toStrictEqual(original);

      expect(result).not.toStrictEqual(original);
      expect(result).toHaveLength(original.length);

       
      expect(result.toSorted()).toStrictEqual(original);
    });
  });

  describe('typedObjectKeys()', () => {
    it('returns the equivalent of Object.keys()', async () => {
      const mockObj = {
        foo: 1,
        bar: 'two',
        beef: false,
        chimi: null,
        tools: undefined,
      };
      const result = typedObjectKeys(mockObj);

      expect(result).toStrictEqual(['foo', 'bar', 'beef', 'chimi', 'tools']);
      expect(result).toStrictEqual(Object.keys(mockObj));
    });
  });
});
