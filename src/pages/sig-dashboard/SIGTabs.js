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

// FROM SIGDashboardPage.js
const SIGTabs = ({ sig_id, sig_data, sig_members }) => {
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
        defaultIndex={1}
      >
        <TabList pl={10} w={'full'} bg="white">
          <Tab>About</Tab>
          <Tab>Discussion</Tab>
          <Tab>Cheer Board</Tab>
          <Tab>Resources</Tab>
        </TabList>

        <TabPanels bg="gray.50">
          <TabPanel>
            <SIGTabsAbout
              sig_id={sig_id}
              sig_data={sig_data}
              sig_members={sig_members}
            />
          </TabPanel>
          <TabPanel>
            <SIGTabsDiscussion sig_id={sig_id} sig_data={sig_data} />
          </TabPanel>
          <TabPanel>
            <SIGTabsCheerBoard sig_id={sig_id} />
          </TabPanel>
          <TabPanel>
            <SIGTabsResources sig_id={sig_id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default SIGTabs;
