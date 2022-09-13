import { Button, Heading, Text } from '@chakra-ui/react';
import React, { Fragment, useState, useEffect } from 'react';
import SignOutButton from '../components/buttons/SignOutBtn';

const Dashboard = ({ setLoggedIn }) => {
  const [name, setName] = useState(''); // collect Name of logged in user

  async function getName() {
    try {
      const response = await fetch('http://localhost:5000/sig-dashboard', {
        // linked to the sig-dashboard route which gets user data
        method: 'POST',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json(); // console.log(parseRes) ==> {user_display_name: 'Rohan Gautam'}

      setName(parseRes.user_display_name);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    // makes a request when this component is called
    getName();
  }, []); // adding [] makes sure that useEffect only makes ONE request, instead of multiple
  return (
    <Fragment>
      <Heading>Dashboard Placeholder Page {name}</Heading>
      <Text>
        Just need to replace this with the actual dashboard later on. Or the
        homepage.
      </Text>
      <SignOutButton setLoggedIn={setLoggedIn} />
    </Fragment>
  );
};

export default Dashboard;
