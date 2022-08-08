import { Container, } from '@chakra-ui/react';
import SIGHeroBanner from './SIGHeroBanner';
import SIGTabs from './SIGTabs';


// PROBABLY should just pass the sigid of the current SIG
// Need to do some auth to only allow members to view this page


const SIGDashboardPage = () => {
  return (
    <Container maxWidth="full" padding={0}>
      <SIGHeroBanner />
      <SIGTabs />

    </Container>
  );
};

export default SIGDashboardPage;
