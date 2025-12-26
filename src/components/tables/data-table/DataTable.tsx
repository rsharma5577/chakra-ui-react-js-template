/**
 * DataTable - TanStack Table wrapper component with server-side sorting and pagination
 * Designed to be a drop-in replacement for ResponsiveTableV2 from react-table 6.8.6
 */
import { ReactNode, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  OnChangeFn,
  RowData,
} from '@tanstack/react-table';
import { Box, Table, Flex, Text, Spinner } from '@chakra-ui/react';
import { LuChevronUp, LuChevronDown, LuCircleHelp } from 'react-icons/lu';
import { TablePagination } from './TablePagination';

// ============================================================================
// Types
// ============================================================================

export interface SortConfig {
  id: string;
  desc: boolean;
}

export interface DataTableColumn<TData extends RowData> {
  /** Column accessor key - maps to data field */
  accessor: keyof TData | string;
  /** Header display text */
  Header: string | ReactNode;
  /** Custom cell renderer */
  Cell?: (props: { row: { original: TData }; value: unknown }) => ReactNode;
  /** Column width (CSS value) */
  width?: string | number;
  /** Minimum column width */
  minWidth?: string | number;
  /** Maximum column width */
  maxWidth?: string | number;
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Custom sort key if different from accessor */
  sortKey?: string;
  /** Header tooltip text */
  headerTooltip?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<TData extends RowData> {
  /** Table data array */
  data: TData[];
  /** Column definitions */
  columns: DataTableColumn<TData>[];
  /** Loading state */
  loading?: boolean;
  /** Current page (0-indexed) */
  page: number;
  /** Rows per page */
  pageSize: number;
  /** Total number of pages */
  pages: number;
  /** Total row count */
  totalRows?: number;
  /** Current sort configuration */
  sorted: SortConfig[];
  /** Callback for data fetching - receives (pageSize, page, sorted) */
  requestData: (pageSize: number, page: number, sorted: SortConfig[]) => void;
  /** Whether to fetch data on component mount */
  fetchDataOnMount?: boolean;
  /** Empty state text */
  noDataText?: string;
  /** Custom CSS class name */
  className?: string;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Row click handler */
  onRowClick?: (row: TData, index: number) => void;
  /** Test ID prefix for automation */
  testIdPrefix?: string;
  /** Show pagination at top */
  showPaginationTop?: boolean;
  /** Show pagination at bottom */
  showPaginationBottom?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export function DataTable<TData extends RowData>({
  data,
  columns,
  loading = false,
  page,
  pageSize,
  pages,
  totalRows,
  sorted,
  requestData,
  fetchDataOnMount = true,
  noDataText = 'No results found.',
  className,
  pageSizeOptions = [10, 25, 50, 100],
  onRowClick,
  testIdPrefix = 'data-table',
  showPaginationTop = true,
  showPaginationBottom = true,
}: DataTableProps<TData>) {
  // Convert our columns to TanStack column definitions
  const tableColumns = useMemo<ColumnDef<TData>[]>(() => {
    return columns.map(col => ({
      id: String(col.accessor),
      accessorKey: col.accessor,
      header: () => (
        <Flex align='center' gap={1}>
          <Text as='span'>{col.Header}</Text>
          {col.headerTooltip && (
            <Box as='span' title={col.headerTooltip} cursor='help' color='gray.400'>
              <LuCircleHelp size={14} />
            </Box>
          )}
        </Flex>
      ),
      cell: info =>
        col.Cell
          ? col.Cell({
              row: { original: info.row.original },
              value: info.getValue(),
            })
          : (info.getValue() ?? ''),
      enableSorting: col.sortable !== false,
      size: typeof col.width === 'number' ? col.width : undefined,
      minSize: typeof col.minWidth === 'number' ? col.minWidth : undefined,
      maxSize: typeof col.maxWidth === 'number' ? col.maxWidth : undefined,
      meta: {
        sortKey: col.sortKey,
        align: col.align,
        width: col.width,
        minWidth: col.minWidth,
      },
    }));
  }, [columns]);

  // Convert sorted state to TanStack format
  const sortingState: SortingState = useMemo(() => {
    return sorted.map(s => ({
      id: s.id,
      desc: s.desc,
    }));
  }, [sorted]);

  // Handle sorting change
  const handleSortingChange: OnChangeFn<SortingState> = updater => {
    const newSorting = typeof updater === 'function' ? updater(sortingState) : updater;

    // Find the column to get sortKey if exists
    const sortedColumn = columns.find(
      col => String(col.accessor) === newSorting[0]?.id || col.sortKey === newSorting[0]?.id,
    );

    const newSorted: SortConfig[] = newSorting.map(s => ({
      id: sortedColumn?.sortKey ?? s.id,
      desc: s.desc,
    }));

    requestData(pageSize, page, newSorted);
  };

  // Initialize TanStack table
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    manualPagination: true,
    state: {
      sorting: sortingState,
    },
    onSortingChange: handleSortingChange,
    pageCount: pages,
  });

