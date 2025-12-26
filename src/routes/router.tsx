// Advanced Router Configuration
// Using React Router v7 Data Router API with Auth0 authentication
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// Layouts
import { RootLayout } from './layouts/RootLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Auth Guard
import { AuthGuardLayout } from '@/auth';

// Permission Guard
import { PermissionGuard } from './guards';

// Error Boundaries
import { RootErrorBoundary } from './errors/RootErrorBoundary';
import { RouteErrorBoundary } from './errors/RouteErrorBoundary';

// Route Utilities
import { LazyRoute } from './utils';

// Domain Routes
import { wholesaleProvisioningRoutes } from '@/domains/wholesale-provisioning/routes';

// ============================================
// Lazy-loaded pages with React.lazy
// ============================================
const HomePage = lazy(() => import('@/pages/Home'));
const DashboardPage = lazy(() => import('@/pages/Dashboard'));
const ProfilePage = lazy(() => import('@/pages/Profile'));
const SettingsPage = lazy(() => import('@/pages/Settings'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));
const ExampleUsagePage = lazy(() =>
  import('@/pages/ExampleUsage').then(module => ({
    default: module.ExampleUsage,
  })),
);

// Auth pages
const AuthCallbackPage = lazy(() =>
  import('@/auth').then(module => ({ default: module.AuthCallback })),
);

// ============================================
// Route Loaders - Fetch data before rendering
// ============================================

// Dashboard loader - fetch dashboard data
function dashboardLoader() {
  // Fetch dashboard data (example)
  // const dashboardData = await fetchDashboardData();
  // return { dashboardData };

  return { timestamp: Date.now() };
}

// Profile loader - fetch user profile
function profileLoader() {
  // Fetch profile data
  // const profile = await fetchProfile();
  // return { profile };

  return { timestamp: Date.now() };
}

// Settings loader
function settingsLoader() {
  return { timestamp: Date.now() };
}

// ============================================
// Router Configuration
// ============================================
export const router = createBrowserRouter([
  {
    // Root layout - wraps entire app
    id: 'root',
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      // ========================================
      // PUBLIC ROUTES (No authentication required)
      // ========================================
      {
        index: true,
        element: <LazyRoute component={HomePage} />,
        handle: {
          title: 'Home',
          description: 'Welcome to our application',
          isPublic: true,
        },
      },

      // Auth callback route (handles OAuth redirect)
      {
        path: 'callback',
        element: <LazyRoute component={AuthCallbackPage} />,
        handle: {
          title: 'Authenticating',
          isPublic: true,
        },
      },

      // Example usage / demo page (public)
      {
        path: 'example',
        element: <LazyRoute component={ExampleUsagePage} />,
        handle: {
          title: 'API Demo',
          description: 'JSONPlaceholder API integration demo',
          isPublic: true,
        },
      },

      // ========================================
      // PRIVATE ROUTES (Authentication required)
      // Protected by AuthGuardLayout
      // ========================================
      {
        // Auth guard wrapper - protects all nested routes
        element: <AuthGuardLayout />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            // Dashboard layout for protected routes
            element: <DashboardLayout />,
            children: [
              {
                path: 'dashboard',
                element: <LazyRoute component={DashboardPage} />,
                loader: dashboardLoader,
                handle: {
                  title: 'Dashboard',
                  description: 'View your dashboard',
                  breadcrumb: 'Dashboard',
                },
              },
              {
                path: 'profile',
                element: <LazyRoute component={ProfilePage} />,
                loader: profileLoader,
                handle: {
                  title: 'Profile',
                  description: 'Manage your profile',
                  breadcrumb: 'Profile',
                },
              },
              {
                path: 'settings',
                element: <LazyRoute component={SettingsPage} />,
                loader: settingsLoader,
                handle: {
                  title: 'Settings',
                  description: 'Application settings',
                  breadcrumb: 'Settings',
                },
              },

              // ----------------------------------------
              // Domain: Wholesale Provisioning
              // Protected by PermissionGuard
              // ----------------------------------------
              {
                path: 'wholesale-provisioning',
                element: <PermissionGuard permissions='viewWholesaleProvisioning' />,
                handle: {
                  title: 'Wholesale Provisioning',
                  breadcrumb: 'Wholesale Provisioning',
                },
                children: wholesaleProvisioningRoutes,
              },
            ],
          },
        ],
      },

      // ========================================
      // 404 Not Found - catch all (public)
      // ========================================
      {
        path: '*',
        element: <LazyRoute component={NotFoundPage} />,
        handle: {
          title: 'Page Not Found',
          isPublic: true,
        },
      },
    ],
  },
]);

export default router;
