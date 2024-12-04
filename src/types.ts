export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | undefined
  | null;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type Builtin = Primitive | Function | Date | Error | RegExp;

export type AnyObj = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFn = (...args: any[]) => any;
export type Fn = () => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GlobalEventCallback = (event: any) => void;
export type GlobalEventTarget =
  | Document
  | Window
  | HTMLElement
  | null
  | undefined;

export type UtcMilliseconds = ReturnType<typeof Date.now>;

export type IntervalId = number | ReturnType<typeof setInterval>;
export type TimeoutId = number | ReturnType<typeof setTimeout>;
