import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART } from "../Graphql/mutation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setAddCartLoading } from "../redux/Slice";

const useCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);
  const [updateCartMutation]=useMutation(UPDATE_CART);
  const dispatch=useDispatch();

  // Function to Add to Cart
  const addToCart = async (productId, quantity) => {
    dispatch(setAddCartLoading(true));
    try {
      const { data } = await addToCartMutation({ variables: { productId, quantity } });

      if (data?.addToCart?.cart) {
        setCart(data.addToCart.cart);
        await AsyncStorage.setItem("cart", JSON.stringify(data.addToCart.cart));
      }
    } catch (error) {
      Alert.alert("Error", "Could not add item to cart.");
      console.error("Add to Cart Error:", error);
    } finally {
        dispatch(setAddCartLoading(false));
    }
  };

  const removeFromCart = async (keys) => {
    dispatch(setAddCartLoading(true));
    try {
      const { data } = await removeFromCartMutation({ variables: { keys } });
      if (data?.addToCart?.cart) {
        setCart(data.addToCart.cart);
        await AsyncStorage.setItem("cart", JSON.stringify(data.addToCart.cart));
      }
    } catch (error) {
      Alert.alert("Error", "Could not remove item to cart.");
      console.error("Remove item from cart Error:", error);
    } finally {
        dispatch(setAddCartLoading(false));
    }
  };
  // Function to Get Cart Items

  const updateCart = async (key, quantity) => {
    dispatch(setAddCartLoading(true));
    try {
      const { data } = await updateCartMutation({ variables: { key, quantity } });
      return data;
    } catch (error) {
      Alert.alert("Error", "Could not add item to cart.");
      console.error("Add to Cart Error:", error);
    } finally {
        dispatch(setAddCartLoading(false));
    }
  };

  return { cart, addToCart, removeFromCart,updateCart, loading };
};

export default useCart;
