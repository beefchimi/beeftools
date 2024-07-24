import {afterEach, describe, it, expect, vi} from 'vitest';

import {prefersReducedMotion} from '../media';

describe('media utilities', () => {
  describe('prefersReducedMotion()', () => {
    const backup = global.window;

    afterEach(() => {
      global.window = backup;
    });

    it('returns `true` if user prefers reduced motion', () => {
      vi.stubGlobal('window', {
        document: {createElement: vi.fn()},
        matchMedia: vi.fn().mockReturnValue({matches: true}),
      });

      expect(prefersReducedMotion()).toBe(true);
    });

    it('returns `false` if user does not prefer reduced motion', () => {
      vi.stubGlobal('window', {
        document: {createElement: vi.fn()},
        matchMedia: vi.fn(),
      });

      expect(prefersReducedMotion()).toBe(false);
    });

    it('returns `false` if `window.matchMedia` throws an error', () => {
      vi.stubGlobal('window', {
        matchMedia: vi.fn().mockImplementation(() => {
          throw new Error('matchMedia error');
        }),
      });

      expect(prefersReducedMotion()).toBe(false);
    });

    it('returns `false` if `window.matchMedia` is not available', () => {
      vi.stubGlobal('window', {matchMedia: undefined});
      expect(prefersReducedMotion()).toBe(false);
    });
  });
});
