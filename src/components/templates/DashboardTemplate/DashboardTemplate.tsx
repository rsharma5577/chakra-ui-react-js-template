// Template: DashboardTemplate - Dashboard layout with sidebar
import { Box, Flex } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { Header, Sidebar } from '@/components/organisms';
import type { NavItemProps } from '@/components/molecules';

export interface DashboardTemplateProps {
  children: ReactNode;
  navItems: Omit<NavItemProps, 'isCollapsed'>[];
  headerProps?: React.ComponentProps<typeof Header>;
  sidebarHeader?: ReactNode;
  sidebarFooter?: ReactNode;
  defaultCollapsed?: boolean;
}

export const DashboardTemplate = ({
  children,
  navItems,
  headerProps,
  sidebarHeader,
  sidebarFooter,
  defaultCollapsed = false,
}: DashboardTemplateProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const sidebarWidth = isCollapsed ? '70px' : '250px';

  return (
    <Flex minH='100vh'>
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        header={sidebarHeader}
        footer={sidebarFooter}
        isCollapsed={isCollapsed}
      />

      {/* Main content area */}
      <Box flex={1} ml={sidebarWidth} transition='margin-left 0.2s ease'>
        {/* Header */}
        <Header
          {...headerProps}
          actions={
            <Box
              as='button'
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}
              p={2}
              borderRadius='md'
              _hover={{ bg: 'gray.100' }}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M3 12h18M3 6h18M3 18h18' />
              </svg>
            </Box>
          }
        />

        {/* Page content */}
        <Box as='main' p={6}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
