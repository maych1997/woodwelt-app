import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import useCart from '../../../hooks/useCart';

const ProductItem = ({item, navigation}) => {
  const {addToCart} = useCart();
  const cartLoad = useSelector(state => state.load.addToCartLoading);
  return (
    <View
      style={{flex: 1, display: 'flex', alignItems: 'center', width: '100%'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('ProductDetails', {productDetails: item});
        }}
        style={{height: 150, borderRadius: 20}}>
        <Image
          style={{
            resizeMode: 'cover',
            height: '100%',
            width: 185,
            borderRadius: 20,
          }}
          source={{uri: item.item.image?.link}}
        />

        {item?.item?.onSale === true && (
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
            <Text style={{fontSize: 18, color: '#fff'}}>Select Options</Text>
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
                color={'#fff'}
                style={{padding: 1}}
                animating={cartLoad}></ActivityIndicator>
            ) : (
              <Text style={{fontSize: 18, color: '#fff'}}>Add to Cart</Text>
            )}
          </TouchableOpacity>
        )}

        <Text
          numberOfLines={1}
          style={{fontSize: 18, textAlign: 'center', width: '100%'}}>
          {item?.item?.name}
        </Text>
        <Text style={{fontSize: 15}}>
          {item?.item?.price?.replace(/&nbsp;/g, '')}
        </Text>
      </View>
    </View>
  );
};

export default ProductItem;
