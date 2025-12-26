// Atom: Spinner - Loading indicator
import { Spinner as ChakraSpinner, SpinnerProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface AtomSpinnerProps extends SpinnerProps {
  /** Size preset */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Spinner = forwardRef<HTMLDivElement, AtomSpinnerProps>(
  ({ size = 'md', ...props }, ref) => {
    return <ChakraSpinner ref={ref} size={size} color='brand.500' {...props} />;
  },
);

Spinner.displayName = 'Spinner';
