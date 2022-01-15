import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarII from './components/Navigation';
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from 'apollo-boost';
import Auth0 from './auth/auth0Provider'

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


import {Auth0Context} from '@auth0/auth0-react';

class App extends React.Component {
    // static contextType = Auth0Context;
    render(): JSX.Element {
        // const {isAuthenticated} = this.context;
        return (
            <ApolloProvider client={client}>
                <Router>
                    <Auth0>
                        <NavbarII />
                    </Auth0>
                </Router>
            </ApolloProvider>
        );
    }
}
// function App() {

// }

export default App;
