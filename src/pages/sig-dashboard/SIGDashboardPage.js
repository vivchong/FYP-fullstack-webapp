import { Container, Text, Box, Heading, Button, Link } from '@chakra-ui/react';
import SIGHeroBanner from './SIGHeroBanner';
import SIGTabs from './SIGTabs';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, Fragment, useContext } from 'react';
import { StoreContext } from '../../store/store';
import Unauthorised from '../Error401';

// Need to do some auth to only allow members to view this page

const SIGDashboardPage = props => {
  const sig_id = useParams().id;

  // const [context, setContext] = useContext(StoreContext);
  // const { refreshSIGData } = context;

  const { refreshSIGData } = useContext(StoreContext);
  
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

  const [roleInSIG, setRoleInSIG] = useState(0);
  async function getRoleInSIG() {
    try {
      const body = { sig_id };

      const res = await fetch('http://localhost:5000/sig-dashboard/get-role', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
      const role = await res.json(); // parse data
      setRoleInSIG(role);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getRoleInSIG();
    getSIGData();
    getMemberList();
  }, [refreshSIGData]);

  // console.log('sig id: '+ sig_id);

  // Can introduce waiting time of 0.5secs before rendering
  return (
    <Container maxWidth="full" padding={0}>
      {roleInSIG === 401 ? (
        <Unauthorised />
      ) : (
        <Fragment>
          <SIGHeroBanner
            sig_id={sig_id}
            sig_data={sigData}
            sig_members={sigMembers}
          />
          <SIGTabs
            tab_index={props.tab_index}
            sig_id={sig_id}
            sig_data={sigData}
            sig_members={sigMembers}
            roleInSIG={roleInSIG}
          />
        </Fragment>
      )}
    </Container>
  );
};

export default SIGDashboardPage;
