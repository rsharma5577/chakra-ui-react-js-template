// Root Error Boundary - Catches errors at the top level
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Box, VStack, HStack } from '@chakra-ui/react';
import { Heading, Text, Button } from '@/components';

interface ErrorInfo {
  status: number;
  title: string;
  message: string;
}

function getErrorInfo(error: unknown): ErrorInfo {
  // Handle route error responses (404, 500, etc.)
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return {
          status: 404,
          title: 'Page Not Found',
          message: "The page you're looking for doesn't exist or has been moved.",
        };
      case 401:
        return {
          status: 401,
          title: 'Unauthorized',
          message: 'You need to be logged in to access this page.',
        };
      case 403:
        return {
          status: 403,
          title: 'Forbidden',
          message: "You don't have permission to access this page.",
        };
      case 500:
        return {
          status: 500,
          title: 'Server Error',
          message: 'Something went wrong on our end. Please try again later.',
        };
      default:
        return {
          status: error.status,
          title: error.statusText || 'Error',
          message: 'An unexpected error occurred.',
        };
    }
  }

  // Handle thrown errors
  if (error instanceof Error) {
    return {
      status: 500,
      title: 'Application Error',
      message: error.message || 'An unexpected error occurred.',
    };
  }

  // Handle unknown errors
  return {
    status: 500,
    title: 'Unknown Error',
    message: 'An unexpected error occurred. Please try again.',
  };
}

export const RootErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const errorInfo = getErrorInfo(error);

  const handleGoHome = () => {
    void navigate('/');
  };

  const handleGoBack = () => {
    void navigate(-1);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <Box
      minH='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
      p={8}
      bg='gray.50'
      _dark={{ bg: 'gray.900' }}
    >
      <VStack gap={6} textAlign='center' maxW='500px'>
        {/* Error status */}
        <Box fontSize='8xl' fontWeight='bold' color='brand.500' lineHeight={1} opacity={0.3}>
          {errorInfo.status}
        </Box>

        {/* Error title */}
        <Heading level={1}>{errorInfo.title}</Heading>

        {/* Error message */}
        <Text color='gray.600' _dark={{ color: 'gray.400' }} fontSize='lg'>
          {errorInfo.message}
        </Text>

        {/* Actions */}
        <HStack gap={4} mt={4}>
          <Button variant='outline' onClick={handleGoBack}>
            Go Back
          </Button>
          <Button onClick={handleGoHome}>Go Home</Button>
        </HStack>

        {/* Retry button for server errors */}
        {errorInfo.status >= 500 && (
          <Button variant='ghost' size='sm' onClick={handleRetry}>
            Try Again
          </Button>
        )}

        {/* Development error details */}
        {import.meta.env.DEV && error instanceof Error && (
          <Box
            mt={8}
            p={4}
            bg='gray.100'
            _dark={{ bg: 'gray.800' }}
            borderRadius='md'
            w='100%'
            textAlign='left'
            fontSize='sm'
          >
            <Text fontWeight='bold' mb={2}>
              Debug Info:
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
              {error.stack ?? error.message}
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
