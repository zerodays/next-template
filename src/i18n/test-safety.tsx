import { useTranslation } from 'next-i18next';

/**
 * Simple component which is used to test the safety of the i18n translation type checking.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TestSafety = () => {
  const { t } = useTranslation('common');

  // @ts-expect-error This should not be a valid key.
  t('this is not a valid key');

  // This one is valid
  t('test'); // <- if error is thrown here, update key to any valid key in src/i18n/en/common.json
};
