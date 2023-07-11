// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  i18n: {
    // all the locales supported in the application
    locales: ['en', 'sl'],
    // the default locale to be used when visiting
    // a non-localized route (e.g. `/about`)
    defaultLocale: 'en',
  },
  localeExtension: 'js',
  localePath: path.resolve('./public/locales'),
};
