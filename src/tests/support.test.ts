import {afterEach, describe, it, expect, vi} from 'vitest';

import {
  supportDom,
  supportMatchMedia,
  supportNavigator,
  supportResizeObserver,
  supportSafari,
  supportUUID,
} from '../support';

describe('support utilities', () => {
  describe('supportDom()', () => {
    const backup = global.window;

    afterEach(() => {
      global.window = backup;
    });

    it('returns `true` if `window` and `window.document.createElement` are defined', () => {
      vi.stubGlobal('window', {
        document: {createElement: vi.fn()},
      });

      expect(supportDom()).toBe(true);
    });

    it('returns `false` if `window` is `undefined`', () => {
      expect(supportDom()).toBe(false);
    });

    it('returns `false` if `window.document` is `undefined`', () => {
      vi.stubGlobal('window', {
        document: undefined,
      });

      expect(supportDom()).toBe(false);
    });

    it('returns `false` if `window.document.createElement` is `undefined`', () => {
      vi.stubGlobal('window', {
        document: {},
      });

      expect(supportDom()).toBe(false);
    });
  });

  describe('supportMatchMedia()', () => {
    const backup = global.window;

    afterEach(() => {
      global.window = backup;
    });

    it('returns `true` if `window.matchMedia` is a function', () => {
      vi.stubGlobal('window', {
        document: {createElement: vi.fn()},
        matchMedia: vi.fn(),
      });

      expect(supportMatchMedia()).toBe(true);
    });

    it('returns `false` if `supportDom` is `false`', () => {
      vi.stubGlobal('window', {
        matchMedia: vi.fn(),
      });

      expect(supportMatchMedia()).toBe(false);
    });

    it('returns `false` if `window.matchMedia` is not a function', () => {
      vi.stubGlobal('window', {
        matchMedia: 'not a function',
      });

      expect(supportMatchMedia()).toBe(false);
    });

    it('returns `false` if `window.matchMedia` is `undefined`', () => {
      vi.stubGlobal('window', {});
      expect(supportMatchMedia()).toBe(false);
    });
  });

  describe('supportNavigator()', () => {
    const backup = global.navigator;

    afterEach(() => {
      global.navigator = backup;
    });

    it('returns `true` if `navigator` and `navigator.userAgent` are defined', () => {
      vi.stubGlobal('navigator', {userAgent: 'Mozilla/5.0'});
      expect(supportNavigator()).toBe(true);
    });

    it('returns `false` if `navigator` is `undefined`', () => {
      vi.stubGlobal('navigator', undefined);
      expect(supportNavigator()).toBe(false);
    });

    it('returns `false` if `navigator.userAgent` is `undefined`', () => {
      vi.stubGlobal('navigator', {});
      expect(supportNavigator()).toBe(false);
    });

    it('returns `false` if `navigator.userAgent` is not a `string`', () => {
      vi.stubGlobal('navigator', {userAgent: 12345});
      expect(supportNavigator()).toBe(false);
    });
  });

  describe('supportResizeObserver()', () => {
    const backup = global.window;

    afterEach(() => {
      global.window = backup;
    });

    it('returns `true` if `ResizeObserver` is supported', () => {
      vi.stubGlobal('window', {
        document: {createElement: vi.fn()},
        ResizeObserver: vi.fn(),
      });

      expect(supportResizeObserver()).toBe(true);
    });

    it('returns `false` if `ResizeObserver` is not supported', () => {
      vi.stubGlobal('window', {
        document: {createElement: vi.fn()},
      });

      expect(supportResizeObserver()).toBe(false);
    });

    it('returns `false` if `window` is `undefined`', () => {
      expect(supportResizeObserver()).toBe(false);
    });

    it('returns `false` if `window.document.createElement` is `undefined`', () => {
      vi.stubGlobal('window', {
        document: {},
      });

      expect(supportResizeObserver()).toBe(false);
    });
  });

  describe('supportSafari()', () => {
    const backup = global.navigator;

    afterEach(() => {
      global.navigator = backup;
    });

    it('returns `true` if `supportNavigator` is `true` and user agent indicates Safari', () => {
      vi.stubGlobal('navigator', {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15',
      });
      expect(supportSafari()).toBe(true);
    });

    it('returns `false` if `supportNavigator` is `false`', () => {
      expect(supportSafari()).toBe(false);
    });

    it('returns `false` if user agent does not indicate Safari', () => {
      vi.stubGlobal('navigator', {
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
      });
      expect(supportSafari()).toBe(false);
    });

    it('returns `false` if `navigator` is `undefined`', () => {
      vi.stubGlobal('navigator', undefined);
      expect(supportSafari()).toBe(false);
    });

    it('returns `false` if user agent is `undefined`', () => {
      vi.stubGlobal('navigator', {});
      expect(supportSafari()).toBe(false);
    });
  });

  describe('supportUUID()', () => {
    const backup = global.window;

    afterEach(() => {
      global.window = backup;
    });

    it('returns `true` if `window` and `window.crypto.randomUUID` are defined', () => {
      vi.stubGlobal('window', {
        crypto: {randomUUID: vi.fn()},
      });

      expect(supportUUID()).toBe(true);
    });

    it('returns `false` if `window` is `undefined`', () => {
      expect(supportUUID()).toBe(false);
    });

    it('returns `false` if `window.crypto` is `undefined`', () => {
      vi.stubGlobal('window', {});
      expect(supportUUID()).toBe(false);
    });

    it('returns `false` if `window.crypto.randomUUID` is `undefined`', () => {
      vi.stubGlobal('window', {
        crypto: {},
      });

      expect(supportUUID()).toBe(false);
    });
  });
});
