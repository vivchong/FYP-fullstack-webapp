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
    time: '8h ago', // need to put time and date
    content:
      'How do you guys think Apple managed to allow FaceID to recognise our faces with masks on? What facial features did they use and how did they achieve such detailed level of specificity? Are they just relying on shapes/line detection alone, or something else?',
    likes: 1,
    comments: 3,
  },
];
*/

 /* postArray is an array of the following data
    post_content: "This is an edited post."
    post_date: "2022-08-25T16:00:00.000Z"
    post_id: 1
    post_time: "01:35:16.633112"
    sig_id: 1
    user_display_name: "Tan Jiahui"
    user_id: 1
    user_pic: "https://cdn-icons-png.flaticon.com/512/147/
    */
   
function AllPosts(props) {
  //props from SIGTabsDiscussion.js
  return (
    <>
      <Stack spacing={8} maxW="856px" width="100%">
        {props.posts.map(post => (
          <PostCard
            key={post.post_id}
            post_id={post.post_id}
            name={post.user_display_name}
            time={post.post_time}
            date={post.post_date}
            content={post.post_content}
            likes={post.likes} // missing count
            comments={post.comments} // missing
          />
        ))}
      </Stack>
      
      <Stack 
        spacing={8}
        maxW="856px"
        width="100%"
        direction="column-reverse" /* COLUMN REVERSE Posts */
      >
        {/*props.dummy.map(
          (
            post //DUMMY DATA
          ) => (
            <PostCard
              key={post.postid}
              name={post.name}
              time={post.time}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
            />
          )
          )*/}
      </Stack>
    </>
  );
}

export default AllPosts;

// need state for "There are no posts"
