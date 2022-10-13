import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import SIGTabsAbout from './abouttab/SIGTabsAbout';
import SIGTabsDiscussion from './discussiontab/SIGTabsDiscussion';
import SIGTabsCheerBoard from './cheerboardtab/SIGTabsMeetingNotes';
import SIGTabsResources from './resourcestab/SIGTabsResources';
import classes from './SIGHeroBanner.module.css';
import { useEffect, useState } from 'react';
import SIGTabsMembers from './memberstab/SIGTabsMembers';


// FROM SIGDashboardPage.js
const SIGTabs = ({ sig_id, sig_data, sig_members, tab_index }) => {

  const [tabIndex, setTabIndex] = useState(tab_index);

  const [roleInSIG, setRoleInSIG] = useState(0);
  async function getRoleInSIG () {
    try {
      const body = { sig_id };

      const res = await fetch(
        'http://localhost:5000/sig-dashboard/get-role',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );
      const role = await res.json(); // parse data
      setRoleInSIG(role);

    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getRoleInSIG();
  }, []);

  useEffect(() => {
    setTabIndex(tab_index);
  }, [tab_index]);
  

  const handleTabChange = index => {
    setTabIndex(index);
  };

  return (
    <Container
      maxWidth="1440px"
      alignSelf="center"
      paddingInline={0}
      pr={6}
      pl={6}
    >
      <Tabs
        isLazy
        className={classes.bannerfullwidth}
        bg="gray.50"
        height="100vh"
        defaultIndex={1}
        index={tabIndex}
        onChange={handleTabChange}
      >
        <TabList pl={10} w={'full'} bg="white">
          <Tab>About</Tab>
          <Tab>Discussion</Tab>
          <Tab>Cheer Board</Tab>
          <Tab>Resources</Tab>
          <Tab>Members</Tab>
        </TabList>

        <TabPanels bg="gray.50">
          <TabPanel>
            <SIGTabsAbout
              sig_id={sig_id}
              sig_data={sig_data}
              sig_members={sig_members}
              role={roleInSIG}
            />
          </TabPanel>
          <TabPanel>
            <SIGTabsDiscussion
              sig_id={sig_id}
              sig_data={sig_data}
              role={roleInSIG}
            />
          </TabPanel>
          <TabPanel>
            <SIGTabsCheerBoard sig_id={sig_id} role={roleInSIG} />
          </TabPanel>
          <TabPanel>
            <SIGTabsResources sig_id={sig_id} role={roleInSIG} />
          </TabPanel>
          <TabPanel>
            <SIGTabsMembers
              sig_id={sig_id}
              sig_data={sig_data}
              sig_members={sig_members}
              role={roleInSIG}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default SIGTabs;
