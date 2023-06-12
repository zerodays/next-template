import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { defaultLocale, isLocale, LocalResources } from './i18n';

/**
 * Injects the server-side translations into the props. This function should be
 * wrapped around getStaticProps or getServerSideProps functions from Next.js.
 * If you don't need to use the original getStaticProps or getServerSideProps,
 * you can pass null as the second argument.
 * @param namespaces Namespaces to inject (e.g. ['common', 'home'])
 * @param originalGetProps The original getStaticProps or getServerSideProps
 * @example
 * export const getStaticProps: GetStaticProps = injectSsrTranslations(
 *   ['common'],
 *   null,
 * );
 */
export const injectSsrTranslations =
  (
    namespaces: (keyof LocalResources)[],
    originalGetProps: GetStaticProps | GetServerSideProps | null = null,
  ) =>
  async (context: GetStaticPropsContext | GetServerSidePropsContext) => {
    // Get locale from context
    let { locale } = context;

    // Validate locale, if invalid, use default locale
    if (!isLocale(locale)) {
      locale = defaultLocale;
    }

    let data = {};

    if (originalGetProps) {
      // Call original getStaticProps or getServerSideProps
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data = await originalGetProps(context as any);
    }

    // Add translations to props
    return {
      ...data,
      props: {
        ...(await serverSideTranslations(locale, namespaces)),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(data as any).props,
      },
    };
  };
