// Mock Permissions Configuration
// Used for development and testing purposes

/**
 * Mock user permissions for development
 * Add or remove permissions here to test different access levels
 */
export const MOCK_PERMISSIONS: string[] = [
  'viewWholesaleProvisioning',
  // Add more mock permissions as needed:
  // "editWholesaleProvisioning",
  // "deleteWholesaleProvisioning",
  // "viewInventories",
  // "editInventories",
];

/**
 * Check if mock permissions should be used
 * Enable in development mode or when explicitly configured
 */
export const USE_MOCK_PERMISSIONS =
  import.meta.env.DEV || import.meta.env.VITE_USE_MOCK_PERMISSIONS === 'true';
