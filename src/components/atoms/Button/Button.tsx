// Atom: Button - Basic interactive element
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';

export interface AtomButtonProps extends ButtonProps {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, AtomButtonProps>(
  ({ children, isLoading, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <ChakraButton ref={ref} loading={isLoading} {...props}>
        {Boolean(leftIcon) && <span style={{ marginRight: 8 }}>{leftIcon}</span>}
        {children}
        {Boolean(rightIcon) && <span style={{ marginLeft: 8 }}>{rightIcon}</span>}
      </ChakraButton>
    );
  },
);

Button.displayName = 'Button';
