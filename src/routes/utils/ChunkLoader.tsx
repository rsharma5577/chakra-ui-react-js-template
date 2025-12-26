// ChunkProgressBar Component
// Loading spinner for chunk loading

import { memo } from 'react';
import { Box } from '@chakra-ui/react';
import { Spinner } from '@/components';

/**
 * ChunkProgressBar Component
 *
 * A loading spinner that appears while JavaScript chunks are being downloaded.
 */
const ChunkLoader = memo(() => (
  <Box display='flex' justifyContent='center' alignItems='center' minH='400px'>
    <Spinner size='lg' />
  </Box>
));

ChunkLoader.displayName = 'ChunkLoader';

export { ChunkLoader };
