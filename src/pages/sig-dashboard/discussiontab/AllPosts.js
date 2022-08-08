import { Stack } from '@chakra-ui/react';

import PostCard from '../../../components/sig-dashboard/PostCard';

/*
AS DEFINED IN SIGTabsDiscussion.js

const DUMMY_DATA = [
  {
    postid: 1,
    name: 'Roy Chen',
    time: '10h ago',
    content:
      'Really enjoyed our meeting this week. Looking forward to the next one :)',
    likes: 4,
    comments: 1,
  },
  {
    postid: 2,
    name: 'Tan Jiahui',
    time: '8h ago',
    content:
      'How do you guys think Apple managed to allow FaceID to recognise our faces with masks on? What facial features did they use and how did they achieve such detailed level of specificity? Are they just relying on shapes/line detection alone, or something else?',
    likes: 1,
    comments: 3,
  },
];
*/
function AllPosts(props) {
  return (
    <Stack
      spacing={8}
      maxW="856px"
      width="100%"
      direction="column-reverse" /* COLUMN REVERSE Posts */
    >
      {props.posts.map(post => (
        <PostCard
          key={post.postid}
          name={post.name}
          time={post.time}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </Stack>
  );
}

export default AllPosts;

// need state for "There are no posts"
