// Route configuration
// Centralizes all route paths for type-safe navigation

export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',

  // Protected routes
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // Error pages
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
} as const;

// Helper function to build routes with params
export const buildRoute = (route: string, params: Record<string, string | number>): string => {
  let result = route;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, String(value));
  });
  return result;
};

// Route metadata for navigation
export interface RouteMetadata {
  path: string;
  title: string;
  protected: boolean;
  roles?: string[];
}

export const routeMetadata: Record<string, RouteMetadata> = {
  home: { path: ROUTES.HOME, title: 'Home', protected: false },
  dashboard: { path: ROUTES.DASHBOARD, title: 'Dashboard', protected: true },
  profile: { path: ROUTES.PROFILE, title: 'Profile', protected: true },
  settings: { path: ROUTES.SETTINGS, title: 'Settings', protected: true },
};
