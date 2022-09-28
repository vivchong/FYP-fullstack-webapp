import {
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
  FormControl,
  FormErrorMessage,
  Flex,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { Fragment, useState, useContext } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import { StoreContext } from '../../store/store';

const CheerBoardNewUpdateBtn = props => {
  const [context, setContext] = useContext(StoreContext);
  const { refreshUpdates } = context;
  const sig_id = props.sig_id;
  const user_id = sessionStorage.current_user_id;

  const { isOpen, onOpen, onClose } = useDisclosure(); // MODAL
  const [update_content, setUpdate_content] = useState(''); // SENT TO DATABASE
  const [on_track, setOn_track] = useState(''); // SENT TO DATABASE

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { sig_id, user_id, update_content, on_track };
      const newPost = await fetch(
        'http://localhost:5000/sig-dashboard/create-update',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      console.log(JSON.stringify(body));
      setUpdate_content('');
      setOn_track('');
      setContext({refreshUpdates: !refreshUpdates})
      //   window.location = window.location.href;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <Button
        leftIcon={<AddIcon w={2.5} h={2.5} />}
        colorScheme="teal"
        onClick={onOpen}
      >
        {props.children}
      </Button>

      <Modal
        closeOnOverlayClick={false}
        size="xl"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setUpdate_content('');
          setOn_track('');
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              createUpdate: '',
            }}
            onSubmit={onSubmitForm}
          >
            {({ handleSubmit, values, errors, touched }) => (
              <form onSubmit={onSubmitForm}>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Container display="flex" gap={4} px={0}>
                    <Avatar
                      name={sessionStorage.current_user_display_name}
                      src={sessionStorage.current_user_pic}
                    />
                    <Flex flexDir="column" gap={2} width="full">
                      <FormControl as="fieldset">
                        <RadioGroup
                          onChange={setOn_track}
                          value={on_track}
                          colorScheme="teal"
                        >
                          <Stack direction="row" gap={2}>
                            <Radio value="true" isRequired>
                              I'm on track
                            </Radio>
                            <Radio value="false">I'm a little behind</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          !!errors.createUpdate && touched.createUpdate
                        }
                      >
                        <Field
                          as={Textarea}
                          id="createUpdate"
                          name="createUpdate"
                          variant="unstyled"
                          placeholder={props.children}
                          _placeholder={{ opacity: 0.36, color: 'black' }}
                          size="lg"
                          height="220px"
                          value={update_content}
                          onChange={e => setUpdate_content(e.target.value)}
                          required
                          validate={value => {
                            let error;
                            if (value.length < 0) {
                              error = "You can't post an update without words!";
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>
                          {errors.createUpdate}
                        </FormErrorMessage>
                      </FormControl>
                    </Flex>
                  </Container>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => {
                      onClose();
                      setUpdate_content('');
                      setOn_track('');
                    }}
                    mr={3}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="teal"
                    type="submit"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Share progress
                  </Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
export default CheerBoardNewUpdateBtn;

// Based on Filled Input in createUpdate
