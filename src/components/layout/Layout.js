import classes from './Layout.module.css';
import Header from './Header';
import { Box } from '@chakra-ui/react';

function Layout(props) {
  return (
    <div>
      <Header />
      <main>
        <Box>{props.children}</Box>
      </main>
    </div>
  );
}
export default Layout;

// IF THERE'S NO className, THIS FILE DOES NOTHING ACTLY
