import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import MainApp from './src/components/Screens/MainApp';
import store from './redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';

// Define the GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'https://woodwelt.eu/graphql',
});

// Middleware to add Authorization header
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('authToken'); // Fetch token from AsyncStorage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client with authentication
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <StripeProvider publishableKey="pk_test_51NQFrzAy92YFZm4Vsoq7JKd9CjnqPazBBkmaNoyV50rIdaAMj6lLJI3R6jFDmcO2EtMCY2er5ioJQGwub9YzDO1y00tZ9JoxTM">
          <MainApp></MainApp>
        </StripeProvider>
      </Provider>
    </ApolloProvider>
  );
};



export default App;
