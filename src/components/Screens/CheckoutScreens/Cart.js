import {Text} from '@react-navigation/elements';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQuery} from '@apollo/client';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { GET_CART, GET_PROFILE_DETAILS } from '../../../../Graphql/query';
import Counter from '../../Counter/Counter';
import useCart from '../../../../hooks/useCart';
const Cart = ({navigation}) => {
  const {removeFromCart} = useCart();
  const cartLoad = useSelector(state => state.load.addToCartLoading);
  
  const {
    data: dataCart,
    error: errorCart,
    loading: loadCart,
  } = useQuery(GET_CART, {
    pollInterval: 100,
  });
  const {
    data: dataUser,
    error: errorUser,
    loading: loadUser,
  } = useQuery(GET_PROFILE_DETAILS, {
    pollInterval: 100,
  });

  if (loadCart || loadUser) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
         color={'#FA6E49'}
          animating={loadCart || loadUser? true : false}></ActivityIndicator>
      </SafeAreaView>
    );
  }
  // Handle errors for both queries
  if (errorCart) {
    return <Text>Error in Featured: {errorCart.message}</Text>;
  }

  if (errorUser) {
    return <Text>Error in Featured: {errorUser.message}</Text>;
  }

  return (
    <>
      {dataCart.cart.contents.itemCount == 0 ? (
        <SafeAreaView
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name={'sad'} size={150}></Icon>
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: '#333',
              }}>
              Cart is Empty
            </Text>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{flex: 1, width: '100%'}}>
          <ScrollView>
            <>
              {dataCart?.cart?.contents?.nodes.map((item,index) => {
                return (
                  <TouchableOpacity
                  key={index}
                  onPress={()=>{
                    navigation.navigate('Home',{screen:'ProductDetails',params:{productDetails: item.product.node,route:'Cart'} })
                    // console.log(item);
                  }}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      margin: 10,
                      padding: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        removeFromCart(item.key);
                      }}
                      style={{alignSelf: 'flex-end'}}>
                      <MaterialIcons
                        name={'delete'}
                        color={'red'}
                        size={25}></MaterialIcons>
                    </TouchableOpacity>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                      }}>
                      <View>
                        <Image
                          style={{
                            resizeMode: 'contain',
                            width: 150,
                            height: 150,
                          }}
                          source={{
                            uri: item.product.node.image.sourceUrl,
                          }}></Image>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 10,
                          width: '100%',
                        }}>
                        <View style={{display: 'flex', width: '50%'}}>
                          <Text
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            style={{fontSize: 20, fontWeight: '900'}}>
                            {item.product.node.name}
                          </Text>
                        </View>
                        <Counter
                          cartLoad={cartLoad}
                          quantity={item.quantity}
                          keyItem={item.key}></Counter>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '500',
                        alignSelf: 'flex-end',
                      }}>
                      {item.total.replace(/&nbsp;/g, '')}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </>
          </ScrollView>
          <View
            style={{
              padding: 10,
              borderTopWidth: 1,
              borderColor: '#aab7b8',
              margin: 10,
              gap:10
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
                SUBTOTAL:
              </Text>
              <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
                {dataCart?.cart?.subtotal?.replace(/&nbsp;/g, '')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={()=>{
                navigation.push('Checkout');
              }}
              style={{
                padding: 15,
                alignSelf: 'center',
                backgroundColor: '#FA6E49',
                width: '100%',
                alignItems: 'center',
                borderRadius: 100,
              }}>
              <Text style={{fontSize: 20, fontWeight: '500', color: '#fff'}}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Cart;
