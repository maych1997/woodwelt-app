import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-animatable';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
const baseColor = '#FA6E49';

const Addresses = ({navigation, route}) => {
  const [addresses, setAddresses] = useState([
    {id: '1', title: 'Shipping'},
    {id: '2', title: 'Billing'},
  ]);
  useEffect(() => {
    if (route?.params) {
      setAddresses(prevAddresses =>
        prevAddresses.map(address => {
          if (address.title === 'Shipping') {
            return {...address, ...route.params.shipping};
          } else if (address.title === 'Billing') {
            return {...address, ...route.params.billing};
          }
          return address;
        }),
      );
    }
  }, [route.params.billing, route.params.shipping]); // Add dependency to trigger when details update
  console.log('teadasfafasf', addresses);
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-back-ios" size={25} color="#333" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Select Address</Text>

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <>
              {item?.firstName ||
              item?.lastName ||
              item?.phone ||
              item?.address1 ||
              item?.city ||
              item?.country ? (
                <TouchableOpacity>
                  <Card style={styles.card}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Icon name="edit" size={20} color="#FA6E49" />
                    </View>

                    {(item?.firstName || item?.lastName) && (
                      <Text style={styles.cardDetails}>
                        {item?.firstName} {item?.lastName}
                      </Text>
                    )}

                    {item?.phone && (
                      <Text style={styles.cardDetails}>{item.phone}</Text>
                    )}
                    {item?.address1 && (
                      <Text style={styles.cardDetails}>{item.address1}</Text>
                    )}
                    {item?.city && (
                      <Text style={styles.cardDetails}>{item.city}</Text>
                    )}
                    {item?.country && (
                      <Text style={styles.cardDetails}>{item.country}</Text>
                    )}
                  </Card>
                </TouchableOpacity>
              ) : (
                <View style={styles.emptyState}>
                 <TouchableOpacity onPress={()=>{
                  navigation.navigate('AddressForm',{addressType:item.title});
                 }}>
                    <Text>Add {item.title} Adrress</Text>
                 </TouchableOpacity>
                </View>
              )}
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  card: {
    width: '100%',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  addButton: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    backgroundColor: baseColor,
    alignSelf: 'center',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default Addresses;
