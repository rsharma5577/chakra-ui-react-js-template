// React Query configuration
// Optimized for performance with request deduplication and smart caching
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes (won't refetch)
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Cache data for 30 minutes (garbage collection time)
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      // Retry failed requests once
      retry: 1,
      // Don't refetch on window focus (reduces unnecessary requests)
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect (data is still fresh)
      refetchOnReconnect: false,
      // Don't refetch on mount if data exists and is fresh
      refetchOnMount: false,
      // Enable structural sharing (prevents unnecessary re-renders)
      structuralSharing: true,
      // Network mode - prefer online but work offline
      networkMode: 'online',
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      // Network mode
      networkMode: 'online',
    },
  },
});
