import { Container } from '@chakra-ui/react';

const BigBaseCard = props => {
  return (
    <Container
      px={6}
      maxW="1440px"
      borderRadius="md"
      bg="white"
      boxShadow="base"
      alignItems="center"
      minW='800px'
    >
      {props.children}
    </Container>
  );
};
export default BigBaseCard;

// Based on card in CreatePost
