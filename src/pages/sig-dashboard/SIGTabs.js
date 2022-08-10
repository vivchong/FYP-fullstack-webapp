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
import SIGTabsMeetingNotes from './meetingnotestab/SIGTabsMeetingNotes';
import SIGTabsResources from './resourcestab/SIGTabsResources';
import classes from './SIGHeroBanner.module.css';

const SIGTabs = () => {
  return (
    <Container
      maxWidth="1440px"
      alignSelf="center"
      paddingInline={0}
      pr={6}
      pl={6}
    >
      <Tabs className={classes.bannerfullwidth} bg='gray.50' defaultIndex={1}>

          <TabList pl={10} w={'full'} bg='white' >
            <Tab>About</Tab>
            <Tab>Discussion</Tab>
            <Tab>Meeting Notes</Tab>
            <Tab>Resources</Tab>
          </TabList>


        <TabPanels bg="gray.50">
          <TabPanel>
            <SIGTabsAbout />
          </TabPanel>
          <TabPanel>
            <SIGTabsDiscussion />
          </TabPanel>
          <TabPanel>
            <SIGTabsMeetingNotes />
          </TabPanel>
          <TabPanel>
            <SIGTabsResources />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default SIGTabs;
