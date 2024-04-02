export {
  arrayDedupe,
  arrayOfLength,
  arrayPaginate,
  arrayShallowEquals,
  arrayShuffle,
  typedObjectKeys,
} from './array';

export {
  classNames,
  variationName,
  // Easier to use aliases
  classNames as clx,
  variationName as vrx,
} from './classNames';

export {assertBasicError, convertUnknownError, getErrorMessage} from './error';

export {
  assertNumber,
  assertInteger,
  assertFloat,
  calcProgress,
  clamp,
  flipNumberSign,
  roundNumber,
  trimDecimals,
} from './number';

export {objFilterNullish} from './object';
export {randomFloat, randomInteger, randomBoolean} from './random';

export {
  capitalize,
  escapeStringRegexp,
  kebabToPascal,
  splitRetain,
} from './string';

export {
  supportDom,
  supportNavigator,
  supportMatchMedia,
  supportResizeObserver,
  supportSafari,
} from './support';

export {timeMeasurement, msToSec, secToMs} from './time';
export {debounce, sleep} from './wait';

export type {
  Primitive,
  Builtin,
  AnyObj,
  AnyFn,
  Fn,
  GlobalEventCallback,
  GlobalEventTarget,
  UtcMilliseconds,
  IntervalId,
  TimeoutId,
} from './types';
