import {describe, it, expect} from 'vitest';

import {
  isString,
  capitalize,
  escapeStringRegexp,
  kebabToPascal,
  splitRetain,
} from '../string';

describe('string utilities', () => {
  describe('isString()', () => {
    it('returns `true` for strings', () => {
      expect(isString('')).toBe(true);
      expect(isString('Hello, World!')).toBe(true);
    });

    it('returns `false` for non-strings', () => {
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString(123)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString(() => {})).toBe(false);

      // With `requireLength` argument.
      expect(isString(null, true)).toBe(false);
      expect(isString(undefined, true)).toBe(false);
      expect(isString(123, true)).toBe(false);
      expect(isString({}, true)).toBe(false);
      expect(isString([], true)).toBe(false);
      expect(isString(() => {}, true)).toBe(false);
    });

    it('returns `true` for non-empty strings when passed `requireLength`', () => {
      expect(isString('Hello, World!', true)).toBe(true);
    });

    it('returns `false` for empty strings when passed `requireLength`', () => {
      expect(isString('', true)).toBe(false);
    });
  });

  describe('capitalize()', () => {
    it('capitalizes only the first letter', async () => {
      const result = capitalize('hello world');
      expect(result).toBe('Hello world');
    });
  });

  describe('escapeStringRegexp()', () => {
    it('escapes special characters', () => {
      // prettier-ignore
      // eslint-disable-next-line no-useless-escape
      const input = 'start_|\\{}()[\]^$+*?.-_end';
      const result = escapeStringRegexp(input);

      expect(result).toBe(
        'start_\\|\\\\\\{\\}\\(\\)\\[\\]\\^\\$\\+\\*\\?\\.\\x2d_end',
      );
    });

    it('escapes a dash character', () => {
      const input = 'foo-bar';
      const result = escapeStringRegexp(input);

      expect(result).toBe('foo\\x2dbar');
    });

    it('does nothing to an empty string', () => {
      const result = escapeStringRegexp('');
      expect(result).toBe('');
    });

    it('does nothing to a string with no special characters', () => {
      const input = 'hello world';
      const result = escapeStringRegexp(input);

      expect(result).toBe(input);
    });
  });

  describe('kebabToPascal()', () => {
    it('converts the provided slug', async () => {
      const result = kebabToPascal('hello-world-foo-bar');
      expect(result).toBe('HelloWorldFooBar');
    });
  });

  describe('splitRetain()', () => {
    it('splits the string by match', async () => {
      const result = splitRetain('Hello world foo bar Beefchimi', 'world');
      expect(result).toStrictEqual(['Hello ', 'world', ' foo bar Beefchimi']);
    });
  });
});
