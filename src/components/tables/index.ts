// Core DataTable
export { DataTable } from './data-table';
export type { DataTableProps, DataTableColumn, SortConfig } from './data-table';

// Server-side DataTable wrapper (easier to use)
export { ServerDataTable, useServerDataTable } from './data-table';
export type {
  ServerDataTableProps,
  TableColumn,
  FetchDataParams,
  FetchDataResponse,
  UseServerDataTableOptions,
} from './data-table';

// Pagination component
export { TablePagination } from './data-table';
export type { TablePaginationProps } from './data-table';
