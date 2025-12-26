// LazyRoute Component
// Wraps lazy-loaded components with Suspense to show a loader while the chunk is being downloaded

import { Suspense, ComponentType, LazyExoticComponent, ReactNode } from 'react';
import { ChunkLoader } from './index';

interface LazyRouteProps {
  /**
   * The lazy-loaded component to render
   */
  component: LazyExoticComponent<ComponentType<any>>;
  /**
   * Optional custom fallback component
   * If not provided, a modern top progress bar will be shown
   */
  fallback?: ReactNode;
}

/**
 * LazyRoute Component
 *
 * Wraps a lazy-loaded component with Suspense to show a loader
 * while the JavaScript chunk is being downloaded.
 *
 * @example
 * ```tsx
 * const MyPage = lazy(() => import('./MyPage'));
 *
 * // In route configuration:
 * {
 *   path: 'my-page',
 *   element: <LazyRoute component={MyPage} />,
 * }
 * ```
 */
export const LazyRoute = ({ component: Component, fallback }: LazyRouteProps) => {
  return (
    <Suspense fallback={fallback ?? <ChunkLoader />}>
      <Component />
    </Suspense>
  );
};
