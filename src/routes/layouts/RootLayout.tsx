// Root Layout - Wraps entire application
import { Suspense, useEffect, memo, useMemo } from 'react';
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

// Loading spinner for Suspense - memoized to prevent re-renders
const PageLoader = memo(() => (
  <Box display='flex' justifyContent='center' alignItems='center' minH='100vh'>
    <Spinner size='xl' />
  </Box>
));
PageLoader.displayName = 'PageLoader';

// Global loading bar for navigation - memoized
const NavigationProgress = memo(() => {
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
});
NavigationProgress.displayName = 'NavigationProgress';

export const RootLayout = () => {
  const matches = useMatches();
  const navigation = useNavigation();

  // Memoize current match to avoid recalculation
  const currentMatch = useMemo(() => matches[matches.length - 1], [matches]);
  const handle = useMemo(() => currentMatch.handle as RouteHandle, [currentMatch]);

  // Update document title based on route
  useEffect(() => {
    if (handle.title) {
      document.title = `${handle.title} | Your App`;
    } else {
      document.title = 'Your App';
    }
  }, [handle.title]);

  // Get current route state - memoized
  const navigationState = useMemo(() => {
    const isNavigating = navigation.state !== 'idle';
    const isSubmitting = navigation.state === 'submitting';
    return { isNavigating, isSubmitting };
  }, [navigation.state]);

  return (
    <AuthProvider>
      {/* Global navigation progress bar */}
      <NavigationProgress />

      {/* Scroll restoration on navigation */}
      <ScrollRestoration />

      {/* Page content with Suspense for lazy loading */}
      <Box
        opacity={navigationState.isNavigating && !navigationState.isSubmitting ? 0.7 : 1}
        transition='opacity 0.2s'
        pointerEvents={navigationState.isNavigating ? 'none' : 'auto'}
      >
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Box>
    </AuthProvider>
  );
};
