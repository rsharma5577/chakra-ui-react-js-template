// Root Layout - Wraps entire application
import { Suspense, useEffect } from 'react';
import { Outlet, useNavigation, useMatches, ScrollRestoration } from 'react-router-dom';
import { Box, Progress } from '@chakra-ui/react';
import { Spinner } from '@/components';
import { AuthProvider } from '@/auth';

// Route handle type for type-safe route metadata
interface RouteHandle {
  title?: string;
  description?: string;
  breadcrumb?: string;
}

// Loading spinner for Suspense
const PageLoader = () => (
  <Box display='flex' justifyContent='center' alignItems='center' minH='100vh'>
    <Spinner size='xl' />
  </Box>
);

// Global loading bar for navigation
const NavigationProgress = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  if (!isLoading) {
    return null;
  }

  return (
    <Progress.Root
      size='xs'
      colorPalette='brand'
      position='fixed'
      top={0}
      left={0}
      right={0}
      zIndex={9999}
      value={null}
    >
      <Progress.Track bg='transparent'>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  );
};

export const RootLayout = () => {
  const matches = useMatches();
  const navigation = useNavigation();

  // Update document title based on route
  useEffect(() => {
    const currentMatch = matches[matches.length - 1];
    const handle = currentMatch.handle as RouteHandle;

    if (handle.title) {
      document.title = `${handle.title} | Your App`;
    } else {
      document.title = 'Your App';
    }
  }, [matches]);

  // Get current route state
  const isNavigating = navigation.state !== 'idle';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <AuthProvider>
      {/* Global navigation progress bar */}
      <NavigationProgress />

      {/* Scroll restoration on navigation */}
      <ScrollRestoration />

      {/* Page content with Suspense for lazy loading */}
      <Box
        opacity={isNavigating && !isSubmitting ? 0.7 : 1}
        transition='opacity 0.2s'
        pointerEvents={isNavigating ? 'none' : 'auto'}
      >
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Box>
    </AuthProvider>
  );
};
