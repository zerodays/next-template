/* eslint-disable @typescript-eslint/no-var-requires */
// Simple script to validate translations
// Usage: yarn i18n

const { readdirSync } = require('fs');
const { i18n } = require('../next-i18next.config.js');
const path = require('path');

const localesFolder = './public/locales';
// 'require' imports work relative to the file, not the cwd
const localesFolderRelative = '../public/locales';

const getLocalePath = (locale: string) => path.join(localesFolder, locale);

const getLocaleFile = (locale: string, file: string) =>
  path.join(path.join(localesFolderRelative, locale), file);

/**
 * Deep diff between keys of two objects.
 * @param  {Object} obj1 Object compared
 * @param  {Object} obj2 Object to compare with
 * @return Return a three element array with:
 * - the keys present in obj1 but not in obj2
 * - the keys present in obj2 but not in obj1
 * - keys where the type of value is invalid (different from obj1 to obj2 or not string or object)
 */
const deepKeysDiff = (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  obj1: any,
  obj2: any,
): { missingKeys: string[]; extraKeys: string[]; invalidTypes: string[] } => {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    console.error(
      `Both arguments must be objects, got ${typeof obj1} and ${typeof obj2}`,
    );
    process.exit(1);
  }

  const missingKeys: string[] = [];
  const extraKeys: string[] = [];
  const invalidTypes: string[] = [];

  for (const key in obj1) {
    // Check if key is present in obj2
    if (!(key in obj2)) {
      missingKeys.push(key);
      continue;
    }

    // Check type of value
    if (typeof obj1[key] !== typeof obj2[key]) {
      invalidTypes.push(key);
      continue;
    }

    const type = typeof obj1[key];

    if (type === 'string') {
      // If value is a string, we're done
    } else if (type === 'object') {
      // If value is an object, recurse
      const {
        missingKeys: missingKeys2,
        extraKeys: extraKeys2,
        invalidTypes: invalidTypes2,
      } = deepKeysDiff(obj1[key], obj2[key]);

      // Prepend key to keys
      missingKeys.push(...missingKeys2.map((key2: string) => `${key}.${key2}`));
      extraKeys.push(...extraKeys2.map((key2: string) => `${key}.${key2}`));
      invalidTypes.push(
        ...invalidTypes2.map((key2: string) => `${key}.${key2}`),
      );
    } else {
      // If value is neither a string nor an object, this is invalid translation.
      invalidTypes.push(key);
    }
  }

  // Check if there are extra keys in obj2
  for (const key in obj2) {
    if (!(key in obj1)) {
      extraKeys.push(key);
    }

    // No need to recurse here, we already checked all keys in obj1.
  }

  return {
    missingKeys,
    extraKeys,
    invalidTypes,
  };
};

// 1.
// Check if all locales in next-i18next.config.js are present in public/locales and vice versa
const locales = readdirSync(localesFolder);

const missingLocales = i18n.locales.filter(
  (locale: string) => !locales.includes(locale),
);

if (missingLocales.length > 0) {
  console.error('Missing locales in public/locales:', missingLocales);
  process.exit(1);
}

const extraLocales = locales.filter(
  (locale: string) => !i18n.locales.includes(locale),
);

if (extraLocales.length > 0) {
  console.error('Extra locales in public/locales:', extraLocales);
  process.exit(1);
}

// 2.
// Check if default locale is valid
if (!i18n.locales.includes(i18n.defaultLocale)) {
  console.error(
    `Default locale '${i18n.defaultLocale}' in next-i18next.config.js is invalid.`,
  );
  process.exit(1);
}

const defaultLocaleFiles = readdirSync(getLocalePath(i18n.defaultLocale));

for (const locale of locales) {
  // Skip default locale
  if (locale === i18n.defaultLocale) {
    continue;
  }

  // 3.
  // Check if namespaces match
  const localeFiles = readdirSync(getLocalePath(locale));

  const missingNamespaces = defaultLocaleFiles.filter(
    (file: string) => !localeFiles.includes(file),
  );

  if (missingNamespaces.length > 0) {
    console.error(
      `Missing namespaces in ${getLocalePath(locale)}:`,
      missingNamespaces,
    );
    process.exit(1);
  }

  const extraNamespaces = localeFiles.filter(
    (file: string) => !defaultLocaleFiles.includes(file),
  );

  if (extraNamespaces.length > 0) {
    console.error(
      `Extra namespaces in ${getLocalePath(locale)}:`,
      extraNamespaces,
    );
    process.exit(1);
  }

  // 4.
  // Check if keys match

  for (const file of defaultLocaleFiles) {
    // Open js text files
    const defaultLocaleFile = getLocaleFile(i18n.defaultLocale, file);
    const localeFile = getLocaleFile(locale, file);

    const defaultLocaleData = require(defaultLocaleFile);
    const localeData = require(localeFile);

    // Check if all keys in default locale are present in locale
    const { missingKeys, extraKeys, invalidTypes } = deepKeysDiff(
      defaultLocaleData,
      localeData,
    );

    if (missingKeys.length > 0) {
      console.error(
        `Missing keys in ${getLocaleFile(locale, file)}:`,
        missingKeys,
      );
    }

    if (extraKeys.length > 0) {
      console.error(`Extra keys in ${getLocaleFile(locale, file)}:`, extraKeys);
    }

    if (invalidTypes.length > 0) {
      console.error(
        `Invalid types in ${getLocaleFile(locale, file)}:`,
        invalidTypes,
      );
    }

    if (
      missingKeys.length > 0 ||
      extraKeys.length > 0 ||
      invalidTypes.length > 0
    ) {
      process.exit(1);
    }
  }
}

console.log('All good! 🎉');
