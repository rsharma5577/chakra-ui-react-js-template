// Molecule: StatCard - Statistics display card
import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Text, Heading, Icon } from '@/components/atoms';
import { Card } from '../Card';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: number;
  changeLabel?: string;
  variant?: 'elevated' | 'outline' | 'filled';
}

export const StatCard = ({
  title,
  value,
  icon,
  change,
  changeLabel = 'vs last period',
  variant = 'elevated',
}: StatCardProps) => {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card variant={variant}>
      <Flex justify='space-between' align='flex-start'>
        <Box>
          <Text variant='caption' mb={1}>
            {title}
          </Text>
          <Heading level={2} mb={2}>
            {value}
          </Heading>
          {change !== undefined && (
            <Flex align='center' gap={1}>
              <Text
                fontSize='sm'
                fontWeight='medium'
                color={isPositive ? 'green.500' : isNegative ? 'red.500' : 'gray.500'}
              >
                {isPositive ? '+' : ''}
                {change}%
              </Text>
              <Text variant='caption'>{changeLabel}</Text>
            </Flex>
          )}
        </Box>
        {Boolean(icon) && (
          <Box p={3} bg='brand.50' _dark={{ bg: 'brand.900' }} borderRadius='lg' color='brand.500'>
            <Icon size='lg'>{icon}</Icon>
          </Box>
        )}
      </Flex>
    </Card>
  );
};
