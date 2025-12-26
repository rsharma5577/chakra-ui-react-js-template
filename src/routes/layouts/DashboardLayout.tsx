// Dashboard Layout - Layout for authenticated dashboard pages
import { Suspense, useState } from 'react';
import {
  Outlet,
  useNavigation,
  useMatches,
  NavLink,
  Link as RouterLink,
  useLocation,
  Link,
} from 'react-router-dom';
import { Box, Flex, VStack, HStack } from '@chakra-ui/react';
import { Button, Heading, Text, Spinner, Avatar } from '@/components';
import { useAuth, LogoutButton } from '@/auth';
import { PATHS } from '../paths';

// Route handle type
interface RouteHandle {
  title?: string;
  breadcrumb?: string;
}

// Navigation items
const navItems = [
  { label: 'Dashboard', path: PATHS.DASHBOARD, icon: '📊' },
  { label: 'Profile', path: PATHS.PROFILE, icon: '👤' },
  { label: 'Settings', path: PATHS.SETTINGS, icon: '⚙️' },
];

// Domain navigation items
const domainNavItems = [
  {
    label: 'Wholesale Provisioning',
    path: PATHS.WHOLESALE_PROVISIONING.ROOT,
    icon: '📦',
    children: [
      {
        label: 'Inventories',
        path: PATHS.WHOLESALE_PROVISIONING.INVENTORIES.LIST,
        icon: '📋',
      },
      {
        label: 'SIMs',
        path: PATHS.WHOLESALE_PROVISIONING.SIMS.LIST,
        icon: '📱',
      },
    ],
  },
];

// Loading spinner
const PageLoader = () => (
  <Box display='flex' justifyContent='center' alignItems='center' minH='400px'>
    <Spinner size='lg' />
  </Box>
);

// Breadcrumbs component
const Breadcrumbs = () => {
  const matches = useMatches();

  const crumbs = matches
    .map(match => {
      const handle = match.handle as RouteHandle | null | undefined;
      if (handle && typeof handle.breadcrumb === 'string') {
        return {
          path: match.pathname,
          label: handle.breadcrumb,
        };
      }
      return null;
    })
    .filter((crumb): crumb is { path: string; label: string } => crumb !== null);

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <HStack gap={2} fontSize='sm' color='gray.500' mb={4}>
      <Box
        {...({ as: RouterLink, to: '/' } as unknown as {
          as: typeof RouterLink;
          to: string;
        })}
        color='brand.500'
        _hover={{ color: 'brand.600', textDecoration: 'underline' }}
        cursor='pointer'
      >
        Home
      </Box>
      {crumbs.map((crumb, index) => (
        <HStack key={crumb.path} gap={2}>
          <Text>/</Text>
          {index === crumbs.length - 1 ? (
            <Text color='gray.700' _dark={{ color: 'gray.300' }}>
              {crumb.label}
            </Text>
          ) : (
            <Box
              {...({ as: RouterLink, to: crumb.path } as unknown as {
                as: typeof RouterLink;
                to: string;
              })}
              color='brand.500'
              _hover={{ color: 'brand.600', textDecoration: 'underline' }}
              cursor='pointer'
            >
              {crumb.label}
            </Box>
          )}
        </HStack>
      ))}
    </HStack>
  );
};

