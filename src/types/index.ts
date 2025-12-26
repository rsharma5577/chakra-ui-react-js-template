// Barrel export for all types
export * from './api.types';
export * from './user.types';
export * from './common.types';
export * from './jsonplaceholder.types';

// Re-export commonly used types for convenience
export type { User, UpdateProfileData } from './user.types';
export type { ApiResponse, PaginatedResponse, ApiError, PaginationParams } from './api.types';
export type { BaseComponentProps, RouteConfig, SelectOption, TableColumn } from './common.types';
