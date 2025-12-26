// Atom: Text - Typography component
import { Text as ChakraText, TextProps as ChakraTextProps } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';

export interface AtomTextProps extends ChakraTextProps {
  children: ReactNode;
  variant?: 'body' | 'caption' | 'label' | 'helper' | 'error';
}

const variantStyles = {
  body: {},
  caption: { fontSize: 'xs', color: 'gray.500' },
  label: { fontSize: 'sm', fontWeight: 'medium', color: 'gray.700' },
  helper: { fontSize: 'sm', color: 'gray.500' },
  error: { fontSize: 'sm', color: 'red.500' },
};

export const Text = forwardRef<HTMLParagraphElement, AtomTextProps>(
  ({ children, variant = 'body', ...props }, ref) => {
    return (
      <ChakraText ref={ref} {...variantStyles[variant]} {...props}>
        {children}
      </ChakraText>
    );
  },
);

Text.displayName = 'Text';
