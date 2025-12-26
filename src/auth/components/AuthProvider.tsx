// Auth Provider Component
// Wraps the application with Auth0Provider
// Must be used inside a Router context (uses useNavigate)

import { useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider, type AppState } from '@auth0/auth0-react';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';
import { loadAuth0Config } from '../config';
import type { Auth0Config } from '../types';

/**
 * Loading screen while Auth0 config is being fetched
 */
const AuthConfigLoader = () => (
  <Box display='flex' justifyContent='center' alignItems='center' minH='100vh' bg='gray.50'>
    <VStack gap={4}>
      <Spinner size='xl' color='blue.500' borderWidth='4px' />
      <Text color='gray.600' fontSize='lg'>
        Initializing application...
      </Text>
    </VStack>
  </Box>
);

/**
 * Error screen if Auth0 config fails to load
 */
const AuthConfigError = ({ error }: { error: string }) => (
  <Box display='flex' justifyContent='center' alignItems='center' minH='100vh' bg='red.50' p={8}>
    <VStack gap={4} maxW='md' textAlign='center'>
      <Text color='red.600' fontSize='xl' fontWeight='bold'>
        Configuration Error
      </Text>
      <Text color='red.500'>{error}</Text>
      <Text color='gray.600' fontSize='sm'>
        Please check public/configs/Auth0Config.json
      </Text>
    </VStack>
  </Box>
);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 * Loads Auth0 configuration and wraps children with Auth0Provider
 * Must be used inside a Router context (uses useNavigate for redirect)
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<Auth0Config | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const loadedConfig = await loadAuth0Config();
        if (mounted) {
          setConfig(loadedConfig);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err.message : 'Failed to load authentication configuration',
          );
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Handle redirect callback - navigates user after Auth0 authentication
   */
  const onRedirectCallback = (appState?: AppState) => {
    // Navigate to the intended destination after authentication
    const returnTo = appState?.returnTo ?? '/dashboard';
    void navigate(returnTo, { replace: true });
  };

  // Show loading while fetching config
  if (isLoading) {
    return <AuthConfigLoader />;
  }

  // Show error if config failed to load
  if (error || !config) {
    return <AuthConfigError error={error ?? 'Configuration not found'} />;
  }

  return (
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      authorizationParams={{
        ...config.authorizationParams,
        redirect_uri: config.authorizationParams.redirect_uri ?? window.location.origin,
      }}
      cacheLocation={config.cacheLocation ?? 'localstorage'}
      useRefreshTokens={config.useRefreshTokens ?? true}
      useRefreshTokensFallback={config.useRefreshTokensFallback ?? true}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
