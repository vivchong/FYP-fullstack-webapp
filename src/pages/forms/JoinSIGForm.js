import { Flex, Text, Stack, useToast } from '@chakra-ui/react';
import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import SIGRecruitmentCard from '../../components/SIGRecruitmentCard';
import { StoreContext } from '../../store/store';



const JoinSIGForm = () => {
  const [context, setContext] = useContext(StoreContext);
  const {
    current_user_id,
    current_user_display_name,
    current_user_pic,
    current_user_email,
  } = context;
  
  const [inputs, setInputs] = useState({
    subject: '',
    message: '',
  });

  const {
    subject,
    message
  } = inputs;

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

   const toast = useToast();
   const resultToast = (status, description) => {
     return toast({
       position: 'bottom-right',
       status: status,
       description: description,
       duration: 3000,
     });
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {
        current_user_id,
        // sig_id,
        subject,
        message
      };
      resultToast('success', 'SIG Proposal Form was submitted!');
      const proposalForm = await fetch(
        'http://localhost:5000/forms/sig-proposal',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
     // navigate('/my-sigs');
      //window.location = window.location.href;
    } catch (err) {
      console.error(err.message);
    }
  };
  
  return (
    <>
      <Flex px={16} py={4} flexDir="column" gap={8}>
        <Text fontSize="4xl">Shared-Interest Groups (SIGs)</Text>

        <Stack spacing={8} maxW="856px" width="100%"></Stack>
      </Flex>
    </>
  );
};

export default JoinSIGForm;
