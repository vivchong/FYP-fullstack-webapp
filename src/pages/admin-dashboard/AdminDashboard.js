import React, { useEffect } from 'react';
import { Flex, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';
import NavItem from '../../components/buttons/SettingsNavItem';
import MySIGs from '../settings/MySIGs';
import SIGApprovals from './SIGApprovals';

export default function AdminDashboard(props) {
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
        <NavItem title="SIG Approvals" />
        <NavItem title="Admin Activity" />
        <NavItem title="SIG Overview" />
        <NavItem title="Exco Members" />
      </Flex>
      <TabPanels bg="gray.50">
        <TabPanel>
          <SIGApprovals />
        </TabPanel>
        
        <TabPanel>Admin Activity</TabPanel>

        <TabPanel>SIG Overview</TabPanel>

        <TabPanel>Exco Members</TabPanel>
      </TabPanels>
    </Flex>
  );
}
