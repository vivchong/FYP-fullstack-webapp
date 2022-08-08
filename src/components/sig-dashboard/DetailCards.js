import { Text, Heading, Button, VStack, Stack, HStack } from '@chakra-ui/react';
import BaseCard from '../layout/cards/BaseCard';

const DetailCards = props => {
 

  return (
    <Stack spacing={8} maxW="856px" width="100%">
      <BaseCard>
        <VStack my={6} alignItems="flex-start" spacing={2}>
          <Heading as="h3" size="md" fontWeight="medium">
            About
          </Heading>
          
          <Text as="p" noOfLines={5}>
            {props.about.split('\n').map(function (item, key) {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </Text>

          <Button variant="link" size="sm" fontWeight="medium" mt={0} mb={0}>
            See more
          </Button>
        </VStack>
      </BaseCard>

      <BaseCard>
        <VStack my={6} alignItems="flex-start" spacing={2}>
          <Heading as="h3" size="md" fontWeight="medium">
            Next meeting
          </Heading>
          <HStack spacing={3}>
            <Text as="p" noOfLines={5} mr={4}>
              {props.meetingday}, 12 August
            </Text>
            <Text as="span">{props.starttime}</Text>
            <Text as="span">—</Text>
            <Text as="span">{props.endtime}</Text>
          </HStack>
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
