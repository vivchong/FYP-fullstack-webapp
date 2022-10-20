import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Text,
  Heading,
  Button,
  VStack,
  Stack,
  HStack,
  Link,
} from '@chakra-ui/react';
import BaseCard from '../layout/cards/BaseCard';

const DetailCards = props => {
  return (
    <Stack spacing={8} maxW="856px" width="100%">
      {props.role === 3 ? (
        <BaseCard>
          <VStack my={6} alignItems="flex-start" spacing={2}>
            <Heading as="h3" size="md" fontWeight="medium">
              Promote your group to other learners!
            </Heading>
            <Text as="i" pb={2}>
              Only the SIG Leader can see this card
            </Text>
            <Button
              as={Link}
              href={'http://localhost:3000/sig-recruitment-page/' + props.sigid}
              style={{ textDecoration: 'none' }}
            >
              Edit your recruitment page
            </Button>
          </VStack>
        </BaseCard>
      ) : (
        <></>
      )}

      <BaseCard>
        <VStack my={6} alignItems="flex-start" spacing={2}>
          <Heading as="h3" size="md" fontWeight="medium">
            About
          </Heading>

          <Text as="p" noOfLines={5}>
            {props.about}
          </Text>
        </VStack>
      </BaseCard>

      <BaseCard>
        <VStack my={6} alignItems="flex-start" spacing={2}>
          <Heading as="h3" size="md" fontWeight="medium">
            Meeting Details
          </Heading>
          {props.meetingday !== 'Undecided' ? (
            <Text as="p" noOfLines={5} mr={4}>
              {props.sig_frequency_interval == 1
                ? 'Every ' + props.meetingday
                : 'Every ' +
                  props.frequencyinterval +
                  ' ' +
                  props.meetingday +
                  's'}
            </Text>
          ) : (
            <Text as="i" noOfLines={5} mr={4}>
              Meeting day has not been decided!
            </Text>
          )}
          {props.starttime !== null && props.endtime !== null ? (
            <HStack spacing={3}>
              <Text as="span">{props.starttime}</Text>
              <Text as="span">—</Text>
              <Text as="span">{props.endtime}</Text>
            </HStack>
          ) : (
            <HStack spacing={3}>
              <Text as="i" noOfLines={5} mr={4}>
                Meeting time has not been decided!
              </Text>
            </HStack>
          )}
          {props.url ? (
            <>
              <VStack spacing={1} alignItems="flex-start">
                <Text>
                  Meeting link:&nbsp;
                  <Link href={props.url} color="teal.500" isExternal>
                    {props.url}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                </Text>
                {props.sig_meeting_password ? (
                  <Text>Password: {props.sig_meeting_password}</Text>
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
          <Heading as="h3" size="md" fontWeight="medium">
            Updates
          </Heading>
          {!props.updates ? (
            <Text as="i" noOfLines={10} mr={4}>
              There are currently no updates.
            </Text>
          ) : (
            <Text noOfLines={10} mr={4}>
              {props.updates}
            </Text>
          )}
        </VStack>
      </BaseCard>
    </Stack>
  );
};
export default DetailCards;

// Based on card in CreatePost
