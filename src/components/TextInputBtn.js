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
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Field, Formik, FormikProps } from 'formik';
import PlainForm from '../pages/sig-dashboard/abouttab/PlainForm';
import * as Yup from 'yup';

// This is a button that looks like an Input field and opens a "Create Post" modal

const TextInputBtn = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const createPostSchema = Yup.object().shape({
  //   createPost: Yup.string().required("You can't post a discussion without words!"),
  // });

  const [post_content, setpost_content] = useState("");
  const sig_id = props.sig_id; // to reduce memory you can just cange the below one
  const user_id = 1; // need to change
  
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { sig_id, user_id, post_content };
      const newPost = await fetch('http://localhost:5000/discussion_posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      console.log(JSON.stringify(body));
      window.location = '/';
    } catch (error) {
      console.log(error.message);
    }
  }

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
          <Formik
            initialValues={{
              createPost: '',
            }}
            onSubmit={onSubmitForm} 
          //   {(values) => {
          //   alert(JSON.stringify(values, null, 2));
          // }}
            //validationSchema={createPostSchema} // validation is handled by Yup
          >
            {({ handleSubmit, values, errors, touched }) => (
              <form onSubmit={onSubmitForm}>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Container display="flex" gap={4} px={0}>
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    />

                    <FormControl
                      isInvalid={!!errors.createPost && touched.createPost}
                    >
                      <Field
                        as={Textarea}
                        id="createPost"
                        name="createPost"
                        variant="unstyled"
                        placeholder={props.children}
                        _placeholder={{ opacity: 0.36, color: 'black' }}
                        size="lg"
                        height="220px"
                        // validation is handled by Yup
                        value={post_content}
                        onChange={e => setpost_content(e.target.value)}
                        validate={(value) => {
                          let error;
                          if (value.length < 0) {
                            error =
                              "You can't post a discussion without words!";
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.createPost}</FormErrorMessage>
                    </FormControl>
                   
                  </Container>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose} mr={3}>
                    Cancel
                  </Button>
                  <Button colorScheme="teal" type="submit">
                    Post
                  </Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
export default TextInputBtn;

// Based on Filled Input in CreatePost
