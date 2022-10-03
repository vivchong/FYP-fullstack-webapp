import {
  Flex,
  Text,
  Stack,
  Box,
  Spacer,
  Icon,
  HStack,
  useDisclosure,
  Button,
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
  Input, Textarea, 
} from '@chakra-ui/react';
import BaseCard from '../../components/layout/cards/BaseCard';
import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { BiCalendarAlt, BiTimeFive, BiUser } from 'react-icons/bi';
import SIGCard from '../../components/SIGCard';
import PendingForm from './PendingForm';
import { BiFlag } from 'react-icons/bi';
import { StoreContext } from '../../store/store';

const MySIGs = () => {
  // const [context, setContext] = useContext(StoreContext);
  // const {
  //   current_user_id,
  //   current_user_display_name,
  //   current_user_pic,
  //   current_user_email,
  // } = context;

    const { isOpen, onOpen, onClose } = useDisclosure();

  const [listOfMySIGs, setListOfMySIGs] = useState([]);
  const [pendingSIGProposals, setPendingSIGProposals] = useState([]);
  async function getPendingSIGForms() {

    try {
      const res = await fetch('http://localhost:5000/settings/pending-sig-proposals', {
        method: 'POST',
        headers: { token: localStorage.token },
      });
      const myFormsArray = await res.json();
      setPendingSIGProposals(myFormsArray);
      console.log(pendingSIGProposals);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function getMySIGs() {
    try {
      
      const res = await fetch('http://localhost:5000/settings/my-sigs', {
        method: 'POST',
        headers: { token: localStorage.token },
      });
      const mySIGsArray = await res.json();
      setListOfMySIGs(mySIGsArray);
      // console.log(listOfMySIGs); //[{sig_id: 1}, {sig_id: 2}]
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getPendingSIGForms();
    getMySIGs();
  }, []);

  const [form, setForm] = useState({
    form_id: 0,
    user_display_name: '',
    user_email: '',
    sig_name: '',
    focus: '',
    common_goals: '',
    contributions: '',
    importance: '',
    frequency: '',
    usernames: '',
  });

  const {
    form_id,
    user_display_name,
    user_email,
    sig_name,
    focus,
    common_goals,
    contributions,
    importance,
    frequency,
    usernames,
  } = form;

  const handleFormPreview = (pending) => {
    setForm({
      form_id: pending.form_id,
      user_display_name: pending.user_display_name,
      user_email: pending.user_email,
      sig_name: pending.sig_name,
      focus: pending.focus,
      common_goals: pending.common_goals,
      contributions: pending.contributions,
      importance: pending.importance,
      frequency: pending.frequency,
      usernames: pending.usernames,
    });
    
    // set all data here, and use placeholder in modal
  }
  return (
    <>
    <Flex px={16} py={4} flexDir="column" gap={8}>
      <Text fontSize="4xl">My SIGs</Text>
      <Stack spacing={8} maxW="824px" width="100%">
        {pendingSIGProposals.map(pending => (
          <>
            <Box bg="white" boxShadow="sm" py={6} pl={6} pr={20}>
              <Flex gap={10}>
                {/* <TimeIcon w={10} h={10} /> */}
                <Icon as={BiFlag} w={10} h={10} color="yellow.500" />
                <Flex flexDir="column" gap={2}>
                  <Text fontWeight="medium">Pending SIG Proposal Form</Text>
                  <Text>
                    Your proposal for creating "{<b>{pending.sig_name}</b>}" is
                    pending approval. Please wait for the SIG Head to get back
                    to you.
                  </Text>
                  <Flex>
                    <Spacer />
                    <Button
                      maxW="208px"
                      onClick={() => {
                        onOpen();
                        handleFormPreview(pending);
                      }}
                    >
                      View submitted form
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </>
        ))}
      </Stack>

      <Stack spacing={8} maxW="856px" width="100%">
        {listOfMySIGs.map(mySIG => (
          <SIGCard key={mySIG.sig_id} sig_id={mySIG.sig_id} />
        ))}
      </Stack>
    </Flex>
    <Modal isOpen={isOpen} onClose={onClose} size="full">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Text textAlign='center' fontWeight='light' fontSize="5xl">SIG Proposal Form #{form_id}</Text>
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
                            Usernames of members who will be joining you (if
                            any){' '}
                          </FormLabel>
                          <Textarea
                            name="usernames"
                            value={usernames}
                            placeholder="List of usernames"
                            isReadOnly
                            textColor="gray.700"
                          />
                        </FormControl>
                      </Flex>
                    </form>
                  </Container>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="teal" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
    </>
  );
};

export default MySIGs;
