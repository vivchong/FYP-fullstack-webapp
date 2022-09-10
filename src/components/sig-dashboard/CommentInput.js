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
  /*const [comments, setComments] = useState([
    // this is an array?/json of all comments on this post
    { from: 'computer', text: 'Hi, My Name is HoneyChat' },
    { from: 'me', text: 'Hey there' },
    { from: 'me', text: 'Myself Ferin Patel' },
    {
      from: 'computer',
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
  ]);

  const [inputComment, setInputComment] = useState('');
  // inputComment is used to store the value of the Input field

  const handleSendComment = () => {
    if (!comment_content.trim().length) {
      console.log('No input comment');
      return;
    }
    const data = comment_content;

    setComment_content(old => [...old, { from: 'me', text: data }]); //data is inputComment. data is sent to comments json
    setComment_content('');
      console.log({ comment_content });
      console.log({comments})
  };
  */

  const [comment_content, setComment_content] = useState('');
  const post_id = props.post_id; // to reduce memory you can just cange the below one
  const user_id = 1; // need to change

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
      window.location = '/';
    } catch (error) {
      console.log(error.message);
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
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
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
