import type {TimeoutId} from './types';

export async function sleep(ms = 0) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

// Consider switching to something like:
// https://github.com/chodorowicz/ts-debounce
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  waitMs = 0,
  immediate = false,
) {
  let timeout: TimeoutId | undefined;

  return function debounced(...args: Parameters<T>) {
    function later() {
      timeout = undefined;
      callback(...args);
    }

    const leading = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, waitMs);

    if (leading) callback(...args);
  };
}

// Ideally, we want a `throttle` that is "cancellable". Example:
// we `throttle` a `window` resize, where we want the callback
// to execute immediately, but then only execute again every `x` ms
// while resizing is still ocurring. Once resizing ends, we want
// to cancel any queued `callback` and immediately call again to finish.
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  intervalMs = 0,
) {
  let lastTimestamp = 0;

  let timeout: TimeoutId | undefined;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();
    const elapsed = now - lastTimestamp;

    if (!lastTimestamp || elapsed >= intervalMs) {
      // If it's been longer than `intervalMs` since the last execution,
      // execute the callback.
      callback(...args);
      lastTimestamp = now;
    } else if (!timeout) {
      // If it's within the `intervalMs` and no timeout is set,
      // set a timeout to execute the function.
      timeout = setTimeout(() => {
        callback(...args);

        lastTimestamp = Date.now();
        timeout = undefined;
      }, intervalMs - elapsed);
    }
  };
}
