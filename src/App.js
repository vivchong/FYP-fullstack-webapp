import '@fontsource/ibm-plex-sans/100.css';
import '@fontsource/ibm-plex-sans/200.css';
import '@fontsource/ibm-plex-sans/300.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';

import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';

import theme from './theme';

import Layout from './components/layout/Layout';
import SIGDashboardPage from './pages/sig-dashboard/SIGDashboardPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <SIGDashboardPage />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
