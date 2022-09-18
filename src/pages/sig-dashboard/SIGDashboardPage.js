import { Container, } from '@chakra-ui/react';
import SIGHeroBanner from './SIGHeroBanner';
import SIGTabs from './SIGTabs';
import { useParams } from 'react-router-dom';

// PROBABLY should just pass the sigid of the current SIG
// Need to do some auth to only allow members to view this page


const SIGDashboardPage = () => {
  let { sig_id } = useParams();
  
  return (
    <Container maxWidth="full" padding={0}>
      <SIGHeroBanner sig_id={sig_id} />
      <SIGTabs sig_id={sig_id} />
    </Container>
  );
};

export default SIGDashboardPage;
