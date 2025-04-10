import React from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  SafeAreaView,
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Orders = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
     
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name={'arrow-back-ios'} size={25}></Icon>
      </TouchableOpacity>
      {route.params.orderDetails.length==0? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:18,fontWeight:'700'}}>No Orders Yet !</Text>
      </View>:<><Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 8,
          textAlign: 'center',
          padding:10
        }}>
        Orders
      </Text>
      <FlatList
        data={route.params.orderDetails}
        keyExtractor={item => item.id}
        renderItem={({item}) => <OrderItem order={item} navigation={navigation} />}
      /></>}
     
    </SafeAreaView>
  );
};
const OrderItem = ({order,navigation}) => (
  <>
    <Card
      onPress={() => {
        navigation.navigate('OrderDetails', {
          orderDetails: order,
        });
      }}
      style={{padding: 10, width: '100%'}}>
      <Text variant="labelMedium" style={{color: 'gray'}}>
        {order.date}
      </Text>
      <Text>
        Order: <Text style={{color: 'blue'}}>{order.orderNumber}</Text>
      </Text>
      <View style={{marginVertical: 5}} />
      <Text variant="titleMedium">
        {order.customer.firstName} {order.customer.lastName}
      </Text>
      <Text variant="bodySmall" style={{color: 'gray'}}>
        {order.customer.email}
      </Text>
      <Text style={{marginTop: 5}}>
        Total:{' '}
        <Text style={{fontWeight: 'bold'}}>
          {order.total.replace(/&nbsp;/g, '')}
        </Text>
      </Text>
      <Text
        style={{
          marginTop: 5,
          color: order.status === 'On Hold' ? 'red' : 'green',
        }}>
        {order.status}
      </Text>
    </Card>
  </>
);

const styles = {
  container: {
    flex: 1,
  },
  backButton: {
    marginLeft: 20,
    marginRight: 20,
  },
};

export default Orders;
