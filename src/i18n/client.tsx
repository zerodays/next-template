// locales/client.ts
'use client';

import { ReactNode } from 'react';
import { createI18nClient } from 'next-international/client';

import { defaultLocale, Locale } from './i18n';

export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  en: () => import('./en'),
  sl: () => import('./sl'),
});

type UnsafeT = (
  localeKey: string,
  params?: Record<string, string | ReactNode | number>,
) => string | ReactNode;

export const useUnsafeI18n = useI18n as unknown as () => UnsafeT;
export const useUnsafeScopedI18n = useScopedI18n as unknown as () => UnsafeT;

export function I18nProvider({
  children,
  locale,
  fallback,
}: {
  children: React.ReactNode;
  locale: Locale;
  fallback?: ReactNode;
}) {
  return (
    <I18nProviderClient locale={locale ?? defaultLocale} fallback={fallback}>
      {children}
    </I18nProviderClient>
  );
}
