import {
  useDisclosure,
  VStack,
  ButtonGroup,
  SlideFade,
  Circle,
  IconButton,
  Box
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Emoji from 'a11y-react-emoji';


const ReactionMenu = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        {' '}
        {/* 
        <ButtonGroup onMouseEnter={onOpen} onMouseLeave={onClose}>
          <Box borderRadius="full" background="white">
            <VStack py={0} spacing={0}>
              <Collapse direction="bottom" in={isOpen}>
                <VStack py={0} spacing={0}>
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
              </Collapse>

              <Circle bg="white" size="40px">
                <IconButton variant="ghost" isRound py={0}>
                  <Emoji symbol="💪" label="muscle" />
                </IconButton>
              </Circle>
            </VStack>
          </Box>
        </ButtonGroup>
        */}
        <ButtonGroup onMouseEnter={onOpen} onMouseLeave={onClose}>
          <VStack py={0} spacing={0}>
            <SlideFade direction="bottom" in={isOpen}>
              <Box borderRadius="full" background="white">
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

            <Circle bg="white" size="40px">
              <IconButton variant="ghost" isRound py={0}>
                <Emoji symbol="💪" label="muscle" />
              </IconButton>
            </Circle>
          </VStack>
        </ButtonGroup>
      </>
    );
}

export default ReactionMenu;