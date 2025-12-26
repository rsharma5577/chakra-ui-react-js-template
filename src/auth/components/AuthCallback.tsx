// Auth Callback Component
// Handles the OAuth callback from Auth0

import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';

/**
 * Callback page component
 * Handles the redirect from Auth0 after authentication
 */
export const AuthCallback = () => {
  const { error, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // If there's an error, show it
    if (error) {
      console.error('Auth callback error:', error);
      return;
    }

    // If authenticated, the onRedirectCallback in AuthProvider will handle navigation
    // This component is mainly for showing loading state
  }, [error, isAuthenticated, navigate]);

  if (error) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minH='100vh'
        bg='red.50'
        p={8}
      >
        <VStack gap={4} maxW='md' textAlign='center'>
          <Text color='red.600' fontSize='xl' fontWeight='bold'>
            Authentication Error
          </Text>
          <Text color='red.500'>{error.message}</Text>
          <Text
            color='blue.500'
            cursor='pointer'
            textDecoration='underline'
            onClick={() => {
              void navigate('/');
            }}
          >
            Return to Home
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' minH='100vh' bg='gray.50'>
      <VStack gap={4}>
        <Spinner size='xl' color='blue.500' borderWidth='4px' />
        <Text color='gray.600' fontSize='lg'>
          {isLoading ? 'Completing authentication...' : 'Redirecting...'}
        </Text>
      </VStack>
    </Box>
  );
};
