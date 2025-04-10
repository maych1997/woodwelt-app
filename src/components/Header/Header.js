import {observer} from 'mobx-react';
import React from 'react';
import {Animated, Image, SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import woodweltStore from '../../store/woodweltStore';
const HEADER_HEIGHT = 60;

const Header = observer(() => {
    const {scrollY} = woodweltStore;
    const headerTranslateY = scrollY > 0 ? Math.min(scrollY, HEADER_HEIGHT) : 0;
    return (
    <SafeAreaView>
      <View
        contentContainerStyle={{paddingTop: HEADER_HEIGHT}}
        style={{
          display: scrollY>100?'none':'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent:'space-between',
          width: '100%',
          padding: 20,
          transform: [{translateY: -headerTranslateY}],
        }}>
        <Image
          style={{resizeMode: 'contain', height: 20, width: '40%'}}
          source={require('../../assets/logo/woodwelteu-high-resolution-logo-transparent.png')}></Image>
        <Icon name="notifications-outline" size={25}></Icon>
      </View>
      </SafeAreaView>
  );
});
export default Header;
