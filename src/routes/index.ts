// Routes barrel export
// Modern router configuration with data APIs

// Router configuration
export { router } from './router';

// Route paths
export { PATHS, BUILD_PATH, paths, buildPath } from './paths';

// Layouts
export { RootLayout, DashboardLayout } from './layouts';

// Error boundaries
export { RootErrorBoundary, RouteErrorBoundary } from './errors';

// Guards
export { PermissionGuard, withPermissionGuard } from './guards';

// Hooks
export {
  // React Router hooks
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
  // Custom hooks
  useTypedParams,
  useTypedSearchParams,
  useTypedNavigate,
  useBreadcrumbs,
  useIsNavigating,
  useFormFetcher,
  useNavigationBlocker,
  useDataRevalidation,
  useTypedLoaderData,
  useTypedActionData,
  useParentLoaderData,
} from './hooks';
