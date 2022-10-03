import {
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';


const SIGApprovals = props => {
    const [pendingForms, setPendingForms] = useState([])
   async function getPendingForms() {
     try {
       const res = await fetch('http://localhost:5000/forms/all-pending-sig-proposals', {
         method: 'POST',
         headers: { token: localStorage.token },
       });
         const pendingFormsArray = await res.json();
         alert('called')
       setPendingForms(pendingFormsArray);
       console.log(pendingForms); //[{sig_id: 1}, {sig_id: 2}]
     } catch (err) {
       console.error(err.message);
     }
    }
    useEffect(() => {
        getPendingForms();
    
    }, [])
    
  return (
    <>
      <Heading mt="60px" ml="56px" fontSize="3xl">
        SIG Approvals
      </Heading>
      <Tabs mt={4} colorScheme="teal">
        <TabList>
          <Tab ml={14}>Pending Approval</Tab>
          <Tab>Previously Approved</Tab>
        </TabList>

        <TabPanels px={14}>
          <TabPanel>
            <TableContainer
              maxW="976px"
              bg="white"
              borderRadius="12px"
              borderWidth="1px"
              borderColor="gray.200"
              p={3}
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Submitted by</Th>
                    <Th>Date submitted</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                    
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td>25.4</Td>
                  </Tr>
             
                </Tbody>
                {/* <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th>multiply by</Th>
                  </Tr>
                </Tfoot> */}
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default SIGApprovals;
