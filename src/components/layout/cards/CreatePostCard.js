import { Container } from '@chakra-ui/react';

const CreatePostCard = props => {
  return (
    <Container
      px={6}
      py={6}
      display="flex"
      gap={4}
      maxW="1440px"
      borderRadius="md"
      bg="white"
      boxShadow="base"
      alignItems="center"
    >
      {props.children}
    </Container>
  );
};
export default CreatePostCard;

// Based on card in CreatePost
