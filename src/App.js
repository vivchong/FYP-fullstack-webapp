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
import Settings from './pages/settings/Settings';
import { MdNextWeek } from 'react-icons/md';
import WhatIsASIG from './pages/WhatIsASIG';
import SIGProposalForm from './pages/forms/SIGProposalForm';
import AdminDashboard from './pages/admin-dashboard/AdminDashboard';
import SIGRecruitmentPage from './pages/recruitment/SIGRecruitmentPage';
import EditSIGRecruitmentPage from './pages/recruitment/EditSIGRecruitmentPage';
import FindASIG from './pages/FindASIG';
import JoinSIGForm from './pages/forms/JoinSIGForm';

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
              <Route
                exact
                path="/"
                element={<Home isLoggedIn={isAuthenticated} />}
              />
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
                    <Navigate replace to={'/'} />
                  )
                }
              />
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
              <Route exact path="/what-is-a-sig" element={<WhatIsASIG />} />
              <Route
                exact
                path="/sig-proposal-form"
                element={<SIGProposalForm />}
              />
              <Route exact path="/find-a-sig" element={<FindASIG />} />

              <Route
                exact
                path="/sig-recruitment-page/:id"
                element={<SIGRecruitmentPage />}
              />
              <Route
                exact
                path="/edit/sig-recruitment-page/:id"
                element={<EditSIGRecruitmentPage />}
              />
              <Route
                exact
                path="/join-sig/:id"
                element={<JoinSIGForm />}
              />
              <Route exact path="/sig/:id" element={<SIGDashboardPage />} />

              <Route
                exact
                path="/admin-dashboard"
                element={<AdminDashboard />}
              />
              <Route
                exact
                path="settings"
                element={
                  isAuthenticated ? (
                    <Settings tabIndex={0} />
                  ) : (
                    <Navigate replace to={'/login'} />
                  )
                }
              />
              <Route
                exact
                path="notifications"
                element={
                  isAuthenticated ? (
                    <Settings tabIndex={0} />
                  ) : (
                    <Navigate replace to={'/login'} />
                  )
                }
              />
              <Route
                exact
                path="my-sigs"
                element={
                  isAuthenticated ? (
                    <Settings tabIndex={1} />
                  ) : (
                    <Navigate replace to={'/login'} />
                  )
                }
              />
              <Route
                exact
                path="my-workshops"
                element={
                  isAuthenticated ? (
                    <Settings tabIndex={2} />
                  ) : (
                    <Navigate replace to={'/login'} />
                  )
                }
              />
              <Route
                exact
                path="edit-profile"
                element={
                  isAuthenticated ? (
                    <Settings tabIndex={3} />
                  ) : (
                    <Navigate replace to={'/login'} />
                  )
                }
              />

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
