import { Fragment, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Container, } from '@chakra-ui/react';
import { Box, Flex, Spacer, ButtonGroup, Button, IconButton, Avatar, Text, Link} from '@chakra-ui/react';
import Logo from '../LLLogo';
import { ChevronDownIcon, BellIcon } from '@chakra-ui/icons';


const Header = props => {
  

  return (
    <Box boxShadow="xs" pl={10} pr={10}>
      <Container maxWidth="1360px" alignSelf="center" px={0}>
        <Flex as="span" h={16} py={3} px={0}>
          <Logo />
          <Spacer />
          <Text>{props.loggedIn}</Text>
          <ButtonGroup spacing={4} variant="ghost">
            <Button rightIcon={<ChevronDownIcon />}>Workshops</Button>
            <Button rightIcon={<ChevronDownIcon />}>SIGs</Button>
            <Button>Book a Room</Button>
            {props.isLoggedIn ? (
              <Fragment>
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
              </Fragment>
            ) : ( // If not logged in, show login button
              <Link as={ReactRouterLink} to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
