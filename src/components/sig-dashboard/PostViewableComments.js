import { Stack } from "@chakra-ui/react";
import CommentItem from "./CommentItem";

function PostViewableComments(props) {
  return (
    <Stack
      spacing={0}
      maxW="856px"
      width="100%"
      direction="column-reverse" /* COLUMN REVERSE Comments */
    >
      {props.comments.map(comment => (
        <CommentItem
          key={comment.postid}
          name={comment.name}
          time={comment.commenttime}
          content={comment.commentcontent}
          likes={comment.commentlikescount}
        />
      ))}
    </Stack>
  );
}

export default PostViewableComments;

// need state for "There are no posts"
