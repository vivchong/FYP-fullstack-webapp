import React, { useContext, useState } from 'react';
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
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
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

// const SIG_DETAILS = [
//   {
//     sigid: 1,
//     signame: 'Computer Vision Buddies',
//     sigdescription:
//       "Welcome to Computer Vision Buddies! This is where we'll be sharing interesting readings in between meetings. Feel free to ask any questions related to computer vision here. \n\nWe meet every Friday at 6 PM. \n\nWhatsapp group: Link",
//     sigfrequencyinterval: 'week',
//     sigmeetingday: 'Friday',
//     sigstarttime: '18:00',
//     sigendtime: '19:00',
//     longeststreak: 3,
//     currentstreak: 1,
//     updates: NaN,
//     sigmeetinglink: 'https://ntu-sg.zoom.us/my/vivchong',
//     sigmeetingpassword: 'WOOHOO',
//     sigmembercount: 10,
//   },
// ];

// FROM SIGTabs.js FROM SIGDashboardPage.js
const SIGTabsAbout = ({ sig_id, sig_data, sig_members }) => {
  // const [context, setContext] = useContext(StoreContext);
  // const { refreshSIGData } = context;
  const { refreshSIGData, setRefreshSIGData } = useContext(StoreContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // CHANGING FOCUS IN MODAL BASED ON WHERE EDIT IS CLICKED
  const aboutRef = React.useRef(null);
  const meetingRef = React.useRef(null);
  const updatesRef = React.useRef(null);
  const [initialRef, setInitialRef] = useState();

  // INITIALISING INPUT VALUES FROM DATABASE
  const [inputs, setInputs] = useState({
    sig_name: sig_data.sig_name,
    sig_description: sig_data.sig_description,
    //sig_frequency_interval: 3,//sig_data.sig_frequency_interval,
    sig_next_meeting: moment(sig_data.sig_next_meeting)
      .utc()
      .format('YYYY-MM-DD'), //'2022-10-23',
    sig_meeting_day: sig_data.sig_meeting_day,
    sig_start_time: sig_data.sig_start_time,
    sig_end_time: sig_data.sig_end_time,
    sig_meeting_url: sig_data.sig_meeting_url,
    sig_meeting_password: sig_data.sig_meeting_password,
    sig_update_content: sig_data.sig_update_content,
  });

  const [sig_frequency_interval, setSIG_frequency_interval] = useState(
    sig_data.sig_frequency_interval
  );

  // the NumberInput component by Chakra was causing a bug that didn't allow the value to be controlled when it was grouped with the rest
  const handleFreqInterval = value => setSIG_frequency_interval(value);

  const {
    sig_name,
    sig_description,
    // sig_frequency_interval,
    sig_next_meeting,
    sig_meeting_day,
    sig_start_time,
    sig_end_time,
    sig_meeting_url,
    sig_meeting_password,
    sig_update_content,
  } = inputs;

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const initialiseInputFields = () => {
    setSIG_frequency_interval(sig_data.sig_frequency_interval);
    setInputs({
      sig_name: sig_data.sig_name,
      sig_description: sig_data.sig_description,
      //sig_frequency_interval: 3,//sig_data.sig_frequency_interval,
      sig_next_meeting: moment(sig_data.sig_next_meeting)
        .utc()
        .format('YYYY-MM-DD'), //'2022-10-23',
      sig_meeting_day: sig_data.sig_meeting_day,
      sig_start_time: sig_data.sig_start_time,
      sig_end_time: sig_data.sig_end_time,
      sig_meeting_url: sig_data.sig_meeting_url,
      sig_meeting_password: sig_data.sig_meeting_password,
      sig_update_content: sig_data.sig_update_content,
    });
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {
        sig_id,
        sig_name,
        sig_description,
        sig_frequency_interval,
        sig_next_meeting,
        sig_meeting_day,
        sig_start_time,
        sig_end_time,
        sig_meeting_url,
        sig_meeting_password,
        sig_update_content,
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

      // setContext({ refreshSIGData: !refreshSIGData });
      setRefreshSIGData(!refreshSIGData);
      onClose();
      initialiseInputFields();
    } catch (err) {
      console.error(err.message);
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
        <BaseCard /* ABOUT card */>
          <VStack my={6} alignItems="flex-start" spacing={2}>
            <HStack>
              <Heading as="h3" size="md" fontWeight="medium">
                About
              </Heading>
              <IconButton
                onClick={() => {
                  setInitialRef(aboutRef);
                  onOpen();
                }}
                size="xs"
                icon={<EditIcon />}
              />
            </HStack>
            {sig_data.sig_description === null ? (
              <Text as="i">No description yet.</Text>
            ) : (
              <Text as="p">{sig_data.sig_description}</Text>
            )}
          </VStack>
        </BaseCard>

        <BaseCard>
          <VStack my={6} alignItems="flex-start" spacing={3}>
            <HStack>
              {/* <Heading as="h3" size="md" fontWeight="medium">
                Next meeting
              </Heading>
              <IconButton
                onClick={() => {
                  setInitialRef(meetingRef);
                  onOpen();
                }}
                size="xs"
                icon={<EditIcon />}
              /> */}
              <Heading as="h3" size="md" fontWeight="medium">
                Meeting Details
              </Heading>
              <IconButton
                onClick={() => {
                  setInitialRef(meetingRef);
                  onOpen();
                }}
                size="xs"
                icon={<EditIcon />}
              />
            </HStack>
            {sig_data.sig_meeting_day !== 'Undecided' ? (
              <Text as="p" noOfLines={5} mr={4}>
                {sig_data.sig_frequency_interval == 1
                  ? 'Every ' + sig_data.sig_meeting_day
                  : 'Every ' +
                    sig_data.sig_frequency_interval +
                    ' ' +
                    sig_data.sig_meeting_day +
                    's'}
              </Text>
            ) : (
              <Text as="i" noOfLines={5} mr={4}>
                Meeting day has not been decided!
              </Text>
            )}
            {sig_data.sig_start_time !== null &&
            sig_data.sig_end_time !== null ? (
              <HStack spacing={3}>
                <Text as="span">{sig_data.sig_start_time}</Text>
                <Text as="span">—</Text>
                <Text as="span">{sig_data.sig_end_time}</Text>
              </HStack>
            ) : (
              <HStack spacing={3}>
                <Text as="i" noOfLines={5} mr={4}>
                  Meeting time has not been decided!
                </Text>
              </HStack>
            )}

            {sig_data.sig_meeting_url ? (
              <>
                <Divider pt={1} colorScheme="gray" />
                <VStack spacing={1} alignItems="flex-start">
                  <Text>
                    Meeting link:&nbsp;
                    <Link href={sig_meeting_url} color="teal.500" isExternal>
                      {sig_data.sig_meeting_url}
                      <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Text>
                  {sig_data.sig_meeting_password ? (
                    <Text>Password: {sig_data.sig_meeting_password}</Text>
                  ) : (
                    <></>
                  )}
                </VStack>
              </>
            ) : (
              <></>
            )}
          </VStack>
        </BaseCard>

        <BaseCard>
          <VStack my={6} alignItems="flex-start" spacing={2}>
            <HStack>
              <Heading as="h3" size="md" fontWeight="medium">
                Updates
              </Heading>
              <IconButton
                onClick={() => {
                  setInitialRef(updatesRef);
                  onOpen();
                }}
                size="xs"
                icon={<EditIcon />}
              />
            </HStack>
            {sig_data.sig_update_content ? (
              <Text noOfLines={10} mr={4}>
                {sig_data.sig_update_content}
              </Text>
            ) : (
              <Text noOfLines={10} mr={4}>
                There are currently no updates.
              </Text>
            )}
          </VStack>
        </BaseCard>

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
      <form id="edit-sig" onSubmit={onSubmitForm}>
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            initialiseInputFields();
          }}
          size="xl"
        >
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Edit SIG page</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>SIG name</FormLabel>
                <Input
                  name="sig_name"
                  value={sig_name}
                  placeholder="SIG name"
                  isRequired
                  onChange={e => onChange(e)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>About</FormLabel>
                <Textarea
                  name="sig_description"
                  value={sig_description}
                  ref={aboutRef}
                  placeholder="Brief description of SIG"
                  onChange={e => onChange(e)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Meeting Day</FormLabel>
                <Select
                  // placeholder="Select meeting day"
                  name="sig_meeting_day"
                  value={sig_meeting_day}
                  ref={meetingRef}
                  maxW="260px"
                  onChange={e => onChange(e)}
                >
                  <option value="Undecided">Undecided</option>
                  <option value="Monday">Monday</option>
                </Select>
              </FormControl>
              <Flex flexDir="row" gap={2}>
                <FormControl mt={4}>
                  <FormLabel>Meeting start time</FormLabel>
                  <Input
                    name="sig_start_time"
                    value={sig_start_time}
                    placeholder="Starting time"
                    type="time"
                    onChange={e => onChange(e)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Meeting end time</FormLabel>
                  <Input
                    name="sig_end_time"
                    value={sig_end_time}
                    placeholder="Ending time"
                    type="time"
                    onChange={e => onChange(e)}
                  />
                </FormControl>
              </Flex>

              <Flex flexDir="row" gap={2} mt={4} align="center">
                <Text>Repeat every</Text>
                <Box>
                  <NumberInput
                    name="sig_frequency_interval"
                    value={sig_frequency_interval}
                    // onChange={() => {setInputs({})}
                    // }
                    onChange={handleFreqInterval}
                    defaultValue={1}
                    min={1}
                    max={6}
                    w="60px"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Text>week(s)</Text>
              </Flex>

              <FormControl mt={4}>
                <FormLabel>Meeting link</FormLabel>
                <Input
                  name="sig_meeting_url"
                  value={sig_meeting_url}
                  placeholder="Meeting link URL"
                  onChange={e => onChange(e)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Meeting password</FormLabel>
                <Input
                  name="sig_meeting_password"
                  value={sig_meeting_password}
                  placeholder="Meeting password"
                  onChange={e => onChange(e)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Updates</FormLabel>
                <Textarea
                  name="sig_update_content"
                  value={sig_update_content}
                  ref={updatesRef}
                  placeholder="Tell the group something important"
                  onChange={e => onChange(e)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} form="edit-sig" type="submit">
                Save
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  initialiseInputFields();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default SIGTabsAbout;
