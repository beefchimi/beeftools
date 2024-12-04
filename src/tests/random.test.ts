import {describe, it, expect} from 'vitest';

import {randomFloat, randomInteger, randomBoolean} from '../random';

describe('random utilities', () => {
  describe('randomFloat()', () => {
    it('returns a random floating-point number', () => {
      const result = randomFloat();
      expect(`${result}`).toContain('.');
    });

    it('returns a number between the specified range', () => {
      const min = 1.8;
      const max = 1.9;
      const result = randomFloat(min, max);

      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });
  });

  describe('randomInteger()', () => {
    it('returns a random integer', () => {
      const result = randomInteger();
      expect(`${result}`).not.toContain('.');
    });

    it('returns a number between the specified range', () => {
      const min = 2;
      const max = 4;
      const result = randomInteger(min, max);

      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });
  });

  describe('randomBoolean()', () => {
    it('returns a random boolean', () => {
      const result = randomBoolean();
      expect(typeof result === 'boolean').toBe(true);
    });
  });
});
