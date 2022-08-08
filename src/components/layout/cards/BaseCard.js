import { Container } from '@chakra-ui/react';

const BaseCard = props => {
  return (
    <Container
      px={6}
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
export default BaseCard;

// Based on card in CreatePost
