import { Fragment, useState } from 'react';
import { Link as ReactRouterLink, Navigate } from 'react-router-dom';
import {
  Container,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';

import {
  Box,
  Flex,
  Spacer,
  ButtonGroup,
  Button,
  IconButton,
  Avatar,
  Text,
  Link,
} from '@chakra-ui/react';
import Logo from '../LLLogo';
import { ChevronDownIcon, BellIcon, ChevronUpIcon } from '@chakra-ui/icons';
import SignOutButton from '../buttons/SignOutBtn';
import SignOutMenuItem from '../buttons/SignOutMenuItem';

// Called from Layout.js
const Header = props => {
  // use in this format: <NavLink to='/what-are-sigs'>What are SIGs?</NavLink>
  const NavLink = props => {
    return (
        <Link
          as={ReactRouterLink}
          to={props.to}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <MenuItem>{props.children}</MenuItem>
        </Link>
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box boxShadow="xs" pl={10} pr={10}>
      <Container maxWidth="1360px" alignSelf="center" px={0}>
        <Flex as="span" h={16} py={3} px={0}>
          <Logo />

          <Spacer />

          <ButtonGroup spacing={4} variant="ghost">
            <Menu>
              <MenuButton
                isDisabled
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                Workshops
              </MenuButton>
            </Menu>

            <Menu>
              {({ isOpen, onClose }) => (
                <>
                  <MenuButton
                    as={Button}
                    rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  >
                    SIGs
                  </MenuButton>
                  <MenuList onMouseLeave={onClose}>
                    <NavLink to="/what-are-sigs">What are SIGs?</NavLink>
                    <NavLink to="/find-a-sig">Find a SIG</NavLink>
                    {props.isLoggedIn ? (
                      <NavLink to="/my-sigs">My SIGs</NavLink>
                    ) : (
                      <></>
                    )}
                  </MenuList>
                </>
              )}
            </Menu>

            <Button isDisabled>Book a Room</Button>

            {props.isLoggedIn ? (
              <Fragment>
                <Button>Admin Dashboard</Button>

                <IconButton aria-label="Notifications" icon={<BellIcon />} />

                <Menu>
                  {({ isOpen, onClose }) => (
                    <>
                      <MenuButton
                        as={IconButton}
                        aria-label="My Profile"
                        icon={
                          <Avatar
                            size="sm"
                            name={sessionStorage.current_user_display_name}
                            src={sessionStorage.current_user_pic}
                          />
                        }
                      />
                      <MenuList onMouseLeave={onClose}>
                        <MenuGroup title="Profile">
                          <NavLink to="/my-sigs">My SIGs</NavLink>
                          <NavLink to="/my-workshops">My Workshops</NavLink>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Settings">
                          <NavLink to="/edit-profile">Edit profile</NavLink>
                        </MenuGroup>
                        <MenuDivider />
                        <SignOutMenuItem setLoggedIn={props.setLoggedIn} />
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Fragment>
            ) : (
              // If not logged in, show login button
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
