import {isString} from './string';

type Variants = Record<string, string | number | boolean | null | undefined>;

type ClassNameArgs = (Variants | string | undefined)[];
type CSSModuleClasses = Readonly<Record<string, string>>;

function convertVariantsToNames(variants?: Variants) {
  return variants
    ? Object.keys(variants).filter((key) => Boolean(variants[key]))
    : [];
}

export function classNames(baseName = '', ...args: ClassNameArgs) {
  const additionalNames = args.length
    ? args.flatMap((addition) =>
        isString(addition) ? addition : convertVariantsToNames(addition),
      )
    : [];

  return [baseName, ...additionalNames.filter(Boolean)].join(' ').trim();
}

export function variationName(
  prefix = '',
  variant?: string,
  styles?: CSSModuleClasses,
) {
  if (!prefix || !variant) return '';

  const firstLetter = variant.charAt(0).toUpperCase();
  const className = `${prefix.toLowerCase()}${firstLetter}${variant.slice(1)}`;
  const retrieved = styles ? styles[className] : '';

  return retrieved || className;
}
