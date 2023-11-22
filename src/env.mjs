import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Base schema for common variables
const baseSchema = {
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    SENTRY_AUTH_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },
  // ... other shared properties
};

// Development environment-specific schema
const devSchema = {
  client: {
    NEXT_PUBLIC_SENTRY_DNS: z.string().optional(),
    NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE: z.coerce.number().optional(),
  },
  // ... other dev/test-specific properties
};

// Staging environment-specific schema
const stagingSchema = {
  client: {
    NEXT_PUBLIC_SENTRY_DNS: z.string().optional(),
    NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE: z.coerce.number().optional(),
  },
  // ... other staging-specific properties
};

// Production environment-specific schema
const productionSchema = {
  client: {
    NEXT_PUBLIC_SENTRY_DNS: z
      .string()
      .min(1, { message: 'Sentry DNS is required in production' }),
    NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE: z.coerce.number(),
  },
  // ... other production-specific properties
};

// Determine the current environment and merge schemas accordingly
const currentEnv = process.env.NODE_ENV || 'development'; // Default to 'development' if NODE_ENV is not set

let envSchema;
switch (currentEnv) {
  case 'development':
    envSchema = {
      server: { ...baseSchema.server, ...devSchema.server },
      client: { ...baseSchema.client, ...devSchema.client },
    };
    break;
  case 'test':
  case 'staging':
    envSchema = {
      server: { ...baseSchema.server, ...stagingSchema.server },
      client: { ...baseSchema.client, ...stagingSchema.client },
    };
    break;
  case 'production':
    envSchema = {
      server: { ...baseSchema.server, ...productionSchema.server },
      client: { ...baseSchema.client, ...productionSchema.client },
    };
    break;
}

// Runtime environment variables (for Next.js edge runtimes or client-side)
const runtimeEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  NEXT_PUBLIC_SENTRY_DNS: process.env.NEXT_PUBLIC_SENTRY_DNS,
  NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE:
    process.env.NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE,
};

// Skip env validation flag (useful for Docker builds)
// Also skip on lint, see: https://github.com/t3-oss/t3-env/issues/102
const skipValidation =
  !!process.env.SKIP_ENV_VALIDATION ||
  process.env.npm_lifecycle_script === 'next lint';

// Treat empty strings as undefined
const emptyStringAsUndefined = true;

// Create and export the environment object
export const env = createEnv({
  ...envSchema,
  runtimeEnv,
  skipValidation,
  emptyStringAsUndefined,
});
