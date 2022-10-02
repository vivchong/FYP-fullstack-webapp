import {
  Avatar,
  HStack,
  VStack,
  Heading,
  Text,
  Divider,
  Flex,
  Spacer,
  Box,
  ButtonGroup,
  IconButton,

} from '@chakra-ui/react';
import BaseCard from '../layout/cards/BaseCard';
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdChatBubbleOutline,
} from 'react-icons/md';
import PostHasComments from './PostHasComments';
import CommentInput from './CommentInput';
import { useState, useEffect } from 'react';

const PostCard = props => {

   const [commentcount, setCommentcount] = useState([]);

   async function countComments() {
     const res = await fetch(
       `http://localhost:5000/count_comments/${props.post_id}`
     );

     // we are getting JSON data, so we need to patse it
     const commentcountArray = await res.json(); // parse data

     setCommentcount(commentcountArray);
   }

   useEffect(() => {
     countComments();
   }, []);

   //console.log(commentcount.posts_comments_count);

  return (
    <BaseCard>
      <HStack pt={6} spacing={4} /*Poster details */>
        <Avatar name={props.name} />
        <VStack alignItems="left" spacing={0}>
          <Heading as="h6" fontSize="md" fontWeight="medium" color="gray.700">
            {props.name}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            {props.date} {', '}
            {props.time}
          </Text>
        </VStack>
      </HStack>

      <Text mt={4}>{props.content}</Text>

      <Divider borderWidth="0.0625rem" borderColor="gray.200" mt={4} />

      <Flex mt={0} /* Likes and comments */>
        <HStack spacing={6} color="gray.700" /* Like and Comment Counters */>
          {props.likes > 0 ? ( // If there are likes, show like count
            <Box as="span" fontSize="sm">
              <strong>{props.likes}</strong> like{props.likes > 1 && 's'}
            </Box>
          ) : (
            <></>
          )}

          {commentcount.posts_comments_count > 0 ? ( // If there are comments, show comment count
            <Box as="span" fontSize="sm">
              <strong>{commentcount.posts_comments_count}</strong> comment
              {commentcount.posts_comments_count > 1 && 's'}
            </Box>
          ) : (
            // If no comments, show nothing
            <></>
          )}
        </HStack>

        <Spacer />

        <HStack spacing={6} color="gray.700" /* Buttons */>
          <ButtonGroup spacing={0}>
            <IconButton variant="ghost" size="lg" icon={<MdFavoriteBorder />} />
            <IconButton
              variant="ghost"
              size="lg"
              icon={<MdChatBubbleOutline />}
            />
          </ButtonGroup>
        </HStack>
      </Flex>
      {commentcount.posts_comments_count > 0 ? ( // If there are comments, show comments section
        <PostHasComments
          count={commentcount.posts_comments_count}
          post_id={props.post_id}
        />
      ) : (
        // If no comments, show nothing
        <></>
      )}
      <CommentInput post_id={props.post_id} />
    </BaseCard>
  );
};

export default PostCard;
