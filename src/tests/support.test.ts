import {afterEach, describe, it, expect, vi} from 'vitest';

import {
  supportDom,
  supportMatchMedia,
  supportNavigator,
  supportResizeObserver,
  supportFirefoxMobile,
  supportSafari,
  supportUUID,
} from '../support';

const FIREFOX_MAC =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0';
const FIREFOX_IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/128.0 Mobile/15E148 Safari/605.1.15';

const SAFARI_WIN =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36';
const SAFARI_MAC =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15';
const SAFARI_IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const SAFARI_IPAD =
  'Mozilla/5.0 (iPad; CPU OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';

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

  describe('supportFirefoxMobile()', () => {
    const backup = global.navigator;

    afterEach(() => {
      global.navigator = backup;
    });

    it('returns `true` if `supportNavigator` is `true` and user agent indicates Safari', () => {
      vi.stubGlobal('navigator', {userAgent: FIREFOX_MAC});
      expect(supportFirefoxMobile()).toBe(true);

      vi.stubGlobal('navigator', {userAgent: FIREFOX_IPHONE});
      expect(supportFirefoxMobile()).toBe(true);
    });

    it('returns `false` if `supportNavigator` is `false`', () => {
      expect(supportFirefoxMobile()).toBe(false);

      vi.stubGlobal('navigator', undefined);
      expect(supportFirefoxMobile()).toBe(false);

      vi.stubGlobal('navigator', {});
      expect(supportFirefoxMobile()).toBe(false);
    });

    it('returns `false` if user agent does not indicate FireFox', () => {
      vi.stubGlobal('navigator', {userAgent: SAFARI_MAC});
      expect(supportSafari()).toBe(false);
    });
  });

  describe('supportSafari()', () => {
    const backup = global.navigator;

    afterEach(() => {
      global.navigator = backup;
    });

    it('returns `true` if `supportNavigator` is `true` and user agent indicates Safari', () => {
      vi.stubGlobal('navigator', {userAgent: SAFARI_MAC});
      expect(supportSafari()).toBe(true);

      vi.stubGlobal('navigator', {userAgent: SAFARI_IPHONE});
      expect(supportSafari()).toBe(true);

      vi.stubGlobal('navigator', {userAgent: SAFARI_IPAD});
      expect(supportSafari()).toBe(true);
    });

    it('returns `false` if `supportNavigator` is `false`', () => {
      expect(supportSafari()).toBe(false);

      vi.stubGlobal('navigator', undefined);
      expect(supportSafari()).toBe(false);

      vi.stubGlobal('navigator', {});
      expect(supportSafari()).toBe(false);
    });

    it('returns `false` if user agent indicates Safari, but also includes chrome or android', () => {
      vi.stubGlobal('navigator', {userAgent: SAFARI_WIN});
      expect(supportSafari()).toBe(false);
    });

    it('returns `false` if user agent does not indicate Safari', () => {
      vi.stubGlobal('navigator', {userAgent: FIREFOX_MAC});
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
