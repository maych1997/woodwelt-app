import React, { useState } from 'react';
import {ActivityIndicator, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Header from '../Header/Header';
import { Text } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import SearchGrid from '../Product/SearchGrid';
import { SEARCH_PRODUCTS } from '../../../Graphql/query';
import { useQuery } from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';


const Search = () => {
 const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigation=useNavigation();
  const {
    loading: searchLoad,
    error: searchError,
    data: searchData,
  } = useQuery(SEARCH_PRODUCTS, {
    variables: {
      search: search,
    },
    fetchPolicy: 'cache-and-network',
  });
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle blur event
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsFocused(false);
      }}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{alignItems: 'center', paddingTop: 5, paddingBottom: 5}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'row',
            }}>
            {isFocused ? (
              <TouchableOpacity
                onPress={() => {
                  setIsFocused(false);
                }}>
                <Icon name={'close'} size={27} color={'#000'}></Icon>
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <TextInput
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={search}
              onChangeText={search => {
                setSearch(search);
              }}
              style={{
                width: '90%',
                paddingLeft: 10,
                height: 37,
                borderWidth: 1,
                borderBottomLeftRadius: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}></TextInput>
            <TouchableOpacity
              onPress={() => {
                navigation.push('MoreResults', {
                  title: 'Search results for: ' + search,
                  keywords: search,
                });
              }}
              style={{
                position: 'absolute',
                right: isFocused ? 15 : 25,
                backgroundColor: '#FA6E49',
                borderRadius: 20,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 2,
                paddingBottom: 2,
              }}>
              <Icon name={'search'} size={27} color={'#fff'}></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          {isFocused ? (
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                textAlign: 'center',
                color: '#aab7b8',
              }}>
              Search results for :{search}
            </Text>
          ) : (
            <></>
          )}
          {searchLoad ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator
                 color={'#FA6E49'}
                animating={searchLoad ? true : false}></ActivityIndicator>
            </View>
          ) : (
            <SearchGrid details={searchData?.products}></SearchGrid>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Search;
