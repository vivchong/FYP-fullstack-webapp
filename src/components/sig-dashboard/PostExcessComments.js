import { Button } from '@chakra-ui/react';

const PostExcessComments = props => {
  return (
    <Button variant="link" size="sm" fontWeight="medium" mt={4}>
      View {props.count} previous comment{props.count > 1 && 's'}
    </Button>
  );
};

export default PostExcessComments;
