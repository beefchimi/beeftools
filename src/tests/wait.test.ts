import {describe, it, expect, vi} from 'vitest';

import {debounce, sleep, throttle} from '../wait';

describe('wait utilities', () => {
  // TODO: Figure out how to resolve these tests.
  describe.skip('sleep()', () => {
    it('resolves immediately by default', async () => {
      const start = Date.now();

      await sleep();

      const end = Date.now();
      const elapsedTime = end - start;

      expect(elapsedTime).toBeLessThan(8);
    });

    it('resolves immediately if delay is 0', async () => {
      const start = Date.now();

      await sleep(0);

      const end = Date.now();
      const elapsedTime = end - start;

      expect(elapsedTime).toBeLessThan(8);
    });

    it('resolves after the provided delay', async () => {
      const mockDelayMs = 123;
      const start = Date.now();

      await sleep(mockDelayMs);

      const end = Date.now();
      const elapsed = end - start;

      expect(elapsed).toBeGreaterThanOrEqual(mockDelayMs);
    });
  });

  describe('debounce()', () => {
    const mockWaitMs = 1000;
    vi.useFakeTimers();

    it('does not execute more than the timeout allows', async () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, mockWaitMs);

      expect(mockFn).toHaveBeenCalledTimes(0);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).toHaveBeenCalledTimes(0);
      vi.advanceTimersByTime(mockWaitMs / 2);

      debouncedFn();

      expect(mockFn).toHaveBeenCalledTimes(0);
      vi.advanceTimersByTime(mockWaitMs);

      expect(mockFn).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(mockWaitMs * 2);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('executes immediately followed by a timed execution', async () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, mockWaitMs, true);

      expect(mockFn).toHaveBeenCalledTimes(0);
      debouncedFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(mockWaitMs / 2);

      debouncedFn();

      expect(mockFn).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(mockWaitMs);

      expect(mockFn).toHaveBeenCalledTimes(2);
      vi.advanceTimersByTime(mockWaitMs * 2);

      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('throttle()', () => {
    const mockWaitMs = 1000;
    vi.useFakeTimers();

    it('executes immediately followed by a queue limited to 1 more execution', async () => {
      const mockFn = vi.fn();
      const throttledFn = throttle(mockFn, mockWaitMs);

      expect(mockFn).toHaveBeenCalledTimes(0);
      throttledFn();
      throttledFn();
      throttledFn();

      // `throttle` executes right away,
      // and queues another callback for execution.
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Enough time has not yet passed for that subsequent execution.
      vi.advanceTimersByTime(mockWaitMs / 2);
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Enough time has now passed. We called `throttle` 3 times,
      // but that `3rd` call was suppressed by the queue.
      vi.advanceTimersByTime(mockWaitMs * 4);
      expect(mockFn).toHaveBeenCalledTimes(2);

      // We are now free to execute immediately again.
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(3);

      // Since we only called `throttle` once after the queue
      // had been cleared, there were no more executions in the queue.
      vi.advanceTimersByTime(mockWaitMs * 2);
      expect(mockFn).toHaveBeenCalledTimes(3);
    });
  });
});
