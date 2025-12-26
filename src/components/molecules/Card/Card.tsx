// Molecule: Card - Content container with header, body, footer
import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface CardProps extends BoxProps {
  children: ReactNode;
  variant?: 'elevated' | 'outline' | 'filled' | 'ghost';
}

const variantStyles = {
  elevated: {
    bg: 'white',
    _dark: { bg: 'gray.800' },
    boxShadow: 'md',
    borderRadius: 'lg',
  },
  outline: {
    bg: 'transparent',
    border: '1px solid',
    borderColor: 'gray.200',
    _dark: { borderColor: 'gray.700' },
    borderRadius: 'lg',
  },
  filled: {
    bg: 'gray.50',
    _dark: { bg: 'gray.900' },
    borderRadius: 'lg',
  },
  ghost: {
    bg: 'transparent',
    borderRadius: 'lg',
  },
};

export const Card = ({ children, variant = 'elevated', ...props }: CardProps) => {
  return (
    <Box p={6} {...variantStyles[variant]} {...props}>
      {children}
    </Box>
  );
};

// Card Header
export interface CardHeaderProps extends BoxProps {
  children: ReactNode;
}

export const CardHeader = ({ children, ...props }: CardHeaderProps) => (
  <Box
    mb={4}
    pb={4}
    borderBottom='1px solid'
    borderColor='gray.200'
    _dark={{ borderColor: 'gray.700' }}
    {...props}
  >
    {children}
  </Box>
);

// Card Body
export interface CardBodyProps extends BoxProps {
  children: ReactNode;
}

export const CardBody = ({ children, ...props }: CardBodyProps) => <Box {...props}>{children}</Box>;

// Card Footer
export interface CardFooterProps extends BoxProps {
  children: ReactNode;
}

export const CardFooter = ({ children, ...props }: CardFooterProps) => (
  <Box
    mt={4}
    pt={4}
    borderTop='1px solid'
    borderColor='gray.200'
    _dark={{ borderColor: 'gray.700' }}
    {...props}
  >
    {children}
  </Box>
);
