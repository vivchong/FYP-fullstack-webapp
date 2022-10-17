import React, { useContext, useState, useEffect } from 'react';
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Divider,
  Link,
  Flex,
  Spacer,
  Box,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  TableContainer,
  Table,
  TableCaption,
  Tr,
  Th,
  Tbody,
  Td,
  Circle,
  Thead,
  useToast,
  Textarea,
} from '@chakra-ui/react';

import BaseCard from '../../../components/layout/cards/BaseCard';
import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import MemberList from '../../../components/sig-dashboard/MemberList';
import { IconBase } from 'react-icons/lib';
import { isInteger, isString } from 'formik';
import moment from 'moment';
import { StoreContext } from '../../../store/store';

// MEMBER LIST HANDLER has to be here.
// This handler will find members of this SIG given the SIG ID from table:RoleInSIGs
// and extract the UserID and ROLE where SIGID = this SIG's
// Then, using the UserID, it will find the  UserDisplayName and UserPic from table:Users
// THE FOLLOWING is what I should get at the end, and will be passed into <MemberList />

// Need to sort the array here by alphabetical order first, then push the Leader(s) in front

// FROM SIGTabs.js FROM SIGDashboardPage.js
const SIGTabsMembers = ({ sig_id, sig_data, sig_members, role }) => {
  const [refresh, setRefresh] = useState(false);
  // const [context, setContext] = useContext(StoreContext);
  // const { refreshSIGData } = context;
  const { refreshSIGData, setRefreshSIGData } = useContext(StoreContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [listOfRequests, setListOfRequests] = useState([]);

  async function getJoinRequests() {
    try {
      //   const body = { sig_id, };
      const res = await fetch(
        `http://localhost:5000/sig-dashboard/join-requests/${sig_id}`,
        {
          method: 'POST',
          headers: { token: localStorage.token },
          //   body: JSON.stringify(body),
        }
      );
      const requestArray = await res.json();
      setListOfRequests(requestArray);
      console.log(listOfRequests);
    } catch (err) {
      console.error(err.message);
    }
  }

  // useEffect(() => {
  //   getJoinRequests();
  //   console.log(role)
  // }, []);

  useEffect(() => {
    getJoinRequests();
  }, [refresh]);

  // INITIALISING INPUT VALUES FROM DATABASE
  const [preview, setPreview] = useState({
    form_id: 0,
    user_id: 0,
    user_display_name: '',
    user_email: '',
    subject_line: '',
    message_content: '',
  });

  const {
    form_id,
    user_id,
    user_display_name,
    user_email,
    subject_line,
    message_content,
  } = preview;

  const handleFormPreview = form => {
    setPreview({
      form_id: form.form_id,
      user_id: form.user_id,
      user_display_name: form.user_display_name,
      user_email: form.user_email,
      subject_line: form.subject_line,
      message_content: form.message_content,
    });
  };

  const toast = useToast();
  const resultToast = (status, description) => {
    return toast({
      position: 'bottom-right',
      status: status,
      description: description,
      duration: 3000,
    });
  };
  const handleRejectProposal = async e => {
    e.preventDefault();
    try {
      const body = {
        form_id,
        user_id,
        sig_id
      };
      const rejectProposal = await fetch(
        'http://localhost:5000/forms/reject-join-request',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );
      setRefresh(!refresh);
      // setContext({ refreshSIGData: !refreshSIGData });
      setRefreshSIGData(!refreshSIGData)
      resultToast('warning', 'You rejected their request to join');
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleApproveProposal = async e => {
    e.preventDefault();
    try {
      const body = {
        form_id,
        user_id,
        sig_id,
      };
      const approveProposal = await fetch(
        'http://localhost:5000/forms/approve-join-request',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );
      const newSIGRow = await approveProposal.json();

      setRefresh(!refresh);
      // setContext({ refreshSIGData: !refreshSIGData });
      setRefreshSIGData(!refreshSIGData);
      resultToast('success', 'SIG Proposal was approved!');
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <Container /* 1-Column Flex Layout */
        px={10}
        pt={4}
        maxW="856px"
        width="100%"
        display="flex"
        flexDirection="column"
        gap={8}
      >
        {/* This Card is only shown to the SIG leader */}
        {role === 3 ? (
          <BaseCard>
            <VStack my={6} alignItems="flex-start" spacing={4} width="100%">
              <Flex width="100%" alignItems="center">
                <Box>
                  <Heading
                    as="h3"
                    size="md"
                    fontWeight="medium"
                    alignContent="center"
                  >
                    {listOfRequests.length === 0 ? (
                      'No new requests to join'
                    ) : (
                      <>
                        {listOfRequests.length} Request
                        {listOfRequests.length > 1 && 's'} to Join
                      </>
                    )}
                  </Heading>
                </Box>
                <Spacer />
              </Flex>
              <Text as="i">Only the SIG leader can see this card</Text>

              {listOfRequests.length === 0 ? (
                <></>
              ) : (
                <TableContainer
                  w="100%"
                  bg="white"
                  borderRadius="12px"
                  borderWidth="1px"
                  borderColor="gray.200"
                  p={3}
                >
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Requested on</Th>
                        <Th>Form</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {listOfRequests.map(form => {
                        const date = moment(form.submitted_on)
                          .utc()
                          .format('DD-MM-YYYY');
                        return (
                          <Tr key={form.form_id}>
                            <Td>{form.user_display_name}</Td>
                            <Td>
                              <Text>{date}</Text>
                            </Td>
                            <Td>
                              <Button
                                variant="ghost"
                                onClick={() => {
                                  onOpen();
                                  handleFormPreview(form);
                                }}
                              >
                                View
                              </Button>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
            </VStack>
          </BaseCard>
        ) : (
          <></>
        )}

        <BaseCard>
          <VStack my={6} alignItems="flex-start" spacing={4} width="100%">
            <Flex width="100%" alignItems="center">
              <Box>
                <Heading
                  as="h3"
                  size="md"
                  fontWeight="medium"
                  alignContent="center"
                >
                  {sig_data.sig_member_count} Member
                  {sig_data.sig_member_count > 1 && 's'}
                </Heading>
              </Box>
              <Spacer />
              <Button variant="ghost" size="sm">
                Manage members
              </Button>
            </Flex>

            <MemberList members={sig_members} />
          </VStack>
        </BaseCard>
      </Container>
      <form id="join-sig">
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
          }}
          size="xl"
        >
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Request to Join</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <Flex flexDir="column" gap={5}>
                <FormControl>
                  <FormLabel color="gray.600" mb={1}>
                    Name
                  </FormLabel>
                  <Text>{user_display_name}</Text>
                </FormControl>
                <FormControl>
                  <FormLabel color="gray.600" mb={1}>
                    Email
                  </FormLabel>
                  <Text>{user_email}</Text>
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.600" mb={1}>
                    Subject
                  </FormLabel>

                  <Text>{subject_line}</Text>
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.600" mb={1}>
                    Message{' '}
                  </FormLabel>

                  <Text>{message_content}</Text>
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="red" mr={3} onClick={handleRejectProposal}>
                Reject
              </Button>
              <Button colorScheme="teal" onClick={handleApproveProposal}>
                Approve
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default SIGTabsMembers;
