import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react'

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      redirectUri={window.location.origin}>
        <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
