// Environment configuration
// Centralizes all environment variables with type safety and defaults

interface EnvConfig {
  // API
  apiBaseUrl: string;
  apiTimeout: number;

  // App
  appName: string;
  appVersion: string;
  environment: 'development' | 'staging' | 'production';

  // Feature flags
  enableDevtools: boolean;
  enableMocking: boolean;

  // Analytics
  analyticsId?: string;

  // Sentry
  sentryDsn?: string;
}

const ensureString = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.length > 0 ? value : fallback;

const toNumber = (value: unknown, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env: EnvConfig = {
  // API
  apiBaseUrl: ensureString(import.meta.env.VITE_API_BASE_URL, 'http://localhost:3000/api'),
  apiTimeout: toNumber(import.meta.env.VITE_API_TIMEOUT, 30000),

  // App
  appName: ensureString(import.meta.env.VITE_APP_NAME, 'Chakra UI React Template'),
  appVersion: ensureString(import.meta.env.VITE_APP_VERSION, '1.0.0'),
  environment: ((): EnvConfig['environment'] => {
    const mode = import.meta.env.MODE;
    if (mode === 'development' || mode === 'staging' || mode === 'production') {
      return mode;
    }
    return 'development';
  })(),

  // Feature flags
  enableDevtools: import.meta.env.DEV,
  enableMocking: import.meta.env.VITE_ENABLE_MOCKING === 'true',

  // Analytics
  analyticsId: ensureString(import.meta.env.VITE_ANALYTICS_ID, ''),

  // Sentry
  sentryDsn: ensureString(import.meta.env.VITE_SENTRY_DSN, ''),
};

// Helper functions
export const isDev = () => env.environment === 'development';
export const isStaging = () => env.environment === 'staging';
export const isProd = () => env.environment === 'production';
