import { Flex, Text, Stack, Box, Spacer, Icon, HStack } from '@chakra-ui/react';
import BaseCard from '../../components/layout/cards/BaseCard';
import { useState, useEffect, useLayoutEffect } from 'react';
import { BiCalendarAlt, BiTimeFive, BiUser } from 'react-icons/bi';
import SIGCard from '../../components/SIGCard';
import PendingForm from './PendingForm';
const MySIGs = () => {
  const [listOfMySIGs, setListOfMySIGs] = useState([]);
  const [pendingSIGProposals, setPendingSIGProposals] = useState([]);
  const current_user_id = sessionStorage.current_user_id;
  async function getPendingSIGForms() {
    try {
      const res = await fetch('http://localhost:5000/settings/pending-sig-proposals', {
        method: 'POST',
        headers: { token: localStorage.token },
      });
      const myFormsArray = await res.json();
      setPendingSIGProposals(myFormsArray);
      console.log(pendingSIGProposals);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function getMySIGs() {
    try {
      
      const res = await fetch('http://localhost:5000/settings/my-sigs', {
        method: 'POST',
        headers: { token: localStorage.token },
      });
      const mySIGsArray = await res.json();
      setListOfMySIGs(mySIGsArray);
      // console.log(listOfMySIGs); //[{sig_id: 1}, {sig_id: 2}]
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getPendingSIGForms();
    //getMySIGs();
  }, []);

  return (
    <Flex px={16} py={4} flexDir="column" gap={8}>
      <Text fontSize="4xl">My SIGs</Text>
      <Stack spacing={8} maxW="856px" width="100%">
        {pendingSIGProposals.map(pending => (
          <PendingForm key={pending.form_id} data={pending} />
        ))}
      </Stack>
      <Stack spacing={8} maxW="856px" width="100%">
        {listOfMySIGs.map(mySIG => (
          <SIGCard key={mySIG.sig_id} sig_id={mySIG.sig_id} />
        ))}
      </Stack>
    </Flex>
  );
};

export default MySIGs;
