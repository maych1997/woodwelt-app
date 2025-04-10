import React, {useEffect, useState} from 'react';
import AnimatedSplash from 'react-native-animated-splash-screen';
import MyTabs from './BottomTabs';
import {NavigationContainer} from '@react-navigation/native';

const MainApp = () => {
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      logoImage={require('../../assets/logo/woodwelteu-high-resolution-logo-transparent.png')}
      backgroundColor={'#fff'}
      logoHeight={350}
      logoWidth={350}>
      <NavigationContainer>
        <MyTabs></MyTabs>
      </NavigationContainer>
    </AnimatedSplash>
  );
};
export default MainApp;
