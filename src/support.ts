export function supportDom() {
  // It is critical that the first `window` condition be isolated,
  // otherwise the server will throw a `ReferenceError`.

  return (
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    typeof window !== 'undefined' &&
    typeof window.document?.createElement !== 'undefined'
  );
}

export function supportMatchMedia() {
  return (
    supportDom() &&
    'matchMedia' in window &&
    typeof window.matchMedia === 'function'
  );
}

export function supportNavigator() {
  return (
    typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string'
  );
}

export function supportResizeObserver() {
  return supportDom() && 'ResizeObserver' in window;
}

export function supportSafari() {
  return (
    supportNavigator() &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  );
}

export function supportUUID() {
  // It is critical that the first `window` condition be isolated,
  // otherwise the server will throw a `ReferenceError`.

  return (
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    typeof window !== 'undefined' &&
    typeof window.crypto?.randomUUID !== 'undefined'
  );
}
