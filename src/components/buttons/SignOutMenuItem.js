import { Button, useToast, MenuItem } from '@chakra-ui/react';
import { Fragment } from 'react';

// To use this component, when it is called you need to pass setLoggedIn as props.
// Like this:
// <SignOutButton setLoggedIn={setLoggedIn} />;

const SignOutMenuItem = ({ setLoggedIn }) => {
  const toast = useToast();
  const resultToast = (status, description) => {
    return toast({
      position: 'bottom-right',
      status: status,
      description: description,
      duration: 3000,
    });
  };

  const signout = e => {
    e.preventDefault();
    // localStorage.removeItem('token');
    // localStorage.removeItem('user_display_name');
    setLoggedIn(false);
    localStorage.clear();
    sessionStorage.clear();
    resultToast('success', 'Signed out');
  };
  return (
      <MenuItem onClick={e => signout(e)}>
          Sign Out
      </MenuItem>
  );
};

export default SignOutMenuItem;
