const { Box, useRadio, Button } = require('@chakra-ui/react');

const ReactionChip = props => {
  const { state, getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Button
        as={Box}
        size="xs"
        fontSize="sm"
        variant="outline"
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bg: 'teal.100',
          color: 'teal.600',
          borderColor: 'teal.600',
        }}
        _focus={{ boxShadow: 'none' }}
        px={2}
        py={0}
      >
        {props.children}
        {props.count}
        {/* {state.isChecked ? ( props.count + 1 ): (props.count) } */}
      </Button>
    </Box>
  );
};

export default ReactionChip;
