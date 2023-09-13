import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_TRACE_SAMPLE_RATE =
  Number(process.env.NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE) || 1;

const SENTRY_ENVIRONMENT =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
    ? 'staging'
    : 'production';

if (SENTRY_DSN != null && SENTRY_TRACE_SAMPLE_RATE != null) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: SENTRY_TRACE_SAMPLE_RATE,
    environment: SENTRY_ENVIRONMENT,
  });
}
