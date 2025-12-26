// Atom: Image - Image element with fallback
import { Image as ChakraImage, ImageProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface AtomImageProps extends ImageProps {
  /** Fallback image source */
  fallbackSrc?: string;
  /** Alt text for accessibility */
  alt: string;
}

export const Image = forwardRef<HTMLImageElement, AtomImageProps>(
  ({ fallbackSrc, alt, ...props }, ref) => {
    return (
      <ChakraImage
        ref={ref}
        alt={alt}
        src={props.src ?? fallbackSrc ?? 'https://via.placeholder.com/150'}
        objectFit='cover'
        {...props}
      />
    );
  },
);

Image.displayName = 'Image';
