import {Text} from '@react-navigation/elements';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Button,
  SafeAreaView,
  ScrollView,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import woodweltStore from '../../store/woodweltStore';
import {observer} from 'mobx-react';
import {
  FEATURED_PRODUCTS,
  LATEST_PRODUCTS,
  NEW_PRODUCTS,
  PRODUCTS,
  SALE_PRODUCTS,
} from '../../../Graphql/query';
import {useLazyQuery, useQuery} from '@apollo/client';
import ProductGrid from '../Product/ProductGrid';
import ProductList from '../Product/ProductList';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';

const CategoryStack = observer(({route, navigation}) => {
  const handleScroll = event => {
    // Update the scrollY value in MobX store
    woodweltStore.setScrollY(event.nativeEvent.contentOffset.y);
  };

  const category = route?.params?.category;
  if (!category) {
    const productCount = 5;
    const {
      loading: load_featured,
      error: error_featured,
      data: data_featured,
    } = useQuery(FEATURED_PRODUCTS, {
      variables: {
        productCount: productCount,
      },
      fetchPolicy: 'cache-first',
    });
    const {
      loading: load_latest,
      error: error_latest,
      data: data_latest,
    } = useQuery(LATEST_PRODUCTS, {
      variables: {
        productCount: productCount,
      },
      fetchPolicy: 'cache-first',
    });
    const {
      loading: load_sale,
      error: error_sale,
      data: data_sale,
    } = useQuery(SALE_PRODUCTS, {
      variables: {
        productCount: productCount,
      },
      fetchPolicy: 'cache-first',
    });
    const {
      loading: load_new,
      error: error_new,
      data: data_new,
    } = useQuery(NEW_PRODUCTS, {
      variables: {
        productCount: productCount,
      },
      fetchPolicy: 'cache-first',
    });

    // Check if both queries are loading
    if (load_featured || load_latest || load_sale || load_new) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            color={'#FA6E49'}
            animating={
              load_featured || load_latest || load_sale || load_new
                ? true
                : false
            }></ActivityIndicator>
        </View>
      );
    }

    // Handle errors for both queries
    if (error_featured) {
      return <Text>Error in Featured: {error_featured.message}</Text>;
    }

    if (error_latest) {
      return <Text>Error in Latest: {error_latest.message}</Text>;
    }
    if (error_sale) {
      return <Text>Error in Latest: {error_sale.message}</Text>;
    }
    if (error_new) {
      return <Text>Error in Latest: {error_new.message}</Text>;
    }

    return (
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <View
              style={{
                paddingLeft: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 25, fontWeight: '800'}}>On Sale</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('SeeMore', {
                    title: 'On Sale',
                    totalProducts: data_sale?.products?.found,
                  });
                }}
                style={{
                  display: 'flex',
                  columnGap: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: 10,
                }}>
                <Text style={{fontSize: 15, fontWeight: '300'}}>See More</Text>
                <Icon name={'rightcircle'} size={15} color={'#aab7b8'}></Icon>
              </TouchableOpacity>
            </View>
            <ProductList details={data_sale?.products} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <View
              style={{
                paddingLeft: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 25, fontWeight: '800'}}>Featured</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('SeeMore', {
                    title: 'Featured',
                    totalProducts: data_featured?.products?.found,
                  });
                }}
                style={{
                  display: 'flex',
                  columnGap: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: 10,
                }}>
                <Text style={{fontSize: 15, fontWeight: '300'}}>See More</Text>
                <Icon name={'rightcircle'} size={15} color={'#aab7b8'}></Icon>
              </TouchableOpacity>
            </View>
            <ProductList details={data_featured?.products} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <View
              style={{
                paddingLeft: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 25, fontWeight: '800'}}>Latest</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('SeeMore', {
                    title: 'Latest',
                    totalProducts: data_latest?.products?.found,
                  });
                }}
                style={{
                  display: 'flex',
                  columnGap: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: 10,
                }}>
                <Text style={{fontSize: 15, fontWeight: '300'}}>See More</Text>
                <Icon name={'rightcircle'} size={15} color={'#aab7b8'}></Icon>
              </TouchableOpacity>
            </View>
            <ProductList details={data_latest?.products} />
          </View>
          <View style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <View
              style={{
                marginTop: 10,
                paddingLeft: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 25, fontWeight: '800'}}>What's New</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('SeeMore', {
                    title: "What's New",
                    totalProducts: data_new?.products?.found,
                  });
                }}
                style={{
                  display: 'flex',
                  columnGap: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: 10,
                }}>
                <Text style={{fontSize: 15, fontWeight: '300'}}>See More</Text>
                <Icon name={'rightcircle'} size={15} color={'#aab7b8'}></Icon>
              </TouchableOpacity>
            </View>
            <ProductGrid details={data_new?.products} />
          </View>
        </View>
      </ScrollView>
    );
  } else {
    const [productCount, setProductCount] = useState(0);

    const {data, loading, error} = useQuery(PRODUCTS, {
      variables: {category, productCount: productCount},
      fetchPolicy: 'cache-first',
      // Here, the 'after' will be used as a cursor for pagination.
    });

    useEffect(() => {
      if (data?.products?.found) {
        setProductCount(data?.products?.found); // Update state only after data is fetched
      }
    }, [data]); // Dependency on the data being fetched
    // Handle loading, error, and display data
    if (loading)
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            color={'#FA6E49'}
            animating={loading}></ActivityIndicator>
        </View>
      );
    if (error) return <Text>Error: {error.message}</Text>;

    return (
      <>
        {data?.products?.nodes.length != 0 ? (
          <ProductGrid onScroll={handleScroll} details={data?.products} />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No Products Found!</Text>
          </View>
        )}
      </>
    );
  }
});

export default CategoryStack;
