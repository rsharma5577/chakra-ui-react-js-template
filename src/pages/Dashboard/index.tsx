// Dashboard page
import { Box, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { StatCard } from '@/components';
import { RecentActivity } from './RecentActivity';

const Dashboard = () => {
  // Mock data - replace with actual API calls
  const mockActivities = [
    {
      id: '1',
      title: 'New user registered',
      description: 'John Doe created an account',
      timestamp: '2 hours ago',
      type: 'success' as const,
    },
    {
      id: '2',
      title: 'System update',
      description: 'Application updated to v2.0',
      timestamp: '5 hours ago',
      type: 'info' as const,
    },
    {
      id: '3',
      title: 'Warning detected',
      description: 'High memory usage detected',
      timestamp: '1 day ago',
      type: 'warning' as const,
    },
  ];

  return (
    <Box p={6}>
      <VStack gap={6} align='stretch'>
        <Heading size='lg'>Dashboard</Heading>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
          <StatCard title='Total Users' value='1,234' change={12.5} />
          <StatCard title='Active Sessions' value='456' change={-2.3} />
          <StatCard title='Revenue' value='$45,678' change={8.1} />
          <StatCard title='Conversion Rate' value='3.2%' change={0.5} />
        </SimpleGrid>

        {/* Recent Activity */}
        <RecentActivity activities={mockActivities} />
      </VStack>
    </Box>
  );
};

export default Dashboard;
