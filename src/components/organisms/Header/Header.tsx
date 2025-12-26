// Organism: Header - Main navigation header
import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Button, Heading, Link } from '@/components/atoms';
import { Avatar, SearchBar } from '@/components/molecules';

export interface HeaderProps {
  logo?: ReactNode;
  title?: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  user?: {
    name: string;
    avatar?: string;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  actions?: ReactNode;
}

export const Header = ({
  logo,
  title = 'App',
  showSearch = false,
  onSearch,
  user,
  onLogin,
  onLogout,
  actions,
}: HeaderProps) => {
  return (
    <Box
      as='header'
      position='sticky'
      top={0}
      zIndex={100}
      bg='white'
      _dark={{ bg: 'gray.800' }}
      borderBottom='1px solid'
      borderColor='gray.200'
      px={4}
      py={3}
    >
      <Flex align='center' justify='space-between' maxW='1400px' mx='auto'>
        {/* Logo / Title */}
        <Flex align='center' gap={3}>
          {logo ?? (
            <Link href='/' _hover={{ textDecoration: 'none' }}>
              <Heading level={4} color='brand.500'>
                {title}
              </Heading>
            </Link>
          )}
        </Flex>

        {/* Search */}
        {showSearch && onSearch && (
          <Box flex={1} maxW='500px' mx={8} display={{ base: 'none', md: 'block' }}>
            <SearchBar placeholder='Search...' onSearch={onSearch} size='sm' />
          </Box>
        )}

        {/* Actions */}
        <Flex align='center' gap={4}>
          {actions}

          {user ? (
            <Flex align='center' gap={3}>
              <Avatar name={user.name} src={user.avatar} size='sm' showName />
              {onLogout && (
                <Button variant='ghost' size='sm' onClick={onLogout}>
                  Logout
                </Button>
              )}
            </Flex>
          ) : (
            onLogin && (
              <Button colorPalette='brand' size='sm' onClick={onLogin}>
                Login
              </Button>
            )
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
