import { ArrowForwardIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
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
  useDisclosure,

} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiCalendarAlt, BiTimeFive, BiUser } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import { StoreContext } from '../../store/store';

const SIGRecruitmentPage = () => {
  const sig_id = useParams().id;

    
   // GET INFO FROM DATABASE
   const [recruitmentPage, setRecruitmentPage] = useState([])
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
        } catch (error) {
            console.error(error.message);
        }
        
      // if (sigData.length == 0) {
      //   console.log('No SIG exists');
      //   setNoSIGFound(true)
      // }
  }
  
  // GET SIG LEADER
  const [sigLeader, setSIGLeader] = useState([]);
  async function getSIGLeader() {
    try {
      const body = { sig_id };

      const res = await fetch(
        'http://localhost:5000/forms/get-sig-leader',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );
      const leader = await res.json(); // parse data
      setSIGLeader(leader);
      console.log(leader);
    } catch (error) {
      console.error(error.message);
    }

  }

    useEffect(() => {
      getRecruitmentPage();
      getSIGLeader();
    }, []);


  
  return (
    <Flex gap="48px" px="120px" py="48px">
      <Flex flexDir="column" gap="72px" maxW="700px">
        <Flex flexDir="column" gap="40px">
          <Box>
            <Heading fontWeight="light" fontSize="54px">
              {recruitmentPage.sig_name}
            </Heading>
            {/* <Flex mt={4}>
              <Tag>Tag</Tag>
            </Flex> */}
          </Box>
          <Box>
            <Text mb={5} fontSize="24px">
              {recruitmentPage.hook}
            </Text>
            <Text>{recruitmentPage.introduction}</Text>
          </Box>
          <Box>
            <Text as="b">Summary</Text>
            <Flex
              flexDir="column"
              gap={2}
              width="254px"
              bgColor="white"
              justifyContent="center"
              mt={3}
            >
              <HStack spacing={3}>
                <Icon as={BiCalendarAlt} color="gray.500" w="18px" h="18px" />
                <Box noOfLines={1} fontSize="sm" color="gray.700">
                  {recruitmentPage.meeting_day}
                </Box>
              </HStack>

              <HStack spacing={3}>
                <Icon as={BiTimeFive} color="gray.500" w="18px" h="18px" />
                <Box noOfLines={1} fontSize="sm" color="gray.700">
                  {recruitmentPage.timing}
                </Box>
              </HStack>

              <HStack spacing={3}>
                <Icon as={BiUser} color="gray.500" w="18px" h="18px" />
                <Box noOfLines={1} fontSize="sm" color="gray.700">
                  {recruitmentPage.sig_member_count} member
                  {recruitmentPage.sig_member_count > 1 ? 's' : ''}
                </Box>
              </HStack>
            </Flex>
          </Box>
          <Button
            as={ReactRouterLink}
            to={'/join-sig/' + sig_id}
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            width="328px"
            size="lg"
          >
            Contact Leader
          </Button>
        </Flex>
        <Box>
          <Heading fontSize="28px" fontWeight="regular" mb={4}>
            What you can expect to learn
          </Heading>
          <Text>{recruitmentPage.learn}</Text>
        </Box>
        <Box>
          <Heading fontSize="28px" fontWeight="regular" mb={4}>
            What you can expect to contribute
          </Heading>
          <Text>{recruitmentPage.contribute}</Text>
        </Box>
        <Box>
          <Heading fontSize="28px" fontWeight="regular" mb={4}>
            Ideal meeting day and time
          </Heading>
          <Text>{recruitmentPage.idealmeetingday}</Text>
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
                  {sigLeader.user_display_name}
                </Heading>

                <StarIcon w={3} h={3} color="teal.500" />
              </HStack>
              <Text>{sigLeader.user_email}</Text>
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
            as={ReactRouterLink}
            to={'/join-sig/' + sig_id}
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
          >
            Contact leader
          </Button>
        </Box>
      </Flex>
      <Spacer />
      <Button
        as={ReactRouterLink}
        to={'/edit/sig-recruitment-page/' + sig_id}
        leftIcon={<EditIcon />}
      >
        Edit page
      </Button>
      {/* <form id="edit-sig" onSubmit={onSubmitForm}>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
          }}
          size="full"
        >
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>
              <Text textAlign="center" fontWeight="light" fontSize="5xl">
                SIG NAME
              </Text>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}></ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} form="edit-sig" type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form> */}
    </Flex>
  );
};

export default SIGRecruitmentPage;
