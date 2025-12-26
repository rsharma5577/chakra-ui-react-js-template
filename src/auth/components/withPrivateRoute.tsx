// Higher-Order Component for Private Route Protection
// Separated from PrivateRoute.tsx to fix Fast Refresh compatibility

import { withAuthenticationRequired } from '@auth0/auth0-react';
import type { ComponentType, ReactElement } from 'react';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';

/**
 * Higher-Order Component to protect individual components
 * Uses Auth0's withAuthenticationRequired for enhanced security
 *
 * @example
 * ```tsx
 * const ProtectedDashboard = withPrivateRoute(Dashboard, {
 *   returnTo: '/dashboard'
 * });
 * ```
 */
export function withPrivateRoute<P extends object>(
  Component: ComponentType<P>,
  options?: {
    returnTo?: string;
    onRedirecting?: () => ReactElement;
  },
) {
  return withAuthenticationRequired(Component, {
    onRedirecting:
      options?.onRedirecting ??
      (() => (
        <Box display='flex' justifyContent='center' alignItems='center' minH='100vh' bg='gray.50'>
          <VStack gap={4}>
            <Spinner size='xl' color='blue.500' borderWidth='4px' />
            <Text color='gray.600' fontSize='lg'>
              Verifying authentication...
            </Text>
          </VStack>
        </Box>
      )),
    returnTo: options?.returnTo,
  });
}
