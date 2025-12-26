// Login Button Component
// Reusable login/logout button with Auth0 integration

import { useAuth0 } from '@auth0/auth0-react';
import { Button, type ButtonProps } from '@chakra-ui/react';

interface LoginButtonProps extends Omit<ButtonProps, 'onClick'> {
  /** Redirect path after login */
  returnTo?: string;
}

/**
 * Login button that triggers Auth0 authentication
 */
export const LoginButton = ({
  returnTo,
  children = 'Log In',
  ...buttonProps
}: LoginButtonProps) => {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: returnTo ?? window.location.pathname,
      },
    });
  };

  return (
    <Button
      onClick={() => void handleLogin()}
      loading={isLoading}
      colorPalette='blue'
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

interface LogoutButtonProps extends Omit<ButtonProps, 'onClick'> {
  /** Redirect path after logout */
  returnTo?: string;
}

/**
 * Logout button that triggers Auth0 logout
 */
export const LogoutButton = ({
  returnTo,
  children = 'Log Out',
  ...buttonProps
}: LogoutButtonProps) => {
  const { logout, isLoading } = useAuth0();

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: returnTo ?? window.location.origin,
      },
    });
  };

  return (
    <Button
      onClick={() => void handleLogout()}
      loading={isLoading}
      variant='outline'
      colorPalette='red'
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

/**
 * Combined Auth button that shows Login or Logout based on auth state
 */
export const AuthButton = ({
  loginText = 'Log In',
  logoutText = 'Log Out',
  returnToAfterLogin,
  returnToAfterLogout,
  ...buttonProps
}: {
  loginText?: string;
  logoutText?: string;
  returnToAfterLogin?: string;
  returnToAfterLogout?: string;
} & Omit<ButtonProps, 'onClick'>) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Button loading colorPalette='blue' {...buttonProps}>
        Loading...
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <LogoutButton returnTo={returnToAfterLogout} {...buttonProps}>
        {logoutText}
      </LogoutButton>
    );
  }

  return (
    <LoginButton returnTo={returnToAfterLogin} {...buttonProps}>
      {loginText}
    </LoginButton>
  );
};
