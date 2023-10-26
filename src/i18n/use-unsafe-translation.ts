import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

export const useUnsafeTranslation = () => {
  const { t, ...rest } = useTranslation();

  const unsafeT = useCallback(
    (key: string, ...args: unknown[]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = t(key, ...args);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (result === key) {
        console.warn(`Missing translation for key: ${key}`);
      }
      return result as unknown as string;
    },
    [t],
  );

  return {
    ...rest,
    t: unsafeT,
  };
};
