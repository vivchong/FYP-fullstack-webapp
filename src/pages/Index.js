import { Container, Flex, VStack } from '@chakra-ui/react';
import Details from '../sections/Details';
import Cart from '../sections/Cart';
import Header from '../components/layout/Header';

const IndexPage = () => {
  return (
    //Container is for the whole page to keep content centred (margins)
    <Container maxWidth="container.xl" padding={0}>
      <Flex h="100vh">
        <Details />
        <Cart />

        
      </Flex>

    
    </Container>
  );
};

export default IndexPage;
