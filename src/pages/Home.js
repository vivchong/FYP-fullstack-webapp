import {
  Button,
  Heading,
  Text,
  Flex,
  Box,
  Center,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  InputRightAddon,
  Divider,
} from '@chakra-ui/react';
import React, { Fragment, useState, useEffect } from 'react';
import SignOutButton from '../components/buttons/SignOutBtn';
import { SearchIcon } from '@chakra-ui/icons';

import Footer from '../components/layout/Footer';

import classes from './sig-dashboard/SIGHeroBanner.module.css';

const Home = ({ isLoggedIn, setLoggedIn }) => {
  const [name, setName] = useState(''); // collect Name of logged in user

  async function getName() {
    try {
      const response = await fetch(
        'http://localhost:5000/sig-dashboard/get-name',
        {
          // linked to the sig-dashboard route which gets user data
          method: 'POST',
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json(); // console.log(parseRes) ==> {user_display_name: 'Rohan Gautam'}

      setName(parseRes.user_display_name);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    // makes a request when this component is called
    getName();
  }, []); // adding [] makes sure that useEffect only makes ONE request, instead of multiple
  return (
    <Fragment>
      <Flex flexDirection="column">
        <Center
          w={'full'}
          h="548px"
          backgroundImage="url(https://i.pinimg.com/originals/bb/bf/7c/bbbf7c9083371b294ef3ab742cd0e2a5.jpg)"
          backgroundSize={'cover'}
          backgroundPosition={'center center'}
        >
          <Flex flexDirection="column" gap={6}>
            {isLoggedIn ? (
              <div>
                <Text textAlign="center" fontSize="4xl" color="white">
                  Hi {name},
                </Text>
                <Text textAlign="center" fontSize="4xl" color="white">
                  what do you want to
                  <Text as="b">
                    <Text as="i"> learn </Text>
                  </Text>
                  today?
                </Text>
              </div>
            ) : (
              <Text textAlign="center" fontSize="4xl" color="white">
                What do you want to
                <Text as="b">
                  <Text as="i"> learn </Text>
                </Text>
                today?
              </Text>
            )}
            <InputGroup bg="white" borderRadius="6px" size="lg" w="712px">
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.400" w={6} h={6} />}
              />
              <Input
                focusBorderColor="teal.500"
                variant="filled"
                size="lg"
              ></Input>
              <InputRightAddon as="button" bgColor="teal" color="white">
                Search
              </InputRightAddon>
            </InputGroup>
          </Flex>
        </Center>
        <Flex p="94px">
          <Heading fontSize="24px">Upcoming workshops</Heading>
        </Flex>
        <Flex p="94px">
          <Heading fontSize="24px">Explore learning tracks</Heading>
        </Flex>
        <Divider />
        <Footer />
      </Flex>
    </Fragment>
  );
};

export default Home;
