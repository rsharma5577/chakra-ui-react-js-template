// Common TypeScript types

import { ReactNode } from 'react';

// Component prop types
export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

// Route types
export interface RouteConfig {
  path: string;
  element: ReactNode;
  protected?: boolean;
  roles?: string[];
}

// Form types
export interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

// Select option type
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

// Table column type
export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  width?: string | number;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
}

// Action result type
export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Theme types
export type ColorMode = 'light' | 'dark' | 'system';

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Generic callback types
export type VoidCallback = () => void;
export type AsyncCallback = () => Promise<void>;
