import {
  Avatar,
  HStack,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';


const CommentItem = props => {
  return (
      <HStack spacing={4} pb={5} alignItems='flex-start'>
      <Avatar size="sm" name={props.name} />
      <VStack alignItems="left" spacing={0}>
        <HStack>
          <Heading as="h6" fontSize="sm" fontWeight="medium" color="gray.700">
            {props.name}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            {props.date}{', '}{props.time}
          </Text>
              </HStack>
              <Text>{props.content}</Text>
      </VStack>
    </HStack>
  );
};

export default CommentItem;