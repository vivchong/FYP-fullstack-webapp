import { Flex, Text, Stack } from '@chakra-ui/react';
import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import Footer from '../components/layout/Footer';

import SIGRecruitmentCard from '../components/SIGRecruitmentCard';

const FindASIG = () => {

  const [listOfAvailableSIGs, setListOfAvailableSIGs] = useState([]);

  async function getAvailableSIGs() {
    try {
      const res = await fetch('http://localhost:5000/sigs/available', {
        method: 'POST',
        headers: { token: localStorage.token },
      });

      const availableSIGsArray = await res.json();
      setListOfAvailableSIGs(availableSIGsArray);
      // console.log(listOfAvailableSIGs); //[{sig_id: 1}, {sig_id: 2}]
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAvailableSIGs();
  }, []);

  return (
    <Flex flexDir="column" pt={10} pb={0}>
      <Flex flexDir="column" px={16} mb="96px">
        <Text fontSize="42px">Shared-Interest Groups (SIGs)</Text>
        <Text fontWeight="medium" mt={10} mb={3}>
          {listOfAvailableSIGs.length} shared-interest groups found
        </Text>
        <Stack spacing={8} maxW="856px" width="100%">
          {listOfAvailableSIGs.map(sig => (
            <SIGRecruitmentCard
              key={sig.sig_id}
              sig_id={sig.sig_id}
              topic={sig.sig_topic}
              name={sig.sig_name}
              introduction={sig.introduction}
              meeting_day={sig.meeting_day}
              timing={sig.timing}
              member_count={sig.sig_member_count}
            />
          ))}
        </Stack>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default FindASIG;
