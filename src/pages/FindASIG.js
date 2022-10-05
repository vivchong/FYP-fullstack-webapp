import {
  Flex,
  Text,
  Stack,

} from '@chakra-ui/react';
import { useState, useEffect, useLayoutEffect, useContext } from 'react';

import SIGRecruitmentCard from '../components/SIGRecruitmentCard';


const FindASIG = () => {
  // const [context, setContext] = useContext(StoreContext);
  // const {
  //   current_user_id,
  //   current_user_display_name,
  //   current_user_pic,
  //   current_user_email,
  // } = context;

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
    <>
      <Flex px={16} py={4} flexDir="column" gap={8}>
        <Text fontSize="4xl">Shared-Interest Groups (SIGs)</Text>

        <Stack spacing={8} maxW="856px" width="100%">
          {listOfAvailableSIGs.map(mySIG => (
            <SIGRecruitmentCard key={mySIG.sig_id} sig_id={mySIG.sig_id} />
          ))}
        </Stack>
      </Flex>
    </>
  );
};

export default FindASIG;
