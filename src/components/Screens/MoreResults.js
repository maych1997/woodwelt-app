import React from 'react';
import ProductGrid from '../Product/ProductGrid';
import {ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FEATURED_PRODUCTS, SEARCH_PRODUCTS} from '../../../Graphql/query';
import {useQuery} from '@apollo/client';

const MoreResults = ({route, navigation}) => {
  const {
    loading: load_search,
    error: error_search,
    data: data_search,
  } = useQuery(SEARCH_PRODUCTS, {
    variables: {
      search: route?.params?.keywords,
    },
    fetchPolicy: 'cache-and-network',
  });
  if (load_search) {
    return <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator  color={'#FA6E49'} animating={load_search?true:'false'}></ActivityIndicator></SafeAreaView>;
  }

  // Handle errors for both queries
  if (error_search) {
    return <Text>Error in Featured: {error_search.message}</Text>;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 10,
          gap: 10,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name={'arrow-back-ios'} size={25}></Icon>
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: '6x00'}}>
          {route.params.title}
        </Text>
        <View></View>
      </View>
      <ProductGrid details={data_search?.products}></ProductGrid>
    </SafeAreaView>
  );
};

export default MoreResults;
