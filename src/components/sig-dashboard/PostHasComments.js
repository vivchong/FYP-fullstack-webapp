import { Divider, Button,  } from '@chakra-ui/react';
import PostViewableComments from './PostViewableComments';
import { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../store/store';

const VIEWABLE_COMMENTS_ON_THIS_POST = [
  // need to pull latest 2 posts FOR THIS POST_ID
  {
    post_id: 1, // Probs need to get this info per post, rather than have all the posts' comments
    comment_id: 1,
    user_id: 3, // need to get name...
    user_display_name: 'Roy Chen',
    comment_time: '7h', //might want to leave this out of UI
    comment_content: 'I would be interested to know too!',
  },

  {
    post_id: 1,
    comment_id: 2,
    user_id: 5,
    user_display_name: 'Gil Tan',
    comment_time: '7h',
    comment_content: 'Perhaps they...',
  },
];

const PostHasComments = props => {
  // const [context, setContext] = useContext(StoreContext);
  // const { refreshComments } = context;

  const { refreshComments } = useContext(StoreContext);
  const viewableCommentsLimit = 2;
  const hiddenComments = props.count - viewableCommentsLimit;

  const post_id = props.post_id; // can shorten this by changing below

  const [comments, setComments] = useState([]);

  async function getComments() {
    console.log('Comment')
    const res = await fetch(`http://localhost:5000/comments/${post_id}`); // gets the post_id to pull comments with that post_id

    const commentArray = await res.json(); // parse JSON data

    setComments(commentArray);
    
  }

  useEffect(() => {
    getComments();
  }, [refreshComments]);

  console.log(comments);


  return (
    <>
      <Divider borderWidth="0.0625rem" borderColor="gray.200" mt={0} mb={3} />

      {/* {hiddenComments > 1 ? ( // Show link button if there are hidden comments
              <Button variant="link" size="sm" fontWeight="medium" mt={0} mb={4}>
          View {props.count - viewableCommentsLimit} previous comment{props.count > 1 && 's'}
        </Button>
      ) : (
        <></>
      )} */}
        
          <PostViewableComments comments={ comments } />
    </>
  );
};

export default PostHasComments;
