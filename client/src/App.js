import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from 'apollo-boost';
import SearchItems from './pages/SearchItems';

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
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchItems} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
