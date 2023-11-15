await import('./src/env.mjs');
import { withSentryConfig } from '@sentry/nextjs';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { withAxiom } from 'next-axiom';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sentry: {
    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
};

export default withAxiom(
  withSentryConfig(nextConfig, {
    silent: true,
    org: 'zerodays',
    project: 'next-template',
  }),
);
