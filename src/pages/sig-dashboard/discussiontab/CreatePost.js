import { Avatar, } from '@chakra-ui/react';
import CreatePostCard from '../../../components/layout/cards/CreatePostCard';
import TextInputBtn from '../../../components/TextInputBtn';

const CreatePost = (props) => {
  return (
    <CreatePostCard>
      <Avatar
        size="md"
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov" /* Current user_id */
      />
      <TextInputBtn sig_id={props.sig_id}>Start a discussion</TextInputBtn>
    </CreatePostCard>
  );
};

export default CreatePost;
