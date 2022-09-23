import { Container, Text } from '@chakra-ui/react';
import SIGHeroBanner from './SIGHeroBanner';
import SIGTabs from './SIGTabs';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

// Need to do some auth to only allow members to view this page

const SIGDashboardPage = () => {
  const sig_id = useParams().id;
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
    console.log(sigData);
    // if (sigData.length == 0) {
    //   console.log('No SIG exists');
    //   setNoSIGFound(true)
    // }
  }

  useEffect(() => {
    getSIGData();
    
  }, []);

  
  // console.log('sig id: '+ sig_id);

  return (
    <Container maxWidth="full" padding={0}>
  <SIGHeroBanner sig_id={sig_id} sig_data={sigData} />
        <SIGTabs sig_id={sig_id} sig_data={sigData} />
    
    </Container>
  );
};

export default SIGDashboardPage;
