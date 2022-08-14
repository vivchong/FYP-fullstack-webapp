import { Divider, Button,  } from '@chakra-ui/react';
import PostViewableComments from './PostViewableComments';

const VIEWABLE_COMMENTS_ON_THIS_POST = [ // need to pull latest 2 posts
  {
    postid: 1, // Probs need to get this info per post, rather than have all the posts' comments
    commentid: 1,
    userid: 3, // need to get name...
    name: 'Roy Chen',
    commenttime: '7h', //might want to leave this out of UI
    commentcontent: 'I would be interested to know too!',
    commentlikescount: 0, //might want to leave this out
  },

  {
    postid: 1,
    commentid: 2,
    userid: 5, 
    name: 'Gil Tan',
    commenttime: '7h', 
    commentcontent: 'Perhaps they...',
    commentlikescount: 0,
    },
  
];

const PostHasComments = props => {
  const viewableCommentsLimit = 2;
  const hiddenComments = props.count - viewableCommentsLimit;

  return (
    <>
      <Divider borderWidth="0.0625rem" borderColor="gray.200" mt={0} mb={3} />

      {hiddenComments > 1 ? ( // Show link button if there are hidden comments
              <Button variant="link" size="sm" fontWeight="medium" mt={0} mb={4}>
          View {props.count - viewableCommentsLimit} previous comment{props.count > 1 && 's'}
        </Button>
      ) : (
        <></>
      )}
        
          <PostViewableComments comments={ VIEWABLE_COMMENTS_ON_THIS_POST } />
    </>
  );
};

export default PostHasComments;
