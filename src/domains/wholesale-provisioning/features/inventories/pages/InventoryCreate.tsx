// Inventory Create Page
import { Box, Heading, Text } from '@chakra-ui/react';

export default function InventoryCreate() {
  return (
    <Box p={6}>
      <Heading size='lg' mb={4}>
        Create Inventory
      </Heading>
      <Text color='fg.muted'>Create a new inventory entry.</Text>
    </Box>
  );
}
