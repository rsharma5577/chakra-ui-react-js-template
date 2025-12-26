// Auth Module Barrel Export
// Central export for all authentication-related functionality

// Components
export {
  AuthProvider,
  PrivateRoute,
  withPrivateRoute,
  AuthGuardLayout,
  AuthCallback,
  LoginButton,
  LogoutButton,
  AuthButton,
  UserProfileCompact,
  UserProfileMenu,
  UserProfileCard,
} from './components';

// Hooks
export { useAuth, useAccessToken } from './hooks';

// Config
export { loadAuth0Config, getAuth0Config, clearAuth0ConfigCache } from './config';

// Mocks
export { MOCK_PERMISSIONS, USE_MOCK_PERMISSIONS } from './mocks';

// Types
export type {
  Auth0Config,
  Auth0User,
  AuthState,
  LoginOptions,
  LogoutOptions,
  AccessTokenOptions,
} from './types';

// Re-export useful Auth0 hooks
export { useAuth0 } from '@auth0/auth0-react';
