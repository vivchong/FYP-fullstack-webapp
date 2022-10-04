import {
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  Spacer,
  Circle,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import moment from 'moment';

const SIGApprovals = props => {
  const [refresh, setRefresh] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pendingForms, setPendingForms] = useState([]);
  async function getPendingForms() {
    try {
      const res = await fetch(
        'http://localhost:5000/forms/all-pending-sig-proposals',
        {
          method: 'POST',
          headers: { token: localStorage.token },
        }
      );
      const pendingFormsArray = await res.json();
      setPendingForms(pendingFormsArray);
      console.log(pendingForms);
    } catch (err) {
      console.error(err.message);
    }
  }

  const [processedForms, setProcessedForms] = useState([]);
  async function getProcessedForms() {
    try {
      const res = await fetch(
        'http://localhost:5000/forms/all-processed-sig-proposals',
        {
          method: 'POST',
          headers: { token: localStorage.token },
        }
      );
      const processedFormsArray = await res.json();
      setProcessedForms(processedFormsArray);
      console.log(processedForms);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    getPendingForms();
    getProcessedForms();
  }, [refresh]);

  const [preview, setPreview] = useState({
    form_id: 0,
    user_id: 0,
    user_display_name: '',
    user_email: '',
    sig_name: '',
    focus: '',
    common_goals: '',
    contributions: '',
    importance: '',
    frequency: '',
    usernames: '',
    processed: false,
  });
  const {
    form_id,
    user_id,
    user_display_name,
    user_email,
    sig_name,
    focus,
    common_goals,
    contributions,
    importance,
    frequency,
    usernames,
    processed,
  } = preview;

  const handleFormPreview = form => {
    setPreview({
      form_id: form.form_id,
      user_id: form.user_id,
      user_display_name: form.user_display_name,
      user_email: form.user_email,
      sig_name: form.sig_name,
      focus: form.focus,
      common_goals: form.common_goals,
      contributions: form.contributions,
      importance: form.importance,
      frequency: form.frequency,
      usernames: form.usernames,
      processed: form.processed,
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
      };
      const rejectProposal = await fetch(
        'http://localhost:5000/forms/reject-sig-proposal',
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
        resultToast('warning', 'SIG Proposal was rejected')
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
        sig_name
      };
      const approveProposal = await fetch(
        'http://localhost:5000/forms/approve-sig-proposal',
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
      const new_sig_id = newSIGRow[0].sig_id
      
      const leader = {user_id, new_sig_id}
      const addSIGLeader = await fetch(
        'http://localhost:5000/forms/add-sig-leader',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(leader),
        }
      );
      setRefresh(!refresh);
      
      // const addLeaderToGroup = await fetch(

      // )
        resultToast('success', 'SIG Proposal was approved!');
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <Heading mt="60px" ml="56px" fontSize="3xl">
        SIG Approvals
      </Heading>
      <Tabs mt={4} colorScheme="teal">
        <TabList>
          <Tab ml={14}>Pending Approval</Tab>
          <Tab>Previously Procesed</Tab>
        </TabList>

        <TabPanels px={14}>
          <TabPanel>
            <TableContainer
              maxW="976px"
              bg="white"
              borderRadius="12px"
              borderWidth="1px"
              borderColor="gray.200"
              p={3}
            >
              <Table>
                {pendingForms.length === 0 ? (
                  <TableCaption>Woohoo! No pending forms!</TableCaption>
                ) : (
                  <></>
                )}
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Submitted by</Th>
                    <Th>Submitted on</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {pendingForms.map(form => {
                    const date = moment(form.submitted_on)
                      .utc()
                      .format('DD-MM-YYYY');
                    return (
                      <Tr key={form.form_id}>
                        <Td fontWeight="medium">
                          SIG Proposal Form #{form.form_id}
                        </Td>
                        <Td>{form.user_display_name}</Td>
                        <Td>{date}</Td>
                        <Td>
                          <Flex flexDir="row" align="center" gap={2}>
                            <Circle bg="yellow.500" size={2} mt="2px" />
                            <Text>Pending</Text>
                          </Flex>
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
                {/* <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th>multiply by</Th>
                  </Tr>
                </Tfoot> */}
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel>
            <TableContainer
              maxW="976px"
              bg="white"
              borderRadius="12px"
              borderWidth="1px"
              borderColor="gray.200"
              p={3}
            >
              <Table>
                {processedForms.length === 0 ? (
                  <TableCaption>No forms have been processed yet</TableCaption>
                ) : (
                  <></>
                )}
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Submitted by</Th>
                    <Th>Submitted on</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {processedForms.map(form => {
                    const date = moment(form.submitted_on)
                      .utc()
                      .format('DD-MM-YYYY');
                    return (
                      <Tr key={form.form_id}>
                        <Td fontWeight="medium">
                          SIG Proposal Form #{form.form_id}
                        </Td>
                        <Td>{form.user_display_name}</Td>
                        <Td>{date}</Td>
                        <Td>
                          <Flex flexDir="row" align="center" gap={2}>
                            {form.approved ? (
                              <>
                                <Circle bg="green.500" size={2} mt="2px" />
                                <Text>Approved</Text>
                              </>
                            ) : (
                              <>
                                <Circle bg="red.500" size={2} mt="2px" />
                                <Text>Rejected</Text>
                              </>
                            )}
                          </Flex>
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
                {/* <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th>multiply by</Th>
                  </Tr>
                </Tfoot> */}
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textAlign="center" fontWeight="light" fontSize="5xl">
              SIG Proposal Form #{form_id}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container as={Flex} maxW="500px" flexDir="column" p={0}>
              <form id="sig-proposal">
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
                      Suggested name of your SIG
                    </FormLabel>
                    <Input
                      name="sig_name"
                      value={sig_name}
                      placeholder="Suggested name"
                      isReadOnly
                      textColor="gray.700"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="gray.600" mb={1}>
                      Focus of the SIG
                    </FormLabel>
                    <Input
                      name="focus"
                      value={focus}
                      placeholder="Any topic or skill"
                      isReadOnly
                      textColor="gray.700"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="gray.600" mb={1}>
                      Common goal(s) for the group
                    </FormLabel>
                    <Input
                      name="common_goals"
                      value={common_goals}
                      placeholder="Goals for the group to work towards"
                      isReadOnly
                      textColor="gray.700"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="gray.600" mb={1}>
                      How may members contribute to the group?
                    </FormLabel>
                    <Textarea
                      name="contributions"
                      value={contributions}
                      placeholder="Description of how members may contribute to the collaborative learning"
                      isReadOnly
                      textColor="gray.700"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="gray.600" mb={1}>
                      Why is creating this SIG important to you?{' '}
                    </FormLabel>
                    <Textarea
                      name="importance"
                      value={importance}
                      placeholder="This SIG is important to me because..."
                      isReadOnly
                      textColor="gray.700"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="gray.600" mb={1}>
                      How often do you plan to meet?{' '}
                    </FormLabel>
                    <Input
                      name="frequency"
                      value={frequency}
                      placeholder="Frequency of meetings"
                      isReadOnly
                      textColor="gray.700"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="gray.600" mb={1}>
                      Usernames of members who will be joining you (if any){' '}
                    </FormLabel>
                    <Textarea
                      name="usernames"
                      value={usernames}
                      placeholder="List of usernames"
                      isReadOnly
                      textColor="gray.700"
                    />
                  </FormControl>
                  <Flex>
                    <Spacer />
                    {!processed ? (
                      <>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                          Return to SIG approvals
                        </Button>
                        <Button
                          colorScheme="red"
                          mr={3}
                          onClick={handleRejectProposal}
                        >
                          Reject
                        </Button>
                        <Button
                          colorScheme="teal"
                          onClick={handleApproveProposal}
                        >
                          Approve
                        </Button>
                      </>
                    ) : (
                      <Button colorScheme="teal" onClick={onClose}>
                        Close
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </form>
            </Container>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SIGApprovals;
