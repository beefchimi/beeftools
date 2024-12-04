import {describe, it, expect} from 'vitest';

import {msToSec, secToMs} from '../time';

describe('time utilities', () => {
  describe('msToSec()', () => {
    it('converts to seconds', () => {
      const result = msToSec(1234);
      expect(result).toBe(1.234);
    });
  });

  describe('secToMs()', () => {
    it('converts to milliseconds', () => {
      const result = secToMs(5.678);
      expect(result).toBe(5678);
    });
  });
});
