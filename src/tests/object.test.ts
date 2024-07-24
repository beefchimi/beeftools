import {describe, it, expect} from 'vitest';

import {noop} from '../general';
import {isObject, objFilterNullish} from '../object';

describe('object utilities', () => {
  describe('isObject()', () => {
    it('returns `true` for plain objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({key: 'value'})).toBe(true);
    });

    it('returns `false` for non-objects', () => {
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject('string')).toBe(false);
      expect(isObject([])).toBe(false);
      expect(isObject(noop)).toBe(false);

      // With `requireSize` argument.
      expect(isObject(null, true)).toBe(false);
      expect(isObject(undefined, true)).toBe(false);
      expect(isObject(123, true)).toBe(false);
      expect(isObject('string', true)).toBe(false);
      expect(isObject([], true)).toBe(false);
      expect(isObject(noop, true)).toBe(false);
    });

    it('returns `true` for non-empty objects when passed `requireSize`', () => {
      expect(isObject({key: 'value'}, true)).toBe(true);
    });

    it('returns `false` for empty objects when passed `requireSize`', () => {
      expect(isObject({}, true)).toBe(false);
    });

    it('returns `true` for non-empty objects when passed `requireSize`', () => {
      expect(isObject({key: 'value'}, true)).toBe(true);
    });
  });

  describe('objFilterNullish()', () => {
    it('returns an object with all null and undefined entries removed', async () => {
      const mockObj = {
        foo: 1,
        bar: 2,
        beef: true,
        chimi: false,
        ear: null,
        wurm: undefined,
        chicken: 0,
        friendship: Infinity,
      };

      const result = objFilterNullish(mockObj);

      expect(result).toStrictEqual({
        foo: 1,
        bar: 2,
        beef: true,
        chimi: false,
        chicken: 0,
        friendship: Infinity,
      });
    });
  });
});
