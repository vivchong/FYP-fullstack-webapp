import { Center, Text } from '@chakra-ui/react';

const Logo = () => {
    return (
      <Center>
        <Text as="span" fontSize="20px" fontWeight="700">
          Lifelong Learning
        </Text>
        <Text as="span" fontSize="20px" fontWeight="Regular">
          &nbsp;@ EEE
        </Text>
      </Center>
    );
};

export default Logo;
