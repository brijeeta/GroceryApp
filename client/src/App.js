import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
//import pages

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                {/* possible styling here */}
                <div className="">
                    <Switch>
                        {/* routes to each page go here */}
                        <Route exact path="/">
                            <PageNameHere />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;