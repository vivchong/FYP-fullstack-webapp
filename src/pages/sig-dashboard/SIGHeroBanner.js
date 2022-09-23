import {
  Stack,
  HStack,
  Flex,
  Button,
  Heading,
  Spacer,
  Container,
  Avatar,
  AvatarGroup,
  IconButton,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';
import { MdMoreHoriz } from 'react-icons/md';

import classes from './SIGHeroBanner.module.css';

export default function SIGHeroBanner({ sig_data, sig_id }) {
  
  console.log(sig_data)
  return (
    <Flex flexDirection="column" className={classes.bannerfullwidth}>
      <Flex
        w={'full'}
        h={72}
        backgroundImage={
          'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
      ></Flex>

      <Stack bg="white" w={'full'} pt={8} pb={8} pl={10} pr={10}>
        <Container
          maxWidth="1360px"
          alignSelf="center"
          display="flex"
          paddingInline={0}
        >
          <Stack spacing={2} maxW="704px">
            <HStack>
              <Heading as="h1" size="lg" noOfLines={1}>
                {sig_data.sig_name}
              </Heading>
              <Flex alignItems={'center'}>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    cursor={'pointer'}
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="More options"
                    icon={<MdMoreHoriz />}
                    size="sm"
                  ></MenuButton>
                  <MenuList fontSize="sm">
                    <MenuItem>Invite members</MenuItem>
                    <MenuItem>Edit SIG Page</MenuItem>
                    <MenuItem>Manage members</MenuItem>
                    <MenuItem>Leave group</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </HStack>
            <Heading as="h5" size="sm" noOfLines={1}>
              {sig_data.sig_member_count + ' '}member{sig_data.sig_member_count > 1 ? 's' : ''}
            </Heading>
          </Stack>
          <Spacer />

          <HStack align="flex-start">
            <HStack spacing={8}>
              <AvatarGroup size="md" max={3}>
                <Avatar name="Ryan Florence" />
                <Avatar name="Segun Adebayo" />
                <Avatar name="Kent Dodds" />
                <Avatar name="Prosper Otemuyiwa" />
                <Avatar name="Christian Nwamba" />
              </AvatarGroup>

              <ButtonGroup spacing={2}>
                <Button variant="outline" leftIcon={<AddIcon />}>
                  Invite
                </Button>
              </ButtonGroup>
            </HStack>
          </HStack>
        </Container>
      </Stack>
    </Flex>
  );
}
