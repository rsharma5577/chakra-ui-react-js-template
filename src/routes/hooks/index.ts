// Advanced Routing Hooks
/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import {
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
  useMatches,
  useNavigation,
  useLoaderData,
  useActionData,
  useRouteLoaderData,
  useRouteError,
  useRevalidator,
  useFetcher,
  useBlocker,
} from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { paths } from '../paths';

// Re-export hooks for convenience
export {
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
  useMatches,
  useNavigation,
  useLoaderData,
  useActionData,
  useRouteLoaderData,
  useRouteError,
  useRevalidator,
  useFetcher,
  useBlocker,
};

// ============================================
// Custom Advanced Hooks
// ============================================

/**
 * Type-safe params hook with validation
 */
export function useTypedParams<T extends Record<string, string>>(): T {
  const params = useParams();
  return params as T;
}

/**
 * Enhanced search params with typed getters/setters
 */
export function useTypedSearchParams<T extends Record<string, string>>() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = useCallback(
    (key: keyof T): string | null => searchParams.get(key as string),
    [searchParams],
  );

  const setParam = useCallback(
    (key: keyof T, value: string | null) => {
      setSearchParams(prev => {
        if (value === null) {
          prev.delete(key as string);
        } else {
          prev.set(key as string, value);
        }
        return prev;
      });
    },
    [setSearchParams],
  );

  const getAllParams = useCallback((): Partial<T> => {
    const result: Partial<T> = {};
    searchParams.forEach((value, key) => {
      (result as Record<string, string>)[key] = value;
    });
    return result;
  }, [searchParams]);

  return {
    searchParams,
    setSearchParams,
    getParam,
    setParam,
    getAllParams,
  };
}

/**
 * Navigation with type-safe paths
 */
export function useTypedNavigate() {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      // Direct navigation methods
      toHome: () => navigate(paths.HOME),
      toDashboard: () => navigate(paths.DASHBOARD),
      toProfile: () => navigate(paths.PROFILE),
      toSettings: () => navigate(paths.SETTINGS),

      // Generic navigation
      to: (path: string, options?: { replace?: boolean; state?: unknown }) =>
        navigate(path, options),
      back: () => navigate(-1),
      forward: () => navigate(1),
      replace: (path: string) => navigate(path, { replace: true }),
    }),
    [navigate],
  );
}

/**
 * Get current route breadcrumbs
 */
interface RouteHandle {
  breadcrumb?: string;
  title?: string;
}

interface Breadcrumb {
  path: string;
  label: string;
}

export function useBreadcrumbs(): Breadcrumb[] {
  const matches = useMatches();

  return useMemo(() => {
    return matches
      .filter(match => (match.handle as RouteHandle).breadcrumb)
      .map(match => ({
        path: match.pathname,
        label: (match.handle as RouteHandle).breadcrumb ?? '',
      }));
  }, [matches]);
}

/**
 * Check if currently navigating/loading
 */
export function useIsNavigating() {
  const navigation = useNavigation();
  return {
    isNavigating: navigation.state !== 'idle',
    isLoading: navigation.state === 'loading',
    isSubmitting: navigation.state === 'submitting',
    formMethod: navigation.formMethod,
    formAction: navigation.formAction,
    location: navigation.location,
  };
}

/**
 * Form data fetcher with typed responses
 */
export function useFormFetcher<TData = unknown, TFormData = FormData>() {
  const fetcher = useFetcher<TData>();

  const submit = useCallback(
    (data: TFormData, action: string, method: 'get' | 'post' = 'post') => {
      void fetcher.submit(data as FormData, { action, method });
    },
    [fetcher],
  );

  return {
    ...fetcher,
    submit,
    isLoading: fetcher.state === 'loading',
    isSubmitting: fetcher.state === 'submitting',
    isIdle: fetcher.state === 'idle',
  };
}

/**
 * Block navigation with unsaved changes
 */
export function useNavigationBlocker(
  shouldBlock: boolean,
  message = 'You have unsaved changes. Are you sure you want to leave?',
) {
  const blocker = useBlocker(shouldBlock);

  // Show confirmation dialog when blocked
  const confirm = useCallback(() => {
    if (blocker.state === 'blocked') {
      if (window.confirm(message)) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);

  return {
    blocker,
    isBlocked: blocker.state === 'blocked',
    confirm,
    proceed: blocker.proceed,
    reset: blocker.reset,
  };
}

/**
 * Revalidate data after mutations
 */
export function useDataRevalidation() {
  const revalidator = useRevalidator();

  return {
    revalidate: revalidator.revalidate,
    isRevalidating: revalidator.state === 'loading',
  };
}

/**
 * Get route-specific loader data with type safety
 */
export function useTypedLoaderData<T>(): T {
  return useLoaderData() as T;
}

/**
 * Get route-specific action data with type safety
 */
export function useTypedActionData<T>(): T | undefined {
  return useActionData() as T | undefined;
}

/**
 * Get loader data from a parent route
 */
export function useParentLoaderData<T>(routeId: string): T | undefined {
  return useRouteLoaderData(routeId) as T | undefined;
}
