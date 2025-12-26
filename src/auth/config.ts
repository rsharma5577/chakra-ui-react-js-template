// Auth0 Configuration Loader
// Loads Auth0 config from public/configs/Auth0Config.json at runtime

import type { Auth0Config } from './types';

/**
 * Cached configuration
 */
let cachedConfig: Auth0Config | null = null;

/**
 * Validates Auth0 configuration
 */
function validateConfig(config: unknown): config is Auth0Config {
  if (typeof config !== 'object') {
    return false;
  }

  const cfg = config as Record<string, unknown>;

  if (typeof cfg.domain !== 'string' || !cfg.domain) {
    console.error("Auth0 config: 'domain' is required");
    return false;
  }

  if (typeof cfg.clientId !== 'string' || !cfg.clientId) {
    console.error("Auth0 config: 'clientId' is required");
    return false;
  }

  // Check for placeholder values
  if (cfg.domain.includes('YOUR_AUTH0')) {
    console.warn(
      '⚠️ Auth0 config: Using placeholder domain. Update public/configs/Auth0Config.json with your Auth0 credentials.',
    );
  }

  if (cfg.clientId.includes('YOUR_AUTH0')) {
    console.warn(
      '⚠️ Auth0 config: Using placeholder clientId. Update public/configs/Auth0Config.json with your Auth0 credentials.',
    );
  }

  return true;
}

/**
 * Fetches Auth0 configuration from public config file
 * This allows runtime configuration without rebuilding
 */
export async function loadAuth0Config(): Promise<Auth0Config> {
  // Return cached config if available
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const response = await fetch('/configs/Auth0Config.json');

    if (!response.ok) {
      throw new Error(
        `Failed to load Auth0 config: ${String(response.status)} ${response.statusText}`,
      );
    }

    const config = (await response.json()) as unknown;

    if (!validateConfig(config)) {
      throw new Error('Invalid Auth0 configuration');
    }

    // Apply runtime redirect_uri if not set
    const validatedConfig = config;

    if (!validatedConfig.authorizationParams.redirect_uri) {
      validatedConfig.authorizationParams = {
        ...validatedConfig.authorizationParams,
        redirect_uri: window.location.origin,
      };
    }

    // Cache the config
    cachedConfig = validatedConfig;

    return validatedConfig;
  } catch (error) {
    console.error('Error loading Auth0 configuration:', error);
    throw error;
  }
}

/**
 * Get cached config synchronously (must call loadAuth0Config first)
 */
export function getAuth0Config(): Auth0Config | null {
  return cachedConfig;
}

/**
 * Clear cached config (useful for testing)
 */
export function clearAuth0ConfigCache(): void {
  cachedConfig = null;
}
