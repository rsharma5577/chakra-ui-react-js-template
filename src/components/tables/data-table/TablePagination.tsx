/**
 * TablePagination - Reusable pagination component for tables
 * Provides page navigation, page size selection, and row count display
 */
import { memo, useCallback } from 'react';
import { Flex, Text, NativeSelect, Input, IconButton, HStack } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from 'react-icons/lu';

// ============================================================================
// Types
// ============================================================================

export interface TablePaginationProps {
  /** Current page index (0-based) */
  page: number;
  /** Number of rows per page */
  pageSize: number;
  /** Total number of pages */
  pages: number;
  /** Total number of rows */
  totalRows: number;
  /** Whether data is currently loading */
  loading?: boolean;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange: (pageSize: number) => void;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Whether to show page size selector */
  showPageSizeOptions?: boolean;
  /** Whether to show page jump input */
  showPageJump?: boolean;
  /** Whether to show first/last page buttons */
  showFirstLastButtons?: boolean;
  /** Test ID prefix for automation */
  testIdPrefix?: string;
  /** Custom class name */
  className?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

const getSafePage = (newPage: number, currentPage: number, totalPages: number): number => {
  if (isNaN(newPage)) {
    return currentPage;
  }
  return Math.min(Math.max(newPage, 0), Math.max(totalPages - 1, 0));
};

const formatRowRange = (from: number, to: number, total: number): string => {
  if (total === 0) {
    return '0';
  }
  return `${from.toLocaleString()}-${to.toLocaleString()} rows`;
};

// ============================================================================
// Component
// ============================================================================

function TablePaginationComponent({
  page,
  pageSize,
  pages,
  totalRows,
  loading = false,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  showPageSizeOptions = true,
  showPageJump = true,
  showFirstLastButtons = true,
  testIdPrefix = 'table-pagination',
  className,
}: TablePaginationProps) {
  // Calculate display values
  const fromRows = totalRows === 0 ? 0 : page * pageSize + 1;
  const toRows = Math.min((page + 1) * pageSize, totalRows);
  const rowRangeText = formatRowRange(fromRows, toRows, totalRows);

  // Navigation state
  const canPrevious = page > 0;
  const canNext = page < pages - 1;

  // Handle page change with validation
  const handlePageChange = useCallback(
    (newPage: number) => {
      const safePage = getSafePage(newPage, page, pages);
      if (safePage !== page) {
        onPageChange(safePage);
      }
    },
    [page, pages, onPageChange],
  );

  // Handle page size change
  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      onPageSizeChange(newPageSize);
    },
    [onPageSizeChange],
  );

  // Handle page input change
  const handlePageInputChange = useCallback(
    (value: string) => {
      const pageNum = parseInt(value, 10);
      if (!isNaN(pageNum)) {
        handlePageChange(pageNum - 1); // Convert to 0-based index
      }
    },
    [handlePageChange],
  );

  // Handle page input submit (blur/enter)
  const handlePageInputSubmit = useCallback(
    (value: string) => {
      const pageNum = parseInt(value, 10);
      if (!isNaN(pageNum)) {
        handlePageChange(pageNum - 1);
      }
    },
    [handlePageChange],
  );

  // Navigation handlers
  const handleFirstPage = useCallback(() => {
    handlePageChange(0);
  }, [handlePageChange]);
  const handlePreviousPage = useCallback(() => {
    handlePageChange(page - 1);
  }, [handlePageChange, page]);
  const handleNextPage = useCallback(() => {
    handlePageChange(page + 1);
  }, [handlePageChange, page]);
  const handleLastPage = useCallback(() => {
    handlePageChange(pages - 1);
  }, [handlePageChange, pages]);

  return (
    <Flex
      className={className}
      justify='space-between'
      align='center'
      py={2}
      px={1}
      flexWrap='wrap'
      gap={2}
    >
      {/* Row count display */}
      <Text
        fontSize='sm'
        color='gray.600'
        minW='180px'
        data-testid={`${testIdPrefix}-total-records`}
      >
        Viewing {rowRangeText} of {totalRows.toLocaleString()} results
      </Text>

      {/* Right side controls */}
      <Flex align='center' gap={4} flexWrap='wrap'>
        {/* Rows per page selector */}
        {showPageSizeOptions && (
          <Flex align='center' gap={2}>
            <Text fontSize='sm' color='gray.600' whiteSpace='nowrap'>
              Rows per page
            </Text>
            <NativeSelect.Root size='sm' width='70px'>
              <NativeSelect.Field
                value={pageSize}
                onChange={e => {
                  handlePageSizeChange(Number(e.target.value));
                }}
                data-testid={`${testIdPrefix}-page-size`}
              >
                {pageSizeOptions.map(size => (
                  <option
                    key={size}
                    value={size}
                    data-testid={`${testIdPrefix}-page-size-option-${String(size)}`}
                  >
                    {size}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Flex>
        )}

        {/* Page navigation */}
        <Flex align='center' gap={2}>
          <Text fontSize='sm' color='gray.600'>
            Page
          </Text>

          {showPageJump ? (
            <>
              <Input
                size='sm'
                width='60px'
                textAlign='center'
                type='number'
                min={1}
                max={pages}
                value={page + 1}
                onChange={e => {
                  handlePageInputChange(e.target.value);
                }}
                onBlur={e => {
                  handlePageInputSubmit(e.target.value);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handlePageInputSubmit((e.target as HTMLInputElement).value);
                  }
                }}
                data-testid={`${testIdPrefix}-page-input`}
              />
              <Text fontSize='sm' color='gray.600'>
                of {pages}
              </Text>
            </>
          ) : (
            <Text fontSize='sm' color='gray.600'>
              {page + 1} of {pages}
            </Text>
          )}

          {/* Navigation buttons */}
          <HStack gap={0}>
            {showFirstLastButtons && (
              <IconButton
                aria-label='First page'
                size='sm'
                variant='ghost'
                onClick={handleFirstPage}
                disabled={!canPrevious || loading}
                data-testid={`${testIdPrefix}-first-page`}
              >
                <LuChevronsLeft />
              </IconButton>
            )}
            <IconButton
              aria-label='Previous page'
              size='sm'
              variant='ghost'
              onClick={handlePreviousPage}
              disabled={!canPrevious || loading}
              data-testid={`${testIdPrefix}-prev-page`}
            >
              <LuChevronLeft />
            </IconButton>
            <IconButton
              aria-label='Next page'
              size='sm'
              variant='ghost'
              onClick={handleNextPage}
              disabled={!canNext || loading}
              data-testid={`${testIdPrefix}-next-page`}
            >
              <LuChevronRight />
            </IconButton>
            {showFirstLastButtons && (
              <IconButton
                aria-label='Last page'
                size='sm'
                variant='ghost'
                onClick={handleLastPage}
                disabled={!canNext || loading}
                data-testid={`${testIdPrefix}-last-page`}
              >
                <LuChevronsRight />
              </IconButton>
            )}
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const TablePagination = memo(TablePaginationComponent);

export default TablePagination;
