// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate-plugin');

module.exports = nextTranslate({
  experimental: { appDir: true },
});
