export function isString(
  item?: unknown,
  requireLength = false,
): item is string {
  const passed = typeof item === 'string';
  return passed && requireLength ? item.length > 0 : passed;
}

export function capitalize(word = '') {
  const trimmed = word.trim();
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1).toLocaleLowerCase()}`;
}

export function escapeStringRegexp(value = '') {
  // Useful for constructing regex strings that require
  // special characters to be escaped.
  return value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

export function kebabToPascal(value = '') {
  return value.trim().split('-').map(capitalize).join('');
}

export function pascalToKebab(value = '') {
  return (
    value
      .trim()
      // Remove dashes from the start
      .replace(/^-+/g, '')
      // Remove dashes from the end
      .replace(/-+$/g, '')
      // Remove disallowed characters
      // TODO: Expand upon this. We should remove all special characters.
      .replace(/\./g, '')
      // Insert a `-` before every capital letter (ignoring first character)
      .replace(/(?!\b)([A-Z])/g, '-$1')
      .toLowerCase()
  );
}

export function slugify(value = '') {
  // It is debatable if we should just merge `pascalToKebab` into this
  // function... as they are mostly redundant.
  const despaced = value.trim().split(' ').filter(Boolean);
  const depascalled = despaced.map((term) => pascalToKebab(term));

  return depascalled.join('-');
}

export function splitRetain(value = '', match = '') {
  if (!match) return [value];

  // This utility is useful for things like a fuzzy search
  // where you want to highlight the `match` within a term.
  const escaped = escapeStringRegexp(match);
  const search = new RegExp(`(${escaped})`, 'i');

  return value.split(search).filter((entry) => entry !== '');
}
