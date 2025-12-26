// Auth0 Configuration Types
// Type definitions for Auth0 configuration and authentication

import type { AuthorizationParams } from '@auth0/auth0-react';

/**
 * Auth0 Configuration schema matching Auth0Config.json
 */
export interface Auth0Config {
  /** Auth0 domain (e.g., your-tenant.auth0.com) */
  domain: string;
  /** Auth0 application client ID */
  clientId: string;
  /** Authorization parameters */
  authorizationParams: AuthorizationParams;
  /** Token cache location */
  cacheLocation?: 'memory' | 'localstorage';
  /** Enable refresh tokens for silent authentication */
  useRefreshTokens?: boolean;
  /** Fallback for refresh tokens if unavailable */
  useRefreshTokensFallback?: boolean;
}

/**
 * User profile from Auth0
 */
export interface Auth0User {
  sub?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  nickname?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
  locale?: string;
  updated_at?: string;
  [key: string]: unknown;
}

/**
 * Authentication state
 */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Auth0User | undefined;
  error: Error | undefined;
}

/**
 * Login options for redirect
 */
export interface LoginOptions {
  appState?: {
    returnTo?: string;
    [key: string]: unknown;
  };
  authorizationParams?: Partial<AuthorizationParams>;
}

/**
 * Logout options
 */
export interface LogoutOptions {
  logoutParams?: {
    returnTo?: string;
    federated?: boolean;
  };
}

/**
 * Access token options
 */
export interface AccessTokenOptions {
  audience?: string;
  scope?: string;
  ignoreCache?: boolean;
}
