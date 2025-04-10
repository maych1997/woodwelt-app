import { Text } from "@react-navigation/elements";
import React from "react";
import { SafeAreaView, View } from "react-native";
import Dashboard from "../Screens/TabScreens/Home/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetails from "../Screens/ProductDetails";
import SeeMore from "../Screens/SeeMore";
import MoreResults from "../Screens/MoreResults";
const Stack=createNativeStackNavigator();
const HomeStack=()=>{
    return(
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Dashboard" component={Dashboard}></Stack.Screen>
            <Stack.Screen name="ProductDetails" component={ProductDetails}></Stack.Screen>
            <Stack.Screen name="SeeMore" component={SeeMore}></Stack.Screen>
            <Stack.Screen name="MoreResults" component={MoreResults}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default HomeStack;