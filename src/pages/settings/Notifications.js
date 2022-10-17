import {
  Flex,
  Heading,
  Text,
  Stack,
  Box,
  Icon,
  Spacer,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Link as ReactRouterLink } from 'react-router-dom';

const Notifications = () => {
  
  const [joinSIGRequests, setJoinSIGRequests] = useState([]);
  async function getJoinSIGRequests() {
    try {
      const res = await fetch(
        'http://localhost:5000/settings/join-sig-requests',
        {
          method: 'POST',
          headers: { token: localStorage.token },
        }
      );
      const reqArray = await res.json();
      setJoinSIGRequests(reqArray);
      console.log(joinSIGRequests);
    } catch (error) {
      console.error(error.message);
    }
  }

  const [formNotifications, setFormNotifications] = useState([]);
  async function getFormNotifications() {
    try {
      const res = await fetch(
        'http://localhost:5000/settings/get-form-notifs',
        {
          method: 'POST',
          headers: { token: localStorage.token },
        }
      );
      const formArray = await res.json();
      setFormNotifications(formArray);
      console.log(formNotifications);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getJoinSIGRequests();
    getFormNotifications();
  }, []);
  return (
    <>
      <Flex px={16} py={4} flexDir="column" gap={8}>
        <Text fontSize="4xl">Notifications</Text>
        <Stack spacing={8} maxW="824px" width="100%">
          {joinSIGRequests.map(request => (
            <>
              <Box
                key={request.sig_id}
                bg="white"
                boxShadow="sm"
                py={6}
                px={10}
              >
                <Flex gap={10}>
                  {/* <TimeIcon w={10} h={10} /> */}
                  <Icon
                    as={AiOutlineUsergroupAdd}
                    w={10}
                    h={10}
                    color="gray.500"
                  />
                  <Flex flexDir="column" gap={2}>
                    <Text fontWeight="medium">
                      "{request.sig_name}" is gaining popularity!
                    </Text>
                    <Text>
                      Someone submitted a request to join your SIG. They are
                      waiting for your response.
                    </Text>
                    <Flex>
                      <Spacer />
                      <Button
                        maxW="208px"
                        as={ReactRouterLink}
                        to={'/sig/' + request.sig_id + '/members'}
                      >
                        View submitted form
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </>
          ))}
        </Stack>
        <Stack spacing={8} maxW="824px" width="100%">
          {formNotifications.map(notif => {
            if (notif.message_content === 'Rejected') {
              return (
                <Box
                  key={notif.notif_id}
                  bg="white"
                  boxShadow="sm"
                  py={6}
                  px={10}
                >
                  <Flex gap={10}>
                    {/* <TimeIcon w={10} h={10} /> */}
                    <Icon
                      as={AiOutlineUsergroupAdd}
                      w={10}
                      h={10}
                      color="gray.500"
                    />
                    <Flex flexDir="column" gap={2}>
                      <Text fontWeight="medium">
                        Your requst to join "{notif.sig_name}" was rejected.
                      </Text>
                      <Text>
                        Unfortunately, your request to join this SIG was rejected by the SIG's leader. You may apply to join other SIGs.
                      </Text>
                      <Flex></Flex>
                    </Flex>
                  </Flex>
                </Box>
              );
            }
             if (notif.message_content === 'Approved') {
               return (
                 <Box
                   key={notif.notif_id}
                   bg="white"
                   boxShadow="sm"
                   py={6}
                   px={10}
                 >
                   <Flex gap={10}>
                     {/* <TimeIcon w={10} h={10} /> */}
                     <Icon
                       as={AiOutlineUsergroupAdd}
                       w={10}
                       h={10}
                       color="gray.500"
                     />
                     <Flex flexDir="column" gap={2}>
                       <Text fontWeight="medium">
                         Your requst to join "{notif.sig_name}" was approved!
                       </Text>
                       <Text>
                         Hooray! You can now access the {notif.sig_name}'s Dashboard.
                       </Text>
                       <Flex></Flex>
                     </Flex>
                   </Flex>
                 </Box>
               );
             }
          })}
        </Stack>
      </Flex>
    </>
  );
};

export default Notifications;
