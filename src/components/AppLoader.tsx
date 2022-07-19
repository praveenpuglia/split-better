import { Box, Spinner } from '@chakra-ui/react';

export const AppLoader = () => {
  return (
    <Box h="100vh" w="100vw" display="grid" placeContent="center">
      <Spinner></Spinner>
    </Box>
  );
};
