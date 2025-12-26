// Access Token Hook
// Manages access token with automatic refresh and caching

import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseAccessTokenOptions {
  /** API audience for the token */
  audience?: string;
  /** Token scopes */
  scope?: string;
  /** Auto-refresh before expiry (default: true) */
  autoRefresh?: boolean;
  /** Refresh threshold in seconds (default: 60) */
  refreshThreshold?: number;
}

interface UseAccessTokenResult {
  /** The access token (null if not available) */
  accessToken: string | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Manually refresh the token */
  refreshToken: () => Promise<string | null>;
}

/**
 * Hook for managing access tokens with automatic refresh
 */
export function useAccessToken(options: UseAccessTokenOptions = {}): UseAccessTokenResult {
  const { audience, scope, autoRefresh = true, refreshThreshold = 60 } = options;

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Track token expiry
  const tokenExpiryRef = useRef<number | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Parse JWT to get expiry time
   */
  const parseTokenExpiry = useCallback((token: string): number | null => {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload)) as { exp?: number };
      return typeof decoded.exp === 'number' ? decoded.exp * 1000 : null;
    } catch {
      return null;
    }
  }, []);

  /**
   * Fetch access token
   */
  const fetchToken = useCallback(async () => {
    if (!isAuthenticated) {
      setAccessToken(null);
      setIsLoading(false);
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience,
          scope,
        },
      });

      setAccessToken(token);

      // Parse and store expiry
      const expiry = parseTokenExpiry(token);
      tokenExpiryRef.current = expiry;

      return token;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get access token');
      setError(error);
      setAccessToken(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, getAccessTokenSilently, audience, scope, parseTokenExpiry]);

  /**
   * Schedule token refresh
   */
  const scheduleRefresh = useCallback(() => {
    if (!autoRefresh || tokenExpiryRef.current === null) {
      return;
    }

    // Clear existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    const now = Date.now();
    const expiry = tokenExpiryRef.current;
    const refreshTime = expiry - refreshThreshold * 1000;
    const delay = Math.max(refreshTime - now, 0);

    if (delay > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        void fetchToken();
      }, delay);
    }
  }, [autoRefresh, refreshThreshold, fetchToken]);

  /**
   * Manual refresh function
   */
  const refreshToken = useCallback(async () => {
    return fetchToken();
  }, [fetchToken]);

  // Fetch token on mount and when auth state changes
  useEffect(() => {
    void fetchToken();
  }, [fetchToken]);

  // Schedule refresh after token is fetched
  useEffect(() => {
    if (accessToken) {
      scheduleRefresh();
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [accessToken, scheduleRefresh]);

  return {
    accessToken,
    isLoading,
    error,
    refreshToken,
  };
}
