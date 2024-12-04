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
import {
  UA_FIREFOX_MAC,
  UA_FIREFOX_IPHONE,
  UA_SAFARI_MAC,
  UA_SAFARI_IPHONE,
  UA_SAFARI_IPAD,
  UA_SAFARI_WIN,
  UA_ANDROID_PIXEL,
} from './fixtures';

describe('support utilities', () => {
  describe('supportDom()', () => {
    const backup = global.window;

    afterEach(() => {
      global.window = backup;
    });

    it('returns `true` if `window` and `window.document.createElement` are defined', () => {
      vi.stubGlobal('window', {
        document: {
          createElement: vi.fn(),
        },
      });

      expect(supportDom()).toBe(true);
    });

    it('returns `false` if `window` is `undefined`', () => {
      vi.stubGlobal('window', undefined);
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

    it('returns `true` if `supportNavigator` is `true` and user agent matches', () => {
      vi.stubGlobal('navigator', {userAgent: UA_FIREFOX_MAC});
      expect(supportFirefoxMobile()).toBe(false);

      vi.stubGlobal('navigator', {userAgent: UA_FIREFOX_IPHONE});
      expect(supportFirefoxMobile()).toBe(true);
    });

    it('returns `false` if `supportNavigator` is `false`', () => {
      expect(supportFirefoxMobile()).toBe(true);

      vi.stubGlobal('navigator', undefined);
      expect(supportFirefoxMobile()).toBe(false);

      vi.stubGlobal('navigator', {});
      expect(supportFirefoxMobile()).toBe(false);
    });

    it('returns `false` if user agent does not indicate FxiOS', () => {
      vi.stubGlobal('navigator', {userAgent: UA_SAFARI_MAC});
      expect(supportFirefoxMobile()).toBe(false);
    });
  });

  describe('supportSafari()', () => {
    const backup = global.navigator;

    afterEach(() => {
      global.navigator = backup;
    });

    it('returns `true` if `supportNavigator` is `true` and user agent indicates Safari', () => {
      vi.stubGlobal('navigator', {userAgent: UA_SAFARI_MAC});
      expect(supportSafari()).toBe(true);

      vi.stubGlobal('navigator', {userAgent: UA_SAFARI_IPHONE});
      expect(supportSafari()).toBe(true);

      vi.stubGlobal('navigator', {userAgent: UA_SAFARI_IPAD});
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
      vi.stubGlobal('navigator', {userAgent: UA_SAFARI_WIN});
      expect(supportSafari()).toBe(false);

      vi.stubGlobal('navigator', {userAgent: UA_ANDROID_PIXEL});
      expect(supportSafari()).toBe(false);
    });

    it.todo('returns `false` if user agent includes FxiOS');
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
      vi.stubGlobal('window', undefined);

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
