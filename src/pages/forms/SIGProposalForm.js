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
  Link,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Footer from '../../components/layout/Footer';
import { StoreContext } from '../../store/store';

const SIGProposalForm = () => {
  const [context, setContext] = useContext(StoreContext);
  const {
    current_user_id,
    current_user_display_name,
    current_user_pic,
    current_user_email,
  } = context;

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    sig_name: '',
    focus: '',
    common_goals: '',
    contributions: '',
    importance: '',
    frequency: '',
    usernames: '',
  });

  const {
    sig_name,
    focus,
    common_goals,
    contributions,
    importance,
    frequency,
    usernames,
  } = inputs;

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

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {
        current_user_id,
        sig_name,
        focus,
        common_goals,
        contributions,
        importance,
        frequency,
        usernames,
      };
      resultToast('success', 'SIG Proposal Form was submitted!');
      const proposalForm = await fetch(
        'http://localhost:5000/forms/sig-proposal',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
      navigate('/my-sigs')
      //window.location = window.location.href;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container maxW="1120px" minW="800px" flexDir="column">
      <Flex py="56px" maxW="1120px" gap={10} flexDir="column">
        <Heading as="h1" maxW="700px" fontSize="54px" fontWeight="light">
          SIG Proposal Form
        </Heading>
        <Flex flexDir="row">
          <Box
            bg="gray.100"
            borderRadius="12px"
            py="72px"
            px="80px"
            maxW="500px"
            maxH="412px"
            as={Flex}
            flexDir="column"
            gap={4}
          >
            <Text fontWeight="semibold">
              Want to start a shared-interest group?
            </Text>
            <Text>
              Great! Shared-interest groups are a great way to share and expand
              your field of knowledge, while making friends at the same time.
            </Text>
            <Text>
              Don’t worry, you can change these details later. We just want to
              get a sense of the SIG you want to create!
            </Text>
            <Text>
              Before submitting your proposal, please ensure you have read the
              guidelines{' '}
              <Link
                color="teal.500"
                href="http://localhost:3000/starting-a-sig"
              >
                here
              </Link>
              .
            </Text>
          </Box>
          <Spacer />
          <Container as={Flex} maxW="500px" flexDir="column" p={0}>
            <form id="sig-proposal" onSubmit={onSubmitForm}>
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
                    Suggested name of your SIG
                  </FormLabel>
                  <Input
                    name="sig_name"
                    value={sig_name}
                    placeholder="Suggested name"
                    onChange={e => onChange(e)}
                    isRequired
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
                    onChange={e => onChange(e)}
                    isRequired
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
                    onChange={e => onChange(e)}
                    isRequired
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
                    onChange={e => onChange(e)}
                    isRequired
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
                    onChange={e => onChange(e)}
                    isRequired
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
                    onChange={e => onChange(e)}
                    isRequired
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
                    onChange={e => onChange(e)}
                  />
                </FormControl>
              </Flex>
            </form>
            <Button
              type="submit"
              form="sig-proposal"
              colorScheme="teal"
              mt={10}
              size="lg"
            >
              Submit form
            </Button>
          </Container>
        </Flex>
      </Flex>
      <Spacer />
    </Container>
  );
};

export default SIGProposalForm;
