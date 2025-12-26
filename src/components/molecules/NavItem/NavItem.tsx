// Molecule: NavItem - Navigation link with icon
import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Text, Icon, Link } from '@/components/atoms';

export interface NavItemProps {
  label: string;
  href: string;
  icon?: ReactNode;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export const NavItem = ({
  label,
  href,
  icon,
  isActive = false,
  isCollapsed = false,
  onClick,
}: NavItemProps) => {
  return (
    <Link href={href} onClick={onClick} _hover={{ textDecoration: 'none' }}>
      <Flex
        align='center'
        gap={3}
        px={3}
        py={2}
        borderRadius='md'
        bg={isActive ? 'brand.50' : 'transparent'}
        color={isActive ? 'brand.600' : 'gray.700'}
        _dark={{
          bg: isActive ? 'brand.900' : 'transparent',
          color: isActive ? 'brand.200' : 'gray.300',
        }}
        _hover={{
          bg: isActive ? 'brand.100' : 'gray.100',
          _dark: { bg: isActive ? 'brand.800' : 'gray.700' },
        }}
        transition='all 0.2s'
      >
        {Boolean(icon) && (
          <Icon size='md' flexShrink={0}>
            {icon}
          </Icon>
        )}
        {!isCollapsed && (
          <Text fontSize='sm' fontWeight={isActive ? 'semibold' : 'medium'}>
            {label}
          </Text>
        )}
      </Flex>
    </Link>
  );
};
