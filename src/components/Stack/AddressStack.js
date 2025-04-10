import { Text } from "@react-navigation/elements";
import React from "react";
import { SafeAreaView, View } from "react-native";
import Dashboard from "../Screens/TabScreens/Home/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetails from "../Screens/ProductDetails";
import SeeMore from "../Screens/SeeMore";
import MoreResults from "../Screens/MoreResults";
import Addresses from "../Screens/DashboardScreens/Addresses";
import AddressForm from "../Screens/DashboardScreens/AddressForm";
import { GET_PROFILE_DETAILS } from "../../../Graphql/query";
import { useQuery } from "@apollo/client";
const Stack=createNativeStackNavigator();
const AddressStack=({route})=>{
    const {
        data: customerData,
        error: customerError,
        loading: customerLoading,
      } = useQuery(GET_PROFILE_DETAILS,{
        pollInterval:100,
        fetchPolicy:'cache-and-network'
      });
      // Handle errors for both queries
      if (customerError) {
        return <Text>Error in Featured: {customerError.message}</Text>;
      }
    return(
        <Stack.Navigator initialRouteName="Addresses" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Addresses" component={Addresses} initialParams={customerData.customer}></Stack.Screen>
            <Stack.Screen name="AddressForm" component={AddressForm} initialParams={customerData.customer}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AddressStack;