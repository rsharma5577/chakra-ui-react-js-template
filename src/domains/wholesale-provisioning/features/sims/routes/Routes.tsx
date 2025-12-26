// SIMs Feature Routes
// All routes are relative to /wholesale-provisioning/sims

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { LazyRoute } from '@/routes/utils';

// ============================================
// Lazy-loaded pages
// ============================================
// Uncomment when pages are created
const SimListPage = lazy(
  () => import('@/domains/wholesale-provisioning/features/sims/pages/SimList'),
);
const SimDetailsPage = lazy(
  () => import('@/domains/wholesale-provisioning/features/sims/pages/SimDetails'),
);

// ============================================
// SIMs routes configuration
// These are children of /wholesale-provisioning/sims
// ============================================
export const simRoutes: RouteObject[] = [
  {
    index: true,
    element: <LazyRoute component={SimListPage} />,
    handle: {
      title: 'SIMs List',
    },
  },

  {
    path: ':id',
    element: <LazyRoute component={SimDetailsPage} />,
    handle: {
      title: 'SIM Details',
    },
  },
];

export default simRoutes;
