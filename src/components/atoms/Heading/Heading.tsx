// Atom: Heading - Typography heading component
import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';

export interface AtomHeadingProps extends HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const levelToSize = {
  1: '2xl',
  2: 'xl',
  3: 'lg',
  4: 'md',
  5: 'sm',
  6: 'xs',
} as const;

const levelToTag = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

export const Heading = forwardRef<HTMLHeadingElement, AtomHeadingProps>(
  ({ children, level = 2, size, as, ...props }, ref) => {
    return (
      <ChakraHeading
        ref={ref}
        as={as ?? levelToTag[level]}
        size={size ?? levelToSize[level]}
        {...props}
      >
        {children}
      </ChakraHeading>
    );
  },
);

Heading.displayName = 'Heading';
