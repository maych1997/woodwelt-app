import React, {useEffect, useState} from 'react';
import ProductGrid from '../Product/ProductGrid';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  FEATURED_PRODUCTS,
  LATEST_PRODUCTS,
  NEW_PRODUCTS,
  SALE_PRODUCTS,
} from '../../../Graphql/query';
import {useQuery} from '@apollo/client';

const SeeMore = ({route, navigation}) => {
  const [productCount, setProductCount] = useState(10); // how many products to show
  const [allProducts, setAllProducts] = useState([]);   // store all fetched products

  const {
    loading,
    error,
    data,
  } = useQuery(
    route?.params?.title === 'On Sale'
      ? SALE_PRODUCTS
      : route?.params?.title === 'Featured'
      ? FEATURED_PRODUCTS
      : route?.params?.title === 'Latest'
      ? LATEST_PRODUCTS
      : route?.params?.title === "What's New"
      ? NEW_PRODUCTS
      : '',
    {
      variables: {
        productCount: route?.params?.title === 'Latest'?10:route?.params?.totalProducts,
      },
      fetchPolicy: 'cache-first',
    },
  );

  useEffect(() => {
    if (data?.products) {
      setAllProducts(data.products); // store all products once
    }
  }, [data]);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  // only send sliced products to ProductGrid

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back-ios'} size={25} />
        </TouchableOpacity>
        <Text style={{fontSize: 25, fontWeight: '800'}}>
          {route.params.title}
        </Text>
        <View style={{width: 25}} />
      </View>
      {loading?
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={'#FA6E49'} animating={true} />
      </SafeAreaView>
    :      <ProductGrid details={allProducts} />
}
    </SafeAreaView>
  );
};

export default SeeMore;
