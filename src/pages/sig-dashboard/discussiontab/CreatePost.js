import { Avatar, } from '@chakra-ui/react';
import CreatePostCard from '../../../components/layout/cards/CreatePostCard';
import TextInputBtn from '../../../components/TextInputBtn';

const CreatePost = () => {
  return (
    <CreatePostCard>
      <Avatar size="md" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <TextInputBtn>Start a discussion</TextInputBtn>
    </CreatePostCard>
  );
};

export default CreatePost;
