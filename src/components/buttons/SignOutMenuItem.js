import { Button, useToast, MenuItem } from '@chakra-ui/react';
import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../store/store';

// To use this component, when it is called you need to pass setLoggedIn as props.
// Like this:
// <SignOutButton setLoggedIn={setLoggedIn} />;

const SignOutMenuItem = ({ setLoggedIn }) => {
  //  const [context, setContext] = useContext(StoreContext);
  //  const {
  //    current_user_id,
  //    current_user_display_name,
  //    current_user_pic,
  //    current_user_email,
  // } = context;

  const {
    // current_user_id,
    // current_user_display_name,
    // current_user_pic,
    // current_user_email,
    setCurrent_user_id,
    setCurrent_user_display_name,
    setCurrent_user_pic,
    setCurrent_user_email,
  } = useContext(StoreContext);

  const toast = useToast();
  const resultToast = (status, description) => {
    return toast({
      position: 'bottom-right',
      status: status,
      description: description,
      duration: 3000,
    });
  };

  const navigate = useNavigate();

  const signout = e => {
    e.preventDefault();
    // localStorage.removeItem('token');
    // localStorage.removeItem('user_display_name');

    localStorage.clear();
    sessionStorage.clear();
    // setContext({
    //   current_user_id: 0,
    //   current_user_display_name: '',
    //   current_user_pic: '',
    //   current_user_email: '',
    // });
    setCurrent_user_id(0);
    setCurrent_user_display_name('');
    setCurrent_user_pic('');
    setCurrent_user_email('');
    setLoggedIn(false);
    resultToast('success', 'Signed out');
    navigate('/');
  };
  return <MenuItem onClick={e => signout(e)}>Sign Out</MenuItem>;
};

export default SignOutMenuItem;
