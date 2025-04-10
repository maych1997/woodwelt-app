import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GET_PAYMENT_GATEWAYS} from '../../../../Graphql/query';
import {useQuery} from '@apollo/client';
import {Image} from 'react-native-animatable';
import {useStripe} from '@stripe/stripe-react-native';
const baseColor = '#FA6E49';

const MyComponent = ({navigation}) => {
  const stripe = useStripe();
  const [load,setLoad]=useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const {
    data: dataPayment,
    error: errorPayment,
    loading: loadPayment,
  } = useQuery(GET_PAYMENT_GATEWAYS, {
    fetchPolicy: 'cache-and-network',
  });
  // Handle errors for both queries
  if (errorPayment) {
    return <Text>Error in Featured: {loadPayment.message}</Text>;
  }

  if (loadPayment) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          animating={loadPayment}
          size={'small'}
          color={baseColor}></ActivityIndicator>
      </SafeAreaView>
    );
  }
  const selectedPaymentMethod = async () => {
    console.log(selectedValue);
    setLoad(true);
    try {
      const response = await fetch('http://localhost:8080/pay', {
        method: 'POST',
        body: JSON.stringify({selectedValue}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setLoad(false);
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        returnURL: 'woodwelt://payment-return', // 👈 Add this line
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert('Payment Completed, Thank You!');
    } catch (error) {
      setLoad(false);
      console.log(error);
      Alert.alert('Something went wrong, Try again later!');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-back-ios" size={25} />
      </TouchableOpacity>
      <Text style={styles.header}>Select Payment Method</Text>
      <ScrollView style={styles.radioContainer}>
        {dataPayment?.paymentGateways?.nodes?.map(option => {
          return (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity
                key={option}
                style={styles.radioOption}
                onPress={() => {
                  setSelectedValue(option);
                }}>
                <View style={styles.radioCircle}>
                  {selectedValue === option && (
                    <View style={styles.selectedCircle} />
                  )}
                </View>
                {option?.title == 'Klarna' ? (
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 50,
                      width: 50,
                      marginRight: 10,
                    }}
                    source={require('../../../assets/logo/klarna.png')}></Image>
                ) : option?.title == 'EPS' ? (
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 50,
                      width: 50,
                      marginRight: 10,
                    }}
                    source={require('../../../assets/logo/eps.png')}></Image>
                ) : option?.title == 'Bancontact' ? (
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 50,
                      width: 50,
                      marginRight: 10,
                    }}
                    source={require('../../../assets/logo/bancontact.png')}></Image>
                ) : option?.title == 'iDEAL' ? (
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 55,
                      width: 55,
                      marginRight: 10,
                    }}
                    source={require('../../../assets/logo/ideal.png')}></Image>
                ) : option?.title == 'Przelewy24' ? (
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 55,
                      width: 55,
                      marginRight: 10,
                    }}
                    source={require('../../../assets/logo/przelewy.png')}></Image>
                ) : option?.title == 'SEPA Direct Debit' ? (
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 55,
                      width: 55,
                      marginRight: 10,
                    }}
                    source={require('../../../assets/logo/sepa.png')}></Image>
                ) : option?.title == 'SEPA Direct Debit' ? (
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 55,
                      width: 55,
                      marginRight: 10,
                    }}
                    source={require('../../../assets/logo/sepa.png')}></Image>
                ) : option?.title == 'PayPal' ? (
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 55,
                      width: 55,
                      marginRight: 10,
                    }}
                    source={require('../../../assets/logo/paypal.png')}></Image>
                ) : option?.title == 'Credit / Debit Card' ? (
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 55,
                      width: 55,
                      marginRight: 10,
                    }}
                    source={require('../../../assets/logo/visa.png')}></Image>
                ) : (
                  <MaterialCommunityIcons
                    size={55}
                    name={'bank-transfer'}></MaterialCommunityIcons>
                )}
                <Text style={{fontSize: 18}}>{option?.title}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={() => {
            selectedPaymentMethod();
          }}
          style={[styles.button, {backgroundColor: baseColor}]}>
          {load == true ? (
            <ActivityIndicator animating={load} color={'#fff'} size={'small'} />
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    padding: 10,
  },
  radioContainer: {
    marginTop: 20,
    padding: 10,
    paddingBottom:30
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop:10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyComponent;
