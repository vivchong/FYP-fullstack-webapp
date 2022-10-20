import {
  Flex,
  Text,
  Stack,
  list,
  FormLabel,
  CheckboxGroup,
  Checkbox,
  useCheckboxGroup,
} from '@chakra-ui/react';
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

  // const [checkedDays, setCheckedDays] = useState([
  //   true,
  //   true,
  //   true,
  // ]);
  // const allDaysChecked = checkedDays.every(Boolean);
  // const isIndeterminate = checkedDays.some(Boolean) && !allDaysChecked;

  const { value, getCheckboxProps } = useCheckboxGroup({
    colorScheme: 'teal',
    defaultValue: [
      'Undecided',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  });

  // const handleCheckChange = (event) => setValue
  var filter = {
    sig_meeting_day: value,
  };

  let filterResults = listOfAvailableSIGs.filter(function (sig) {
    for (var key in filter) {
      if (sig[key] === undefined || filter[key].indexOf(sig[key]) === -1)
        // if sig[key] is not found (-1) in the filter array, return FALSE
        return false;
    }
    return true;
  });

  console.log(filterResults);

  return (
    <Flex flexDir="column">
      <Flex gap="124px" px={16} pt={10} pb={10}>
        <Flex w="254px" flexDir="column">
          <Flex mt="104px" flexDir="column" gap={2}>
            <FormLabel m={0}>Day of meetings</FormLabel>
            <Stack>
              <Checkbox
                {...getCheckboxProps({ value: 'Undecided' })}
                colorScheme="teal"
              >
                Undecided
              </Checkbox>
              <Checkbox
                {...getCheckboxProps({ value: 'Monday' })}
                colorScheme="teal"
              >
                Monday
              </Checkbox>
              <Checkbox
                {...getCheckboxProps({ value: 'Tuesday' })}
                colorScheme="teal"
              >
                Tuesday
              </Checkbox>
              <Checkbox
                {...getCheckboxProps({ value: 'Wednesday' })}
                colorScheme="teal"
              >
                Wednesday
              </Checkbox>
              <Checkbox
                {...getCheckboxProps({ value: 'Thursday' })}
                colorScheme="teal"
              >
                Thursday
              </Checkbox>
              <Checkbox
                {...getCheckboxProps({ value: 'Friday' })}
                colorScheme="teal"
              >
                Friday
              </Checkbox>
              <Checkbox
                {...getCheckboxProps({ value: 'Saturday' })}
                colorScheme="teal"
              >
                Saturday
              </Checkbox>
              <Checkbox
                {...getCheckboxProps({ value: 'Sunday' })}
                colorScheme="teal"
              >
                Sunday
              </Checkbox>
            </Stack>
          </Flex>
        </Flex>

        <Flex flexDir="column" mb="96px">
          <Text fontSize="42px">Shared-Interest Groups (SIGs)</Text>
          <Text fontWeight="medium" mt={10} mb={3}>
            {filterResults.length} shared-interest groups found
          </Text>
          <Stack spacing={8} maxW="856px" width="100%">
            {filterResults.map(sig => (
              <SIGRecruitmentCard
                key={sig.sig_id}
                sig_id={sig.sig_id}
                topic={sig.sig_topic}
                name={sig.sig_name}
                introduction={sig.introduction}
                meeting_day={sig.sig_meeting_day}
                timing={sig.timing}
                member_count={sig.sig_member_count}
                frequency_interval={sig.sig_frequency_interval}
                img_url={sig.sig_img_url}
              />
            ))}
          </Stack>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default FindASIG;
