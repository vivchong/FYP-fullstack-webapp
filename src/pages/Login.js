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
  Box,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';

const Login = ({ setLoggedIn }) => {
  const toast = useToast();
  const resultToast = (status, description) => {
    return toast({
      position: 'bottom-right',
      status: status,
      description: description,
      duration: 3000,
    });
  };

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;
  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem('token', parseRes.token);
        setLoggedIn(true);
        resultToast('success', 'Signed in successfully!');
      } else {
        setLoggedIn(false);
        resultToast('error', parseRes); // parseRes is the error message: "Email or password is incorrect!"
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
              Sign in
            </Heading>
            <form onSubmit={onSubmitForm}>
              <Stack spacing={4} w={'full'} maxW={'md'}>
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
                  <Input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => onChange(e)}
                  />
                </FormControl>

                <Stack spacing={6} pt={2}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Checkbox colorScheme={'teal'}>Remember me</Checkbox>
                    <Link color={'teal.500'}>Forgot password?</Link>
                  </Stack>
                  <Button
                    loadingText="Signing in"
                    colorScheme={'teal'}
                    variant={'solid'}
                    type="submit"
                  >
                    Sign in
                  </Button>

                  <Text>
                    Don't have an account?{' '}
                    <Link
                      as={ReactRouterLink}
                      to="/register"
                      color={'teal.400'}
                    >
                      Register
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

export default Login;
