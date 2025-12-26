// Molecule: Alert - Feedback message with icon
import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Text, Icon, Button } from '@/components/atoms';

export interface AlertProps {
  status: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  description?: string;
  children?: ReactNode;
  onClose?: () => void;
  variant?: 'subtle' | 'solid' | 'outline';
}

const statusConfig = {
  success: {
    bg: 'green.50',
    borderColor: 'green.500',
    iconColor: 'green.500',
    solidBg: 'green.500',
  },
  warning: {
    bg: 'orange.50',
    borderColor: 'orange.500',
    iconColor: 'orange.500',
    solidBg: 'orange.500',
  },
  error: {
    bg: 'red.50',
    borderColor: 'red.500',
    iconColor: 'red.500',
    solidBg: 'red.500',
  },
  info: {
    bg: 'blue.50',
    borderColor: 'blue.500',
    iconColor: 'blue.500',
    solidBg: 'blue.500',
  },
};

// Status icons
const StatusIcon = ({ status }: { status: AlertProps['status'] }) => {
  const icons = {
    success: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
        <polyline points='22 4 12 14.01 9 11.01' />
      </svg>
    ),
    warning: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' />
        <line x1='12' y1='9' x2='12' y2='13' />
        <line x1='12' y1='17' x2='12.01' y2='17' />
      </svg>
    ),
    error: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <circle cx='12' cy='12' r='10' />
        <line x1='15' y1='9' x2='9' y2='15' />
        <line x1='9' y1='9' x2='15' y2='15' />
      </svg>
    ),
    info: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <circle cx='12' cy='12' r='10' />
        <line x1='12' y1='16' x2='12' y2='12' />
        <line x1='12' y1='8' x2='12.01' y2='8' />
      </svg>
    ),
  };
  return icons[status];
};

export const Alert = ({
  status,
  title,
  description,
  children,
  onClose,
  variant = 'subtle',
}: AlertProps) => {
  const config = statusConfig[status];

  const variantStyles = {
    subtle: {
      bg: config.bg,
      borderLeft: '4px solid',
      borderColor: config.borderColor,
    },
    solid: {
      bg: config.solidBg,
      color: 'white',
    },
    outline: {
      bg: 'transparent',
      border: '1px solid',
      borderColor: config.borderColor,
    },
  };

  return (
    <Box
      p={4}
      borderRadius='md'
      {...variantStyles[variant]}
      _dark={variant === 'subtle' ? { bg: `${status}.900` } : undefined}
    >
      <Flex align='flex-start' gap={3}>
        <Icon color={variant === 'solid' ? 'white' : config.iconColor}>
          <StatusIcon status={status} />
        </Icon>
        <Box flex={1}>
          {title && (
            <Text fontWeight='semibold' mb={description ? 1 : 0}>
              {title}
            </Text>
          )}
          {description && <Text variant='body'>{description}</Text>}
          {children}
        </Box>
        {onClose && (
          <Button
            variant='ghost'
            size='sm'
            onClick={onClose}
            color={variant === 'solid' ? 'white' : undefined}
          >
            ×
          </Button>
        )}
      </Flex>
    </Box>
  );
};
