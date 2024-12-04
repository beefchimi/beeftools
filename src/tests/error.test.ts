import {describe, it, expect} from 'vitest';

import {
  assertBasicError,
  convertUnknownError,
  getErrorMessage,
  GENERIC_ERROR_MESSAGE,
} from '../error';

describe('error utilities', () => {
  describe('assertBasicError()', () => {
    it('returns `true` for any object with a `message` of type `string`', () => {
      const mockError = {message: 'This is an error message.'};
      expect(assertBasicError(mockError)).toBe(true);
    });

    it('returns `false` for everything else', () => {
      const notError1 = undefined;
      const notError2 = null;
      const notError3 = {code: 404};
      const notError4 = {message: 404};

      expect(assertBasicError(notError1)).toBe(false);
      expect(assertBasicError(notError2)).toBe(false);
      expect(assertBasicError(notError3)).toBe(false);
      expect(assertBasicError(notError4)).toBe(false);
    });
  });

  describe('convertUnknownError()', () => {
    it('returns the error object if it is a `BasicError`', () => {
      const basicError = {message: 'This is a basic error message.'};
      const result = convertUnknownError(basicError);

      expect(result).toStrictEqual(basicError);
    });

    it('returns a new `Error` with the string representation of the error if `JSON.stringify` throws', () => {
      const errorObject = new Error('An error occurred.');
      const result = convertUnknownError(errorObject);

      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe(errorObject.message);
    });

    it('returns a new `Error` with the string representation of the error if it is not an object', () => {
      const errorMessage = 'This is an error message.';
      const result = convertUnknownError(errorMessage);

      // TODO: Do we want to manipulate the string so that
      // it is not wrapped in quotations?
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe(`"${errorMessage}"`);
    });
  });

  describe('getErrorMessage()', () => {
    it('returns message from basic object', () => {
      const mockError = {message: 'foo'};
      const result = getErrorMessage(mockError);

      expect(result).toBe(mockError.message);
    });

    it('returns message from Error', () => {
      const mockMessage = 'Foo';
      const mockError = new Error(mockMessage, {
        cause: 'bar',
      });

      const result = getErrorMessage(mockError);

      expect(result).toBe(mockMessage);
    });

    it('returns stringified result when unknown', () => {
      const mockError = ['foo', true, {bar: false}, null];
      const result = getErrorMessage(mockError);

      expect(result).toBe(JSON.stringify(mockError));
    });

    it('returns the generic error message when conversion fails', () => {
      const notError1 = undefined;
      const notError2 = null;
      const notError3 = {};

      expect(getErrorMessage(notError1)).toBe(GENERIC_ERROR_MESSAGE);
      expect(getErrorMessage(notError2)).toBe(GENERIC_ERROR_MESSAGE);
      expect(getErrorMessage(notError3)).toBe(GENERIC_ERROR_MESSAGE);
    });
  });
});
