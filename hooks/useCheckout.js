import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { ADD_TO_CART, CREATE_ORDER, REMOVE_FROM_CART, UPDATE_CART, UPDATE_CUSTOMER } from "../Graphql/mutation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setAddCartLoading } from "../redux/Slice";

const useCheckout = () => {

  const [createOrder] = useMutation(CREATE_ORDER);
  const [updateCustomerRole]=useMutation(UPDATE_CUSTOMER);
  const dispatch=useDispatch();
  const [order,setOrder]=useState(null);

  // Function to Add to Cart
  const placeOrder = async (billing, shipping, paymentMethod, isPaid) => {
    console.log('Billing',billing);
    console.log('shipping',shipping);
    try {
      const { data } = await createOrder({  variables: {
        billing,
        shipping,
        paymentMethod,
        isPaid
      }});
     return data;
    } catch (error) {
      Alert.alert("Error", "Could not add item to cart.");
      console.error("Add to Cart Error:", error);
    } finally {
        dispatch(setAddCartLoading(false));
    }
  }

  return { placeOrder};
};

export default useCheckout;
