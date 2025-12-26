// Permission Guard Component
// Protects routes based on user permissions

import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/auth';
import NotFound from '@/pages/NotFound';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';

/**
 * Loading component shown while checking permissions
 */
const PermissionLoadingScreen = () => (
  <Box display='flex' justifyContent='center' alignItems='center' minH='100vh' bg='gray.50'>
    <VStack gap={4}>
      <Spinner size='xl' color='blue.500' borderWidth='4px' />
      <Text color='gray.600' fontSize='lg'>
        Verifying permissions...
      </Text>
    </VStack>
  </Box>
);

interface PermissionGuardProps {
  /** Single permission name or array of permissions (user must have at least one) */
  permissions: string | string[];
  /** Optional boolean condition - if provided, it's ANDed with permission check */
  condition?: boolean;
  /** Child routes/components to protect */
  children?: ReactNode;
  /** Custom loading component */
  loadingComponent?: ReactNode;
  /** Custom not found component */
  notFoundComponent?: ReactNode;
}

/**
 * Permission Guard Component
 * Checks if user has required permission(s) and optionally an extra boolean condition.
 * Shows NotFound page if access is denied.
 *
 * @example
 * // Single permission
 * <PermissionGuard permissions="users:read">
 *   <UserList />
 * </PermissionGuard>
 *
 * @example
 * // Multiple permissions (user needs at least one)
 * <PermissionGuard permissions={["users:read", "users:write"]}>
 *   <UserManagement />
 * </PermissionGuard>
 *
 * @example
 * // With extra condition
 * <PermissionGuard permissions="admin:access" condition={isFeatureEnabled}>
 *   <AdminPanel />
 * </PermissionGuard>
 *
 * @example
 * // As a layout route
 * {
 *   element: <PermissionGuard permissions="dashboard:view" />,
 *   children: [
 *     { path: "overview", element: <DashboardOverview /> },
 *     { path: "analytics", element: <DashboardAnalytics /> },
 *   ]
 * }
 */
export const PermissionGuard = ({
  permissions,
  condition,
  children,
  loadingComponent,
  notFoundComponent,
}: PermissionGuardProps) => {
  const { isLoading, hasPermission } = useAuth();

  // Show loading state while auth is initializing
  if (isLoading) {
    return loadingComponent ?? <PermissionLoadingScreen />;
  }

  // Normalize permissions to array
  const permissionList = Array.isArray(permissions) ? permissions : [permissions];

  // Check if user has at least one of the required permissions
  const hasRequiredPermission = permissionList.some(permission => hasPermission(permission));

  // If condition is provided (not undefined), AND it with permission check
  // If condition is not provided (undefined), only check permissions
  const hasAccess =
    condition === undefined ? hasRequiredPermission : hasRequiredPermission && condition;

  // Show NotFound if user doesn't have access
  if (!hasAccess) {
    return notFoundComponent ?? <NotFound />;
  }

  // Render children or outlet for nested routes
  return children ?? <Outlet />;
};

/**
 * Higher-Order Component to protect individual components with permissions
 *
 * @example
 * const ProtectedAdminPanel = withPermissionGuard(AdminPanel, {
 *   permissions: ["admin:access", "super:admin"],
 *   condition: isFeatureEnabled
 * });
 */
// eslint-disable-next-line react-refresh/only-export-components
export function withPermissionGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    permissions: string | string[];
    condition?: boolean;
    loadingComponent?: ReactNode;
    notFoundComponent?: ReactNode;
  },
) {
  return function WrappedComponent(props: P) {
    return (
      <PermissionGuard
        permissions={options.permissions}
        condition={options.condition}
        loadingComponent={options.loadingComponent}
        notFoundComponent={options.notFoundComponent}
      >
        <Component {...props} />
      </PermissionGuard>
    );
  };
}

export default PermissionGuard;
