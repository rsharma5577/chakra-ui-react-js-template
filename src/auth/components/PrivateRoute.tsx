// Private Route Guard Component
// Protects routes that require authentication

import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

/**
 * Loading component shown while checking authentication
 */
const AuthLoadingScreen = () => (
  <Box display='flex' justifyContent='center' alignItems='center' minH='100vh' bg='gray.50'>
    <VStack gap={4}>
      <Spinner size='xl' color='blue.500' borderWidth='4px' />
      <Text color='gray.600' fontSize='lg'>
        Verifying authentication...
      </Text>
    </VStack>
  </Box>
);

interface PrivateRouteProps {
  /** Child routes to protect */
  children?: ReactNode;
  /** Custom loading component */
  loadingComponent?: ReactNode;
  /** Redirect path for unauthenticated users (defaults to login redirect) */
  redirectTo?: string;
  /** Required roles to access the route */
  requiredRoles?: string[];
  /** Required permissions to access the route */
  requiredPermissions?: string[];
}

/**
 * Private Route Guard using Outlet pattern
 * Use this as a layout route to protect nested routes
 *
 * @example
 * ```tsx
 * {
 *   element: <PrivateRoute />,
 *   children: [
 *     { path: "dashboard", element: <Dashboard /> },
 *     { path: "profile", element: <Profile /> },
 *   ]
 * }
 * ```
 */
export const PrivateRoute = ({
  children,
  loadingComponent,
  redirectTo,
  requiredRoles,
  requiredPermissions,
}: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const location = useLocation();

  // Show loading state while Auth0 is initializing
  if (isLoading) {
    return loadingComponent ?? <AuthLoadingScreen />;
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo ?? '/'} state={{ from: location }} replace />;
  }

  // Check required roles
  if ((requiredRoles?.length ?? 0) > 0) {
    const userRoles = (user?.roles as string[] | undefined) ?? [];
    const hasRequiredRole = requiredRoles?.some(role => userRoles.includes(role));

    if (!hasRequiredRole) {
      return <Navigate to='/unauthorized' state={{ from: location }} replace />;
    }
  }

  // Check required permissions
  if ((requiredPermissions?.length ?? 0) > 0) {
    const userPermissions = (user?.permissions as string[] | undefined) ?? [];
    const hasRequiredPermission = requiredPermissions?.some(permission =>
      userPermissions.includes(permission),
    );

    if (!hasRequiredPermission) {
      return <Navigate to='/unauthorized' state={{ from: location }} replace />;
    }
  }

  // Render children or outlet for nested routes
  return children ?? <Outlet />;
};

/**
 * Auth Guard Layout Component
 * Alternative implementation using React Router layout pattern
 */
export const AuthGuardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    // Redirect to home if not authenticated
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return <Outlet />;
};
