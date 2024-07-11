import {supportMatchMedia} from './support';

export function prefersReducedMotion() {
  try {
    return (
      supportMatchMedia() &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  } catch (_error) {
    return false;
  }
}
