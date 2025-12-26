// Inventory Detail Page
import { Box, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function InventoryDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box p={6}>
      <Heading size='lg' mb={4}>
        Inventory Details
      </Heading>
      <Text color='fg.muted'>Viewing inventory: {id}</Text>
    </Box>
  );
}
