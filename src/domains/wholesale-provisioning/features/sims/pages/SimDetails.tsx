// SIMs Detail Page
import { Box, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function SimDetails() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box p={6}>
      <Heading size='lg' mb={4}>
        SIMs Details
      </Heading>
      <Text color='fg.muted'>Viewing Sims: {id}</Text>
    </Box>
  );
}
