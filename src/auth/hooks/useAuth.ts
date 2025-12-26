// Enhanced Auth Hook
// Provides convenient access to Auth0 authentication with additional utilities

import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useMemo } from 'react';
import type { LoginOptions, LogoutOptions, AccessTokenOptions, AuthState } from '../types';
import { MOCK_PERMISSIONS, USE_MOCK_PERMISSIONS } from '../mocks';

/**
 * Enhanced authentication hook with additional utilities
 * Wraps useAuth0 with better TypeScript support and convenience methods
 */
export function useAuth() {
  const {
    isAuthenticated,
    isLoading,
    user,
    error,
    loginWithRedirect,
    loginWithPopup,
    logout: auth0Logout,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    getIdTokenClaims,
    handleRedirectCallback,
  } = useAuth0();

  /**
   * Login with redirect (recommended for most cases)
   */
  const login = useCallback(
    async (options?: LoginOptions) => {
      await loginWithRedirect({
        appState: {
          returnTo: options?.appState?.returnTo ?? window.location.pathname,
          ...options?.appState,
        },
        authorizationParams: options?.authorizationParams,
      });
    },
    [loginWithRedirect],
  );

  /**
   * Login with popup (for specific UX requirements)
   */
  const loginPopup = useCallback(
    async (options?: LoginOptions) => {
      try {
        await loginWithPopup({
          authorizationParams: options?.authorizationParams,
        });
      } catch (error) {
        console.error('Popup login failed:', error);
        throw error;
      }
    },
    [loginWithPopup],
  );

  /**
   * Logout with redirect
   */
  const logout = useCallback(
    async (options?: LogoutOptions) => {
      await auth0Logout({
        logoutParams: {
          returnTo: options?.logoutParams?.returnTo ?? window.location.origin,
          ...options?.logoutParams,
        },
      });
    },
    [auth0Logout],
  );

  /**
   * Get access token silently (with caching)
   */
  const getAccessToken = useCallback(
    async (options?: AccessTokenOptions) => {
      try {
        return await getAccessTokenSilently({
          authorizationParams: {
            audience: options?.audience,
            scope: options?.scope,
          },
          cacheMode: options?.ignoreCache ? 'off' : 'on',
        });
      } catch (error) {
        console.error('Failed to get access token:', error);
        throw error;
      }
    },
    [getAccessTokenSilently],
  );

  /**
   * Get access token with popup (fallback for silent failure)
   */
  const getAccessTokenPopup = useCallback(
    async (options?: AccessTokenOptions) => {
      try {
        return await getAccessTokenWithPopup({
          authorizationParams: {
            audience: options?.audience,
            scope: options?.scope,
          },
        });
      } catch (error) {
        console.error('Failed to get access token with popup:', error);
        throw error;
      }
    },
    [getAccessTokenWithPopup],
  );

  /**
   * Get ID token claims
   */
  const getIdToken = useCallback(async () => {
    try {
      const claims = await getIdTokenClaims();
      return claims?.__raw;
    } catch (error) {
      console.error('Failed to get ID token:', error);
      throw error;
    }
  }, [getIdTokenClaims]);

  /**
   * Check if user has a specific role (from token claims)
   */
  const hasRole = useCallback(
    (role: string) => {
      if (!user) {
        return false;
      }
      const roles = (user.roles as string[] | undefined) ?? [];
      return roles.includes(role);
    },
    [user],
  );

  /**
   * Check if user has a specific permission
   * Uses mock permissions in development mode if enabled
   */
  const hasPermission = useCallback(
    (permission: string) => {
      // Use mock permissions in development mode
      if (USE_MOCK_PERMISSIONS) {
        return MOCK_PERMISSIONS.includes(permission);
      }

      if (!user) {
        return false;
      }
      const permissions = (user.permissions as string[] | undefined) ?? [];
      return permissions.includes(permission);
    },
    [user],
  );

  /**
   * Get user's display name
   */
  const displayName = useMemo(() => {
    if (!user) {
      return '';
    }
    return user.name ?? user.nickname ?? user.email ?? 'User';
  }, [user]);

  /**
   * Get user's avatar/picture URL
   */
  const avatarUrl = useMemo(() => {
    return user?.picture ?? null;
  }, [user]);

  /**
   * Authentication state object
   */
  const authState: AuthState = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      error,
    }),
    [isAuthenticated, isLoading, user, error],
  );

  return {
    // State
    ...authState,
    displayName,
    avatarUrl,

    // Actions
    login,
    loginPopup,
    logout,
    getAccessToken,
    getAccessTokenPopup,
    getIdToken,
    handleRedirectCallback,

    // Utilities
    hasRole,
    hasPermission,
  };
}
