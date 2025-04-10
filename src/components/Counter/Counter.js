import { useEffect, useState } from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity, View } from 'react-native';
import IconFontIsto from 'react-native-vector-icons/Fontisto';
import useCart from '../../../hooks/useCart';

const Counter = ({ quantity, keyItem,cartLoad }) => {
  const [count, setCount] = useState(0);
  const { updateCart } = useCart();

  useEffect(() => {
    setCount(quantity);
  }, []);

  // Increment count and update cart
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateCart(keyItem, newCount); // Call mutation immediately
  };

  // Decrement count and update cart
  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      updateCart(keyItem, newCount); // Call mutation immediately
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '40%',
          alignItems: 'center',
          borderWidth: 1,
          backgroundColor: '#fff',
          borderRadius: 10,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          onPress={decrement}
          style={{ padding: 10, borderRightWidth: 1 }}
        >
          <IconFontIsto name={'minus-a'} size={15} />
        </TouchableOpacity>

        {cartLoad?<ActivityIndicator color={'#fff'} animating={cartLoad}></ActivityIndicator>:<TextInput
          style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}
          value={String(count)} // Ensure it's a string for TextInput
          editable={false} // Prevent manual input
        />}

        <TouchableOpacity
          onPress={increment}
          style={{ padding: 10, borderLeftWidth: 1 }}
        >
          <IconFontIsto name={'plus-a'} size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;
