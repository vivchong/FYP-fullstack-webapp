import { Container, Text, Box, Heading, Button, Link } from '@chakra-ui/react';
import SIGHeroBanner from './SIGHeroBanner';
import SIGTabs from './SIGTabs';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, Fragment, useContext } from 'react';
import { StoreContext } from '../../store/store';

// Need to do some auth to only allow members to view this page

const SIGDashboardPage = () => {
  const sig_id = useParams().id;

  const [context, setContext] = useContext(StoreContext);
  const { refreshSIGData } = context;
  const [sigData, setSIGData] = useState([]);

  // This was intended to redirect user to 404 if no SIG was found
  // const [noSIGFound, setNoSIGFound] = useState(false)
  // const navigate = useNavigate();

  async function getSIGData() {
    const res = await fetch(
      `http://localhost:5000/sig-dashboard/get-sig-data/${sig_id}`,
      {
        method: 'GET',
        headers: { token: localStorage.token },
      }
    );
    const sigDataArray = await res.json(); // parse data
    setSIGData(sigDataArray);
    //console.log(sigData);
    // if (sigData.length == 0) {
    //   console.log('No SIG exists');
    //   setNoSIGFound(true)
    // }
  }

  useEffect(() => {
    getSIGData();
  }, [refreshSIGData]);

  const [sigMembers, setSIGMembers] = useState([]);
  async function getMemberList() {
    try {
      const res = await fetch(
        `http://localhost:5000/sig-dashboard/get-members/${sig_id}`,
        {
          method: 'POST',
          headers: { token: localStorage.token },
        }
      );
      const memberArray = await res.json();
      setSIGMembers(memberArray);
      /* Array of multiple objects */
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getSIGData();
    getMemberList();
  }, []);

  // console.log('sig id: '+ sig_id);

  // Can introduce waiting time of 0.5secs before rendering
  return (
    <Container maxWidth="full" padding={0}>
      {sigData.length == 0 ? (
        <Box textAlign="center" py={10} px={6}>
          {/* <Heading>This SIG does not exist</Heading> */}
          {/* <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, teal.400, teal.600)"
            backgroundClip="text"
          >
            404
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            SIG Not Found
          </Text>
          <Text color={'gray.500'} mb={6}>
            The SIG group you're looking for does not seem to exist
          </Text>

          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
            as={Link}
            to='/'
          >
            Go to Home
          </Button> */}
        </Box>
      ) : (
        <Fragment>
          <SIGHeroBanner
            sig_id={sig_id}
            sig_data={sigData}
            sig_members={sigMembers}
          />
          <SIGTabs
            sig_id={sig_id}
            sig_data={sigData}
            sig_members={sigMembers}
          />
        </Fragment>
      )}
    </Container>
  );
};

export default SIGDashboardPage;
