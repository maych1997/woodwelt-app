import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {API_AUTH_URL, API_LOGOUT_URL} from '../../../utils/baseUrls';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthToken} from '../../../redux/Slice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useQuery} from '@apollo/client';
import {GET_PROFILE_DETAILS} from '../../../Graphql/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import Orders from '../Screens/DashboardScreens/Orders';
import Payment from '../Screens/DashboardScreens/Payment';
import Addresses from '../Screens/DashboardScreens/Addresses';
import AccountDetails from '../Screens/DashboardScreens/AccountDetails';
import OrderDetails from '../Screens/DashboardScreens/OrderDetails';
import useAuthentication from '../../../hooks/useAuthentication';
import AddressStack from './AddressStack';

const baseColor = '#FA6E49';
const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [load, setLoad] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword,setShowPassword]=useState(false);

  async function getToken(username, password) {
    let newErrors = {};

    if (!email) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format.';

    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoad(true);
    try {
      const response = await fetch(API_AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch token');
      }
      console.log(data);
      dispatch(setAuthToken(data?.token));
      AsyncStorage.setItem('authToken', 'Bearer '+data?.token);
      AsyncStorage.setItem('basicAuthUserName', username);
      AsyncStorage.setItem('basicAuthPassword', password);
      setLoad(false);
      return data;
    } catch (error) {
      setLoad(false);
      console.error('Error fetching token:', error);
      Alert.alert('Login Failed', error.message);
      return null;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        style={[styles.input, errors.email && styles.errorInput]}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <View style={{width:'100%',alignItems:'center',display:'flex',justifyContent:'center',marginBottom:10}}>
      {/* Password Input */}
      <TextInput
        placeholder="Password"
        style={[styles.input, errors.password && styles.errorInput,{marginBottom:0}]}
        secureTextEntry={showPassword}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={()=>{setShowPassword(!showPassword)}} style={{position:'absolute',right:10}}>
        <Entypo color={'#ccc'} size={20} name={!showPassword?'eye':'eye-with-line'}></Entypo>
      </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {/* Login Button */}
      <TouchableOpacity
        onPress={() => {
          getToken(email, password);
        }}
        style={[styles.button, { backgroundColor: baseColor }]}>
        {load == true ? (
          <ActivityIndicator animating={load} color={'#fff'} size={'small'} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Navigate to Register */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const RegisterScreen = ({ navigation }) => {
  const [load, setLoad] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const {registerCustomer}=useAuthentication();
  const dispatch = useDispatch();


  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = () => {
    let newErrors = {};
    setLoad(true);

    if (!username) newErrors.username = 'Username is required.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format.';
    
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required.';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      registerCustomer(username,email,password).then((result)=>{
        if(result!=null){
          setLoad(false);
          getToken(email,password);
        }
      });
    }
  };

  async function getToken(username, password) {
    let newErrors = {};

    if (!email) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format.';

    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoad(true);
    try {
      const response = await fetch(API_AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch token');
      }
      console.log(data);
      dispatch(setAuthToken(data?.token));
      AsyncStorage.setItem('authToken', 'Bearer '+data?.token);
      setLoad(false);
      return data;
    } catch (error) {
      setLoad(false);
      console.error('Error fetching token:', error);
      Alert.alert('Login Failed', error.message);
      return null;
    }
  }
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back-ios" size={25} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Register</Text>

      {/* Username Input */}
      <TextInput
        placeholder="Username"
        style={[styles.input, errors.username && styles.errorInput]}
        value={username}
        onChangeText={setUsername}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        style={[styles.input, errors.email && styles.errorInput]}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        style={[styles.input, errors.password && styles.errorInput]}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {/* Confirm Password Input */}
      <TextInput
        placeholder="Confirm Password"
        style={[styles.input, errors.confirmPassword && styles.errorInput]}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

      {/* Register Button */}
      <TouchableOpacity
        onPress={handleRegister}
        style={[styles.button, { backgroundColor: baseColor }]}>
        {load == true ? (
          <ActivityIndicator animating={load} color={'#fff'} size={'small'} />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>

      {/* Privacy Notice */}
      <Text style={styles.privacyText}>
        Your personal data will be used to support your experience throughout this website, 
        to manage access to your account, and for other purposes described in our privacy policy.
      </Text>
    </View>
  );
};

const ForgotPasswordScreen = ({navigation}) => {
  const [identifier, setIdentifier] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name={'arrow-back-ios'} size={25}></Icon>
      </TouchableOpacity>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        placeholder="Username or Email"
        style={styles.input}
        value={identifier}
        onChangeText={setIdentifier}
      />
      <TouchableOpacity style={[styles.button, {backgroundColor: baseColor}]}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const Dashboard = ({navigation}) => {
  const profileDetails = [
    {id: 1, name: 'Orders', icon: 'list-ul', component: Orders,screen:'Orders'},
    {id: 2, name: 'Payment', icon: 'credit-card', component: Payment,screen:'Payment'},
    {id: 3, name: 'Addresses', icon: 'location-dot', component: AddressStack,screen:'AddressesStack'},
    {id: 4, name: 'Account Details', icon: 'user', component: AccountDetails,screen:'AccountDetails'},
    {id: 5, name: 'Logout', icon: 'arrow-right-from-bracket'},
  ];
  const dispatch = useDispatch();
  const [load, setLoad] = useState(null);
  async function logoutUser() {
    setLoad(true);
    try {
      // Retrieve token if needed for API call
      const token = await AsyncStorage.getItem('authToken');
      // Optional: Call logout API if your backend supports it
      const response = await fetch(API_LOGOUT_URL, {
        method: 'POST',
        credentials: 'include', // Ensure cookies are sent
      });
      // If API responds with an error, handle it
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }
      // Clear token from storage
      await AsyncStorage.removeItem('authToken');
      setLoad(false);
      dispatch(setAuthToken(null)); // Clear from Redux state if used
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  }
  const {
    loading: profileLoad,
    error: profileError,
    data: profileData,
  } = useQuery(GET_PROFILE_DETAILS, {
    fetchPolicy: 'cache-and-network',
  });
  console.log(profileError);
  console.log(profileData?.customer);
  return (
    <>
      {load || profileLoad? (
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={baseColor} animating={load}></ActivityIndicator>
        </SafeAreaView>
      ) : (
        <View style={styles.containerProfile}>
          {/* Header */}
          {/* <View style={styles.header}>
            <TouchableOpacity>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View> */}

          {/* Profile Info */}
          <View style={styles.profileContainer}>
            <Image
              source={{uri: 'https://via.placeholder.com/100'}} // Replace with actual image URL
              style={styles.profileImage}
            />
            <Text style={styles.name}>
              {profileData?.customer?.username}
            </Text>
            {/* <Text style={styles.subtitle}>Fashion Model</Text> */}
            {/* <Text style={styles.contact}>(581)-307-6902</Text> */}
            <Text style={styles.contact}>{profileData?.customer?.email}</Text>
          </View>

          {/* Wallet & Orders */}
          <View style={styles.walletContainer}>
            <View style={styles.walletItem}>
              <Text style={styles.walletAmount}>$140.00</Text>
              <Text style={styles.walletLabel}>Wallet</Text>
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate('Orders',{orderDetails:profileData?.customer?.orders?.nodes});}} style={styles.walletItem}>
              <Text style={styles.walletAmount}>{profileData?.customer?.orders?.nodes?.length}</Text>
              <Text style={styles.walletLabel}>Orders</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Options */}
          <View style={styles.menuContainer}>
            {profileDetails.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (item.name == 'Logout') {
                    logoutUser();
                  }else{
                    if(item.screen=='Orders'){
                      navigation.navigate(item.screen,{orderDetails:profileData?.customer?.orders?.nodes});
                    }else if(item.screen=='AddressesStack'){
                      navigation.navigate(item.screen);
                    }else{
                      navigation.navigate(item.screen);
                    }
                  }
                }}
                key={index}
                style={[styles.menuItem]}>
                <FontAwesome size={25} name={item.icon}></FontAwesome>
                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </>
  );
};

const AuthStack = () => {
  const authToken = useSelector(state => state.load.authToken);
  console.log('This is auth Token',authToken);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {authToken != null ? (
        <>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="AddressesStack" component={AddressStack} />
        <Stack.Screen name="AccountDetails" component={AccountDetails} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    color: baseColor,
  },
  privacyText: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  containerProfile: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 20,
  },
  editIcon: {
    fontSize: 18,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subtitle: {
    color: 'gray',
  },
  contact: {
    color: 'gray',
    marginTop: 4,
  },
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  walletItem: {
    alignItems: 'center',
    flex: 1,
  },
  walletAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  walletLabel: {
    color: 'gray',
  },
  menuContainer: {
    marginTop: 20,
    gap: 20,
  },
  menuItem: {
    paddingVertical: 12,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
  menuText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  errorInput: {
    borderColor: 'red',
  },
};

export default AuthStack;
