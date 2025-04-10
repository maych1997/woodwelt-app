import { Text } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, View } from "react-native";
import Search from "../Screens/Search";
import MoreResults from "../Screens/MoreResults";

const Stack=createNativeStackNavigator();
const SearchStack=()=>{
    return(
        <SafeAreaView style={{flex:1}}>
            <Stack.Navigator initialRouteName="Search" screenOptions={{headerShown:false}}>
                <Stack.Screen name='Search' component={Search}></Stack.Screen>
                <Stack.Screen name='MoreResults' component={MoreResults}></Stack.Screen>
            </Stack.Navigator>
            </SafeAreaView>
    )
}

export default SearchStack;