import { Avatar, HStack, Input } from '@chakra-ui/react';
import { useState } from 'react';

const CommentInput = props => {
  const [comments, setComments] = useState([
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
    if (!inputComment.trim().length) {
      console.log('No input comment');
      return;
    }
    const data = inputComment;

    setComments(old => [...old, { from: 'me', text: data }]); //data is inputComment. data is sent to comments json
    setInputComment('');
      console.log({ inputComment });
      console.log({comments})
  };

  return (
    <HStack spacing={4} pb={5} alignItems="flex-start">
      <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <Input
        variant="filled"
        size="sm"
        placeholder="Write a reply"
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleSendComment();
          }
        }}
        value={inputComment} // in useState
        onChange={e => setInputComment(e.target.value)}
      />
    </HStack>
  );
};

export default CommentInput;
