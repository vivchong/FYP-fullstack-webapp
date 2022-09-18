import React, { useEffect } from 'react';
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useState } from 'react';
import NavItem from '../../components/buttons/SettingsNavItem';
import MySIGs from './MySIGs';

export default function Settings(props) {
  const [tabIndex, setTabIndex] = React.useState(props.tabIndex);

  useEffect(() => {
    setTabIndex(props.tabIndex);
  }, [props.tabIndex]);
  
  const handleTabsChange = index => {
    setTabIndex(index);
  };

  return (
    <Flex
      as={Tabs}
      orientation="vertical"
      index={tabIndex}
      onChange={handleTabsChange}
    >
      <Flex
        as={TabList}
        minW="280px"
        flexDir="column"
        alignItems="flex-start"
        bg="white"
        pos="sticky"
        h="100vh"
        boxShadow="base"
        w="25vw"
      >
        <NavItem title="Notifications" />
        <NavItem title="My SIGs" />
        <NavItem title="My Workshops" />
        <NavItem title="Edit Profile" />
      </Flex>
      <TabPanels bg='gray.50'>
        <TabPanel>Notifications</TabPanel>
        <TabPanel><MySIGs/></TabPanel>
        <TabPanel>My Workshops</TabPanel>
        <TabPanel>Edit Profile</TabPanel>
      </TabPanels>
    </Flex>
  );
}
