import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CartStack from '../../../Stack/CartStack';
import ProfileStack from '../../../Stack/ProfileStack';
import CategoryStack from '../../../Stack/CategoryStack';
import HomeStack from '../../../Stack/HomeStack';
import {observer} from 'mobx-react';
import {gql, useQuery} from '@apollo/client';
import {
  FIELDS,
  PRODUCT_CATEGORY,
  SEARCH_PRODUCTS,
} from '../../../../../Graphql/query';
import Header from '../../../Header/Header';
import SearchGrid from '../../../Product/SearchGrid';
import { useNavigation } from '@react-navigation/native';

const TopTabBar = createMaterialTopTabNavigator();

const Dashboard = observer(({}) => {
  const {loading, error, data: categories} = useQuery(PRODUCT_CATEGORY);
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
        <Header></Header>
        <View style={{alignItems: 'center', paddingTop: 5, paddingBottom: 5}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display:'flex',
              flexDirection:'row'
            }}>
            {isFocused?            <TouchableOpacity onPress={()=>{
              setIsFocused(false);
            }}>
              <Icon name={'close'} size={27} color={'#000'}></Icon>
            </TouchableOpacity>:<></>}
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
                  title: 'Search results for: '+search,
                  keywords:search
                });
              }}
              style={{
                position: 'absolute',
                right: isFocused?15:25,
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
        {isFocused == false && search.length==0? (
          <View style={{flex: 1}}>
            <TopTabBar.Navigator
              screenOptions={{
                tabBarScrollEnabled: true,
                tabBarIndicatorStyle: {backgroundColor: '#FA6E49'},
              }}
              style={{overflow: 'hidden'}}>
              <TopTabBar.Screen
                name="Explore"
                component={CategoryStack}></TopTabBar.Screen>
              {categories?.productCategories?.nodes?.map(item => {
                return (
                  <TopTabBar.Screen
                    name={item?.name}
                    initialParams={{category: item?.name}}
                    component={CategoryStack}></TopTabBar.Screen>
                );
              })}
            </TopTabBar.Navigator>
          </View>
        ) : (
          <View style={{flex: 1}}>
            {isFocused?<Text
              style={{fontSize: 15, fontWeight: '500', textAlign: 'center', color:'#aab7b8'}}>
              Search results for :{search}
            </Text>:<></>}
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
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});

export default Dashboard;
