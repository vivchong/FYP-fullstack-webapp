import '@fontsource/ibm-plex-sans/100.css';
import '@fontsource/ibm-plex-sans/200.css';
import '@fontsource/ibm-plex-sans/300.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';

import React, { Fragment, useState, useEffect } from 'react';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import theme from './theme';

import Layout from './components/layout/Layout';
import SIGDashboardPage from './pages/sig-dashboard/SIGDashboardPage';

import Dashboard from './pages/SampleDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/Error404';

// need useEffect to check whether jwt token is valid

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // used as setLoggedIn

  const setLoggedIn = boolean => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/is-verify', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json(); // true if token is still there

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <Fragment>
      <ChakraProvider theme={theme}>
        <Router>
          <Layout isLoggedIn={isAuthenticated} setLoggedIn={setLoggedIn}>
            <Routes>
              <Route exact path="/" element={<Home isLoggedIn={isAuthenticated} />} />
              <Route
                exact
                path="/login"
                element={
                  !isAuthenticated ? (
                    <Login
                      render={props => ({ ...props })}
                      setLoggedIn={setLoggedIn}
                    />
                  ) : (
                    <Navigate replace to={'/'} /> // REPLACE WITH HOMEPAGE LATER
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
                    <Register
                      render={props => ({ ...props })}
                      setLoggedIn={setLoggedIn}
                    />
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
                    <Dashboard
                      render={props => ({ ...props })}
                      setLoggedIn={setLoggedIn}
                    />
                  ) : (
                    <Navigate replace to={'/login'} />
                  )
                }
              />
              <Route exact path="/sig/1" element={<SIGDashboardPage />} />
              <Route path="*" element={<Navigate replace to={'not-found'} />} />
              <Route exact path="/not-found" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </ChakraProvider>
    </Fragment>
  );
}

export default App;
