import React from 'react';
import ProductGrid from '../Product/ProductGrid';
import {ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FEATURED_PRODUCTS} from '../../../Graphql/query';
import {useQuery} from '@apollo/client';

const SeeMore = ({route, navigation}) => {
  const {
    loading: load_featured,
    error: error_featured,
    data: data_featured,
  } = useQuery(FEATURED_PRODUCTS, {
    variables: {
      productCount: route?.params?.totalProducts,
    },
    fetchPolicy: 'cache-and-network',
  });
  if (load_featured) {
    return <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator  color={'#FA6E49'} animating={load_featured?true:'false'}></ActivityIndicator></SafeAreaView>;
  }

  // Handle errors for both queries
  if (error_featured) {
    return <Text>Error in Featured: {error_featured.message}</Text>;
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
        <Text style={{fontSize: 25, fontWeight: '800'}}>
          {route.params.title}
        </Text>
        <View></View>
      </View>
      <ProductGrid details={data_featured?.products}></ProductGrid>
    </SafeAreaView>
  );
};

export default SeeMore;
