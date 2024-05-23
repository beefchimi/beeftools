export {
  arrayDedupe,
  arrayEquals,
  arrayOfLength,
  arrayPaginate,
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
export {isEmpty, noop} from './general';

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

export {isObject, objFilterNullish} from './object';
export {randomFloat, randomInteger, randomBoolean} from './random';

export {
  isString,
  capitalize,
  escapeStringRegexp,
  kebabToPascal,
  splitRetain,
} from './string';

export {
  supportDom,
  supportMatchMedia,
  supportNavigator,
  supportResizeObserver,
  supportSafari,
  supportUUID,
} from './support';

export {timeMeasurement, msToSec, secToMs} from './time';
export {debounce, sleep, throttle} from './wait';

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
