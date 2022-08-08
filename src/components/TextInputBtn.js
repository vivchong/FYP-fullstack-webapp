import {
  Box,
  Text,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Avatar,
  Container,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

// This is a button that looks like an Input field and opens a "Create Post" modal

const TextInputBtn = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        as="button"
        transition="0.2s"
        height={10}
        bg="gray.100"
        w="100%"
        borderRadius="lg"
        onClick={onOpen}
        _hover={{ bg: 'gray.200' }}
        color="gray.500"
      >
        <Text textAlign="left" px={4} /* Placeholder text goes here */>
          {props.children}
        </Text>
      </Box>

      <Modal
        closeOnOverlayClick={false}
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Container display="flex" gap={4} px={0}>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Textarea
                variant="unstyled"
                placeholder={props.children}
                _placeholder={{ opacity: 0.36, color: 'black' }}
                size="lg"
                height="220px"
              ></Textarea>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="teal">Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default TextInputBtn;

// Based on Filled Input in CreatePost
