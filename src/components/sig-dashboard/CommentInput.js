import {
  Avatar,
  HStack,
  Input,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Field, Formik } from 'formik';

const CommentInput = props => {

  const [comment_content, setComment_content] = useState('');
  const post_id = props.post_id;
  const user_id = sessionStorage.current_user_id;

  const onSubmitComment = async e => {
    //     e.preventDefault();
    // I removed this because it was causing errors
    try {
      console.log('Submitting comment');
      const body = { post_id, user_id, comment_content };
      const newComment = await fetch('http://localhost:5000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(JSON.stringify(body));
      //window.location = window.location.href;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Formik
      initialValues={{ createComment: '' }}
      onSubmit={onSubmitComment}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleSubmit, values, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <HStack spacing={4} pb={5} alignItems="stretch" w="full">
            <Avatar
              size="sm"
              name={sessionStorage.current_user_display_name}
              src={sessionStorage.current_user_pic}
            />

            <FormControl
              isInvalid={!!errors.createComment && touched.createComment}
            >
              <Field
                as={Input}
                id="createComment"
                name="createComment"
                variant="filled"
                size="sm"
                placeholder="Write a reply"
                /*onKeyPress={e => {
                  if (e.key === 'Enter') {
                    handleSendComment();
                  }
                }}*/
                value={comment_content}
                onChange={e => setComment_content(e.target.value)}
                required
                /*validate={(value) => {
                  let error;
                  if (value.length <= 0) {
                    error = 'Please type a comment first';
                  }
                  return error;
                }}*/
              />
              <FormErrorMessage>{errors.createComment}</FormErrorMessage>
            </FormControl>
          </HStack>
        </form>
      )}
    </Formik>
  );
};

export default CommentInput;
