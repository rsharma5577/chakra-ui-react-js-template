// Template: MainLayout - Main application layout
import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Header, Footer } from '@/components/organisms';

export interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  headerProps?: React.ComponentProps<typeof Header>;
  footerProps?: React.ComponentProps<typeof Footer>;
}

export const MainLayout = ({
  children,
  showHeader = true,
  showFooter = true,
  headerProps,
  footerProps,
}: MainLayoutProps) => {
  return (
    <Flex direction='column' minH='100vh'>
      {showHeader && <Header {...headerProps} />}

      <Box as='main' flex={1}>
        {children}
      </Box>

      {showFooter && <Footer {...footerProps} />}
    </Flex>
  );
};
