import { ArrowForwardIcon, StarIcon } from '@chakra-ui/icons';
import {
  Flex,
  Button,
  Heading,
  Spacer,
  Box,
  Text,
  HStack,
  Icon,
  Avatar,
  VStack,
  Input,
  Textarea,
  useToast,
  ButtonGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  Tooltip,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { BiCalendarAlt, BiTimeFive, BiUser } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import SIGRecruitmentCard from '../../components/SIGRecruitmentCard';
import { StoreContext } from '../../store/store';

const EditSIGRecruitmentPage = () => {
  const sig_id = useParams().id;

  // CHECK IF USER IS Leader BY REQUESTING ROLE IN SIG
  const navigate = useNavigate();
  const [isLeader, setIsLeader] = useState(false);
  async function getRoleInSIG() {
    try {
      const body = { sig_id };

      const res = await fetch('http://localhost:5000/sig-dashboard/get-role', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
      const role = await res.json(); // parse data

      if (role === 3) {
        setIsLeader(true);
      } else {
        setIsLeader(false);
        return navigate(-1);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getRoleInSIG();
  }, []);

  const toast = useToast();

  const [recruitmentPage, setRecruitmentPage] = useState([]);

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
      console.log(leader);
    } catch (error) {
      console.error(error.message);
    }
  }

  // INITIALISING INPUT VALUES FROM DATABASE
  const [inputs, setInputs] = useState({});

  const {
    img_url,
    sig_name,
    topic,
    hook,
    introduction,
    // meeting_day,
    timing,
    sig_member_count,
    learn,
    contribute,
    idealmeetingday,
    user_display_name,
    user_email,
    published,
  } = inputs;

  const [meeting_day, setMeeting_day] = useState([]);

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onChangeMeetingDay = e => {
    setMeeting_day(e.target.value);
  };
  // Need to initialise back if they never save/publish
  const initialiseInputFields = () => {
    setMeeting_day(recruitmentPage.meeting_day);
    setInputs({
      img_url: recruitmentPage.sig_img_url,
      sig_name: recruitmentPage.sig_name,
      topic: recruitmentPage.sig_topic,
      hook: recruitmentPage.hook,
      introduction: recruitmentPage.introduction,
      // meeting_day: recruitmentPage.meeting_day,
      timing: recruitmentPage.timing,
      sig_member_count: recruitmentPage.sig_member_count,
      learn: recruitmentPage.learn,
      contribute: recruitmentPage.contribute,
      idealmeetingday: recruitmentPage.idealmeetingday,
      user_display_name: sigLeader.user_display_name,
      user_email: sigLeader.user_email,
      published: recruitmentPage.published,
    });
  };

  async function getRecruitmentPage() {
    try {
      const body = { sig_id };

      const res = await fetch(
        'http://localhost:5000/forms/get-sig-recruitment-page',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );
      const recruitmentPage = await res.json(); // parse data
      setRecruitmentPage(recruitmentPage);
      console.log(recruitmentPage);

      getSIGLeader();
    } catch (error) {
      console.error(error.message);
    }
  }

  const handlePublish = async e => {
    e.preventDefault();
    try {
      const body = {
        sig_id,
      };
      const publishPage = await fetch(
        'http://localhost:5000/forms/publish-sig-recruitment',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );
      toast({
        title: 'Your recruitment page is live!',
        description: 'Others can find your SIG',
        status: 'success',
        isClosable: true,
        position: 'top',
      });
      navigate('/sig-recruitment-page/' + sig_id);
      // window.location = window.location.href;
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      const body = {
        img_url,
        sig_id,
        topic,
        hook,
        introduction,
        meeting_day,
        timing,
        learn,
        contribute,
        idealmeetingday,
        published,
      };
      const updatePage = await fetch(
        'http://localhost:5000/forms/update-sig-recruitment',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      window.location = window.location.href;
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSavePublish = async e => {
    e.preventDefault();
    try {
      const body = {
        img_url,
        sig_id,
        topic,
        hook,
        introduction,
        meeting_day,
        timing,
        learn,
        contribute,
        idealmeetingday,
        published,
      };
      const updatePage = await fetch(
        'http://localhost:5000/forms/update-sig-recruitment',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      const publishPage = await fetch(
        'http://localhost:5000/forms/publish-sig-recruitment',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );
      navigate('/sig-recruitment-page/' + sig_id);

      // window.location = window.location.href;
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUnpublish = async e => {
    e.preventDefault();
    try {
      const body = {
        sig_id,
      };
      const unpublishPage = await fetch(
        'http://localhost:5000/forms/unpublish-sig-recruitment',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      window.location = window.location.href;
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getRecruitmentPage();
  }, []);

  useEffect(() => {
    initialiseInputFields();
  }, [recruitmentPage, sigLeader]);

  if (isLeader) {
    return (
      <Flex gap="48px" px="120px" py="48px">
        <Flex flexDir="column" gap="72px" maxW="1000px">
          <Flex flexDir="column" gap="40px">
            <Alert status="info">
              <AlertIcon />
              <AlertTitle>You are editing this recruitment page.</AlertTitle>
              Click on the text boxes to edit.
            </Alert>
            <Box p={5} bgColor="gray.100" borderRadius="md">
              <Text fontSize="lg" fontWeight="medium" mb={4}>
                Preview of SIG Card:
              </Text>
              <SIGRecruitmentCard
                sig_id={sig_id}
                topic={topic}
                name={recruitmentPage.sig_name}
                introduction={introduction}
                meeting_day={meeting_day}
                timing={timing}
                member_count={sig_member_count}
                frequency_interval={1}
                img_url={img_url}
              />
              <FormControl mt={4}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  name="img_url"
                  value={img_url}
                  onChange={onChange}
                  placeholder="Paste URL of image here"
                  bgColor="white"
                />
              </FormControl>
            </Box>

            <Box>
              <Text fontSize="lg" fontWeight="medium" mb={4}>
                Preview of SIG Recruitment Page:
              </Text>
              <Input
                name="topic"
                value={topic}
                onChange={onChange}
                placeholder="Topic of SIG"
                fontWeight="medium"
                textTransform="uppercase"
                letterSpacing="wide"
                size="md"
                w="300px"
              />
              <Text fontWeight="light" fontSize="54px">
                {recruitmentPage.sig_name}
              </Text>
              {/* <Flex mt={4}>
              <Tag>Tag</Tag>
            </Flex> */}
            </Box>
            <Box>
              <Textarea
                name="hook"
                value={hook}
                fontSize="24px"
                height="120px"
                onChange={onChange}
                placeholder="Write your hook here... For example: New to computer vision? Great! We can learn the theory together."
              ></Textarea>

              <Text mb={5} fontSize="24px"></Text>
              <Text></Text>
              <Textarea
                name="introduction"
                value={introduction}
                height="80px"
                onChange={onChange}
                placeholder="1-2 sentences to introduce and describe your group."
              ></Textarea>
            </Box>
            <Box>
              <Text as="b">Summary</Text>
              <Flex
                flexDir="column"
                gap={2}
                width="700px"
                bgColor="white"
                justifyContent="center"
                mt={3}
              >
                <Flex gap={3} width="700px" align="center">
                  <Icon as={BiCalendarAlt} color="gray.500" w="18px" h="18px" />
                  {/* <Input
                    name="meeting_day"
                    value={meeting_day}
                    onChange={onChangeMeetingDay}
                    placeholder="Write meeting day here"
                    size="md"
                    w="300px"
                  /> */}
                  <Select
                    // placeholder="Select meeting day"
                    name="meeting_day"
                    value={meeting_day}
                    maxW="300px"
                    onChange={onChangeMeetingDay}
                  >
                    <option value="Undecided">Undecided</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </Select>
                </Flex>

                <Flex gap={3} width="700px" align="center">
                  <Icon as={BiTimeFive} color="gray.500" w="18px" h="18px" />
                  <Input
                    name="timing"
                    value={timing}
                    onChange={onChange}
                    placeholder="Write starting and ending time here"
                    size="md"
                    w="300px"
                  />
                </Flex>

                <HStack spacing={3}>
                  <Icon as={BiUser} color="gray.500" w="18px" h="18px" />
                  <Box noOfLines={1} fontSize="sm" color="gray.700">
                    {sig_member_count} member
                    {sig_member_count > 1 ? 's' : ''}
                  </Box>
                </HStack>
              </Flex>
            </Box>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              width="328px"
              size="lg"
              isDisabled
            >
              Contact Leader{' '}
            </Button>
          </Flex>
          <Box>
            <Heading fontSize="28px" fontWeight="regular" mb={4}>
              What you can expect to learn
            </Heading>
            <Textarea
              name="learn"
              value={learn}
              onChange={onChange}
              placeholder="Write what members can expect to gain from joining your SIG"
            ></Textarea>
          </Box>
          <Box>
            <Heading fontSize="28px" fontWeight="regular" mb={4}>
              What you can expect to contribute
            </Heading>
            <Textarea
              name="contribute"
              value={contribute}
              onChange={onChange}
              placeholder="Write how members can expect to contribute to the SIG"
            ></Textarea>
          </Box>
          <Box>
            <Heading fontSize="28px" fontWeight="regular" mb={4}>
              Ideal meeting day and time
            </Heading>
            <Textarea
              name="idealmeetingday"
              value={idealmeetingday}
              onChange={onChange}
              placeholder="Write your ideal meeting day"
            ></Textarea>
          </Box>
          <Box>
            <Heading fontSize="28px" fontWeight="regular" mb={4}>
              SIG Leader
            </Heading>
            <HStack spacing={4} pb={5} alignItems="center">
              <Avatar
                name={sigLeader.user_display_name}
                src={sigLeader.user_pic}
              />
              <VStack alignItems="left" spacing={0}>
                <HStack spacing="6px">
                  <Heading
                    as="h6"
                    fontSize="md"
                    fontWeight="medium"
                    color="gray.700"
                  >
                    {user_display_name}
                  </Heading>

                  <StarIcon w={3} h={3} color="teal.500" />
                </HStack>
                <Text>{user_email}</Text>
              </VStack>
            </HStack>
          </Box>
          {!published ? (
            <ButtonGroup>
              <Tooltip label="Other learners can find this page">
                <Button variant="ghost" type="submit" onClick={handleSave}>
                  Save
                </Button>
              </Tooltip>
              <Button colorScheme="teal" onClick={handlePublish}>
                Publish
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup>
              <Button colorScheme="teal" onClick={handleSavePublish}>
                Save & Publish
              </Button>
              <Button onClick={handleUnpublish}>
                Make page private & save
              </Button>
            </ButtonGroup>
          )}
        </Flex>
        <Spacer />
      </Flex>
    );
  }
};

export default EditSIGRecruitmentPage;
