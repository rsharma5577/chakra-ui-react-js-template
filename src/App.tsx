// App Component
// Entry point that renders the router
// Auth0 is initialized inside RootLayout via AuthProvider

import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';

/**
 * Main App Component
 * Simply renders the router - Auth0Provider is set up in RootLayout
 */
export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
