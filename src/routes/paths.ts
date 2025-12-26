// Route paths configuration
// Single source of truth for all route paths

export const PATHS = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',

  // Auth routes
  AUTH: {
    CALLBACK: '/callback',
    UNAUTHORIZED: '/unauthorized',
  },

  // Protected routes (requires authentication)
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // Wholesale Provisioning routes
  WHOLESALE_PROVISIONING: {
    ROOT: '/wholesale-provisioning',
    // Inventories
    INVENTORIES: {
      LIST: '/wholesale-provisioning/inventories',
      CREATE: '/wholesale-provisioning/inventories/create',
      DETAIL: '/wholesale-provisioning/inventories/:id',
      EDIT: '/wholesale-provisioning/inventories/:id/edit',
    },
    // SIMs
    SIMS: {
      LIST: '/wholesale-provisioning/sims',
      CREATE: '/wholesale-provisioning/sims/create',
      DETAIL: '/wholesale-provisioning/sims/:id',
      EDIT: '/wholesale-provisioning/sims/:id/edit',
    },
    // Whitelists
    WHITELISTS: {
      LIST: '/wholesale-provisioning/whitelists',
      CREATE: '/wholesale-provisioning/whitelists/create',
      DETAIL: '/wholesale-provisioning/whitelists/:id',
      EDIT: '/wholesale-provisioning/whitelists/:id/edit',
    },
  },

  // Error routes
  NOT_FOUND: '*',
} as const;

// Helper to build parameterized routes
export const BUILD_PATH = {
  // Wholesale Provisioning
  INVENTORY_DETAIL: (id: string) => `/wholesale-provisioning/inventories/${id}`,
  INVENTORY_EDIT: (id: string) => `/wholesale-provisioning/inventories/${id}/edit`,
  SIM_DETAIL: (id: string) => `/wholesale-provisioning/sims/${id}`,
  SIM_EDIT: (id: string) => `/wholesale-provisioning/sims/${id}/edit`,
  WHITELIST_DETAIL: (id: string) => `/wholesale-provisioning/whitelists/${id}`,
  WHITELIST_EDIT: (id: string) => `/wholesale-provisioning/whitelists/${id}/edit`,
};

// Legacy exports for backward compatibility (deprecated)
export const paths = PATHS;
export const buildPath = BUILD_PATH;
