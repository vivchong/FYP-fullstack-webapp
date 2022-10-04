import {
  ArrowForwardIcon,
  EditIcon,
  StarIcon,
  CheckIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import {
  Flex,
  Button,
  Heading,
  Spacer,
  Tag,
  Box,
  Text,
  HStack,
  Icon,
  Avatar,
  VStack,
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
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  textDecoration,
  Link,
  useToast,
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
  useEditableControls,
  ButtonGroup,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { BiCalendarAlt, BiTimeFive, BiUser } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import { StoreContext } from '../../store/store';

const EditSIGRecruitmentPage = () => {
  const sig_id = useParams().id;
  const [context, setContext] = useContext(StoreContext);
  const { refreshSIGRecruitmentPage } = context;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // INITIALISING INPUT VALUES FROM DATABASE
  const [inputs, setInputs] = useState({});

  const {
    //    sig_name,
    //    sig_description,
    //    // sig_frequency_interval,
    //    sig_next_meeting,
    //    sig_meeting_day,
    //    sig_start_time,
    //    sig_end_time,
    //    sig_meeting_url,
    //    sig_meeting_password,
    //    sig_update_content,
  } = inputs;

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Need to initialise back if they never save/publish
  const initialiseInputFields = () => {
    // setSIG_frequency_interval(sig_data.sig_frequency_interval);
    setInputs({
      //   sig_name: sig_data.sig_name,
      //   sig_description: sig_data.sig_description,
      //   //sig_frequency_interval: 3,//sig_data.sig_frequency_interval,
      //   sig_next_meeting: moment(sig_data.sig_next_meeting)
      //     .utc()
      //     .format('YYYY-MM-DD'), //'2022-10-23',
      //   sig_meeting_day: sig_data.sig_meeting_day,
      //   sig_start_time: sig_data.sig_start_time,
      //   sig_end_time: sig_data.sig_end_time,
      //   sig_meeting_url: sig_data.sig_meeting_url,
      //   sig_meeting_password: sig_data.sig_meeting_password,
      //   sig_update_content: sig_data.sig_update_content,
    });
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {
        //   sig_id,
        //   sig_name,
        //   sig_description,
        //   sig_frequency_interval,
        //   sig_next_meeting,
        //   sig_meeting_day,
        //   sig_start_time,
        //   sig_end_time,
        //   sig_meeting_url,
        //   sig_meeting_password,
        //   sig_update_content,
      };
      const newSIGDetails = await fetch(
        'http://localhost:5000/sig-dashboard/edit-sig-details',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      //window.location = window.location.href;

      setContext({ refreshSIGRecruitmentPage: !refreshSIGRecruitmentPage });
      onClose();
      initialiseInputFields();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    toast({
      title: 'Editing SIG recruitment page',
      description: 'Click on text to edit',
      status: 'info',
      isClosable: true,
      position: 'top',
    });
  }, []);

  //   // FORM UI
  //   function EditableControls() {
  //     const {
  //       isEditing,
  //       getSubmitButtonProps,
  //       getCancelButtonProps,
  //       getEditButtonProps,
  //     } = useEditableControls();

  //     return isEditing ? (
  //       <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
  //         <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
  //         <IconButton
  //           icon={<CloseIcon boxSize={3} />}
  //           {...getCancelButtonProps()}
  //         />
  //       </ButtonGroup>
  //     ) : null;
  //   }

  return (
    <Flex gap="48px" px="120px" py="48px">
      <Flex flexDir="column" gap="72px" maxW="700px">
        <Flex flexDir="column" gap="40px">
          <Box>
            <Text
              fontWeight="light"
              fontSize="54px"
              
            >
              
              SIG NAME
            </Text>
            {/* <Flex mt={4}>
              <Tag>Tag</Tag>
            </Flex> */}
          </Box>
          <Box>
            <Textarea
              name="learn"
              // value={value}
              fontSize="24px"
              height="120px"
              onChange={onChange}
              placeholder="Write your hook here... For example: New to computer vision? Great! Let's learn the theory together."
            ></Textarea>

            <Text mb={5} fontSize="24px"></Text>
            <Text></Text>
            <Textarea
              name="learn"
              // value={value}
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
                <Input
                  placeholder="Write meeting day here"
                  size="md"
                  w="300px"
                />
              </Flex>

              <Flex gap={3} width="700px" align="center">
                <Icon as={BiTimeFive} color="gray.500" w="18px" h="18px" />
                <Input
                  placeholder="Write starting and ending time here"
                  size="md"
                  w="300px"
                />
              </Flex>

              <HStack spacing={3}>
                <Icon as={BiUser} color="gray.500" w="18px" h="18px" />
                <Box noOfLines={1} fontSize="sm" color="gray.700">
                  {/* {sigData.sig_member_count} member
                  {sigData.sig_member_count > 1 ? 's' : ''} */}
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
            // value={value}
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
            // value={value}
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
            // value={value}
            onChange={onChange}
            placeholder="Write your ideal meeting day"
          ></Textarea>
        </Box>
        <Box>
          <Heading fontSize="28px" fontWeight="regular" mb={4}>
            SIG Leader
          </Heading>
          <HStack spacing={4} pb={5} alignItems="center">
            <Avatar size="sm" name="NAME" />

            <VStack alignItems="left" spacing={0}>
              <HStack spacing="6px">
                <Heading
                  as="h6"
                  fontSize="md"
                  fontWeight="medium"
                  color="gray.700"
                >
                  NAME
                </Heading>

                <StarIcon w={3} h={3} color="teal.500" />
              </HStack>
            </VStack>
          </HStack>
        </Box>
        <Box
          py="54px"
          maxW="700px"
          bg="gray.100"
          borderRadius="12px"
          pl={20}
          pr="172px"
        >
          <Text fontSize="2xl" mb={4}>
            Take the next step{' '}
          </Text>
          <Text mb={4}>
            Want to ask questions about the activities or discuss meeting
            options with the leader? Reach out to them through this contact
            form.
          </Text>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            isDisabled
          >
            Contact leader
          </Button>
        </Box>
      </Flex>
      <Spacer />
    </Flex>
  );
};

export default EditSIGRecruitmentPage;
