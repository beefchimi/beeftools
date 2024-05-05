import {describe, expect, it} from 'vitest';

import {classNames, variationName} from '../classNames';

describe('class name utilities', () => {
  describe('classNames()', () => {
    it('concatenates baseName and additional class names', () => {
      const result = classNames('base', 'class1', 'class2');
      expect(result).toBe('base class1 class2');
    });

    it('handles undefined or empty arguments', () => {
      const result = classNames('base', undefined, {}, 'last');
      expect(result).toBe('base last');
    });

    it('filters out falsy variants', () => {
      const variants = {
        active: true,
        disabled: false,
        hidden: 'string',
        nope: 0,
        yes: 1,
        foo: null,
        bar: undefined,
      };
      const result = classNames('base', variants);

      expect(result).toBe('base active hidden yes');
    });
  });

  describe('variationName()', () => {
    it('returns empty string if no variant is provided', () => {
      const result = variationName('prefix');
      expect(result).toBe('');
    });

    it('returns variation name with prefix in correct casing', () => {
      const result = variationName('prefix', 'variant');
      expect(result).toBe('prefixVariant');
    });

    it('generates correct variation name with prefix and styles', () => {
      const styles = {
        prefixVariant: 'style1',
        prefixSecondVariant: 'style2',
      };
      const result = variationName('prefix', 'secondVariant', styles);

      expect(result).toBe('style2');
    });

    it('falls back to generated name if not found within styles', () => {
      const styles = {
        noMatch: 'style1',
      };
      const result = variationName('prefix', 'variant', styles);

      expect(result).toBe('prefixVariant');
    });
  });
});
