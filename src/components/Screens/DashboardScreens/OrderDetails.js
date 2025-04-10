import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card, Text, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderDetails = ({route, navigation}) => {
  let order = route.params.orderDetails;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name={'arrow-back-ios'} size={25}></Icon>
      </TouchableOpacity>
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 8,
            textAlign: 'center',
            padding: 10,
          }}>
          Order Details
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Order #{order.orderNumber}</Text>
            <Text variant="bodyMedium">Date: {order.date}</Text>
            <Text variant="bodyMedium" style={styles.status}>
              Status: {order.status}
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Customer Info</Text>
            <Text>
              {order.customer.firstName} {order.customer.lastName}
            </Text>
            <Text>{order.customer.email}</Text>
            <Text>{order.customer.address}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Items Ordered</Text>
            {/* {console.log(order.lineItems.nodes)} */}
            <FlatList
              data={order.lineItems.nodes}
              // keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                console.log(item.product.node.image.sourceUrl),
                (
                  <View style={styles.item}>
                    {/* <View style={{display: 'flex'}}> */}
                    <Image
                      style={{height: 150, width: 150, resizeMode: 'contain'}}
                      source={{uri: item.product.node.image.sourceUrl}}></Image>
                    {/* </View> */}
                    <Text style={{fontSize: 18, fontWeight: '600'}}>
                      {item.product.node.name} x {item.quantity}
                    </Text>
                    <Text style={{fontSize: 18, fontWeight: '600'}}>
                      € {Number(item.subtotal).toFixed(2)}
                    </Text>
                  </View>
                )
              )}
            />
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Total Amount</Text>
            <Text variant="titleLarge">
              {' '}
              {order.total.replace(/&nbsp;/g, '')}
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, gap: 10},
  card: {marginBottom: 10},
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    flexWrap: 'wrap',
    display: 'flex',
  },
  backButton: {
    marginLeft: 20,
    marginRight: 20,
  },
  status: {fontWeight: 'bold', marginTop: 5},
  divider: {marginVertical: 10, height: 2},
});

export default OrderDetails;
