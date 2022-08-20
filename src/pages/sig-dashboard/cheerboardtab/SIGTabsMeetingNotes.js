import { Container, VStack, Heading, Text, Button, HStack, Flex, Spacer, Box, Center } from '@chakra-ui/react';
import CheerBoardCard from '../../../components/sig-dashboard/CheerBoardCard';
import BigBaseCard from '../../../components/layout/cards/BigBaseCard';
import { AddIcon } from '@chakra-ui/icons';

const SIGTabsCheerBoard = () => {
  return (
    <Container /* 1-Column Flex Layout */
      px={10}
      pt={4}
      maxW="936px"
      width="100%"
      display="flex"
      flexDirection="column"
      gap={8}
    >
      <BigBaseCard>
        <VStack my={6} alignItems="flex-start" spacing={6}>
          <VStack align="left" spacing={0}>
            <Heading as="h3" size="md" fontWeight="medium" lineHeight="tight">
              Cheer Board
            </Heading>
            <Text size="lg" mt={0}>
              Week of 8 Aug 2022
            </Text>
          </VStack>

          <Text as="p" /* preserves line breaks */>
            Share your progress this week with your team! <br />
            <br />
            Celebrate your small wins with your group and cheer each other on!
            Any progress, no matter how small is worth celebrating! What matters
            is consistency and showing up to build a habit of continous
            learning. <br />
            <br />
            Posts on the Cheer Board will disappear every Sunday, so keep coming
            back to update it.
          </Text>

          <Button leftIcon={<AddIcon w={2.5} h={2.5} />} colorScheme="teal">
            Share your progress
          </Button>
        </VStack>
      </BigBaseCard>

      <BigBaseCard>
        <Flex direction="column" alignItems="flex-start" my={6} gap={6}>
          <Flex width="100%" alignContent="space-between">
            <Box>
              <Flex direction="column" gap={2} maxW={426}>
                <Heading
                  as="h3"
                  size="md"
                  fontWeight="medium"
                  lineHeight="tight"
                  align="left"
                >
                  Group Streak
                </Heading>
                <Text>
                  Number of consecutive weeks that most of us have achieved our
                  individual weekly goals
                </Text>
              </Flex>
            </Box>

            <Spacer />

            <HStack direction="column" spacing={10} px={4}>
              <Box>
                <Center>
                  <Text align="center">
                    <Text fontSize="2xl" fontWeight="semibold">
                      2
                    </Text>
                    Current streak
                  </Text>
                </Center>
              </Box>
              <Box>
                <Center>
                  <Text align="center">
                    <Text fontSize="2xl" fontWeight="semibold">
                      5
                    </Text>
                    Longest streak
                  </Text>
                </Center>
              </Box>
            </HStack>
          </Flex>

          <Flex>
            <CheerBoardCard />
          </Flex>
        </Flex>
      </BigBaseCard>
    </Container>
  );
};

export default SIGTabsCheerBoard;