  // Fetch data on mount
  useEffect(() => {
    if (fetchDataOnMount) {
      requestData(pageSize, page, sorted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pages) {
      requestData(pageSize, newPage, sorted);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    requestData(newPageSize, 0, sorted);
  };

  // Calculate display total
  const displayTotal = totalRows ?? data.length;

  return (
    <Box
      className={className}
      data-testid={testIdPrefix}
      borderWidth='1px'
      borderColor='gray.200'
      borderRadius='md'
      overflow='hidden'
      bg='white'
    >
      {/* Top pagination */}
      {showPaginationTop && (
        <TablePagination
          page={page}
          pageSize={pageSize}
          pages={pages}
          totalRows={displayTotal}
          loading={loading}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={pageSizeOptions}
          testIdPrefix={`${testIdPrefix}-pagination-top`}
        />
      )}

      {/* Table */}
      <Box overflowX='auto' position='relative'>
        {/* Loading overlay */}
        {loading && (
          <Flex
            position='absolute'
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg='whiteAlpha.700'
            zIndex={10}
            justify='center'
            align='center'
          >
            <Spinner size='lg' color='brand.500' />
          </Flex>
        )}

        <Table.Root size='sm' variant='line' interactive={!!onRowClick}>
          <Table.Header>
            {table.getHeaderGroups().map(headerGroup => (
              <Table.Row key={headerGroup.id} bg='gray.50'>
                {headerGroup.headers.map(header => {
                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();
                  const meta = header.column.columnDef.meta as
                    | {
                        align?: string;
                        width?: string | number;
                        minWidth?: string | number;
                      }
                    | undefined;

                  return (
                    <Table.ColumnHeader
                      key={header.id}
                      cursor={canSort ? 'pointer' : 'default'}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      _hover={canSort ? { bg: 'gray.100' } : undefined}
                      userSelect='none'
                      textAlign={meta?.align as 'left' | 'center' | 'right' | undefined}
                      width={meta?.width}
                      minW={meta?.minWidth}
                      fontWeight='semibold'
                      color='gray.700'
                      textTransform='none'
                      fontSize='sm'
                      py={3}
                    >
                      <Flex
                        align='center'
                        gap={1}
                        justify={
                          meta?.align === 'right'
                            ? 'flex-end'
                            : meta?.align === 'center'
                              ? 'center'
                              : 'flex-start'
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          <Box color={sortDirection !== false ? 'brand.500' : 'gray.400'}>
                            {sortDirection === 'asc' ? (
                              <LuChevronUp size={16} />
                            ) : sortDirection === 'desc' ? (
                              <LuChevronDown size={16} />
                            ) : (
                              <Flex direction='column' gap={0} opacity={0.5}>
                                <LuChevronUp size={12} style={{ marginBottom: -4 }} />
                                <LuChevronDown size={12} />
                              </Flex>
                            )}
                          </Box>
                        )}
                      </Flex>
                    </Table.ColumnHeader>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Header>

          <Table.Body>
            {data.length === 0 && !loading ? (
              <Table.Row>
                <Table.Cell colSpan={columns.length} textAlign='center' py={10} color='gray.500'>
                  <Text data-testid={`${testIdPrefix}-no-data`}>{noDataText}</Text>
                </Table.Cell>
              </Table.Row>
            ) : (
              table.getRowModel().rows.map((row, index) => {
                const meta = columns.map(
                  col =>
                    ({
                      align: col.align,
                    }) as { align?: string },
                );

                return (
                  <Table.Row
                    key={row.id}
                    cursor={onRowClick ? 'pointer' : 'default'}
                    onClick={() => onRowClick?.(row.original, index)}
                    _hover={onRowClick ? { bg: 'gray.50' } : undefined}
                    data-testid={`${testIdPrefix}-row-${String(index)}`}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <Table.Cell
                        key={cell.id}
                        textAlign={
                          meta[cellIndex]?.align as 'left' | 'center' | 'right' | undefined
                        }
                        py={2}
                        fontSize='sm'
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Bottom pagination */}
      {showPaginationBottom && (
        <TablePagination
          page={page}
          pageSize={pageSize}
          pages={pages}
          totalRows={displayTotal}
          loading={loading}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={pageSizeOptions}
          testIdPrefix={`${testIdPrefix}-pagination-bottom`}
        />
      )}
    </Box>
  );
}

export default DataTable;
