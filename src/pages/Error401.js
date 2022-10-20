import { Box, Heading, Text, Button, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';


export default function Unauthorised() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        401
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Unauthorised
      </Text>
      <Text color={'gray.500'} mb={6}>
        You do not have permission to see this page
      </Text>
      <Link as={ReactRouterLink} to="/">
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
          href="/"
        >
          Go to Home
        </Button>
      </Link>
    </Box>
  );
}
