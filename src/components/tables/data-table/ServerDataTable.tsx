/**
 * ServerDataTable - Easy-to-use wrapper for DataTable with built-in state management
 * Handles pagination, sorting, and data fetching automatically
 */
import { useState, useCallback, useEffect, ReactNode } from 'react';
import { RowData } from '@tanstack/react-table';
import { DataTable, DataTableColumn, SortConfig } from './DataTable';

// ============================================================================
// Types
// ============================================================================

/** Response shape expected from the fetch function */
export interface FetchDataResponse<TData> {
  /** Array of data items for the current page */
  data: TData[];
  /** Total number of rows across all pages */
  totalRows: number;
  /** Total number of pages (optional - will be calculated if not provided) */
  totalPages?: number;
}

/** Parameters passed to the fetch function */
export interface FetchDataParams {
  /** Current page index (0-based) */
  page: number;
  /** Number of rows per page */
  pageSize: number;
  /** Current sort configuration */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
}

/** Column definition - simplified version */
export interface TableColumn<TData extends RowData> {
  /** Unique key for the column - maps to data field */
  key: keyof TData | string;
  /** Column header text */
  header: string | ReactNode;
  /** Custom cell renderer */
  render?: (row: TData, value: unknown) => ReactNode;
  /** Enable sorting (default: true) */
  sortable?: boolean;
  /** Custom sort key if different from key */
  sortKey?: string;
  /** Column width */
  width?: string | number;
  /** Minimum column width */
  minWidth?: string | number;
  /** Header tooltip */
  tooltip?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

export interface ServerDataTableProps<TData extends RowData> {
  /** Column definitions */
  columns: TableColumn<TData>[];
  /**
   * Async function to fetch data
   * Receives pagination and sort params, returns data and total count
   */
  fetchData: (params: FetchDataParams) => Promise<FetchDataResponse<TData>>;
  /** Initial page size (default: 10) */
  defaultPageSize?: number;
  /** Initial sort column */
  defaultSortBy?: string;
  /** Initial sort direction (default: "desc") */
  defaultSortOrder?: 'asc' | 'desc';
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Empty state message */
  emptyMessage?: string;
  /** Row click handler */
  onRowClick?: (row: TData, index: number) => void;
  /** Whether to fetch data on mount (default: true) */
  fetchOnMount?: boolean;
  /** Dependency array - refetch when these values change */
  refetchDeps?: unknown[];
  /** Test ID prefix */
  testIdPrefix?: string;
  /** Additional class name */
  className?: string;
  /** Show pagination at top */
  showPaginationTop?: boolean;
  /** Show pagination at bottom */
  showPaginationBottom?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export function ServerDataTable<TData extends RowData>({
  columns,
  fetchData,
  defaultPageSize = 10,
  defaultSortBy,
  defaultSortOrder = 'desc',
  pageSizeOptions = [10, 25, 50, 100],
  emptyMessage = 'No results found.',
  onRowClick,
  fetchOnMount = true,
  refetchDeps = [],
  testIdPrefix = 'server-data-table',
  className,
  showPaginationTop = true,
  showPaginationBottom = true,
}: ServerDataTableProps<TData>) {
  // Internal state
  const [data, setData] = useState<TData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sorted, setSorted] = useState<SortConfig[]>(
    defaultSortBy ? [{ id: defaultSortBy, desc: defaultSortOrder === 'desc' }] : [],
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Convert simplified columns to DataTable format
  const tableColumns: DataTableColumn<TData>[] = columns.map(col => ({
    accessor: col.key,
    Header: col.header,
    Cell: col.render ? ({ row, value }) => col.render?.(row.original, value) : undefined,
    sortable: col.sortable !== false,
    sortKey: col.sortKey,
    width: col.width,
    minWidth: col.minWidth,
    headerTooltip: col.tooltip,
    align: col.align,
  }));

  // Fetch data handler
  const handleFetchData = useCallback(
    async (newPageSize: number, newPage: number, newSorted: SortConfig[]) => {
      setLoading(true);
      setPageSize(newPageSize);
      setPage(newPage);
      setSorted(newSorted);

      try {
        const sortConfig = newSorted[0];
        const result = await fetchData({
          page: newPage,
          pageSize: newPageSize,
          sortBy: sortConfig.id,
          sortOrder: sortConfig.desc ? 'desc' : 'asc',
        });

        setData(result.data);
        setTotalRows(result.totalRows);
        setTotalPages(result.totalPages ?? Math.ceil(result.totalRows / newPageSize));
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setData([]);
        setTotalRows(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    },
    [fetchData],
  );

  // Initial fetch and refetch on dependency changes
  useEffect(() => {
    if (fetchOnMount || isInitialized) {
      void handleFetchData(pageSize, 0, sorted);
    }
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refetchDeps);

  return (
    <DataTable
      data={data}
      columns={tableColumns}
      loading={loading}
      page={page}
      pageSize={pageSize}
      pages={totalPages}
      totalRows={totalRows}
      sorted={sorted}
      requestData={(pageSize, page, sorted) => void handleFetchData(pageSize, page, sorted)}
      fetchDataOnMount={false} // We handle this ourselves
      noDataText={emptyMessage}
      pageSizeOptions={pageSizeOptions}
      onRowClick={onRowClick}
      testIdPrefix={testIdPrefix}
      className={className}
      showPaginationTop={showPaginationTop}
      showPaginationBottom={showPaginationBottom}
    />
  );
}

// ============================================================================
// Hook for external control (optional)
// ============================================================================

export interface UseServerDataTableOptions<TData> {
  fetchData: (params: FetchDataParams) => Promise<FetchDataResponse<TData>>;
  defaultPageSize?: number;
  defaultSortBy?: string;
  defaultSortOrder?: 'asc' | 'desc';
}

// eslint-disable-next-line
export function useServerDataTable<TData>({
  fetchData,
  defaultPageSize = 10,
  defaultSortBy,
  defaultSortOrder = 'desc',
}: UseServerDataTableOptions<TData>) {
  const [data, setData] = useState<TData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sorted, setSorted] = useState<SortConfig[]>(
    defaultSortBy ? [{ id: defaultSortBy, desc: defaultSortOrder === 'desc' }] : [],
  );

  const requestData = useCallback(
    async (newPageSize: number, newPage: number, newSorted: SortConfig[]) => {
      setLoading(true);
      setPageSize(newPageSize);
      setPage(newPage);
      setSorted(newSorted);

      try {
        const sortConfig = newSorted[0];
        const result = await fetchData({
          page: newPage,
          pageSize: newPageSize,
          sortBy: sortConfig.id,
          sortOrder: sortConfig.desc ? 'desc' : 'asc',
        });

        setData(result.data);
        setTotalRows(result.totalRows);
        setTotalPages(result.totalPages ?? Math.ceil(result.totalRows / newPageSize));
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [fetchData],
  );

  const refetch = useCallback(() => {
    void requestData(pageSize, page, sorted);
  }, [requestData, pageSize, page, sorted]);

  return {
    // Data
    data,
    loading,
    page,
    pageSize,
    totalRows,
    totalPages,
    sorted,
    // Actions
    requestData,
    refetch,
    // For DataTable props spread
    tableProps: {
      data,
      loading,
      page,
      pageSize,
      pages: totalPages,
      totalRows,
      sorted,
      requestData,
      fetchDataOnMount: false,
    },
  };
}

export default ServerDataTable;
