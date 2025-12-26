// Profile page
import { Box, VStack, Flex, Image } from '@chakra-ui/react';
import { Card, CardBody, Button, Input, Heading, Text, FormField } from '@/components';
import { useState } from 'react';
import type { User } from '@/types';

const Profile = () => {
  // Mock user data
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const currentUser = mockUser;
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const handleEditProfile = () => {
    console.info('Edit profile clicked');
  };

  const handleSaveProfile = () => {
    console.info('Save profile:', { name, email });
  };

  return (
    <Box p={6} maxW='1200px' mx='auto'>
      <VStack gap={6} align='stretch'>
        {/* Profile Header */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={6}
          align={{ base: 'center', md: 'flex-start' }}
          p={6}
          bg='white'
          _dark={{ bg: 'gray.800' }}
          borderRadius='lg'
          boxShadow='md'
        >
          <Image
            src={
              currentUser.avatar ??
              `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&size=128`
            }
            alt={currentUser.name}
            boxSize='128px'
            borderRadius='full'
            objectFit='cover'
            border='4px solid'
            borderColor='brand.500'
          />
          <Box flex={1} textAlign={{ base: 'center', md: 'left' }}>
            <Heading level={2} mb={1}>
              {currentUser.name}
            </Heading>
            <Text color='gray.600' _dark={{ color: 'gray.400' }} mb={2}>
              {currentUser.email}
            </Text>
            <Text
              display='inline-block'
              px={3}
              py={1}
              bg='brand.50'
              _dark={{ bg: 'brand.900' }}
              color='brand.600'
              borderRadius='full'
              fontSize='sm'
              fontWeight='medium'
              textTransform='capitalize'
            >
              {currentUser.role}
            </Text>
          </Box>
          <Button variant='outline' colorPalette='brand' onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </Flex>

        {/* Profile Settings */}
        <Card variant='elevated'>
          <CardBody>
            <Heading level={3} mb={4}>
              Profile Information
            </Heading>
            <VStack gap={4}>
              <FormField label='Full Name'>
                <Input
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </FormField>
              <FormField label='Email Address'>
                <Input
                  type='email'
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </FormField>
              <Box alignSelf='flex-end'>
                <Button colorPalette='brand' onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default Profile;
