// Core DataTable
export { DataTable, default } from './DataTable';
export type { DataTableProps, DataTableColumn, SortConfig } from './DataTable';

// Server-side DataTable wrapper (easier to use)
export { ServerDataTable, useServerDataTable } from './ServerDataTable';
export type {
  ServerDataTableProps,
  TableColumn,
  FetchDataParams,
  FetchDataResponse,
  UseServerDataTableOptions,
} from './ServerDataTable';

// Pagination component
export { TablePagination } from './TablePagination';
export type { TablePaginationProps } from './TablePagination';
