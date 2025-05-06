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
  uri: 'https://woodwelt.eu/graphql', // Replace with your actual GraphQL endpoint
});

// Step 2: Set up middleware to add Authorization header
const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await AsyncStorage.getItem('authToken'); // Retrieve the token from storage

    // Optional: Debug log (remove in production)
    if (__DEV__) {
      console.log('Auth Token:', token);
    }

    return {
      headers: {
        ...headers,
        Authorization: token ? `${token}` : '', // Use Bearer token format
      },
    };
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return {
      headers: {
        ...headers,
        authorization: '',
      },
    };
  }
});

// Step 3: Combine authLink and httpLink and initialize ApolloClient
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combines both links
  cache: new InMemoryCache(),      // Use in-memory cache
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
