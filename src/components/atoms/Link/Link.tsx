// Atom: Link - Navigation link element
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';

export interface AtomLinkProps extends LinkProps {
  children: ReactNode;
  isExternal?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, AtomLinkProps>(
  ({ children, isExternal, ...props }, ref) => {
    return (
      <ChakraLink
        ref={ref}
        color='brand.500'
        _hover={{ color: 'brand.600', textDecoration: 'underline' }}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </ChakraLink>
    );
  },
);

Link.displayName = 'Link';
