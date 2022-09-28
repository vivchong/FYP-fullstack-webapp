import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import StoreProvider from './store/store';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// const firebaseConfig = {
//   apiKey: 'AIzaSyBkD5hiC2fKFK7pizttymEsjXKmMq3qUb8',
//   authDomain: 'lifelonglearning-viv.firebaseapp.com',
//   projectId: 'lifelonglearning-viv',
//   storageBucket: 'lifelonglearning-viv.appspot.com',
//   messagingSenderId: '833400989941',
//   appId: '1:833400989941:web:dd6d2ce6204044df8abdbc',
//   measurementId: 'G-RND3SVZDQN',
// };

// const firebaseApp = initializeApp(firebaseConfig);

// const auth = getAuth(firebaseApp);

// onAuthStateChanged(auth, user => {
//   if (user != null) {
//     console.log('Logged in!');
//   } else {
//     console.log('No user');
//   }
// });


root.render(
  <StrictMode>
    <ColorModeScript />
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
