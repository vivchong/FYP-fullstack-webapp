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
  UnorderedList,
  ListItem,
  OrderedList,
  HStack,
  Avatar,
  VStack,
} from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { ArrowForwardIcon, StarIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';

import Footer from '../components/layout/Footer';

const StartingASIG = () => {
  return (
    <Fragment>
      <Flex flexDirection="column">
        <Center
          w="full"
          h="548px"
          backgroundImage="url(https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)"
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
            Starting a Shared-Interest Group (SIG)
          </Heading>
          <Flex maxW="700px" gap="72px" flexDir="column">
            <Flex flexDir="column" gap={4}>
              <Heading
                as="h2"
                fontSize="28px"
                fontWeight="regular"
                align="center"
              >
                Anyone can start a SIG!
              </Heading>
              <Text fontSize="lg">
                SIGs can be a tremendously fulfilling way to learn while making
                new friends and have fun along the way.
              </Text>
              <Text fontSize="lg">
                To start a SIG under Lifelong Learning @ EEE, you must fill in a
                SIG Proposal Form which will be approved by the head of SIGs.
              </Text>
              <Text fontSize="lg">
                Important: A SIG must have at least 5 members before they can
                book a room for meetings.
              </Text>
              <Text fontSize="lg">
                As the SIG leader, you may be responsible for:
                <UnorderedList>
                  <ListItem>
                    Recruiting members with the aid of Lifelong Learning @ EEE.
                  </ListItem>
                  <ListItem>Organising the meeting sessions.</ListItem>
                  <ListItem>Facilitating discussions during meetings.</ListItem>
                  <ListItem>
                    Discussing goals with the group Keep momentum of group
                    going.
                  </ListItem>
                  <ListItem>
                    Splitting responsibilities amongst the members.
                  </ListItem>
                </UnorderedList>
              </Text>
            </Flex>

            <Flex flexDir="column" gap={4}>
              <Heading
                as="h2"
                fontSize="28px"
                fontWeight="regular"
                align="center"
              >
                Starting your own SIG is easy.
              </Heading>
              <Text fontSize="lg">
                The application process is as follows:
                <OrderedList>
                  <ListItem>
                    Decide what your topic or skill of interest is.
                  </ListItem>
                  <ListItem>Fill in the proposal form.</ListItem>
                  <ListItem>Submit the form.</ListItem>
                  <ListItem>
                    Admins will reach out to you within 5 working days to inform
                    you of the outcome.
                  </ListItem>
                  <ListItem>
                    If successful, you will fill in a form to personalise your
                    SIG recuitment page and request for approval.
                  </ListItem>
                  <ListItem>
                    Once your content has been approved, your SIG will appear on
                    the website for everyone!
                  </ListItem>
                </OrderedList>
              </Text>
            </Flex>

            <Flex flexDir="column" gap={4}>
              <Heading
                as="h2"
                fontSize="28px"
                fontWeight="regular"
                align="center"
              >
                Still unsure?
              </Heading>
              <Text fontSize="lg">
                Contact the SIG head directly to clarify any doubts.
              </Text>
              <Heading as="h3" fontSize="20px" fontWeight="medium">
                SIG Head
              </Heading>
              <HStack spacing={4} alignItems="center">
                <Avatar name="Chen Yunting" src="" />
                <VStack alignItems="left" spacing={0}>
                  <HStack spacing="6px">
                    <Heading
                      as="h6"
                      fontSize="md"
                      fontWeight="medium"
                      color="gray.700"
                    >
                      Chen Yunting
                    </Heading>

                    <StarIcon w={3} h={3} color="teal.500" />
                  </HStack>
                  <Text>yunt0001@e.ntu.edu.sg</Text>
                </VStack>
              </HStack>
            </Flex>

            <Box py="54px" bg="gray.100" borderRadius="12px" pl={20} pr="172px">
              <Text fontSize="2xl" mb={4}>
                Ready to start a SIG?
              </Text>
              <Text mb={4}>
                Lifelong Learning @ EEE is committed to helping you set up and
                run your SIG.
              </Text>
              <Button
                as={ReactRouterLink}
                to="/sig-proposal-form"
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
              >
                Fill in the Proposal Form
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

export default StartingASIG;
