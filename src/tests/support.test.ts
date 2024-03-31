import {describe, it, expect} from 'vitest';

import {supportDom, supportMatchMedia} from '../support';

describe('support utilities', () => {
  describe('supportDom()', () => {
    it('returns true in this test environment', async () => {
      const result = supportDom();
      expect(result).toBe(true);
    });
  });

  describe('supportNavigator()', () => {
    it.todo('write tests');
  });

  describe('supportMatchMedia()', () => {
    it('returns true in this test environment', async () => {
      const result = supportMatchMedia();
      expect(result).toBe(true);
    });
  });

  describe('supportResizeObserver()', () => {
    it.todo('write tests');
  });

  describe('supportSafari()', () => {
    it.todo('write tests');
  });
});
