// Home page component - Public landing page
import { useState, useEffect, useCallback, memo } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Code,
  Link,
  Image,
  Card,
  Flex,
  Grid,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, LoginButton } from '@/auth';
import { PATHS } from '@/routes/paths';
import reactLogo from '@/assets/images/react.svg';
import viteLogo from '/vite.svg';

// Default landing URL for authenticated users
const DEFAULT_AUTHENTICATED_REDIRECT = PATHS.DASHBOARD;

// Type for location state when redirected from private route
interface LocationState {
  from?: {
    pathname: string;
    search?: string;
  };
}

const HomeComponent = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  // Get the intended destination from location state (if redirected from private route)
  const locationState = location.state as LocationState | null;
  const intendedDestination = locationState?.from
    ? `${locationState.from.pathname}${locationState.from.search ?? ''}`
    : null;

  // Use intended destination if available, otherwise default to dashboard
  const loginReturnTo = intendedDestination ?? DEFAULT_AUTHENTICATED_REDIRECT;

  // Memoize count increment handler
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  // Memoize scroll handler
  const handleScrollToAbout = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      void navigate(DEFAULT_AUTHENTICATED_REDIRECT, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minH='100vh' bg='gray.50'>
        <VStack gap={4}>
          <Spinner size='xl' color='blue.500' borderWidth='4px' />
          <Text color='gray.600' fontSize='lg'>
            Loading...
          </Text>
        </VStack>
      </Box>
    );
  }

  // If authenticated, show brief loading while redirect happens
  if (isAuthenticated) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minH='100vh' bg='gray.50'>
        <VStack gap={4}>
          <Spinner size='xl' color='blue.500' borderWidth='4px' />
          <Text color='gray.600' fontSize='lg'>
            Redirecting to dashboard...
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH='100vh' bg='gray.50'>
      {/* Navigation Bar */}
      <Box
        as='header'
        bg='white'
        borderBottom='1px solid'
        borderColor='gray.200'
        position='sticky'
        top={0}
        zIndex={100}
      >
        <Container maxW='container.xl'>
          <Flex h='64px' align='center' justify='space-between'>
            {/* Logo */}
            <HStack gap={2}>
              <Text fontSize='xl' fontWeight='bold' color='blue.600'>
                YourApp
              </Text>
            </HStack>

            {/* Navigation */}
            <HStack gap={6} display={{ base: 'none', md: 'flex' }}>
              <Link href='#features' color='gray.600' _hover={{ color: 'blue.600' }}>
                Features
              </Link>
              <Link href='#about' color='gray.600' _hover={{ color: 'blue.600' }}>
                About
              </Link>
            </HStack>

            {/* Auth Buttons */}
            <HStack gap={3}>
              <LoginButton returnTo={loginReturnTo} size='md'>
                Sign In
              </LoginButton>
              <LoginButton returnTo={loginReturnTo} size='md' variant='outline' colorPalette='blue'>
                Sign Up
              </LoginButton>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box py={20} bg='gradient-to-b' bgGradient='to-b' gradientFrom='blue.50' gradientTo='white'>
        <Container maxW='container.lg'>
          <VStack gap={8} textAlign='center'>
            {/* Logo Section */}
            <HStack gap={8}>
              <Link href='https://vite.dev' target='_blank'>
                <Image
                  src={viteLogo}
                  alt='Vite logo'
                  boxSize='100px'
                  transition='all 0.3s'
                  _hover={{ transform: 'scale(1.1)' }}
                />
              </Link>
              <Link href='https://react.dev' target='_blank'>
                <Image
                  src={reactLogo}
                  alt='React logo'
                  boxSize='100px'
                  transition='all 0.3s'
                  _hover={{ transform: 'scale(1.1) rotate(20deg)' }}
                />
              </Link>
            </HStack>

            {/* Tech Stack Badges */}
            <HStack flexWrap='wrap' justify='center'>
              <Badge colorPalette='blue' size='lg'>
                Vite
              </Badge>
              <Text fontSize='2xl'>+</Text>
              <Badge colorPalette='cyan' size='lg'>
                React 19
              </Badge>
              <Text fontSize='2xl'>+</Text>
              <Badge colorPalette='teal' size='lg'>
                TypeScript
              </Badge>
              <Text fontSize='2xl'>+</Text>
              <Badge colorPalette='purple' size='lg'>
                Chakra UI v3
              </Badge>
              <Text fontSize='2xl'>+</Text>
              <Badge colorPalette='orange' size='lg'>
                Auth0
              </Badge>
            </HStack>

            {/* Title */}
            <VStack gap={4}>
              <Heading
                size='4xl'
                textAlign='center'
                bgGradient='to-r'
                gradientFrom='blue.500'
                gradientTo='purple.600'
                bgClip='text'
              >
                Modern React Template
              </Heading>
              <Text fontSize='xl' color='gray.600' maxW='2xl'>
                A production-ready React template with Auth0 authentication, Chakra UI v3, React
                Query, and modern best practices.
              </Text>
            </VStack>

            {/* CTA Buttons */}
            <HStack gap={4}>
              <LoginButton returnTo={loginReturnTo} size='lg'>
                Get Started
              </LoginButton>
              <Button variant='outline' size='lg' onClick={handleScrollToAbout}>
                Learn More
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} id='features'>
        <Container maxW='container.lg'>
          <VStack gap={12}>
            <VStack gap={4} textAlign='center'>
              <Heading size='2xl'>Features</Heading>
              <Text color='gray.600' fontSize='lg'>
                Everything you need to build modern web applications
              </Text>
            </VStack>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
              {/* Feature 1 */}
              <Card.Root>
                <Card.Body>
                  <VStack gap={4} align='start'>
                    <Text fontSize='3xl'>🔐</Text>
                    <Heading size='md'>Auth0 Authentication</Heading>
                    <Text color='gray.600'>
                      Secure authentication with Auth0, including login, logout, token refresh, and
                      protected routes.
                    </Text>
                  </VStack>
                </Card.Body>
              </Card.Root>

              {/* Feature 2 */}
              <Card.Root>
                <Card.Body>
                  <VStack gap={4} align='start'>
                    <Text fontSize='3xl'>⚡</Text>
                    <Heading size='md'>Modern Stack</Heading>
                    <Text color='gray.600'>
                      Built with Vite, React 19, TypeScript, and Chakra UI v3 for blazing fast
                      development.
                    </Text>
                  </VStack>
                </Card.Body>
              </Card.Root>

              {/* Feature 3 */}
              <Card.Root>
                <Card.Body>
                  <VStack gap={4} align='start'>
                    <Text fontSize='3xl'>🛣️</Text>
                    <Heading size='md'>React Router v7</Heading>
                    <Text color='gray.600'>
                      Advanced routing with data loaders, error boundaries, and public/private route
                      guards.
                    </Text>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* About Section */}
      <Box py={20} bg='gray.100' id='about'>
        <Container maxW='container.lg'>
          <VStack gap={8}>
            <VStack gap={4} textAlign='center'>
              <Heading size='2xl'>About Us</Heading>
              <Text color='gray.600' fontSize='lg' maxW='2xl'>
                We build modern, secure, and scalable web applications using the latest technologies
                and best practices.
              </Text>
            </VStack>

            {/* Demo Counter */}
            <Card.Root maxW='md' w='full'>
              <Card.Body>
                <VStack gap={4}>
                  <Button onClick={handleIncrement} colorPalette='blue' size='lg' w='full'>
                    Count is {count}
                  </Button>
                  <Text textAlign='center' color='gray.600'>
                    Edit <Code>src/pages/Home.tsx</Code> and save to test HMR
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box py={8} bg='gray.900' color='white'>
        <Container maxW='container.lg'>
          <VStack gap={4}>
            <Text color='gray.400' fontSize='sm'>
              Click on the Vite and React logos to learn more
            </Text>
            <Text color='gray.500' fontSize='xs'>
              © {new Date().getFullYear()} YourApp. All rights reserved.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const Home = memo(HomeComponent);
export default Home;
