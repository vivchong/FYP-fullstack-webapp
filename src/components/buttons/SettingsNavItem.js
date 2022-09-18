import React from 'react';
import {
  Flex,
  Text,
  Tab,
  Link,
} from '@chakra-ui/react';


const NavItem = React.forwardRef((props, ref) => {

  return (
    <Tab
      ref={ref}
      _selected={{
        bg: 'gray.100',
        borderLeft: '4px solid',
        borderLeftColor: 'teal.600',
        fontWeight: 'medium',
        color: 'teal.600',
      }}
      w="100%"
      pl="5vw"
      py="26px"
      fontSize='xl'
      color='gray.700'
    >
      {props.title}
    </Tab>
  );
});

export default NavItem;
