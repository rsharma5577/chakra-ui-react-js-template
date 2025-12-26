// Inventory Feature Routes
// All routes are relative to /wholesale-provisioning/inventories

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { LazyRoute } from '@/routes/utils';

// ============================================
// Lazy-loaded pages
// ============================================
const InventoriesListPage = lazy(
  () => import('@/domains/wholesale-provisioning/features/inventories/pages/InventoriesList'),
);
const InventoryCreatePage = lazy(
  () => import('@/domains/wholesale-provisioning/features/inventories/pages/InventoryCreate'),
);
const InventoryDetailPage = lazy(
  () => import('@/domains/wholesale-provisioning/features/inventories/pages/InventoryDetail'),
);

// ============================================
// Inventories routes configuration
// These are children of /wholesale-provisioning/inventories
// ============================================
export const inventoryRoutes: RouteObject[] = [
  {
    index: true,
    element: <LazyRoute component={InventoriesListPage} />,
    handle: {
      title: 'Inventories List',
    },
  },
  {
    path: 'create',
    element: <LazyRoute component={InventoryCreatePage} />,
    handle: {
      title: 'Create Inventory',
    },
  },
  {
    path: ':id',
    element: <LazyRoute component={InventoryDetailPage} />,
    handle: {
      title: 'Inventory Details',
    },
  },
];

export default inventoryRoutes;
