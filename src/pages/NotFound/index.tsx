// 404 Not Found page
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components';
import { paths } from '@/routes';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box minH='100vh' display='flex' alignItems='center' justifyContent='center' p={4}>
      <VStack gap={6} textAlign='center'>
        <Heading fontSize={{ base: '6xl', md: '9xl' }} color='brand.500' fontWeight='bold'>
          404
        </Heading>
        <Heading size='xl'>Page Not Found</Heading>
        <Text color='gray.600' maxW='md'>
          Sorry, the page you are looking for does not exist or has been moved.
        </Text>
        <VStack gap={3}>
          <Button colorPalette='brand' onClick={() => void navigate(paths.HOME)}>
            Go to Home
          </Button>
          <Button variant='ghost' onClick={() => void navigate(-1)}>
            Go Back
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default NotFound;