export const DashboardLayout = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, displayName, avatarUrl } = useAuth();

  const isLoading = navigation.state === 'loading';
  const sidebarWidth = sidebarCollapsed ? '70px' : '250px';

  // Helper to check if a domain is active (matches current path or any child path)
  const isDomainActive = (domainPath: string) => location.pathname.startsWith(domainPath);

  return (
    <Flex minH='100vh'>
      {/* Sidebar */}
      <Box
        as='aside'
        w={sidebarWidth}
        bg='white'
        _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
        borderRight='1px solid'
        borderColor='gray.200'
        transition='width 0.2s ease'
        position='fixed'
        h='100vh'
        overflowY='auto'
      >
        <Flex direction='column' h='100%'>
          {/* Logo */}
          <Flex
            h='60px'
            align='center'
            justify={sidebarCollapsed ? 'center' : 'flex-start'}
            px={4}
            borderBottom='1px solid'
            borderColor='gray.200'
          >
            <Link to='/'>
              <Heading level={4} color='brand.500'>
                {sidebarCollapsed ? 'Y' : 'YourApp'}
              </Heading>
            </Link>
          </Flex>

          {/* Navigation */}
          <VStack flex={1} gap={1} p={2} align='stretch'>
            {navItems.map(item => (
              <NavLink key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                  <Flex
                    align='center'
                    gap={3}
                    px={3}
                    py={2}
                    borderRadius='md'
                    bg={isActive ? 'brand.50' : 'transparent'}
                    color={isActive ? 'brand.600' : 'gray.700'}
                    _dark={{
                      bg: isActive ? 'brand.900' : 'transparent',
                      color: isActive ? 'brand.200' : 'gray.300',
                    }}
                    _hover={{
                      bg: isActive ? 'brand.100' : 'gray.100',
                    }}
                    transition='all 0.2s'
                  >
                    <Text fontSize='lg'>{item.icon}</Text>
                    {!sidebarCollapsed && (
                      <Text fontSize='sm' fontWeight={isActive ? 'semibold' : 'medium'}>
                        {item.label}
                      </Text>
                    )}
                  </Flex>
                )}
              </NavLink>
            ))}

            {/* Separator */}
            {!sidebarCollapsed && (
              <Box py={2}>
                <Text
                  fontSize='xs'
                  fontWeight='semibold'
                  color='gray.400'
                  px={3}
                  textTransform='uppercase'
                >
                  Domains
                </Text>
              </Box>
            )}

            {/* Domain Navigation */}
            {domainNavItems.map(domain => {
              const domainIsActive = isDomainActive(domain.path);
              return (
                <Box key={domain.path}>
                  <NavLink to={domain.path} style={{ textDecoration: 'none' }}>
                    {() => (
                      <Flex
                        align='center'
                        gap={3}
                        px={3}
                        py={2}
                        borderRadius='md'
                        bg={domainIsActive ? 'brand.50' : 'transparent'}
                        color={domainIsActive ? 'brand.600' : 'gray.700'}
                        _dark={{
                          bg: domainIsActive ? 'brand.900' : 'transparent',
                          color: domainIsActive ? 'brand.200' : 'gray.300',
                        }}
                        _hover={{
                          bg: domainIsActive ? 'brand.100' : 'gray.100',
                        }}
                        transition='all 0.2s'
                      >
                        <Text fontSize='lg'>{domain.icon}</Text>
                        {!sidebarCollapsed && (
                          <Text fontSize='sm' fontWeight={domainIsActive ? 'semibold' : 'medium'}>
                            {domain.label}
                          </Text>
                        )}
                      </Flex>
                    )}
                  </NavLink>
                  {/* Sub-navigation items */}
                  {!sidebarCollapsed && domain.children.length > 0 && (
                    <VStack gap={0} align='stretch' pl={4} mt={1}>
                      {domain.children.map(child => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          style={{ textDecoration: 'none' }}
                        >
                          {({ isActive }) => (
                            <Flex
                              align='center'
                              gap={2}
                              px={3}
                              py={1.5}
                              borderRadius='md'
                              fontSize='sm'
                              bg={isActive ? 'brand.50' : 'transparent'}
                              color={isActive ? 'brand.600' : 'gray.600'}
                              _dark={{
                                bg: isActive ? 'brand.900' : 'transparent',
                                color: isActive ? 'brand.200' : 'gray.400',
                              }}
                              _hover={{
                                bg: isActive ? 'brand.100' : 'gray.100',
                              }}
                              transition='all 0.2s'
                            >
                              <Text fontSize='md'>{child.icon}</Text>
                              <Text fontWeight={isActive ? 'semibold' : 'normal'}>
                                {child.label}
                              </Text>
                            </Flex>
                          )}
                        </NavLink>
                      ))}
                    </VStack>
                  )}
                </Box>
              );
            })}
          </VStack>

          {/* Bottom section - User Info */}
          <Box p={4} borderTop='1px solid' borderColor='gray.200'>
            {!sidebarCollapsed ? (
              <VStack align='stretch' gap={3}>
                <Flex align='center' gap={3}>
                  <Avatar name={displayName} src={avatarUrl ?? undefined} size='sm' />
                  <Box flex={1} overflow='hidden'>
                    <Text fontWeight='medium' fontSize='sm' truncate>
                      {displayName}
                    </Text>
                    <Text fontSize='xs' color='gray.500' truncate>
                      {user?.email}
                    </Text>
                  </Box>
                </Flex>
                <LogoutButton size='sm' w='full' />
              </VStack>
            ) : (
              <Avatar name={displayName} src={avatarUrl ?? undefined} size='sm' />
            )}
          </Box>
        </Flex>
      </Box>

      {/* Main content */}
      <Box flex={1} ml={sidebarWidth} transition='margin-left 0.2s ease'>
        {/* Header */}
        <Flex
          h='60px'
          align='center'
          justify='space-between'
          px={6}
          bg='white'
          _dark={{ bg: 'gray.800' }}
          borderBottom='1px solid'
          borderColor='gray.200'
          position='sticky'
          top={0}
          zIndex={100}
        >
          <Button
            variant='ghost'
            size='sm'
            onClick={() => {
              setSidebarCollapsed(!sidebarCollapsed);
            }}
            aria-label='Toggle sidebar'
          >
            {sidebarCollapsed ? '→' : '←'}
          </Button>

          {/* User menu in header */}
          <HStack gap={3}>
            <Text fontSize='sm' color='gray.600' display={{ base: 'none', md: 'block' }}>
              Welcome, {displayName}
            </Text>
            <Avatar name={displayName} src={avatarUrl ?? undefined} size='sm' />
          </HStack>
        </Flex>

        {/* Page content */}
        <Box
          p={6}
          opacity={isLoading ? 0.6 : 1}
          pointerEvents={isLoading ? 'none' : 'auto'}
          transition='opacity 0.2s'
        >
          <Breadcrumbs />
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Flex>
  );
};
