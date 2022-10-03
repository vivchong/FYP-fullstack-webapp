import {
  Button,
  Heading,
  Text,
  Flex,
  Box,
  Center,
  Divider,
  Container,
  Spacer,
  Image,
} from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { ArrowForwardIcon, } from '@chakra-ui/icons';
import { Link as ReactRouterLink, } from 'react-router-dom';

import Footer from '../components/layout/Footer';


const WhatIsASIG = () => {
 
  return (
    <Fragment>
      <Flex flexDirection="column">
        <Center
          w="full"
          h="548px"
          backgroundImage="url(https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)"
          backgroundSize={'cover'}
          backgroundPosition={'center center'}
        />

        <Container maxW="100vw" px="10px" py="56px" centerContent>
          <Heading
            as="h1"
            maxW="700px"
            fontSize="54px"
            fontWeight="light"
            align="center"
            mb={10}
          >
            What is a Shared-Interest Group (SIG)?
          </Heading>
          <Flex maxW="700px" gap="72px" flexDir="column">
            <Text fontSize="lg">
              SIGs are small groups of like-minded learners who want to learn a
              specific skill or topic together. They are entirely
              student-driven, so each SIG works differently. Members are
              encouraged to share their learnings or practise with each other
              every week to cultivate a habit of consistent learning.
            </Text>
            <Flex flexDir="column" gap={6}>
              <Heading
                as="h2"
                fontSize="28px"
                fontWeight="regular"
                align="center"
              >
                Benefits of Joining a SIG
              </Heading>
              <Flex>
                <Container centerContent>
                  <Image
                    src="https://i.postimg.cc/vBqJRsyb/image-2.png"
                    boxSize="144px"
                  />
                  <Text>Learn from your peers</Text>
                </Container>
                <Spacer />
                <Container centerContent>
                  <Image
                    src="https://i.postimg.cc/59rhnbpm/image-3.png"
                    boxSize="144px"
                  />
                  <Text>Keep each other on track</Text>
                </Container>
                <Spacer />
                <Container centerContent>
                  <Image
                    src="https://i.postimg.cc/qqWWRxgF/image-5.png"
                    boxSize="144px"
                  />
                  <Text>Make new friends</Text>
                </Container>
              </Flex>
              <Flex gap="76px">
                <Spacer />
                <Container maxW="196px" p={0} centerContent>
                  <Image
                    src="https://i.postimg.cc/vBqJRsyb/image-2.png"
                    boxSize="144px"
                  />
                  <Text>Access to SIG Dashboard</Text>
                </Container>

                <Container maxW="196px" p={0} centerContent>
                  <Image
                    src="https://i.postimg.cc/59rhnbpm/image-3.png"
                    boxSize="144px"
                  />
                  <Text>Access to meeting rooms</Text>
                </Container>
                <Spacer />
              </Flex>
            </Flex>

            <Flex flexDir="column" gap={4}>
              <Heading
                as="h2"
                fontSize="28px"
                fontWeight="regular"
                align="center"
              >
                How it Works
              </Heading>
              <Text fontSize="lg">
                Lifelong Learning @ EEE aims to help students find like-minded
                peers who wish to study or develop a skill together, and provide
                tools which facilitate collaborative learning and motivation.
              </Text>
              <Text fontSize="lg">
                Each SIG will be granted their own dashboard where members can
                create discussion threads, browse previous resources, and keep
                up to date with weekly meeting agendas and summaries.
              </Text>
              <Text fontSize="lg">
                As SIGs are led by students, each SIG operates differently. They
                are encouraged to organise regular meetings and motivate each
                other to achieve their goals.
              </Text>
              <Text fontSize="lg">
                There is no limit to the number of SIGs you can join, but groups
                are most effective when everyone is a contributing member and
                your fellow members would appreciate active participation, so be
                mindful of this when deciding whether to join multiple groups!
              </Text>
            </Flex>
            <Flex flexDir="column" gap={4}>
              <Heading
                as="h2"
                fontSize="28px"
                fontWeight="regular"
                align="center"
              >
                How to Join a SIG
              </Heading>
              <Text fontSize="lg">
                1. Browse list of SIGs available to join
              </Text>
              <Text fontSize="lg">
                2. Once you’ve found a SIG you like, click on the “Request to
                Join” button to begin communication with the SIG leader
              </Text>
              <Text fontSize="lg">
                3. Leader adds you into the SIG which grants access to the SIG’s
                dashboard
              </Text>
            </Flex>
            <Box py="54px" bg="gray.100" borderRadius="12px" pl={20} pr="172px">
              <Text fontSize="2xl" mb={4}>
                Begin your learning journey with a SIG
              </Text>
              <Text mb={4}>
                SIGs can be a tremendously fulfilling way to learn while making
                friends with your peers.
              </Text>
              <Button
                as={ReactRouterLink}
                to="/find-a-sig"
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
              >
                Search for SIGs
              </Button>
            </Box>
            <Box py="54px" bg="gray.100" borderRadius="12px" pl={20} pr="172px">
              <Text fontSize="2xl" mb={4}>
                Can’t find a SIG for your interest? Start your own!
              </Text>
              <Text mb={4}>
                With the assistance of Lifelong Learning @ EEE, starting your
                own SIG is easy.
              </Text>
              <Button
                as={ReactRouterLink}
                to="/sig-proposal-form"
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
              >
                Find out more
              </Button>
            </Box>
          </Flex>
        </Container>
        <Divider />
        <Footer />
      </Flex>
    </Fragment>
  );
};

export default WhatIsASIG;
