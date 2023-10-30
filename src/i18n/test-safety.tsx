import { useScopedI18n } from './client';

/**
 * Simple component which is used to test the safety of the i18n translation type checking.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TestSafety = () => {
  const t = useScopedI18n('common');

  // @ts-expect-error This should not be a valid key.
  t('this is not a valid key');

  // @ts-expect-error This should not be a valid key.
  t('test', { count: 1, invalidKey: 'invalid' });

  // This one is valid
  t('test', { count: 1 }); // <- if error is thrown here, update key to any valid key in src/i18n/en/common.json
};
