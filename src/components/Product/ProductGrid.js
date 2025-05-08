import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import ProductItem from './ProductItem';

const ProductGrid = ({ details, onScroll, onLoadMore }) => {
  const navigation = useNavigation();
  const [data, setData] = useState(details?.nodes || []);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false); // <-- NEW

  const prevDetails = useRef();

  useEffect(() => {
    if (prevDetails.current !== details) {
      setData(details?.nodes || []);
    }
    prevDetails.current = details;
  }, [details]);

  const handleEndReached = async () => {
    if (loadingMore || noMoreData) return;

    setLoadingMore(true);

    if (onLoadMore) {
      const moreProducts = await onLoadMore(); // Expect 10 new products
      if (moreProducts?.length > 0) {
        setData(prevData => [...prevData, ...moreProducts]);
      } else {
        setNoMoreData(true); // No more products to load
      }
    }

    setLoadingMore(false);
  };

  const RenderFooter = () => {
    if (loadingMore) {
      return <ActivityIndicator style={{ margin: 10 }} size="large" color="#FA6E49" />;
    }
    if (noMoreData) {
      return (
        <View style={{ alignItems: 'center', padding: 10 }}>
          <Text style={{ color: '#999' }}>No more products</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatGrid
        itemDimension={130}
        data={data}
        renderItem={( item ) => {
          return(
          <ProductItem item={item} navigation={navigation} />
          )
        }}
        onScroll={onScroll}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<RenderFooter />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

export default ProductGrid;
