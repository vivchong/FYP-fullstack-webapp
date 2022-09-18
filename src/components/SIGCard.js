import { BiCalendarAlt, BiTimeFive, BiUser } from 'react-icons/bi';
import {
  Flex,
  Text,
  Stack,
  Box,
  Spacer,
  Icon,
  HStack,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const SIGCard = ({sig_id}) => {
  

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
        flexDir="column"
        px="48px"
        py="24px"
        gap={2}
      >
        <Box
          as={Text}
          noOfLines={1}
          fontSize="xs"
          fontWeight="medium"
          textTransform="uppercase"
          letterSpacing="wide"
          color="gray.500"
        >
          Topic
        </Box>
        <Flex flexDir="row" gap={12}>
          <Flex flexDir="column" gap={2} maxW="320px">
            <Box as={Text} noOfLines={1} fontSize="xl" fontWeight="medium">
              <LinkOverlay as={ReactRouterLink} to='/'>Name of SIG {sig_id}</LinkOverlay>
            </Box>
            <Box as={Text} noOfLines={2} fontSize="sm">
              2-line description to introduce your SIG. Something enticing that
              captures attention. This is reallllllly long my goodness.
            </Box>
          </Flex>
          <Spacer />
          <Flex py={1} flexDir="column" gap={2} width="154px">
            <HStack spacing={3}>
              <Icon as={BiCalendarAlt} color="gray.500" w="18px" h="18px" />
              <Box noOfLines={1} fontSize="sm" color="gray.700">
                Every DAY
              </Box>
            </HStack>

            <HStack spacing={3}>
              <Icon as={BiTimeFive} color="gray.500" w="18px" h="18px" />
              <Box noOfLines={1} fontSize="sm" color="gray.700">
                STARTTIME - ENDTIME
              </Box>
            </HStack>

            <HStack spacing={3}>
              <Icon as={BiUser} color="gray.500" w="18px" h="18px" />
              <Box noOfLines={1} fontSize="sm" color="gray.700">
                _X_ members
              </Box>
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default SIGCard;
