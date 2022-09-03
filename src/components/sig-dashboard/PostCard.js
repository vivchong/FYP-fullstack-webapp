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

const PostCard = props => {
  return (
    <BaseCard>
      <HStack pt={6} spacing={4} /*Poster details */>
        <Avatar name={props.name} />
        <VStack alignItems="left" spacing={0}>
          <Heading as="h6" fontSize="md" fontWeight="medium" color="gray.700">
            {props.name}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            {props.date} {', '}{props.time}
          </Text>
        </VStack>
      </HStack>

      <Text mt={4}>{props.content}</Text>

      <Divider borderWidth="0.0625rem" borderColor="gray.200" mt={4} />

      <Flex mt={0} /* Likes and comments */>
        <HStack spacing={6} color="gray.700" /* Counters */>
          {props.likes > 0 ? ( // If there are likes, show like count
            <Box as="span" fontSize="sm">
              <strong>{props.likes}</strong> like{props.likes > 1 && 's'}
            </Box>
          ) : (
            <></>
          )}
          {props.comments > 0 ? ( // If there are comments, show comment count
            <Box as="span" fontSize="sm">
              <strong>{props.comments}</strong> comment
              {props.comments > 1 && 's'}
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
      {props.comments > 0 ? ( // If there are comments, show comments section
        <PostHasComments count={props.comments} />
      ) : (
        // If no comments, show nothing
        <></>
      )}
      <CommentInput />
    </BaseCard>
  );
};

export default PostCard;
