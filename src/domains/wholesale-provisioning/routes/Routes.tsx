// Wholesale Provisioning Domain Routes
// All routes are relative to /wholesale-provisioning

import { RouteObject, redirect } from 'react-router-dom';

// Import paths from central config
import { PATHS, BUILD_PATH } from '@/routes/paths';

// Import feature routes
import { inventoryRoutes } from '@/domains/wholesale-provisioning/features/inventories/routes/Routes';
import { simRoutes } from '@/domains/wholesale-provisioning/features/sims/routes/Routes';

// Re-export for convenience
export const WHOLESALE_PROVISIONING_PATHS = PATHS.WHOLESALE_PROVISIONING;
export const BUILD_WHOLESALE_PATH = {
  INVENTORY_DETAIL: BUILD_PATH.INVENTORY_DETAIL,
  INVENTORY_EDIT: BUILD_PATH.INVENTORY_EDIT,
  SIM_DETAIL: BUILD_PATH.SIM_DETAIL,
  SIM_EDIT: BUILD_PATH.SIM_EDIT,
};

// ============================================
// Sub-routes configuration
// These are children of /wholesale-provisioning
// ============================================
export const wholesaleProvisioningRoutes: RouteObject[] = [
  // Index - redirect to inventories
  {
    index: true,
    loader: () => redirect('inventories'),
  },

  // ----------------------------------------
  // Inventories routes
  // ----------------------------------------
  {
    path: 'inventories',
    handle: {
      title: 'Inventories',
      breadcrumb: 'Inventories',
    },
    children: inventoryRoutes,
  },

  // ----------------------------------------
  // SIMs routes (uncomment when pages exist)
  // ----------------------------------------
  {
    path: 'sims',
    handle: {
      title: 'SIMs',
      breadcrumb: 'SIMs',
    },
    children: simRoutes,
  },
];

export default wholesaleProvisioningRoutes;
