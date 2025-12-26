// Organism: Sidebar - Navigation sidebar
import { Box, VStack, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { NavItem, NavItemProps } from '@/components/molecules';

export interface SidebarProps {
  navItems: Omit<NavItemProps, 'isCollapsed'>[];
  header?: ReactNode;
  footer?: ReactNode;
  isCollapsed?: boolean;
  width?: string;
  collapsedWidth?: string;
}

export const Sidebar = ({
  navItems,
  header,
  footer,
  isCollapsed = false,
  width = '250px',
  collapsedWidth = '70px',
}: SidebarProps) => {
  return (
    <Box
      as='aside'
      w={isCollapsed ? collapsedWidth : width}
      minH='100vh'
      bg='white'
      _dark={{ bg: 'gray.800' }}
      borderRight='1px solid'
      borderColor='gray.200'
      transition='width 0.2s ease'
      position='fixed'
      left={0}
      top={0}
      zIndex={1000}
    >
      <Flex direction='column' h='100%'>
        {/* Header */}
        {Boolean(header) && (
          <Box
            p={4}
            borderBottom='1px solid'
            borderColor='gray.200'
            _dark={{ borderColor: 'gray.700' }}
          >
            {header}
          </Box>
        )}

        {/* Navigation */}
        <VStack flex={1} gap={1} p={2} align='stretch' overflowY='auto'>
          {navItems.map(item => (
            <NavItem key={Math.random().toString()} {...item} isCollapsed={isCollapsed} />
          ))}
        </VStack>

        {/* Footer */}
        {Boolean(footer) && (
          <Box
            p={4}
            borderTop='1px solid'
            borderColor='gray.200'
            _dark={{ borderColor: 'gray.700' }}
          >
            {footer}
          </Box>
        )}
      </Flex>
    </Box>
  );
};
