import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-animatable';
import useCart from '../../../hooks/useCart';
import {useSelector} from 'react-redux';

const ProductList = ({details}) => {
  const navigation = useNavigation();
  const {addToCart} = useCart();
  const cartLoad = useSelector(state => state.load.addToCartLoading);
  return (
    <View style={{flex: 1}}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={details?.nodes}
        renderItem={(item) => {
          // console.log(item);
          return (
            <View
              style={{flex: 1, padding: 10, width: 230, alignItems: 'center'}}>
              <TouchableOpacity
                style={{height: 150, borderRadius: 20}}
                onPress={() => {
                  navigation.push('ProductDetails', {productDetails: item});
                }}>
                <Image
                  style={{
                    resizeMode: 'cover',
                    width: 200,
                    height: '100%',
                    borderRadius: 20,
                  }}
                  onLoadStart={() => {
                    <ActivityIndicator
                    color={'#FA6E49'}
                      animating={
                        item?.item?.image?.link != undefined ? true : false
                      }></ActivityIndicator>;
                  }}
                  source={{uri: item?.item?.image?.link}}></Image>
                {item.item.onSale == true ? (
                  <View
                    style={{
                      backgroundColor: '#FA6E49',
                      position: 'absolute',
                      padding: 5,
                      borderRadius: 5,
                      top: 10,
                      right: 8,
                    }}>
                    <Text style={{color: '#fff'}}>Sale!</Text>
                  </View>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 5,
                  paddingTop: 10,
                  width: '100%',
                }}>
                {item?.item?.type == 'VARIABLE' ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('ProductDetails', {productDetails: item});
                    }}
                    style={{
                      padding: 8,
                      backgroundColor: '#000',
                      borderRadius: 5,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 18, color: '#fff'}}>
                      Select Options
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      addToCart(item.item.databaseId, 1);
                    }}
                    style={{
                      padding: 8,
                      backgroundColor: '#000',
                      borderRadius: 5,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {cartLoad ? (
                      <ActivityIndicator
                        size={'small'}
                        color={'#FA6E49'}
                        style={{padding: 1}}
                        animating={cartLoad}></ActivityIndicator>
                    ) : (
                      <Text style={{fontSize: 18, color: '#fff'}}>
                        Add to Cart
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
                <Text
                  numberOfLines={1}
                  style={{fontSize: 18, textAlign: 'center', width: '100%'}}>
                  {item.item.name}
                </Text>
                <Text style={{fontSize: 15}}>
                  {item.item.price?.replace(/&nbsp;/g, '')}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
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

export default ProductList;
