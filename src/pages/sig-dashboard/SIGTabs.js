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

const SIGTabs = ({ sig_id }) => {
  return (
    <Container
      maxWidth="1440px"
      alignSelf="center"
      paddingInline={0}
      pr={6}
      pl={6}
    >
      <Tabs className={classes.bannerfullwidth} bg="gray.50" defaultIndex={1}>
        <TabList pl={10} w={'full'} bg="white">
          <Tab>About</Tab>
          <Tab>Discussion</Tab>
          <Tab>Cheer Board</Tab>
          <Tab>Resources</Tab>
        </TabList>

        <TabPanels bg="gray.50">
          <TabPanel>
            <SIGTabsAbout sig_id={sig_id} />
          </TabPanel>
          <TabPanel>
            <SIGTabsDiscussion sig_id={sig_id} />
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
