import {afterEach, beforeEach, describe, it, expect, vi} from 'vitest';

import {prefersReducedMotion} from '../media';

// TODO: Is there a better way to mock `global`?
describe('media utilities', () => {
  describe('prefersReducedMotion()', () => {
    let backup: any;

    beforeEach(() => {
      backup = global.window;
    });

    afterEach(() => {
      delete (global as any).window;

      if (backup) {
        global.window = backup;
      }
    });

    it('returns `true` if user prefers reduced motion', () => {
      (global as any).window = {
        document: {createElement: vi.fn()},
        matchMedia: vi.fn().mockReturnValue({matches: true}),
      };
      expect(prefersReducedMotion()).toBe(true);
    });

    it('returns `false` if user does not prefer reduced motion', () => {
      (global as any).window = {
        document: {createElement: vi.fn()},
        matchMedia: vi.fn(),
      };
      expect(prefersReducedMotion()).toBe(false);
    });

    it('returns `false` if `window.matchMedia` throws an error', () => {
      (global as any).window = {
        matchMedia: vi.fn().mockImplementation(() => {
          throw new Error('matchMedia error');
        }),
      };
      expect(prefersReducedMotion()).toBe(false);
    });

    it('returns `false` if `window.matchMedia` is not available', () => {
      (global as any).window = {};
      expect(prefersReducedMotion()).toBe(false);
    });
  });
});
