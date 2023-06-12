import common from './en/common.json';
import form from './en/form.json';

// All app locales
export const locales = ['en', 'sl'] as const;

export type Locale = (typeof locales)[number];

export const isLocale = (
  locale: string | null | undefined,
): locale is Locale => {
  if (!locale) {
    return false;
  }
  return locales.includes(locale as Locale);
};

export const defaultLocale: Locale = 'en';

// All namespaces
// (import new namespace above and add it here)
const namespaces = {
  common,
  form,
} as const;

export type Namespaces = typeof namespaces;

export type Namespace = keyof Namespaces;

// All pages and their namespaces
export const pages: Record<string, readonly Namespace[]> = {
  '*': ['common', 'form'],
  '/': ['form'],
};
