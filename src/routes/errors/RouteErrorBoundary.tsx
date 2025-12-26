// Route Error Boundary - Catches errors within nested routes
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Box, VStack, HStack } from '@chakra-ui/react';
import { Heading, Text, Button, Alert } from '@/components';
import { paths } from '../paths';

export const RouteErrorBoundary = () => {
  const error = useRouteError();

  // Check if it's a redirect/auth error
  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      return (
        <Box p={6}>
          <Alert variant='outline' status='info'>
            <VStack align='start' gap={3}>
              <Heading level={4}>Session Expired</Heading>
              <Text>Your session has expired. Please log in again.</Text>
              <Link to={paths.AUTH.CALLBACK}>
                <Button size='sm'>Log In</Button>
              </Link>
            </VStack>
          </Alert>
        </Box>
      );
    }

    if (error.status === 403) {
      return (
        <Box p={6}>
          <Alert variant='outline' status='error'>
            <VStack align='start' gap={3}>
              <Heading level={4}>Access Denied</Heading>
              <Text>You do not have permission to view this content.</Text>
              <Link to={paths.DASHBOARD}>
                <Button size='sm' variant='outline'>
                  Go to Dashboard
                </Button>
              </Link>
            </VStack>
          </Alert>
        </Box>
      );
    }
  }

  // Generic error display
  return (
    <Box p={6}>
      <VStack gap={6} align='start'>
        <Alert variant='outline' status='error'>
          <VStack align='start' gap={2}>
            <Heading level={4}>Something went wrong</Heading>
            <Text>We encountered an error while loading this page.</Text>
          </VStack>
        </Alert>

        <HStack gap={3}>
          <Button
            onClick={() => {
              window.location.reload();
            }}
            variant='solid'
          >
            Retry
          </Button>
          <Link to={paths.DASHBOARD}>
            <Button variant='outline'>Go to Dashboard</Button>
          </Link>
        </HStack>

        {/* Development error details */}
        {import.meta.env.DEV && (
          <Box
            p={4}
            bg='gray.100'
            _dark={{ bg: 'gray.800' }}
            borderRadius='md'
            w='100%'
            fontSize='sm'
          >
            <Text fontWeight='bold' mb={2}>
              Error Details:
            </Text>
            <Box
              as='pre'
              overflow='auto'
              whiteSpace='pre-wrap'
              wordBreak='break-word'
              fontFamily='mono'
              fontSize='xs'
              color='red.600'
              _dark={{ color: 'red.400' }}
            >
              {error instanceof Error
                ? (error.stack ?? error.message)
                : JSON.stringify(error, null, 2)}
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
