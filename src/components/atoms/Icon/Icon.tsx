// Atom: Icon - Icon wrapper component
import { Box, BoxProps } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';

export interface AtomIconProps extends BoxProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  xs: '12px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
};

export const Icon = forwardRef<HTMLDivElement, AtomIconProps>(
  ({ children, size = 'md', ...props }, ref) => {
    return (
      <Box
        ref={ref}
        as='span'
        display='inline-flex'
        alignItems='center'
        justifyContent='center'
        width={sizeMap[size]}
        height={sizeMap[size]}
        flexShrink={0}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

Icon.displayName = 'Icon';
