import {
  Container,
  Stack,
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
} from '@chakra-ui/react';
import classes from '../SIGHeroBanner.module.css';
import BaseCard from '../../../components/layout/cards/BaseCard';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import MemberList from '../../../components/sig-dashboard/MemberList';

// MEMBER LIST HANDLER has to be here.
// This handler will find members of this SIG given the SIG ID from table:RoleInSIGs
// and extract the UserID and ROLE where SIGID = this SIG's
// Then, using the UserID, it will find the  UserDisplayName and UserPic from table:Users
// THE FOLLOWING is what I should get at the end, and will be passed into <MemberList />

// Need to sort the array here by alphabetical order first, then push the Leader(s) in front

const MEMBERS = [
  {
    userid: 1,
    userdisplayname: 'Lim Yun Ting',
    userpic: '',
    role: 'Leader',
  },
  {
    userid: 2,
    userdisplayname: 'James Yap',
    userpic: '',
    role: 'Leader',
  },
  {
    userid: 3,
    userdisplayname: 'Alexis Yeoh',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 4,
    userdisplayname: 'Bernice Tan',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 5,
    userdisplayname: 'Charis Wee',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 6,
    userdisplayname: 'Cristal Ho',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 7,
    userdisplayname: 'David Wee',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 8,
    userdisplayname: 'Denise Tan',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 9,
    userdisplayname: 'Elton Lim',
    userpic: '',
    role: 'Member',
  },
  {
    userid: 10,
    userdisplayname: 'Fenris',
    userpic: '',
    role: 'Member',
  },
];

const SIG_DETAILS = [
  {
    sigid: 1,
    signame: 'Computer Vision Buddies',
    sigdescription:
      "Welcome to Computer Vision Buddies! This is where we'll be sharing interesting readings in between meetings. Feel free to ask any questions related to computer vision here. \n\nWe meet every Friday at 6 PM. \n\nWhatsapp group: Link",
    sigfrequencyinterval: 'week',
    sigmeetingday: 'Friday',
    sigstarttime: '18:00',
    sigendtime: '19:00',
    longeststreak: 3,
    currentstreak: 1,
    updates: NaN,
    sigmeetinglink: 'https://ntu-sg.zoom.us/my/vivchong',
    sigmeetingpassword: 'WOOHOO',
    sigmembercount: 10,
  },
];

const SIGTabsAbout = () => {
  return (
    <Stack pt={4} className={classes.bannerfullwidth}>
      <Container /* 1-Column Flex Layout */
        px={10}
        maxW="856px"
        width="100%"
        display="flex"
        flexDirection="column"
        gap={8}
      >
        <BaseCard>
          <VStack my={6} alignItems="flex-start" spacing={2}>
            <Heading as="h3" size="md" fontWeight="medium">
              About
            </Heading>

            <Text as="p">
              {SIG_DETAILS[0].sigdescription
                .split('\n')
                .map(function (item, key) {
                  return (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  );
                })}
            </Text>
          </VStack>
        </BaseCard>

        <BaseCard>
          <VStack my={6} alignItems="flex-start" spacing={3}>
            <Heading as="h3" size="md" fontWeight="medium">
              Next meeting
            </Heading>
            <HStack spacing={3}>
              <Text as="p" noOfLines={5} mr={4}>
                {SIG_DETAILS[0].sigmeetingday}, 12 August
              </Text>
              <Text as="span">{SIG_DETAILS[0].sigstarttime}</Text>
              <Text as="span">—</Text>
              <Text as="span">{SIG_DETAILS[0].sigendtime}</Text>
            </HStack>
            <Divider pt={1} colorScheme="gray" />
            <VStack spacing={1} alignItems="flex-start">
              <Text>
                Meeting link:&nbsp;
                <Link
                  href={SIG_DETAILS[0].sigmeetinglink}
                  color="teal.500"
                  isExternal
                >
                  {SIG_DETAILS[0].sigmeetinglink}
                  <ExternalLinkIcon mx="2px" />
                </Link>
              </Text>
              <Text>Password: {SIG_DETAILS[0].sigmeetingpassword}</Text>
            </VStack>
          </VStack>
        </BaseCard>

        <BaseCard>
          <VStack my={6} alignItems="flex-start" spacing={2}>
            <Heading as="h3" size="md" fontWeight="medium">
              Updates
            </Heading>
            {isNaN(SIG_DETAILS[0].updates) ? (
              <Text noOfLines={10} mr={4}>
                There are currently no updates.
              </Text>
            ) : (
              <Text noOfLines={10} mr={4}>
                {SIG_DETAILS[0].updates}
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
                  {SIG_DETAILS[0].sigmembercount} Member
                  {SIG_DETAILS[0].sigmembercount > 1 && 's'}
                </Heading>
              </Box>
              <Spacer />
              <Button variant="ghost" size="sm">
                Manage members
              </Button>
            </Flex>

            <MemberList members={MEMBERS} />
          </VStack>
        </BaseCard>
      </Container>
    </Stack>
  );
};

export default SIGTabsAbout;
