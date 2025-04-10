import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Alert } from "react-native";
import {REGISTER_CUSTOMER, UPDATE_CUSTOMER, UPDATE_CUSTOMER_BILLING, UPDATE_CUSTOMER_SHIPPING } from "../Graphql/mutation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setAddCartLoading } from "../redux/Slice";

const useAuthentication = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registerCustomerMutation] = useMutation(REGISTER_CUSTOMER);
  const [updateCustomerMutation] = useMutation(UPDATE_CUSTOMER);
  const [updateCustomerShippingMutation] = useMutation(UPDATE_CUSTOMER_SHIPPING);
  const [updateCustomerBillingMutation] = useMutation(UPDATE_CUSTOMER_BILLING);
  const dispatch=useDispatch();

  const registerCustomer = async (username, email, password) => {
    dispatch(setAddCartLoading(true));
    try {
      const { data } = await registerCustomerMutation({ variables: { username, email, password } });
      return data;
    } catch (error) {
      Alert.alert("Error", "Could not add item to cart.");
      console.error("Add to Cart Error:", error);
    } finally {
        dispatch(setAddCartLoading(false));
    }
  };
  const updateCustomer = async (displayName, email, firstName, lastName, password) => {
    try {
      const { data } = await updateCustomerMutation({ variables: { displayName, email, firstName, lastName, password } });
      return data;
    } catch (error) {
      Alert.alert("Error", "Could not add item to cart.");
      console.error("Add to Cart Error:", error);
    } finally {
    }
  };
  const updateCustomerShipping = async (firstName,lastName,phone,postCode,address1,address2,state,city,country) => {
    try {
      const { data } = await updateCustomerShippingMutation({ variables: { firstName,lastName,phone,postCode,address1,address2,state,city,country } });
      return data;
    } catch (error) {
      Alert.alert("Error", "Could not add item to cart.");
      console.error("Add to Cart Error:", error);
    } finally {
    }
  };
  const updateCustomerBilling = async (firstName,lastName,email,phone,postCode,address1,address2,state,city,country) => {
    try {
      const { data } = await updateCustomerBillingMutation({ variables: { firstName,lastName,email,phone,postCode,address1,address2,state,city,country } });
      return data;
    } catch (error) {
      Alert.alert("Error", "Could not add item to cart.");
      console.error("Add to Cart Error:", error);
    } finally {
    }
  };



  return { registerCustomer,updateCustomer, updateCustomerBilling,updateCustomerShipping,loading };
};

export default useAuthentication;
