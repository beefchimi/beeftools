import {describe, it, expect} from 'vitest';

import {supportDom, supportMatchMedia} from '../support';

describe('support utilities', () => {
  describe('supportDom()', () => {
    it('returns false in this test environment', async () => {
      const result = supportDom();
      expect(result).toBe(false);
    });
  });

  describe('supportMatchMedia()', () => {
    it('returns false in this test environment', async () => {
      const result = supportMatchMedia();
      expect(result).toBe(false);
    });
  });

  describe('supportNavigator()', () => {
    it.todo('write tests');
  });

  describe('supportResizeObserver()', () => {
    it.todo('write tests');
  });

  describe('supportSafari()', () => {
    it.todo('write tests');
  });

  describe('supportUUID()', () => {
    it.todo('write tests');
  });
});
