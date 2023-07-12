# Internationalization using next-i18next

Current setup works only with pages directory, not with `/app` directory from newer NextJS versions.

## Using translations

Simply import `useTranslation` hook from `next-i18next` library.

```typescript
import { useTranslation } from 'next-i18next';

const { t } = useTranslation('common');

return <div>{t('hello')}</div>;
```

More details can be found in [react-i18next documentation](https://react.i18next.com/).

### Change language

To change the language, use the `useRouter` hook from `next/router` and call the `push` function with the new language as a parameter. For example:

```tsx
const changeLanguage = (router: Router, locale: Locale) => {
  router.push(router.asPath, router.asPath, { locale: language });
};
```

Be careful when using this function, if it happens at the same time as a redirect or a redirect happened right before or after this function, it will cause problems.

### Best practices

Few important things to remember:

- translations should be used only in React components, not in other files (you need to use `useTranslation` hook),
- zod validation messages should be defined by keys only (instances of `LocaleKey` type in [src/i18n/i18n.ts](./i18n.ts)) and translated in React components,
- in case you need to use JSX elements inside localized strings, check out `Trans` component from `react-i18next` library. Currently, we are most satisfied with [this alternative usage](https://react.i18next.com/latest/trans-component#alternative-usage-components-array).

## Adding new page

When adding a new page in `pages` directory, additional step needs to be done to load translations on the server side.
Simply add `injectSsrTranslations` to `getStaticProps` or `getServerSideProps` function and pass namespaces that should be loaded.

```typescript
export const getStaticProps: GetStaticProps = injectSsrTranslations(['common']);
```

If you need custom `getStaticProps` or `getServerSideProps` function, you pass it as a second argument to `injectSsrTranslations` function.

```typescript
export const getStaticProps = injectSsrTranslations(
  ['common'],
  async (context) => {
    // ...
    return {
      props: {
        // ...
      },
    };
  },
);
```

## Adding a new language

When adding a new language, the following steps are required:

1. Add the language to the `LOCALES` array in [src/i18n/i18n.ts](./i18n.ts).
2. Add the language [next-i18next.config.js](../../next-i18next.config.js).
3. Create language folder in [public/locales/](../../public/locales/) and add all namespaces.

## Adding a new namespace

When adding a new namespace, the following steps are required:

1. Create a new file in `public/locales/<language>/<namespace>.js` (e.g. `public/locales/en/landing_page.js`).
2. Repeat step 1 for all languages.
3. Import the namespace for default language in [src/i18n/i18n.ts](./i18n.ts)
4. Update `LocalResources` and `LocaleKey` types in [src/i18n/i18n.ts](./i18n.ts) with the new namespace.

## Disambiguation

This project uses multiple similarly named libraries:

- `i18next` - core library for internationalization
- `react-i18next` - React bindings for `i18next`
- `next-i18next` - NextJS bindings for `i18next` and `react-i18next`. It provides SSR support for NextJS (with pages setup, became obsolete with app directory).

All imports should be done from `next-i18next` library.
