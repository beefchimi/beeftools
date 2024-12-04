import {describe, it, expect} from 'vitest';

import {noop, isEmpty} from '../general';
import {objFilterNullish} from '../object';

describe('general utilities', () => {
  describe('noop()', () => {
    it('returns `undefined`', async () => {
       
      const result = noop();
      expect(result).toBeUndefined();
    });
  });

  describe('isEmpty()', () => {
    describe('automatic `true` result', () => {
      it('returns `true` for nullish values', async () => {
        const result1 = isEmpty();
        const result2 = isEmpty(undefined);
        const result3 = isEmpty(null);

        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);
      });

      it('returns `true` for either `boolean`', async () => {
        const result1 = isEmpty(false);
        const result2 = isEmpty(true);

        expect(result1).toBe(true);
        expect(result2).toBe(true);
      });

      it('returns `true` for any `number`', async () => {
        const result1 = isEmpty(-0);
        const result2 = isEmpty(0);
        const result3 = isEmpty(-1);
        const result4 = isEmpty(1);
        const result5 = isEmpty(12.34);
        const result6 = isEmpty(NaN);
        const result7 = isEmpty(Infinity);
        const result8 = isEmpty(1000n);

        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);
        expect(result4).toBe(true);
        expect(result5).toBe(true);
        expect(result6).toBe(true);
        expect(result7).toBe(true);
        expect(result8).toBe(true);
      });
    });

    describe('arguments with `length` property', () => {
      it('returns `true` for an empty `array`', async () => {
        const result = isEmpty([]);
        expect(result).toBe(true);
      });

      it('returns `false` for a populated `array`', async () => {
        const result = isEmpty([0, false, 1000n]);
        expect(result).toBe(false);
      });

      it('returns `true` for an empty `string`', async () => {
        const result = isEmpty('');
        expect(result).toBe(true);
      });

      it('returns `false` for a populated `string`', async () => {
        const result = isEmpty('abc');
        expect(result).toBe(false);
      });
    });

    describe('arguments with `size` property', () => {
      it('returns `true` for an empty `Map`', async () => {
        const result = isEmpty(new Map());
        expect(result).toBe(true);
      });

      it('returns `false` for a populated `Map`', async () => {
        const result = isEmpty(
          new Map([
            ['foo', 'bar'],
            ['hello', 'world'],
          ]),
        );
        expect(result).toBe(false);
      });

      it('returns `true` for an empty `Set`', async () => {
        const result = isEmpty(new Set());
        expect(result).toBe(true);
      });

      it('returns `false` for a populated `Set`', async () => {
        const result = isEmpty(new Set([0, false, 1000n]));
        expect(result).toBe(false);
      });
    });

    describe('object arguments', () => {
      it('returns `true` for an empty object', async () => {
        const result = isEmpty({});
        expect(result).toBe(true);
      });

      it('returns `true` for a filtered object that has no keys', async () => {
        const mockObj = objFilterNullish({
          beef: null,
          tools: undefined,
        });
        const result = isEmpty(mockObj);

        expect(result).toBe(true);
      });

      it('returns `false` for a filtered object that has keys', async () => {
        const mockObj = objFilterNullish({
          foo: 1,
          bar: 2,
          beef: true,
          chimi: false,
          ear: null,
          wurm: undefined,
          chicken: 0,
          friendship: Infinity,
        });
        const result = isEmpty(mockObj);

        expect(result).toBe(false);
      });
    });
  });
});
