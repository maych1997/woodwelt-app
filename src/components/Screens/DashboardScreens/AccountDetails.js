import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, ActivityIndicator, Alert } from "react-native";
import { TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from "react-redux";
import useAuthentication from "../../../../hooks/useAuthentication";
import SuccessModal from "../../Modals/SuccessModal";

const baseColor = '#FA6E49';

const AccountDetails = ({ navigation }) => {
  const [load, setLoad] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const {updateCustomer}=useAuthentication();
  const [isVisible, setIsVisible] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    let errors = {};
    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!displayName) errors.displayName = "Display name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (!currentPassword) errors.currentPassword = "Current password is required";
    if (confirmPassword && confirmPassword !== currentPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = () => {
    setLoad(true);
    if (validateForm()) {
      updateCustomer(displayName, email, firstName, lastName, confirmPassword).then((result)=>{
        if(result!=null){
          setLoad(false);
          setIsVisible(!isVisible);
          navigation.goBack();
        }
      });
    }else{
      setLoad(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <SuccessModal visible={isVisible} setIsVisible={setIsVisible}></SuccessModal>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back-ios" size={25} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Update Account Details</Text>

      {/* First Name Input */}
      <View style={{padding:30,display:'flex',width:'100%'}}>
      <TextInput
        placeholder="First Name"
        style={[styles.input, errors.firstName && styles.errorInput]}
        value={firstName}
        onChangeText={setFirstName}
      />
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      {/* Last Name Input */}
      <TextInput
        placeholder="Last Name"
        style={[styles.input, errors.lastName && styles.errorInput]}
        value={lastName}
        onChangeText={setLastName}
      />
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      {/* Display Name Input */}
      <TextInput
        placeholder="Display Name"
        style={[styles.input, errors.displayName && styles.errorInput]}
        value={displayName}
        onChangeText={setDisplayName}
      />
      {errors.displayName && <Text style={styles.errorText}>{errors.displayName}</Text>}

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        style={[styles.input, errors.email && styles.errorInput]}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Current Password Input */}
      <TextInput
        placeholder="Current Password"
        style={[styles.input, errors.currentPassword && styles.errorInput]}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword}</Text>}

      {/* Confirm Password Input */}
      <TextInput
        placeholder="Confirm Password"
        style={[styles.input, errors.confirmPassword && styles.errorInput]}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

      {/* Update Button */}
      <TouchableOpacity
        onPress={handleUpdate}
        style={[styles.button, { backgroundColor: baseColor }]}
      >
        {load == true ? (
          <ActivityIndicator animating={load} color={'#fff'} size={'small'} />
        ) : (
          <Text style={styles.buttonText}>Update</Text>
        )}
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems:'center'
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
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
});

export default AccountDetails;
