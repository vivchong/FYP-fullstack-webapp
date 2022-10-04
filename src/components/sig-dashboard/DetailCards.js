import { Text, Heading, Button, VStack, Stack, HStack, Link } from '@chakra-ui/react';
import BaseCard from '../layout/cards/BaseCard';

const DetailCards = props => {
  return (
    <Stack spacing={8} maxW="856px" width="100%">
      <BaseCard>
        <VStack my={6} alignItems="flex-start" spacing={2}>
          <Heading as="h3" size="md" fontWeight="medium">
            Promote your group to other learners!
          </Heading>

          <Button
            as={Link}
            href={'http://localhost:3000/sig-recruitment-page/'+props.sigid}
            style={{ textDecoration: 'none' }}
          >
            Edit your recruitment page
          </Button>
        </VStack>
      </BaseCard>
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
            Next meeting
          </Heading>
          {props.starttime !== null &&
          props.endtime !== null &&
          props.meetingday !== null ? (
            <HStack spacing={3}>
              <Text as="p" noOfLines={5} mr={4}>
                {props.meetingday}
                {', '}
                {props.nextmeeting}
              </Text>
              <Text as="span">{props.starttime}</Text>
              <Text as="span">—</Text>
              <Text as="span">{props.endtime}</Text>
            </HStack>
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
          {isNaN(props.updates) ? (
            <Text noOfLines={10} mr={4}>
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
