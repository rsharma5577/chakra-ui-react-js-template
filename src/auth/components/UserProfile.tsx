// User Profile Component
// Displays authenticated user information

import { useAuth0 } from '@auth0/auth0-react';
import { Box, HStack, VStack, Text, Avatar, Menu, Portal, Skeleton } from '@chakra-ui/react';
import { LogoutButton } from './LoginButton';

/**
 * Compact user profile for header/navbar
 */
export const UserProfileCompact = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <HStack gap={2}>
        <Skeleton borderRadius='full' boxSize='32px' />
        <Skeleton height='16px' width='80px' />
      </HStack>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <HStack gap={3}>
      <Avatar.Root size='sm'>
        <Avatar.Image src={user.picture} alt={user.name} />
        <Avatar.Fallback>{user.name?.charAt(0) ?? user.email?.charAt(0) ?? 'U'}</Avatar.Fallback>
      </Avatar.Root>
      <Text fontSize='sm' fontWeight='medium' display={{ base: 'none', md: 'block' }}>
        {user.name ?? user.email}
      </Text>
    </HStack>
  );
};

/**
 * User profile dropdown menu
 */
export const UserProfileMenu = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <HStack gap={2}>
        <Skeleton borderRadius='full' boxSize='40px' />
      </HStack>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Box cursor='pointer'>
          <Avatar.Root size='md'>
            <Avatar.Image src={user.picture} alt={user.name} />
            <Avatar.Fallback>
              {user.name?.charAt(0) ?? user.email?.charAt(0) ?? 'U'}
            </Avatar.Fallback>
          </Avatar.Root>
        </Box>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW='200px'>
            <Box px={3} py={2} borderBottomWidth='1px'>
              <Text fontWeight='bold'>{user.name}</Text>
              <Text fontSize='sm' color='gray.500'>
                {user.email}
              </Text>
            </Box>
            <Menu.Item value='profile'>Profile</Menu.Item>
            <Menu.Item value='settings'>Settings</Menu.Item>
            <Menu.Separator />
            <Menu.Item value='logout' color='red.500' asChild>
              <LogoutButton variant='ghost' w='full' justifyContent='flex-start'>
                Log Out
              </LogoutButton>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

/**
 * Full user profile card
 */
export const UserProfileCard = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <Box p={6} borderWidth='1px' borderRadius='lg' bg='white'>
        <VStack gap={4}>
          <Skeleton borderRadius='full' boxSize='100px' />
          <Skeleton height='24px' width='150px' />
          <Skeleton height='16px' width='200px' />
        </VStack>
      </Box>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Box p={6} borderWidth='1px' borderRadius='lg' bg='white' shadow='sm'>
      <VStack gap={4}>
        <Avatar.Root size='2xl'>
          <Avatar.Image src={user.picture} alt={user.name} />
          <Avatar.Fallback>{user.name?.charAt(0) ?? user.email?.charAt(0) ?? 'U'}</Avatar.Fallback>
        </Avatar.Root>
        <VStack gap={1}>
          <Text fontSize='xl' fontWeight='bold'>
            {user.name}
          </Text>
          <Text color='gray.500'>{user.email}</Text>
          {user.email_verified && (
            <Text fontSize='sm' color='green.500'>
              ✓ Email Verified
            </Text>
          )}
        </VStack>
        <LogoutButton w='full' />
      </VStack>
    </Box>
  );
};
