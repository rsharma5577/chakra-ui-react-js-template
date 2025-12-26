// Molecule: Avatar - User avatar with fallback initials
import { Box, Flex } from '@chakra-ui/react';
import { Image, Text } from '@/components/atoms';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const sizeMap = {
  xs: { box: '24px', text: 'xs', status: '6px' },
  sm: { box: '32px', text: 'sm', status: '8px' },
  md: { box: '40px', text: 'md', status: '10px' },
  lg: { box: '56px', text: 'lg', status: '12px' },
  xl: { box: '80px', text: 'xl', status: '14px' },
};

const statusColors = {
  online: 'green.500',
  offline: 'gray.400',
  away: 'yellow.500',
  busy: 'red.500',
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

export const Avatar = ({
  src,
  name,
  size = 'md',
  showName = false,
  showStatus = false,
  status = 'offline',
}: AvatarProps) => {
  const sizeConfig = sizeMap[size];

  return (
    <Flex align='center' gap={3}>
      <Box position='relative'>
        {src ? (
          <Image
            src={src}
            alt={name}
            w={sizeConfig.box}
            h={sizeConfig.box}
            borderRadius='full'
            objectFit='cover'
          />
        ) : (
          <Flex
            w={sizeConfig.box}
            h={sizeConfig.box}
            borderRadius='full'
            bg='brand.500'
            color='white'
            align='center'
            justify='center'
            fontWeight='semibold'
            fontSize={sizeConfig.text}
          >
            {getInitials(name)}
          </Flex>
        )}
        {showStatus && (
          <Box
            position='absolute'
            bottom={0}
            right={0}
            w={sizeConfig.status}
            h={sizeConfig.status}
            borderRadius='full'
            bg={statusColors[status]}
            border='2px solid'
            borderColor='white'
            _dark={{ borderColor: 'gray.800' }}
          />
        )}
      </Box>
      {showName && (
        <Text fontWeight='medium' fontSize={sizeConfig.text}>
          {name}
        </Text>
      )}
    </Flex>
  );
};
