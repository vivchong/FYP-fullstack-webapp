import { Center, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';

const Logo = () => {
    return (
      <LinkBox>
        <Center>
          <LinkOverlay href='/'>
            <Text as="span" fontSize="20px" fontWeight="700">
              Lifelong Learning
            </Text>
            <Text as="span" fontSize="20px" fontWeight="Regular">
              &nbsp;@ EEE
            </Text>
          </LinkOverlay>
        </Center>
      </LinkBox>
    );
};

export default Logo;
