// Molecule: FormField - Label + Input + Error combination
import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Text } from '@/components/atoms';

export interface FormFieldProps {
  label: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
  helperText?: string;
  labelPosition?: 'top' | 'left';
}

export const FormField = ({
  label,
  children,
  error,
  required,
  helperText,
  labelPosition = 'top',
}: FormFieldProps) => {
  const isHorizontal = labelPosition === 'left';

  return (
    <Box w='100%'>
      <Flex
        direction={isHorizontal ? 'row' : 'column'}
        align={isHorizontal ? 'center' : 'stretch'}
        gap={isHorizontal ? 4 : 1}
      >
        <Text
          as='label'
          variant='label'
          minW={isHorizontal ? '120px' : undefined}
          _dark={{ color: 'gray.300' }}
        >
          {label}
          {required && (
            <Text as='span' color='red.500' ml={1}>
              *
            </Text>
          )}
        </Text>
        <Box flex={1}>{children}</Box>
      </Flex>
      {error && (
        <Text variant='error' mt={1}>
          {error}
        </Text>
      )}
      {helperText && !error && (
        <Text variant='helper' mt={1}>
          {helperText}
        </Text>
      )}
    </Box>
  );
};
