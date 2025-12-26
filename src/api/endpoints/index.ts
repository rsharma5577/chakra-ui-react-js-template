// API endpoint definitions
// JSONPlaceholder API: https://jsonplaceholder.typicode.com

export const API_ENDPOINTS = {
  // User endpoints
  USERS: {
    BASE: '/users',
    BY_ID: (id: number | string) => `/users/${String(id)}`,
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    PROFILE: '/users/profile',
  },
} as const;
