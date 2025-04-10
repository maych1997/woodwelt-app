import {View, Platform, SafeAreaView, Animated, ActivityIndicator} from 'react-native';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import {Text, PlatformPressable} from '@react-navigation/elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../Stack/HomeStack';
import ProfileStack from '../Stack/ProfileStack';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchStack from '../Stack/SearchStack';
import CartStack from '../Stack/CartStack';
import * as Animateable from 'react-native-animatable';
import { useQuery } from '@apollo/client';
import { GET_CART } from '../../../Graphql/query';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const tabs = [
  {icon: 'home', tabName: HomeStack, name: 'Home'},
  {icon: 'search', tabName: SearchStack, name: 'Search'},
  {icon: 'cart', tabName: CartStack, name: 'Cart'},
  {icon: 'person', tabName: ProfileStack, name: 'Profile'},
];

function MyTabBar({state, descriptors, navigation}) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();
  const cartLoad = useSelector((state) => state.load.addToCartLoading);
  console.log(cartLoad);
  
  const {
    data: dataCart,
    error: errorCart,
    loading: loadCart,
  } = useQuery(GET_CART,{
    pollInterval:100,
    fetchPolicy:'cache-and-network'
  });
  // Handle errors for both queries
  if (errorCart) {
    return <Text>Error in Featured: {errorCart.message}</Text>;
  }
  
  return (
    <SafeAreaView style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, padding: 5}}>
            <Animateable.View
              animation={isFocused ? 'bounceIn' : ''}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon
                color={isFocused ? '#FA6E49' : '#000'}
                name={
                  isFocused
                    ? tabs[index]['icon']
                    : tabs[index]['icon'] + '-outline'
                }
                size={25}></Icon>
              <Text style={{color: isFocused ? '#FA6E49' : colors.text}}>
                {label}
              </Text>
              {tabs[index]['icon']=='cart'?<><ActivityIndicator size={'large'}  color={'#FA6E49'} style={{position:'absolute'}} animating={cartLoad}></ActivityIndicator><Text style={{position:'absolute',width:'22%',fontSize:12,bottom:28,right:25,color:'#fff',fontWeight:'600',backgroundColor:dataCart?.cart?.contents?.itemCount!=0?'red':'transparent',borderRadius:100,padding:2,textAlign:'center',display:dataCart?.cart?.contents?.itemCount!=0?'flex':'none'}}>{dataCart?.cart?.contents?.itemCount}</Text></>:<></>}
            </Animateable.View>
          </PlatformPressable>
        );
      })}
    </SafeAreaView>
  );
}
export default function BottomTabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBar={props => <MyTabBar {...props} />}>
        {tabs.map((item, index) => {
          return (
            <Tab.Screen name={item.name} component={item.tabName}></Tab.Screen>
          );
        })}
      </Tab.Navigator>
    </>
  );
}
