import {describe, it, expect} from 'vitest';

import {
  assertNumber,
  assertInteger,
  assertFloat,
  clamp,
  calcProgress,
  flipNumberSign,
  roundNumber,
  trimDecimals,
} from '../number';

describe('number utilities', () => {
  describe('assertNumber()', () => {
    it('accepts an integer', () => {
      const result = assertNumber(123);
      expect(result).toBe(true);
    });

    it('accepts a float', () => {
      const result = assertNumber(123.456);
      expect(result).toBe(true);
    });

    it('does not allow a bigint', () => {
      const result = assertNumber(1000n);
      expect(result).toBe(false);
    });

    it('does not allow NaN', () => {
      const result = assertNumber(NaN);
      expect(result).toBe(false);
    });

    it('does not allow Infinity', () => {
      const result = assertNumber(Infinity);
      expect(result).toBe(false);
    });

    it('does not allow other non-numnber types', () => {
      expect(assertNumber(true)).toBe(false);
      expect(assertNumber(false)).toBe(false);
      expect(assertNumber({one: 1})).toBe(false);
      expect(assertNumber([1, 2, 3])).toBe(false);
      expect(assertNumber('123')).toBe(false);
    });
  });

  describe('assertInteger()', () => {
    it('returns true when int', () => {
      const result = assertInteger(123);
      expect(result).toBe(true);
    });

    it('returns false when float', () => {
      const result = assertInteger(12.3);
      expect(result).toBe(false);
    });
  });

  describe('assertFloat()', () => {
    it('returns true when float', () => {
      const result = assertFloat(12.3);
      expect(result).toBe(true);
    });

    it('returns false when int', () => {
      const result = assertFloat(123);
      expect(result).toBe(false);
    });
  });

  describe('calcProgress()', () => {
    it('returns percentage integer', () => {
      const result = calcProgress(10);
      expect(result).toBe(10);
    });

    it('returns floating-point result', () => {
      const result = calcProgress(12, {max: 345});
      expect(result).toBe(3.4782608695652173);
    });

    it('returns rounded result', () => {
      const result = calcProgress(12, {max: 345, round: true});
      expect(result).toBe(3);
    });

    it('returns percentage between min and max', () => {
      const result = calcProgress(0, {min: -10, max: 10});
      expect(result).toBe(50);
    });

    it('protects against NaN', () => {
      const result = calcProgress(0, {max: 0});
      expect(result).toBe(0);
    });

    it('protects against Infinity', () => {
      const result = calcProgress(2, {max: 0});
      expect(result).toBe(0);
    });
  });

  describe('clamp()', () => {
    it('returns preference', () => {
      const mockArgs: Parameters<typeof clamp> = [1, 10, 100];
      const result = clamp(...mockArgs);

      expect(result).toBe(10);
    });

    it('returns min', () => {
      const mockArgs: Parameters<typeof clamp> = [10, 1, 100];
      const result = clamp(...mockArgs);

      expect(result).toBe(10);
    });

    it('returns max', () => {
      const mockArgs: Parameters<typeof clamp> = [1, 100, 10];
      const result = clamp(...mockArgs);

      expect(result).toBe(10);
    });

    it('protects against NaN', () => {
      const result = clamp(1, NaN, 2);
      expect(result).toBe(0);
    });

    it('protects against Infinity', () => {
      const result = clamp(Infinity, Infinity, Infinity);
      expect(result).toBe(0);
    });
  });

  describe('flipNumberSign()', () => {
    it('returns a negative number when provided a positive number', () => {
      const result = flipNumberSign(123);
      expect(result).toBe(-123);
    });

    it('returns a positive number when provided a negative number', () => {
      const result = flipNumberSign(-321);
      expect(result).toBe(321);
    });

    it('returns a positive 0', () => {
      const result = flipNumberSign(-0);
      expect(result).toBe(0);
    });

    it('does not flip a positive 0 to negative', () => {
      const result = flipNumberSign(0);
      expect(result).toBe(0);
    });
  });

  describe('roundNumber()', () => {
    it('returns an integer by default', () => {
      const result = roundNumber(123.456);
      expect(result).toBe(123);
    });

    it('rounds to the specified decimal length', () => {
      const result = roundNumber(1234.567, 2);
      expect(result).toBe(1234.57);
    });

    it('trims to the specified decimal length when rounding is not required', () => {
      const result = roundNumber(9876.54321, 3);
      expect(result).toBe(9876.543);
    });

    it('does no additional rounding when not required', () => {
      const result = roundNumber(654.321, 8);
      expect(result).toBe(654.321);
    });
  });

  describe('trimDecimals()', () => {
    it('returns an integer when there is nothing to trim', () => {
      const result = trimDecimals(123);
      expect(result).toBe(123);
    });

    it('returns 2 decimal places by default', () => {
      const result = trimDecimals(987.654321);
      expect(result).toBe(987.65);
    });

    it('returns the specified decimals', () => {
      const result = trimDecimals(123.456789, 3);
      expect(result).toBe(123.456);
    });

    it('returns an integer when decimals is `0`', () => {
      const result = trimDecimals(123.456789, 0);
      expect(result).toBe(123);
    });
  });
});
