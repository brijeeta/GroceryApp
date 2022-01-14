import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarII from './components/Navigation';
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <NavbarII />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
