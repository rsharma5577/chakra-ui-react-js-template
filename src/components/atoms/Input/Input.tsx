// Atom: Input - Basic text input element
import { Input as ChakraInput, InputProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface AtomInputProps extends InputProps {
  isError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, AtomInputProps>(({ isError, ...props }, ref) => {
  return (
    <ChakraInput
      ref={ref}
      borderColor={isError ? 'red.500' : undefined}
      _focus={{
        borderColor: isError ? 'red.500' : 'brand.500',
        boxShadow: isError
          ? '0 0 0 1px var(--chakra-colors-red-500)'
          : '0 0 0 1px var(--chakra-colors-brand-500)',
      }}
      {...props}
    />
  );
});

Input.displayName = 'Input';
