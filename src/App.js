import '@fontsource/ibm-plex-sans/100.css';
import '@fontsource/ibm-plex-sans/200.css';
import '@fontsource/ibm-plex-sans/300.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';

import React, {Fragment, useState, useEffect} from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import theme from './theme';

import Layout from './components/layout/Layout';
import SIGDashboardPage from './pages/sig-dashboard/SIGDashboardPage';

import Dashboard from './pages/SampleDashboard';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  };

  return (
    <Fragment>
      <ChakraProvider theme={theme}>
      <Router>
        <Layout isLoggedIn={isAuthenticated}>
        <Routes>
          <Route
            exact path="/login"
            element={
              !isAuthenticated ? (
                <Login render={props => ({ ...props })} setAuth={setAuth} test={isAuthenticated} />
              ) : (
                <Navigate replace to={'/sig-dashboard'} /> // REPLACE WITH HOMEPAGE LATER
              )
            }
          />
          {/* using render prop instead of component prop cuz it doesn't remount when sending/passing props to component */}
          {/* <SIGDashboardPage /> */}
          <Route
            exact
            path="/register"
            element={
              !isAuthenticated ? (
                <Register render={props => ({ ...props })} setAuth={setAuth} />
              ) : (
                <Navigate replace to={'/login'} />
              )
            }
          />
          <Route
            exact
            path="/sig-dashboard"
            element={
              isAuthenticated ? (
                <Dashboard render={props => ({ ...props })} setAuth={setAuth} />
              ) : (
                <Navigate replace to={'/login'} />
              )
            }
          />
          <Route exact path="/test" element={<SIGDashboardPage />} />
        </Routes>
        </Layout>
      </Router>
      </ChakraProvider>
    </Fragment>
  );
}

export default App;
