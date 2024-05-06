import {describe, it, expect} from 'vitest';

import {
  capitalize,
  escapeStringRegexp,
  kebabToPascal,
  splitRetain,
} from '../string';

describe('string utilities', () => {
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
