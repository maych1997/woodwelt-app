import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../Screens/CheckoutScreens/Cart";
import Checkout from "../Screens/CheckoutScreens/Checkout";
import AddressForm from "../Screens/DashboardScreens/AddressForm";
const Stack=createNativeStackNavigator();
const CartStack=()=>{
    return(
        <Stack.Navigator initialRouteName="Cart" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Cart" component={Cart}></Stack.Screen>
            <Stack.Screen name="Checkout" component={Checkout}></Stack.Screen>
            <Stack.Screen name="AddressForm" component={AddressForm}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default CartStack;