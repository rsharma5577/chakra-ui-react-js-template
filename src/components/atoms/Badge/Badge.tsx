// Atom: Badge - Status indicator
import { Badge as ChakraBadge, BadgeProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface AtomBadgeProps extends BadgeProps {
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

const statusColors = {
  success: 'green',
  warning: 'orange',
  error: 'red',
  info: 'blue',
  neutral: 'gray',
};

export const Badge = forwardRef<HTMLSpanElement, AtomBadgeProps>(
  ({ status = 'neutral', children, ...props }, ref) => {
    return (
      <ChakraBadge
        ref={ref}
        colorPalette={statusColors[status]}
        px={2}
        py={0.5}
        borderRadius='full'
        fontSize='xs'
        fontWeight='medium'
        {...props}
      >
        {children}
      </ChakraBadge>
    );
  },
);

Badge.displayName = 'Badge';
