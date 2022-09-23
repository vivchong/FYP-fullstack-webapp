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
  VStack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useState, useEffect, Fragment } from 'react';

const SIGCard = ({ sig_id }) => {
  const [sigData, setSIGData] = useState([]);

  async function getSIGData() {
    const res = await fetch(
      `http://localhost:5000/sig-dashboard/get-sig-data/${sig_id}`
    );

    const sigDataArray = await res.json(); // parse data
    setSIGData(sigDataArray);
  }

  useEffect(() => {
    getSIGData();
  }, []);

  // console.log(sigData);
  console.log('sig id: ' + sig_id);

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
          {sigData.sig_topic ? (
            <Box
              as={Text}
              noOfLines={1}
              fontSize="xs"
              fontWeight="medium"
              textTransform="uppercase"
              letterSpacing="wide"
              color="gray.500"
            >
              {sigData.sig_topic}
            </Box>
          ) : (
            <></>
          )}

          <Flex flexDir="column" gap={2} maxW="320px">
            <Box as={Text} noOfLines={1} fontSize="xl" fontWeight="medium">
              <LinkOverlay as={ReactRouterLink} to={"/sig/" + sigData.sig_id}>
                {sigData.sig_name}
              </LinkOverlay>
            </Box>
            <Box as={Text} noOfLines={2} fontSize="sm">
              {sigData.sig_description
                ? sigData.sig_description
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
              {sigData.sig_meeting_day ? (
                <Fragment>
                  {sigData.sig_frequency_interval == 1
                    ? 'Every ' + sigData.sig_meeting_day
                    : 'Every ' +
                      sigData.sig_frequency_interval +
                      ' ' +
                      sigData.sig_meeting_day +
                      's'}
                </Fragment>
              ) : (
                'No meeting day yet'
              )}
            </Box>
          </HStack>

          <HStack spacing={3}>
            <Icon as={BiTimeFive} color="gray.500" w="18px" h="18px" />
            <Box noOfLines={1} fontSize="sm" color="gray.700">
              {sigData.sig_start_time} - {sigData.sig_end_time}
            </Box>
          </HStack>

          <HStack spacing={3}>
            <Icon as={BiUser} color="gray.500" w="18px" h="18px" />
            <Box noOfLines={1} fontSize="sm" color="gray.700">
              {sigData.sig_member_count} member
              {sigData.sig_member_count > 1 ? 's' : ''}
            </Box>
          </HStack>
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default SIGCard;