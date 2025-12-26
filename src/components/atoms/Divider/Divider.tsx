// Atom: Divider - Visual separator
import { Separator, SeparatorProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface AtomDividerProps extends SeparatorProps {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Thickness of the divider */
  thickness?: string;
}

export const Divider = forwardRef<HTMLHRElement, AtomDividerProps>(
  ({ orientation = 'horizontal', thickness = '1px', ...props }, ref) => {
    return (
      <Separator
        ref={ref}
        orientation={orientation}
        borderWidth={thickness}
        borderColor='gray.200'
        _dark={{ borderColor: 'gray.700' }}
        {...props}
      />
    );
  },
);

Divider.displayName = 'Divider';
