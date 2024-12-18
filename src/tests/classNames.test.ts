import {describe, expect, it} from 'vitest';

import {classNames, variationName} from '../classNames';

describe('class name utilities', () => {
  describe('classNames()', () => {
    it('concatenates baseName and additional class names', () => {
      const result = classNames('base', 'class1', 'class2');
      expect(result).toBe('base class1 class2');
    });

    it('handles undefined base name', () => {
      const result = classNames();
      expect(result).toBe('');
    });

    it('handles undefined or empty arguments', () => {
      const nullish = null;

      const result = classNames(
        'start',
        undefined,
        {},
        {
          middle: Boolean([]),
          // @ts-expect-error - Required for this test.
          [undefined]: 1,
          // @ts-expect-error - Required for this test.
          [nullish]: true,
        },
        'end',
      );

      expect(result).toBe('start middle end');
    });

    it('handles `undefined` or `null` as explicit keys', () => {
      const result = classNames(
        'start',
        {
          middle: Boolean([]),
          undefined: 1,
          null: true,
        },
        'end',
      );

      expect(result).toBe('start middle end');
    });

    it('trims whitespace', () => {
      const result = classNames(undefined, ' first-variant', {}, 'last var  ');
      expect(result).toBe('first-variant last var');
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
    it('returns empty string if no prefix is provided', () => {
      const result = variationName();
      expect(result).toBe('');
    });

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
