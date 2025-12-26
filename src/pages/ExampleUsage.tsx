// Example page showing how to use Zustand + React Query with JSONPlaceholder API
import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  Button,
  Text,
  Card,
  Badge,
  HStack,
  Input,
  Code,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { useUIStore } from '@/store';
import { useUsers, useCreateUser } from '@/api/queries';
import type { JSONPlaceholderUser } from '@/types';

// User card component
const UserCard = ({ user }: { user: JSONPlaceholderUser }) => (
  <Card.Root size='sm'>
    <Card.Body>
      <VStack align='stretch' gap={2}>
        <HStack justify='space-between'>
          <Text fontWeight='bold'>{user.name}</Text>
          <Badge colorPalette='blue'>ID: {user.id}</Badge>
        </HStack>
        <Text fontSize='sm' color='gray.600'>
          @{user.username}
        </Text>
        <Text fontSize='sm'>{user.email}</Text>
        <Text fontSize='xs' color='gray.500'>
          {user.company.name}
        </Text>
        <Text fontSize='xs' color='gray.400'>
          {user.address.city}
        </Text>
      </VStack>
    </Card.Body>
  </Card.Root>
);

export const ExampleUsage = () => {
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  // Zustand store example
  const { theme, setTheme, toggleSidebar, isSidebarOpen } = useUIStore();

  // React Query - Fetch users from JSONPlaceholder
  const { data: users, isLoading, error, refetch } = useUsers();
  const createUser = useCreateUser();

  const handleCreateUser = () => {
    if (!newUserName || !newUserEmail) {
      return;
    }

    createUser.mutate(
      {
        name: newUserName,
        username: newUserName.toLowerCase().replace(/\s+/g, '_'),
        email: newUserEmail,
        address: {
          street: 'Test Street',
          suite: 'Apt. 1',
          city: 'Test City',
          zipcode: '12345',
          geo: { lat: '0', lng: '0' },
        },
        phone: '1-234-567-8900',
        website: 'example.com',
        company: {
          name: 'Test Company',
          catchPhrase: 'Test Phrase',
          bs: 'test business',
        },
      },
      {
        onSuccess: () => {
          setNewUserName('');
          setNewUserEmail('');
        },
      },
    );
  };

  return (
    <Box minH='100vh' bg='gray.50' py={10}>
      <Container maxW='container.xl'>
        <VStack gap={8} align='stretch'>
          <Heading>JSONPlaceholder API Integration Demo</Heading>

          {/* Zustand UI Store Example */}
          <Card.Root>
            <Card.Header>
              <Heading size='lg'>1. Zustand State Management (UI Store)</Heading>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align='stretch'>
                <HStack>
                  <Text fontWeight='bold'>Theme:</Text>
                  <Badge>{theme}</Badge>
                  <Button
                    size='sm'
                    onClick={() => {
                      setTheme(theme === 'light' ? 'dark' : 'light');
                    }}
                  >
                    Toggle Theme
                  </Button>
                </HStack>

                <HStack>
                  <Text fontWeight='bold'>Sidebar:</Text>
                  <Badge>{isSidebarOpen ? 'Open' : 'Closed'}</Badge>
                  <Button size='sm' onClick={toggleSidebar}>
                    Toggle Sidebar
                  </Button>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* React Query - JSONPlaceholder Users */}
          <Card.Root>
            <Card.Header>
              <HStack justify='space-between'>
                <Heading size='lg'>2. JSONPlaceholder Users API</Heading>
                <Button size='sm' onClick={() => void refetch()} variant='outline'>
                  Refresh
                </Button>
              </HStack>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align='stretch'>
                {/* Loading State */}
                {isLoading && (
                  <HStack justify='center' py={8}>
                    <Spinner />
                    <Text>Loading users from JSONPlaceholder...</Text>
                  </HStack>
                )}

                {/* Error State */}
                {error && (
                  <Box p={4} bg='red.50' borderRadius='md'>
                    <Text color='red.500'>Error: {error.message}</Text>
                  </Box>
                )}

                {/* Users Grid */}
                {users && users.length > 0 && (
                  <Box>
                    <Text fontWeight='bold' mb={4}>
                      {users.length} Users from JSONPlaceholder API:
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                      {users.map(user => (
                        <UserCard key={user.id} user={user} />
                      ))}
                    </SimpleGrid>
                  </Box>
                )}

                {/* Create User Form */}
                <Box borderTopWidth='1px' pt={4} mt={4}>
                  <Text fontWeight='bold' mb={2}>
                    Create New User (POST):
                  </Text>
                  <VStack gap={2} align='stretch'>
                    <HStack>
                      <Input
                        placeholder='Name'
                        value={newUserName}
                        onChange={e => {
                          setNewUserName(e.target.value);
                        }}
                      />
                      <Input
                        placeholder='Email'
                        value={newUserEmail}
                        onChange={e => {
                          setNewUserEmail(e.target.value);
                        }}
                      />
                      <Button
                        onClick={handleCreateUser}
                        colorPalette='green'
                        loading={createUser.isPending}
                        disabled={!newUserName || !newUserEmail}
                      >
                        Create
                      </Button>
                    </HStack>

                    {createUser.isSuccess && (
                      <Box p={2} bg='green.50' borderRadius='md'>
                        <Text color='green.600' fontSize='sm'>
                          ✓ User created successfully! (ID: {createUser.data.id})
                        </Text>
                      </Box>
                    )}
                  </VStack>
                </Box>

                <Text fontSize='sm' color='gray.600'>
                  Data fetched from <Code>https://jsonplaceholder.typicode.com/users</Code>
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* API Info */}
          <Card.Root>
            <Card.Header>
              <Heading size='lg'>3. Available Hooks</Heading>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align='stretch'>
                <Text>The following hooks are available for JSONPlaceholder:</Text>
                <Box>
                  <Text fontWeight='bold' mb={2}>
                    Queries:
                  </Text>
                  <VStack align='start' gap={1}>
                    <Code>useUsers()</Code>
                    <Code>useUser(id: number)</Code>
                  </VStack>
                </Box>
                <Box>
                  <Text fontWeight='bold' mb={2}>
                    Mutations:
                  </Text>
                  <VStack align='start' gap={1}>
                    <Code>useCreateUser()</Code>
                    <Code>useUpdateUser()</Code>
                    <Code>useDeleteUser()</Code>
                    <Code>useCreateUserMutation()</Code>
                    <Code>useUpdateUserMutation()</Code>
                    <Code>usePatchUserMutation()</Code>
                    <Code>useDeleteUserMutation()</Code>
                  </VStack>
                </Box>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Testing Example */}
          <Card.Root>
            <Card.Header>
              <Heading size='lg'>4. Testing with Vitest</Heading>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align='stretch'>
                <Text>Run tests with these commands:</Text>
                <Code>pnpm test</Code>
                <Code>pnpm test:ui</Code>
                <Code>pnpm test:coverage</Code>

                <Text fontSize='sm' color='gray.600'>
                  Example tests are in <Code>src/__tests__/</Code>
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Box>
  );
};
