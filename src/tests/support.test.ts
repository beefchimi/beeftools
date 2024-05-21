import {afterEach, beforeEach, describe, it, expect, vi} from 'vitest';

import {
  supportDom,
  supportMatchMedia,
  supportNavigator,
  supportResizeObserver,
  supportSafari,
  supportUUID,
} from '../support';

// TODO: Is there a better way to mock `global`?
describe('support utilities', () => {
  describe('supportDom()', () => {
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

    it('returns `true` if `window` and `window.document.createElement` are defined', () => {
      (global as any).window = {
        document: {createElement: vi.fn()},
      };
      expect(supportDom()).toBe(true);
    });

    it('returns `false` if `window` is `undefined`', () => {
      expect(supportDom()).toBe(false);
    });

    it('returns `false` if `window.document` is `undefined`', () => {
      (global as any).window = {};
      expect(supportDom()).toBe(false);
    });

    it('returns `false` if `window.document.createElement` is `undefined`', () => {
      (global as any).window = {
        document: {},
      };
      expect(supportDom()).toBe(false);
    });
  });

  describe('supportMatchMedia()', () => {
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

    it('returns `true` if `window.matchMedia` is a function', () => {
      (global as any).window = {
        document: {createElement: vi.fn()},
        matchMedia: vi.fn(),
      };
      expect(supportMatchMedia()).toBe(true);
    });

    it('returns `false` if `supportDom` is `false`', () => {
      (global as any).window = {
        matchMedia: vi.fn(),
      };
      expect(supportMatchMedia()).toBe(false);
    });

    it('returns `false` if `window.matchMedia` is not a function', () => {
      (global as any).window = {
        matchMedia: 'not a function',
      };
      expect(supportMatchMedia()).toBe(false);
    });

    it('returns `false` if `window.matchMedia` is `undefined`', () => {
      (global as any).window = {};
      expect(supportMatchMedia()).toBe(false);
    });
  });

  describe('supportNavigator()', () => {
    let backup: any;

    beforeEach(() => {
      backup = global.navigator;
    });

    afterEach(() => {
      delete (global as any).navigator;

      if (backup) {
        global.navigator = backup;
      }
    });

    it('returns `true` if `navigator` and `navigator.userAgent` are defined', () => {
      (global as any).navigator = {userAgent: 'Mozilla/5.0'};
      expect(supportNavigator()).toBe(true);
    });

    it('returns `false` if `navigator` is `undefined`', () => {
      expect(supportNavigator()).toBe(false);
    });

    it('returns `false` if `navigator.userAgent` is `undefined`', () => {
      (global as any).navigator = {};
      expect(supportNavigator()).toBe(false);
    });

    it('returns `false` if `navigator.userAgent` is not a `string`', () => {
      (global as any).navigator = {userAgent: 12345};
      expect(supportNavigator()).toBe(false);
    });
  });

  describe('supportResizeObserver()', () => {
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

    it('returns `true` if `ResizeObserver` is supported', () => {
      (global as any).window = {
        document: {createElement: vi.fn()},
        ResizeObserver: vi.fn(),
      };
      expect(supportResizeObserver()).toBe(true);
    });

    it('returns `false` if `ResizeObserver` is not supported', () => {
      (global as any).window = {
        document: {createElement: vi.fn()},
      };
      expect(supportResizeObserver()).toBe(false);
    });

    it('returns `false` if `window` is `undefined`', () => {
      expect(supportResizeObserver()).toBe(false);
    });

    it('returns `false` if `window.document.createElement` is `undefined`', () => {
      (global as any).window = {
        document: {},
      };
      expect(supportResizeObserver()).toBe(false);
    });
  });

  describe('supportSafari()', () => {
    let backup: any;

    beforeEach(() => {
      backup = global.navigator;
    });

    afterEach(() => {
      delete (global as any).navigator;

      if (backup) {
        global.navigator = backup;
      }
    });

    it('returns `true` if `supportNavigator` is `true` and user agent indicates Safari', () => {
      (global as any).navigator = {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15',
      };
      expect(supportSafari()).toBe(true);
    });

    it('returns `false` if `supportNavigator` is `false`', () => {
      expect(supportSafari()).toBe(false);
    });

    it('returns `false` if user agent does not indicate Safari', () => {
      (global as any).navigator = {
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
      };
      expect(supportSafari()).toBe(false);
    });

    it('returns `false` if `navigator` is `undefined`', () => {
      expect(supportSafari()).toBe(false);
    });

    it('returns `false` if user agent is `undefined`', () => {
      (global as any).navigator = {};
      expect(supportSafari()).toBe(false);
    });
  });

  describe('supportUUID()', () => {
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

    it('returns `true` if `window` and `window.crypto.randomUUID` are defined', () => {
      (global as any).window = {
        crypto: {randomUUID: vi.fn()},
      };
      expect(supportUUID()).toBe(true);
    });

    it('returns `false` if `window` is `undefined`', () => {
      expect(supportUUID()).toBe(false);
    });

    it('returns `false` if `window.crypto` is `undefined`', () => {
      (global as any).window = {};
      expect(supportUUID()).toBe(false);
    });

    it('returns `false` if `window.crypto.randomUUID` is `undefined`', () => {
      (global as any).window = {
        crypto: {},
      };
      expect(supportUUID()).toBe(false);
    });
  });
});
