// Organism: DataTable - Data table with sorting and pagination
import { Box, Table, Flex } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { Button, Text, Spinner } from '@/components/atoms';

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (row: T, index: number) => ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick,
  pagination,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const sortedData = sortColumn
    ? [...data].sort((a, b) => {
        const aVal = a[sortColumn] as number;
        const bVal = b[sortColumn] as number;
        if (aVal < bVal) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      })
    : data;

  if (isLoading) {
    return (
      <Flex justify='center' align='center' py={10}>
        <Spinner size='lg' />
      </Flex>
    );
  }

  return (
    <Box overflowX='auto'>
      <Table.Root size='sm'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeader
                key={String(column.key)}
                w={column.width}
                cursor={column.sortable ? 'pointer' : 'default'}
                onClick={() => {
                  if (column.sortable) {
                    handleSort(String(column.key));
                  }
                }}
                _hover={column.sortable ? { bg: 'gray.50' } : undefined}
              >
                <Flex align='center' gap={1}>
                  {column.header}
                  {column.sortable && sortColumn === column.key && (
                    <Text fontSize='xs'>{sortDirection === 'asc' ? '↑' : '↓'}</Text>
                  )}
                </Flex>
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedData.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={columns.length} textAlign='center' py={8}>
                <Text color='gray.500'>{emptyMessage}</Text>
              </Table.Cell>
            </Table.Row>
          ) : (
            sortedData.map((row, index) => (
              <Table.Row
                key={Math.random().toString()}
                cursor={onRowClick ? 'pointer' : 'default'}
                onClick={() => onRowClick?.(row, index)}
                _hover={onRowClick ? { bg: 'gray.50' } : undefined}
              >
                {columns.map(column => (
                  <Table.Cell key={String(column.key)}>
                    {column.render
                      ? column.render(row, index)
                      : String(row[column.key as keyof T] ?? '')}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Flex justify='space-between' align='center' mt={4} px={2}>
          <Text variant='caption'>
            Page {pagination.currentPage} of {pagination.totalPages}
          </Text>
          <Flex gap={2}>
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                pagination.onPageChange(pagination.currentPage - 1);
              }}
              disabled={pagination.currentPage === 1}
            >
              Previous
            </Button>
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                pagination.onPageChange(pagination.currentPage + 1);
              }}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
