// Application constants

// API Base URLs
const rawApiBaseUrl =
  typeof import.meta.env.VITE_API_BASE_URL === 'string'
    ? import.meta.env.VITE_API_BASE_URL
    : undefined;

export const API_BASE_URL =
  rawApiBaseUrl && rawApiBaseUrl.length > 0
    ? rawApiBaseUrl
    : 'https://jsonplaceholder.typicode.com';

// JSONPlaceholder specific endpoints
export const JSON_PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

// Timeouts (in milliseconds)
export const API_TIMEOUT = 30000;
