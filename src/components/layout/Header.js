import { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Container, } from '@chakra-ui/react';
import { Box, Flex, Spacer, ButtonGroup, Button, IconButton, Avatar} from '@chakra-ui/react';
import Logo from '../LLLogo';
import { ChevronDownIcon, BellIcon } from '@chakra-ui/icons';


const Header = props => {
  

  return (
    <Box boxShadow="xs" pl={10} pr={10}>
      <Container maxWidth="1360px" alignSelf="center" px={0}>
        <Flex as="span" h={16} py={3} px={0}>
          <Logo />
          <Spacer />
          <ButtonGroup spacing={4} variant="ghost">
            <Button rightIcon={<ChevronDownIcon />}>Workshops</Button>
            <Button rightIcon={<ChevronDownIcon />}>SIGs</Button>
            <Button>Book a Room</Button>
            <Button>Admin Dashboard</Button>
            <IconButton aria-label="Notifications" icon={<BellIcon />} />
            <IconButton
              aria-label="Notifications"
              icon={
                <Avatar
                  size="sm"
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                />
              }
            />
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
