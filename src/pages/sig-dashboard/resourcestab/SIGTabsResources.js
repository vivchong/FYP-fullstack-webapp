import {
  Container,
  Stack,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';

import classes from '../SIGHeroBanner.module.css';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import TableOfResources from './TableOfResources';
import BigBaseCard from '../../../components/layout/cards/BigBaseCard';

const SIGTabsResources = () => {
  return (
    <Stack pt={4} className={classes.bannerfullwidth}>
      <Container /* 1-Column Flex Layout */
        px={0}
        maxW="1200px"
        width="100%"
        display="flex"
        flexDirection="column"
        gap={8}
      >
        <BigBaseCard>
          <VStack my={6} alignItems="flex-start" spacing={6}>
            <VStack my={0} alignItems="flex-start" spacing={2}>
              <Heading as="h3" size="md" fontWeight="medium">
                Table of Resources
              </Heading>

              <Text>
                Found a resource that was useful to you? Let others find it
                easily by adding it to the table of resources!
              </Text>
            </VStack>
            <Button colorScheme="teal" leftIcon={<AddIcon w={2.5} h={2.5} />}>
              Add resource
            </Button>
          </VStack>
        </BigBaseCard>

        <BigBaseCard /* Table card */>
          <VStack my={6} alignItems="flex-start" spacing={6}>
            <VStack my={0} alignItems="flex-start" spacing={2}>
              <Heading as="h3" size="md" fontWeight="medium">
                What are you looking for?{' '}
              </Heading>

              <Text>Resources shared by members can be found here.</Text>
            </VStack>
            <HStack>
              <Select placeholder="Filter by tag" maxWidth={40}>
                <option>Beginner</option>
                <option>Tools</option>
                <option>Online Course</option>
                <option>Book</option>
                <option>Research</option>
              </Select>
              <HStack maxWidth="100%">
                <InputGroup width="480px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                  />
                  <Input placeholder="Search for title, tag, or keyword" />
                </InputGroup>
                <Button colorScheme="teal">Search</Button>
              </HStack>
            </HStack>

            <TableOfResources />

          </VStack>
        </BigBaseCard>
      </Container>
    </Stack>
  );
};

export default SIGTabsResources;
