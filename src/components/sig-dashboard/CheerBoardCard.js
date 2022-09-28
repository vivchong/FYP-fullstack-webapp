import {
  VStack,
  ButtonGroup,
  SlideFade,
  IconButton,
  Box,
  Text,
  Avatar,
  Flex,
  Fade,
  RadioGroup,
  useRadioGroup,
  Circle,
  useBoolean,
} from '@chakra-ui/react';
import Emoji from 'a11y-react-emoji';
import { Fragment, useEffect, useState } from 'react';
import ReactionChip from './cheerboard/ReactionChip';

import ReactionMenu from './ReactionMenu';

const CheerBoardCard = props => {
  // CHECK PREVIOUS REACTION, IF ANY, TO HIGHLIGHT SELECTED REACTION
  const [reacted, setReacted] = useState(''); // string
  async function checkPreviousReaction() {
    // to be ran on first render
    try {
      const res = await fetch(
        `http://localhost:5000/sig-dashboard/check-prev-reaction/${props.data.update_id}/${sessionStorage.current_user_id}`,
        {
          method: 'POST',
          headers: { token: localStorage.token },
        }
      );

      const reacted = await res.json();
      if (reacted) {
        setReacted(reacted.reaction);
      } else {
        setReacted('');
      }

      // console.log(reacted)
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    checkPreviousReaction();
  }, []);

  // STORE COUNTS OF EACH REACTION TO THIS UPDATE CARD
  const [allReactions, setAllReactions] = useState({
    muscle: props.data.muscle_count,
    hands: props.data.hands_count,
    trophy: props.data.trophy_count,
    party: props.data.party_count,
    popper: props.data.popper_count,
  });

  // REFRESH ALL REACTION COUNTS FOR THIS UPDATE CARD
  // WHEN `reacted` CHANGES
  const refreshReactions = async value => {
    const update_id = props.data.update_id;
    try {
      const body = { update_id };
      const res = await fetch(
        'http://localhost:5000/sig-dashboard/get-new-reaction-count',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const newCountsObject = await res.json();

      setAllReactions({
        muscle: newCountsObject.muscle_count,
        hands: newCountsObject.hands_count,
        trophy: newCountsObject.trophy_count,
        party: newCountsObject.party_count,
        popper: newCountsObject.popper_count,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    refreshReactions();
  }, [reacted]);

  // EMOJI MENU BEHAVIOUR
  const [openFullMenu, setOpenFullMenu] = useState(false);
  const [onHover, setOnHover] = useState(false);

  // CALLED WHEN USER REACTS/CHANGES REACTION TO THIS UPDATE CARD
  const handleReactionChange = async value => {
    //preventDefault();
    const update_id = props.data.update_id;
    const user_id = sessionStorage.current_user_id;
    const reaction = value;
    try {
      const body = { update_id, user_id, reaction };
      const newReaction = await fetch(
        'http://localhost:5000/sig-dashboard/react',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      setReacted(value);
    } catch (error) {
      console.error(error.message);
    }
  };

  // RADIO BUTTON GROUP BEHAVIOUR
  const reactionOptions = ['muscle', 'hands', 'trophy', 'party', 'popper'];

  const { value, setValue, getRootProps, getRadioProps } = useRadioGroup({
    name: 'reactions',
    onChange: handleReactionChange,
    value: reacted,
  });
  // console.log(props.data.update_id + ' reacted with ' + reacted); // reacted IS a string

  const group = getRootProps();

  return (
    <Box /* CARD */
      minW="312px"
      maxW="352px"
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      p={6}
      boxShadow="sm"
      onMouseEnter={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        setOnHover(false);
      }}
      pos="relative"
    >
      <VStack spacing={4}>
        <VStack spacing={2}>
          <Avatar size="sm" name={props.data.user_display_name} />
          <VStack spacing={0}>
            <Text fontSize="md" fontWeight="medium">
              {props.data.user_display_name}
            </Text>
            <Text fontSize="sm">{props.data.update_date}</Text>
            {props.data.on_track ? (
              <Flex flexDir="row" align="center" gap={2}>
                <Circle bg="green.500" size={2} mt="2px" />
                <Text>On track</Text>
              </Flex>
            ) : (
              <Flex flexDir="row" align="center" gap={2}>
                <Circle bg="yellow.500" size={2} mt="2px" />
                <Text>Not yet</Text>
              </Flex>
            )}
          </VStack>
        </VStack>
        <Text align="center">{props.data.update_content}</Text>

        <RadioGroup {...group} display="flex" gridColumnGap={2}>
          {reactionOptions.map(value => {
            if (value === 'muscle' && allReactions.muscle !== 0) {
              const radio = getRadioProps({ value });
              return (
                <ReactionChip
                  key={value}
                  value={value}
                  count={allReactions.muscle}
                  {...radio}
                >
                  <Emoji symbol="💪" label={value} />
                </ReactionChip>
              );
            }

            if (value === 'hands' && allReactions.hands !== 0) {
              const radio = getRadioProps({ value });
              return (
                <ReactionChip
                  key={value}
                  value={value}
                  count={allReactions.hands}
                  {...radio}
                >
                  <Emoji symbol="🙌" label={value} />
                </ReactionChip>
              );
            }

            if (value === 'trophy' && allReactions.trophy !== 0) {
              const radio = getRadioProps({ value });
              return (
                <ReactionChip
                  key={value}
                  value={value}
                  count={allReactions.trophy}
                  {...radio}
                >
                  <Emoji symbol="🏆" label={value} />
                </ReactionChip>
              );
            }

            if (value === 'party' && allReactions.party !== 0) {
              const radio = getRadioProps({ value });
              return (
                <ReactionChip
                  key={value}
                  value={value}
                  count={allReactions.party}
                  {...radio}
                >
                  <Emoji symbol="🥳" label={value} />
                </ReactionChip>
              );
            }

            if (value === 'popper' && allReactions.popper !== 0) {
              const radio = getRadioProps({ value });
              return (
                <ReactionChip
                  key={value}
                  value={value}
                  count={allReactions.popper}
                  {...radio}
                >
                  <Emoji symbol="🎉" label={value} />
                </ReactionChip>
              );
            }
          })}
        </RadioGroup>
      </VStack>

      <Fade in={onHover}>
        <ButtonGroup /* REACTION MENU */
          pos="absolute"
          right="-20px"
          bottom="0px"
          onMouseEnter={() => {
            setOpenFullMenu(true);
          }}
          onMouseLeave={() => {
            setOpenFullMenu(false);
          }}
          display={onHover ? '' : 'none'}
        >
          <VStack py={0} spacing={0}>
            <Box borderRadius="full" background="white" boxShadow="lg">
              {openFullMenu ? (
                <Fragment>
                  <SlideFade direction="bottom" in={openFullMenu}>
                    <VStack py={0} spacing={0}>
                      <IconButton
                        variant="ghost"
                        isRound
                        onClick={() => {
                          handleReactionChange('popper');
                        }}
                      >
                        <Emoji symbol="🎉" label="popper" />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        isRound
                        onClick={() => {
                          handleReactionChange('party');
                        }}
                      >
                        <Emoji symbol="🥳" label="party" />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        isRound
                        onClick={() => {
                          handleReactionChange('trophy');
                        }}
                      >
                        <Emoji symbol="🏆" label="trophy" />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        isRound
                        onClick={() => {
                          handleReactionChange('hands');
                        }}
                      >
                        <Emoji symbol="🙌" label="hands" />
                      </IconButton>
                    </VStack>
                  </SlideFade>
                </Fragment>
              ) : (
                <></>
              )}

              <IconButton
                variant="ghost"
                isRound
                py={0}
                onClick={() => {
                  handleReactionChange('muscle');
                }}
              >
                <Emoji symbol="💪" label="muscle" />
              </IconButton>
            </Box>
          </VStack>
        </ButtonGroup>
      </Fade>
    </Box>
  );
};

export default CheerBoardCard;
