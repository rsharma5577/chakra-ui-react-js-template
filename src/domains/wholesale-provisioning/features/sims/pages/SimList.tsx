// SIMS List Page
import { Box, Heading, Text } from '@chakra-ui/react';

export default function SimsList() {
  return (
    <Box p={6}>
      <Heading size='lg' mb={4}>
        SIMs
      </Heading>
      <Text color='fg.muted'>Manage your wholesale provisioning SIMS here.</Text>
    </Box>
  );
}
