import {
  Container,
  Flex,
  Text,
  Stack,
  useToast,
  Heading,
  Spacer,
  HStack,
  Box,
  Icon,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button
} from '@chakra-ui/react';
import { useState, useEffect, useLayoutEffect, useContext, Fragment } from 'react';
import { BiCalendarAlt, BiTimeFive, BiUser } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import SIGRecruitmentCard from '../../components/SIGRecruitmentCard';
import { StoreContext } from '../../store/store';


const JoinSIGForm = () => {
  const sig_id = useParams().id;
  const [context, setContext] = useContext(StoreContext);
  const {
    current_user_id,
    current_user_display_name,
    current_user_pic,
    current_user_email,
  } = context;

  const [inputs, setInputs] = useState({
    subject: '',
    message: '',
  });

  const { subject, message } = inputs;

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
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

  // HANDLE FORM SUBMISSION
  const navigate = useNavigate();
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {
        current_user_id,
        sig_id,
        subject,
        message,
      };
      resultToast('success', 'Your message was sent!');
      const proposalForm = await fetch('http://localhost:5000/forms/join-sig', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      navigate('/my-sigs');
      //window.location = window.location.href;
    } catch (err) {
      console.error(err.message);
    }
  };

  // GET SIG DATA
  const [sigData, setSIGData] = useState([]);

  async function getSIGData() {
    const res = await fetch(
      `http://localhost:5000/sig-dashboard/get-sig-data/${sig_id}`
    );

    const sigDataArray = await res.json(); // parse data
    setSIGData(sigDataArray);
  }

  // GET SIG LEADER
  const [sigLeader, setSIGLeader] = useState([]);
  async function getSIGLeader() {
    try {
      const body = { sig_id };

      const res = await fetch('http://localhost:5000/forms/get-sig-leader', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
      const leader = await res.json(); // parse data
      setSIGLeader(leader);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getSIGData();
    getSIGLeader();
  }, []);

  return (
    <Container maxW="1120px" minW="800px" py="56px" flexDir="column">
      <Heading fontWeight="light" fontSize="54px" mb={10}>
        Contact SIG Leader{' '}
      </Heading>

      <Flex gap={8} align="flex-start" w="100%">
        <Box
          width="500px"
          bg="gray.100"
          borderRadius="12px"
          gap={2}
          p={20}
          as={Flex}
          direction="column"
        >
          <Text fontWeight="semibold">You're writing to...</Text>
          <Text>
            <b>{sigData.sig_name}</b> <br />
            Leader: {sigLeader.user_display_name}
          </Text>
          <Flex
            flexDir="column"
            gap={2}
            // width="254px"
            // justifyContent="center"
            mt="28px"
          >
            <HStack spacing={3}>
              <Icon as={BiCalendarAlt} color="gray.500" w="18px" h="18px" />
              <Box noOfLines={1} fontSize="sm" color="gray.700">
                {sigData.sig_meeting_day ? (
                  <Fragment>
                    {sigData.sig_frequency_interval == 1
                      ? 'Every ' + sigData.sig_meeting_day
                      : 'Every ' +
                        sigData.sig_frequency_interval +
                        ' ' +
                        sigData.sig_meeting_day +
                        's'}
                  </Fragment>
                ) : (
                  'No meeting day yet'
                )}
              </Box>
            </HStack>

            <HStack spacing={3}>
              <Icon as={BiTimeFive} color="gray.500" w="18px" h="18px" />
              <Box noOfLines={1} fontSize="sm" color="gray.700">
                {sigData.sig_start_time} - {sigData.sig_end_time}
              </Box>
            </HStack>

            <HStack spacing={3}>
              <Icon as={BiUser} color="gray.500" w="18px" h="18px" />
              <Box noOfLines={1} fontSize="sm" color="gray.700">
                {sigData.sig_member_count} member
                {sigData.sig_member_count > 1 ? 's' : ''}
              </Box>
            </HStack>
          </Flex>
        </Box>

        <Container
          as={Flex}
          direction="column"
          maxW="500px"
          borderRadius="12px"
        >
          <form id="join-sig" onSubmit={onSubmitForm}>
            <Flex flexDir="column" gap={5}>
              <FormControl>
                <FormLabel color="gray.600" mb={1}>
                  Name
                </FormLabel>
                <Text>{current_user_display_name}</Text>
              </FormControl>
              <FormControl>
                <FormLabel color="gray.600" mb={1}>
                  Email
                </FormLabel>
                <Text>{current_user_email}</Text>
              </FormControl>
              <FormControl>
                <FormLabel color="gray.600" mb={1}>
                  Subject{' '}
                </FormLabel>
                <Input
                  name="subject"
                  value={subject}
                  placeholder="Subject of message"
                  onChange={e => onChange(e)}
                  isRequired
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.600" mb={1}>
                  Message{' '}
                </FormLabel>
                <Textarea
                  name="message"
                  value={message}
                  placeholder="Message to SIG Leader"
                  onChange={e => onChange(e)}
                  isRequired
                />
              </FormControl>
            </Flex>
          </form>
          <Button
            type="submit"
            form="join-sig"
            colorScheme="teal"
            mt={10}
            w="138px"
          >
            Send message
          </Button>
        </Container>
      </Flex>
    </Container>
  );
};

export default JoinSIGForm;
