import { Container, Stack, VStack } from '@chakra-ui/react';
import classes from '../SIGHeroBanner.module.css';
import CreatePost from './CreatePost';
import AllPosts from './AllPosts';
import AllDetails from './AllDetails';
import { useEffect, useState } from 'react';

const DUMMY_DATA = [
  {
    postid: 1,
    name: 'Roy Chen',
    time: '10h ago',
    content:
      'Really enjoyed our meeting this week. Looking forward to the next one :)',
    likes: 4,
    comments: 7,
  },
  {
    postid: 2,
    name: 'Tan Jiahui',
    time: '8h ago',
    content:
      'How do you guys think Apple managed to allow FaceID to recognise our faces with masks on? What facial features did they use and how did they achieve such detailed level of specificity? Are they just relying on shapes/line detection alone, or something else?',
    likes: 1,
    comments: 2,
  },
];


const SIG_DETAILS = [
  {
    sigid: 1,
    signame: 'Computer Vision Buddies',
    sigdescription:
      "Welcome to Computer Vision Buddies! This is where we'll be sharing interesting readings in between meetings. Feel free to ask any questions related to computer vision here. \n\nWe meet every Friday at 6 PM. \n\nWhatsapp group: Link",
    sigfrequencyinterval: 'week',
    sigmeetingday: 'Friday',
    sigstarttime: '18:00',
    sigendtime: '19:00',
    longeststreak: 3,
    currentstreak: 1,
    updates: NaN,
  },
];


const SIGTabsDiscussion = (props) => {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const res = await fetch(
      `http://localhost:5000/all_posts/${SIG_DETAILS[0].sigid}`
    ); // gets the sig_id to pull posts with that sig_id

    // we are getting JSON data, so we need to patse it
    const postArray = await res.json(); // parse data

    /* postArray is an array of the following data
      post_content: "And now back to user 1"
      post_date: "03 Sep 2022"
      post_id: 3
      post_time: "15:38"
      sig_id: 1
      user_display_name: "Tan Jiahui"
      user_id: 1
      user_pic: "https://cdn-icons-png.flaticon..."

      // MISSING LIKES AND COMMENTS COUNT from PostEngagements
    */
    setPosts(postArray);
  }

  useEffect(() => {
    getPosts();
  }, []);
  
  
  console.log(posts);
  console.log(DUMMY_DATA);
  return (
    <Stack pt={4} className={classes.bannerfullwidth}>
      <Container /* 2 Column Flex Layout */
        display="flex"
        gap={6}
        px={10}
        alignItems="stretch"
        maxW="1440px"
      >
        <VStack spacing={8} maxW="856px" width="100%" /* Column 1 (Posts) */>
          <CreatePost sig_id={SIG_DETAILS[0].sigid} />
          <AllPosts dummy={DUMMY_DATA} posts={posts} />
        </VStack>

        <VStack spacing={8} maxW="480px" width="100%" /* Column 1 (Posts) */>
          <AllDetails details={SIG_DETAILS} />
        </VStack>
      </Container>
    </Stack>
  );
};

export default SIGTabsDiscussion;
