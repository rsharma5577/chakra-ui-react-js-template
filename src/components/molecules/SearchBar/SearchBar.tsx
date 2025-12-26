// Molecule: SearchBar - Input with search icon and clear button
import { Box, Flex, InputGroup } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { Input, Button, Icon } from '@/components/atoms';

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  defaultValue?: string;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Simple search icon SVG
const SearchIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='11' cy='11' r='8' />
    <path d='m21 21-4.35-4.35' />
  </svg>
);

// Simple X icon SVG
const CloseIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M18 6 6 18M6 6l12 12' />
  </svg>
);

export const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  onClear,
  defaultValue = '',
  isLoading = false,
  size = 'md',
}: SearchBarProps) => {
  const [query, setQuery] = useState(defaultValue);

  const handleSearch = useCallback(() => {
    onSearch(query);
  }, [query, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    onClear?.();
    onSearch('');
  }, [onClear, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const sizeStyles = {
    sm: { h: '8', fontSize: 'sm' },
    md: { h: '10', fontSize: 'md' },
    lg: { h: '12', fontSize: 'lg' },
  };

  return (
    <Flex gap={2} w='100%'>
      <InputGroup flex={1}>
        <Box position='relative' w='100%'>
          <Box
            position='absolute'
            left={3}
            top='50%'
            transform='translateY(-50%)'
            color='gray.400'
            zIndex={1}
          >
            <Icon size='sm'>
              <SearchIcon />
            </Icon>
          </Box>
          <Input
            pl={10}
            pr={query ? 10 : 4}
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            {...sizeStyles[size]}
          />
          {query && (
            <Box
              position='absolute'
              right={3}
              top='50%'
              transform='translateY(-50%)'
              cursor='pointer'
              color='gray.400'
              _hover={{ color: 'gray.600' }}
              onClick={handleClear}
            >
              <Icon size='sm'>
                <CloseIcon />
              </Icon>
            </Box>
          )}
        </Box>
      </InputGroup>
      <Button
        onClick={handleSearch}
        isLoading={isLoading}
        colorPalette='brand'
        {...sizeStyles[size]}
      >
        Search
      </Button>
    </Flex>
  );
};
