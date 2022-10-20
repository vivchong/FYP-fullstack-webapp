import { Box, Container, Stack, VStack, Text, Heading } from '@chakra-ui/react';
import classes from '../SIGHeroBanner.module.css';
import CreatePost from './CreatePost';
import AllPosts from './AllPosts';
import AllDetails from './AllDetails';
import { useContext, useEffect, useState } from 'react';
import BaseCard from '../../../components/layout/cards/BaseCard';
import { StoreContext } from '../../../store/store';

// From SIGTabs.js <-- SIGDashboardPage.js
const SIGTabsDiscussion = props => {
  // const [context, setContext] = useContext(StoreContext);
  // const { refreshPosts } = context;

  const { refreshPosts } = useContext(StoreContext);;

  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const res = await fetch(
      `http://localhost:5000/all_posts/${props.sig_id}` //{SIG_DETAILS[0].sigid}
    );

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
    // console.log(posts);
  }

  useEffect(() => {
    getPosts();
  }, [refreshPosts]);

  console.log('sig_id: ' + props.sig_id);

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
          <CreatePost sig_id={props.sig_id} />
          {posts.length !== 0 ? (
            <AllPosts posts={posts} />
          ) : (
            <Box align="center" py={4} color="gray.600">
              <Heading size="sm">There are no posts yet.</Heading>
              <Text size="sm">Start a discussion with your group!</Text>
            </Box>
          )}
        </VStack>

        <VStack spacing={8} maxW="480px" width="100%" /* Column 2 (Details) */>
          <AllDetails sig_data={props.sig_data} sig_id={props.sig_id} role={props.role} />
        </VStack>
      </Container>
    </Stack>
  );
};

export default SIGTabsDiscussion;
