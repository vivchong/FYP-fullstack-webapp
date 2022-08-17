import {
  useDisclosure,
  VStack,
  ButtonGroup,
  SlideFade,
  Circle,
  IconButton,
    Box,
  Text,
  Container,
  Collapse,
  Avatar,
    HStack,
  Tag,
  TagLabel,
  Fade,
    Slide,
  Button,
} from '@chakra-ui/react';
import Emoji from 'a11y-react-emoji';

import ReactionMenu from './ReactionMenu';

const CheerBoardCard = () => {
    const { isOpen:isOpenReactionMenu, onOpen: onOpenReactionMenu, onClose:onCloseReactionMenu } = useDisclosure();
    const { isOpen:isOpenReact, onOpen:onOpenReact, onClose:onCloseReact } = useDisclosure();

    return (
      <Box onMouseEnter={onOpenReact} onMouseLeave={onCloseReact}>
        <Box /* CARD */
          maxW="352px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg="white"
          p={6}
          boxShadow="sm"
        >
          <VStack spacing={4}>
            <VStack spacing={2}>
              <Avatar size="sm" name="Tan Jiahui" />
              <VStack spacing={0}>
                <Text fontSize="md" fontWeight="medium">
                  Tan Jiahui
                </Text>
                <Text fontSize="sm">18 Dec 2022</Text>
              </VStack>
            </VStack>
            <Text align="center">
              Watched the first lesson of the Intro to Computer Vision course on
              Coursera!
            </Text>
            <HStack spacing={2}>
              <Button
                size="xs"
                px={2}
                py={0}
                fontSize="sm"
                variant="outline"
                colorScheme="teal"
                isActive
              >
                <Emoji symbol="🎉" label="popper" />2
              </Button>

              <Button size="xs" px={2} py={0} fontSize="sm" variant="outline">
                <Emoji symbol="🥳" label="party" />1
              </Button>
            </HStack>
          </VStack>
        </Box>
        <Fade direction="bottom" in={isOpenReact}>
          <ButtonGroup /* REACTION MENU */
            onMouseEnter={onOpenReactionMenu}
            onMouseLeave={onCloseReactionMenu}
            pos={'absolute'}
            left="412px"
            bottom="24px"
          >
            <VStack py={0} spacing={0}>
              <SlideFade direction="bottom" in={isOpenReactionMenu}>
                <Box borderRadius="full" background="white" boxShadow="lg">
                  <VStack py={0} spacing={0}>
                    <IconButton variant="ghost" isRound>
                      <Emoji symbol="🎉" label="popper" />
                    </IconButton>
                    <IconButton variant="ghost" isRound>
                      <Emoji symbol="🥳" label="party" />
                    </IconButton>
                    <IconButton variant="ghost" isRound>
                      <Emoji symbol="🏆" label="trophy" />
                    </IconButton>
                    <IconButton variant="ghost" isRound>
                      <Emoji symbol="🙌" label="hands" />
                    </IconButton>
                  </VStack>
                </Box>
              </SlideFade>

              <Circle bg="white" size="40px" boxShadow="lg">
                <IconButton variant="ghost" isRound py={0}>
                  <Emoji symbol="💪" label="muscle" />
                </IconButton>
              </Circle>
            </VStack>
          </ButtonGroup>
        </Fade>
      </Box>
    );
};

export default CheerBoardCard;
