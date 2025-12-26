// Recent Activity component for dashboard
import { Box, Flex, VStack } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, Text } from '@/components';

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface RecentActivityProps {
  activities: Activity[];
  title?: string;
}

const typeColors = {
  info: 'blue.500',
  success: 'green.500',
  warning: 'orange.500',
  error: 'red.500',
};

export const RecentActivity = ({ activities, title = 'Recent Activity' }: RecentActivityProps) => {
  return (
    <Card variant='elevated'>
      <CardHeader>
        <Text fontWeight='semibold' fontSize='lg'>
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <VStack gap={4} align='stretch'>
          {activities.length === 0 ? (
            <Text color='gray.500' textAlign='center' py={4}>
              No recent activity
            </Text>
          ) : (
            activities.map(activity => (
              <Flex key={activity.id} gap={3}>
                <Box
                  w={2}
                  h={2}
                  mt={2}
                  borderRadius='full'
                  bg={typeColors[activity.type]}
                  flexShrink={0}
                />
                <Box flex={1}>
                  <Text fontWeight='medium'>{activity.title}</Text>
                  <Text fontSize='sm' color='gray.600' _dark={{ color: 'gray.400' }}>
                    {activity.description}
                  </Text>
                  <Text fontSize='xs' color='gray.500' mt={1}>
                    {activity.timestamp}
                  </Text>
                </Box>
              </Flex>
            ))
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};
