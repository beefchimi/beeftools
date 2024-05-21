export function isString(
  item?: unknown,
  requireLength = false,
): item is string {
  const passed = typeof item === 'string';
  return passed && requireLength ? item.length > 0 : passed;
}

export function capitalize(word = '') {
  return `${word.charAt(0).toUpperCase()}${word.slice(1).toLocaleLowerCase()}`;
}

export function escapeStringRegexp(value = '') {
  // Useful for constructing regex strings that require
  // special characters to be escaped.
  return value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

export function kebabToPascal(value = '') {
  return value.split('-').map(capitalize).join('');
}

export function splitRetain(value = '', match = '') {
  if (!match) return [value];

  // This utility is useful for things like a fuzzy search
  // where you want to highlight the `match` within a term.
  const escaped = escapeStringRegexp(match);
  const search = new RegExp(`(${escaped})`, 'i');

  return value.split(search).filter((entry) => entry !== '');
}
