import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {GET_PROFILE_DETAILS} from '../../../../Graphql/query';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Checkbox} from 'react-native-paper';
import PlaceOrder from './PlaceOrder';

const baseColor = '#FA6E49';
const Checkout = ({navigation}) => {
  const [load, setLoad] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [billing, setBilling] = useState(false);
  const [checked, setChecked] = useState(false);
  const {
    loading: profileLoad,
    error: profileError,
    data: profileData,
    refetch:profileDataRefetch
  } = useQuery(GET_PROFILE_DETAILS, {
    fetchPolicy: 'cache-and-network',
  });
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      profileDataRefetch()
      setRefreshing(false);
    }, 2000);
  }, []);
  console.log('This  is profile Data;::::::::::::::::::::::',profileData);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back-ios" size={25} />
        </TouchableOpacity>
        <Text style={styles.header}>Checkout</Text>
        {profileLoad ? (
          <SafeAreaView
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              color={baseColor}
              animating={load}></ActivityIndicator>
          </SafeAreaView>
        ) : (
          <>
            <Text style={styles.header}>Shipping Address</Text>
            <TouchableOpacity
              style={[
                styles.card,
                {borderColor: shipping ? baseColor : '#000'},
              ]}
              onPress={() => {
                if(profileData?.customer?.shipping?.address1!=null){
                  setShipping(!shipping);
                }else{
                  navigation.navigate('AddressForm',{addressType:'Shipping'});                }
              }}>
              <Text
                style={[styles.title, {color: shipping ? baseColor : '#000'}]}>
                {profileData?.customer?.shipping?.address1!=null?profileData?.customer?.shipping?.address1:'Add Shipping Address'}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                paddingLeft: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  transform: [{scale: 0.5}],
                  borderWidth: 2,
                  borderColor: baseColor,
                }}>
                {' '}
                {/* adjust scale as needed */}
                <Checkbox
                  color={baseColor}
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <Text style={styles.shippingAsBilling}>
                Select Shipping as Billing
              </Text>
            </View>
            {checked == false ? (
              <>
                <Text style={styles.header}>Billing Address</Text>
                <TouchableOpacity
                  style={[
                    styles.card,
                    {borderColor: billing ? baseColor : '#000'},
                  ]}
                  onPress={() => {
                    if(profileData?.customer.billing.address1!=null){
                      setBilling(!billing);
                    }else{
                      navigation.navigate('AddressForm',{addressType:'Billing'});
                    }
                  }}>
                  <Text
                    style={[
                      styles.title,
                      {color: billing ? baseColor : '#000'},
                    ]}>
                {profileData?.customer.billing.address1!=null?profileData?.customer.billing.address1:'Add Billing Address'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <></>
            )}
            <PlaceOrder profileData={profileData} checkbox={checked} shipping={shipping} billing={billing}></PlaceOrder>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // for Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  backButton: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  shippingAsBilling: {
    color: '#000',
    fontSize: 18,
  },
});
export default Checkout;
