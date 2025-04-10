import {useNavigation} from '@react-navigation/native';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Image} from 'react-native-animatable';
import {FlatGrid} from 'react-native-super-grid';
import ProductItem from './ProductItem';

const ProductGrid = ({details, onScroll}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatGrid
        onScroll={onScroll}
        itemDimension={130}
        data={details?.nodes}
        renderItem={item => {
          return <ProductItem item={item} navigation={navigation} />;
        }}
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
