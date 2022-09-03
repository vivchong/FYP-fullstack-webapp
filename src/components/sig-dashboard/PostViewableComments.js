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
          key={comment.comment_id}
          name={comment.user_display_name}
          time={comment.comment_time}
          date={comment.comment_date}
          content={comment.comment_content}
          likes={comment.commentlikescount} // not in use
        />
      ))}
    </Stack>
  );
}

export default PostViewableComments;

// need state for "There are no posts"
