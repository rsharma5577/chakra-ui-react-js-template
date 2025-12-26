// Settings page
import { Box, Heading, VStack, Text, Separator } from '@chakra-ui/react';
import { Card, CardBody, Button } from '@/components';

const Settings = () => {
  return (
    <Box p={6} maxW='800px' mx='auto'>
      <VStack gap={6} align='stretch'>
        <Heading size='lg'>Settings</Heading>

        {/* Appearance */}
        <Card variant='elevated'>
          <CardBody>
            <Heading size='md' mb={4}>
              Appearance
            </Heading>
            <VStack gap={4} align='stretch'>
              <Box>
                <Text fontWeight='medium'>Theme</Text>
                <Text fontSize='sm' color='gray.600'>
                  Choose your preferred color theme
                </Text>
              </Box>
              <Separator />
              <Box>
                <Text fontWeight='medium'>Language</Text>
                <Text fontSize='sm' color='gray.600'>
                  Select your preferred language
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Notifications */}
        <Card variant='elevated'>
          <CardBody>
            <Heading size='md' mb={4}>
              Notifications
            </Heading>
            <VStack gap={4} align='stretch'>
              <Box>
                <Text fontWeight='medium'>Email Notifications</Text>
                <Text fontSize='sm' color='gray.600'>
                  Receive email updates about your account
                </Text>
              </Box>
              <Separator />
              <Box>
                <Text fontWeight='medium'>Push Notifications</Text>
                <Text fontSize='sm' color='gray.600'>
                  Receive push notifications in your browser
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Privacy */}
        <Card variant='elevated'>
          <CardBody>
            <Heading size='md' mb={4}>
              Privacy
            </Heading>
            <VStack gap={4} align='stretch'>
              <Box>
                <Text fontWeight='medium'>Profile Visibility</Text>
                <Text fontSize='sm' color='gray.600'>
                  Control who can see your profile
                </Text>
              </Box>
              <Separator />
              <Box>
                <Text fontWeight='medium'>Data Export</Text>
                <Text fontSize='sm' color='gray.600'>
                  Download a copy of your data
                </Text>
                <Button mt={2} variant='outline' size='sm'>
                  Export Data
                </Button>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Danger Zone */}
        <Card variant='outline' borderColor='red.500'>
          <CardBody>
            <Heading size='md' mb={4} color='red.500'>
              Danger Zone
            </Heading>
            <VStack gap={4} align='stretch'>
              <Box>
                <Text fontWeight='medium'>Delete Account</Text>
                <Text fontSize='sm' color='gray.600'>
                  Permanently delete your account and all data
                </Text>
                <Button mt={2} colorPalette='red' variant='outline' size='sm'>
                  Delete Account
                </Button>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default Settings;
