// Application Entry Point
// Using React Router v7 Data Router API with Auth0 authentication
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Application config
import system from '@/theme';
import { queryClient } from '@/lib/react-query';

// Import the App component that wraps routes with Auth
import { App } from './App';

// Root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Create React root
createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        {/* App component handles Auth0 and Router */}
        <App />
        {/* React Query DevTools */}
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
);
