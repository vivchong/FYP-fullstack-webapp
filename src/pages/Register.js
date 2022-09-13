import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useColorModeValue,
  Box,
  Text,
  HStack,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import React, { Fragment, useState } from 'react';

// THIS COMPONENT IS CALLED BY App.js

const Register = ({ setLoggedIn }) => {
  const toast = useToast();
  const resultToast = (status, description) => {
    return toast({
      position: 'bottom-right',
      status: status,
      description: description,
      duration: 3000,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState({
    //inputs collects all inputs
    name: '', // this is linked to the value in name {id}
    email: '',
    password: '',
  });

  const { name, email, password } = inputs; // destructure from inputs, by putting value={} in each input
  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value }); // target.name is the `name` of the current target
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json(); // parse so that we can utilise the data
      if (parseRes.token) {
        localStorage.setItem('token', parseRes.token); //create item in localStorage called "token" and set value to parseRes.token (the name of token in parseRes)
        setLoggedIn(true); //the function was passed into this component as a prop from App.js
        resultToast('success', 'Registered successfully!');
      } else {
        setLoggedIn(false);
        resultToast('error', parseRes); // parseRes is the error message: "User already exists"
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'} pb={2}>
              Register for an account
            </Heading>
            <form onSubmit={onSubmitForm}>
              <Stack spacing={4} w={'full'} maxW={'md'}>
                <FormControl id="name" isRequired>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="e.g. John Dee"
                    onChange={e => onChange(e)}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="e.g. jdee0001@e.ntu.edu.sg"
                    onChange={e => onChange(e)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => onChange(e)}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword(showPassword => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Stack spacing={6} pt={2}>
                  <Button
                    loadingText="Registering"
                    colorScheme={'teal'}
                    variant={'solid'}
                    type="submit"
                  >
                    Register
                  </Button>

                  <Text>
                    Already a user?{' '}
                    <Link as={ReactRouterLink} to="/login" color={'teal.400'}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          />
        </Flex>
      </Stack>
    </Fragment>
  );
};

export default Register;
