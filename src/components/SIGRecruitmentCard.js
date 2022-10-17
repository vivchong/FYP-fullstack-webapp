import { BiCalendarAlt, BiTimeFive, BiUser } from 'react-icons/bi';
import {
  Flex,
  Text,
  Box,
  Spacer,
  Icon,
  HStack,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useState, useEffect, Fragment } from 'react';

const SIGRecruitmentCard = ({ sig_id, topic, name, introduction, meeting_day, timing, member_count }) => {
  const [sigData, setSIGData] = useState([]);

  return (
    <LinkBox
      as={Flex}
      maxW="826px"
      minW="776px"
      bgColor="white"
      borderWidth="1px"
      borderRadius="12px"
      borderColor="gray.200"
      boxShadow="sm"
      overflow="hidden"
    >
      <Box as={Flex} bgColor="gray.400" h="160px" w="200px">
        Bg image here
      </Box>
      <Box
        as={Flex}
        bgColor="white"
        h="160px"
        w="full"
        flexDir="row"
        px="48px"
        py="24px"
        verticalAlign="center"
      >
        <Box
          as={Flex}
          bgColor="white"
          w="326px"
          flexDir="column"
          gap={2}
          justifyContent="center"
        >
          {topic ? (
            <Box
              as={Text}
              noOfLines={1}
              fontSize="xs"
              fontWeight="medium"
              textTransform="uppercase"
              letterSpacing="wide"
              color="gray.500"
            >
             {topic}
            </Box>
          ) : (
            <></>
          )}

          <Flex flexDir="column" gap={2} maxW="320px">
            <Box as={Text} noOfLines={1} fontSize="xl" fontWeight="medium">
              <LinkOverlay
                as={ReactRouterLink}
                to={'/sig-recruitment-page/' + sig_id}
              >
                {name}
              </LinkOverlay>
            </Box>
            <Box as={Text} noOfLines={2} fontSize="sm">
              {introduction
                ? introduction
                : 'No description yet'}
            </Box>
          </Flex>
        </Box>
        <Spacer />
        <Flex
          flexDir="column"
          gap={2}
          width="154px"
          bgColor="white"
          justifyContent="center"
        >
          <HStack spacing={3}>
            <Icon as={BiCalendarAlt} color="gray.500" w="18px" h="18px" />
            <Box noOfLines={1} fontSize="sm" color="gray.700">
              {meeting_day ? (
                meeting_day
              ) : (
                'No meeting day yet'
              )}
            </Box>
          </HStack>

          <HStack spacing={3}>
            <Icon as={BiTimeFive} color="gray.500" w="18px" h="18px" />
            <Box noOfLines={1} fontSize="sm" color="gray.700">
              {timing}
            </Box>
          </HStack>

          <HStack spacing={3}>
            <Icon as={BiUser} color="gray.500" w="18px" h="18px" />
            <Box noOfLines={1} fontSize="sm" color="gray.700">
              {member_count} member
              {member_count > 1 ? 's' : ''}
            </Box>
          </HStack>
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default SIGRecruitmentCard;
