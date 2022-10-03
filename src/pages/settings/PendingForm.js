import { TimeIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Text,
  useDisclosure,
  Button,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
    ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import BaseCard from '../../components/layout/cards/BaseCard';
import { BiFlag } from 'react-icons/bi';


// NOT USED BECAUSE MODAL HAS TO BE OPENED FROM ITS OWN FILE
const PendingForm = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg="white" boxShadow="sm" py={6} pl={6} pr={20}>
        <Flex gap={10}>
          {/* <TimeIcon w={10} h={10} /> */}
          <Icon as={BiFlag} w={10} h={10} color="yellow.500" />
          <Flex flexDir="column" gap={2}>
            <Text fontWeight="medium">Pending SIG Proposal Form</Text>
            <Text>
              Your proposal for creating "{props.data.sig_name}" is pending
              approval. Please wait for the SIG Head to get back to you.
            </Text>
            <Flex>
              <Spacer />
              <Button maxW="208px" onClick={onOpen}>
                Open Modal
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
                  <ModalHeader>Proposal Form for ""</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{props.data}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PendingForm;
