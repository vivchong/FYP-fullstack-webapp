import classes from './Layout.module.css';
import Header from './Header';
import { Box, Text } from '@chakra-ui/react';

// called from App.js

function Layout(props) {
  return (
    <div>
      <Header isLoggedIn={props.isLoggedIn} setLoggedIn={props.setLoggedIn} />
      <main>
        <Box>{props.children}</Box>
      </main>
    </div>
  );
}
export default Layout;

// IF THERE'S NO className, THIS FILE DOES NOTHING ACTLY. Except putting the header...
