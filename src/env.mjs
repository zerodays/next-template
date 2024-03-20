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
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
    NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE: z.coerce.number().optional(),
  },
  // ... other dev/test-specific properties
};

// Staging environment-specific schema
const stagingSchema = {
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
    NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE: z.coerce.number().optional(),
  },
  // ... other staging-specific properties
};

// Production environment-specific schema
const productionSchema = {
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z
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
    envSchema = { ...baseSchema, ...devSchema };
    break;
  case 'test':
  case 'staging':
    envSchema = { ...baseSchema, ...stagingSchema };
    break;
  case 'production':
    envSchema = { ...baseSchema, ...productionSchema };
    break;
  default:
    throw new Error(`Unknown environment: ${currentEnv}`);
}

// Runtime environment variables (for Next.js edge runtimes or client-side)
const runtimeEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DNS,
  NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE:
    process.env.NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE,
};

// Skip env validation flag (useful for Docker builds)
const skipValidation = !!process.env.SKIP_ENV_VALIDATION;

// Treat empty strings as undefined
const emptyStringAsUndefined = true;

// Create and export the environment object
export const env = createEnv({
  ...envSchema,
  runtimeEnv,
  skipValidation,
  emptyStringAsUndefined,
});
