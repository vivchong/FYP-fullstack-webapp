import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Flex,
  Spacer,
  Box,
  Center,
  Wrap,
  resolveStyleConfig,
} from '@chakra-ui/react';
import CheerBoardCard from '../../../components/sig-dashboard/CheerBoardCard';
import BigBaseCard from '../../../components/layout/cards/BigBaseCard';
import { AddIcon } from '@chakra-ui/icons';
import { useContext, useEffect, useState } from 'react';
import CheerBoardNewUpdateBtn from '../../../components/sig-dashboard/CheerBoardNewUpdateBtn';
import { StoreContext } from '../../../store/store';

// From SIGTabs.js
const SIGTabsCheerBoard = props => {
  const [updates, setUpdates] = useState([]);
  // const [context, setContext] = useContext(StoreContext);
  // const { refreshUpdates } = context;
  const { refreshUpdates } = useContext(StoreContext);

  const [streaks, setStreaks] = useState([])
  async function cheerboardMaintenance() {
    try {
      const res = await fetch(
        `http://localhost:5000/sig-dashboard/cheerboard-maintenance/${props.sig_id}`,
        {
          method: 'POST',
          headers: { token: localStorage.token },
        }
      );
      const streakArray = await res.json();
      setStreaks(streakArray)
      console.log(streaks);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getUpdates() {
    try {
      const res = await fetch(
        `http://localhost:5000/sig-dashboard/get-cheerboard-updates/${props.sig_id}`,
        {
          method: 'POST',
          headers: { token: localStorage.token },
        }
      );

      const updateArray = await res.json();
      setUpdates(updateArray);
      // console.log(updates);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    cheerboardMaintenance();
    getUpdates();
  }, [refreshUpdates]);

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

          <Text /* preserves line breaks */>
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

          <CheerBoardNewUpdateBtn sig_id={props.sig_id}>
            Share your progress
          </CheerBoardNewUpdateBtn>
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
              <Box align="center">
                <Text fontSize="2xl" fontWeight="semibold">
                  {streaks.sig_current_streak}
                </Text>
                <Text>Current streak</Text>
              </Box>
              <Box align="center">
                <Text fontSize="2xl" fontWeight="semibold">
                  {streaks.sig_longest_streak}
                </Text>
                <Text>Longest streak</Text>
              </Box>
            </HStack>
          </Flex>

          <Wrap spacing={10} align="center" justify="center" overflow="visible">
            {updates.map(update => (
              <CheerBoardCard
                key={update.update_id}
                data={update}
                sig_id={props.sig_id}
              />
            ))}
            {/* <CheerBoardCard />
            <CheerBoardCard /> */}
          </Wrap>
        </Flex>
      </BigBaseCard>
    </Container>
  );
};

export default SIGTabsCheerBoard;
