import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useAuthentication from '../../../../hooks/useAuthentication';
import { countryCodes, CountryList, CountryPicker } from 'react-native-country-codes-picker';

const baseColor = '#FA6E49';

const AddressForm = ({navigation,route}) => {
  const [show,setShow]=useState(false);
  const [load,setLoad]=useState(false);
  const [country,setCountry]=useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email:'',
    country: '',
    streetAddress: '',
    apartment:'',
    zipCode: '',
    city: '',
    stateCounty: '',
    phone: '',
  });


  const [errors, setErrors] = useState({});
  const {updateCustomerBilling,updateCustomerShipping}=useAuthentication();

  useEffect(()=>{
    console.log(route?.params?.addressType);
    if(route?.params?.addressType=='Shipping'){
      const filteredCountry = countryCodes.filter(
        (item) => item?.code === route?.params?.shipping?.country
      );
      setCountry(filteredCountry[0]);
      setForm({
        firstName:route?.params?.shipping?.firstName,
        lastName:route?.params?.shipping?.lastName,
        email:route?.params?.shipping?.email,
        country:filteredCountry[0]?.name['en'],
        streetAddress:route?.params?.shipping?.address1,
        apartment:route?.params?.shipping?.address2,
        zipCode:route?.params?.shipping?.postcode,
        city:route?.params?.shipping?.city,
        stateCounty:route?.params?.shipping?.state,
        phone:route?.params?.shipping?.phone
      })
    }else{
      const filteredCountry = countryCodes?.filter(
        (item) => item.code === route?.params?.billing?.country
      );
      setCountry(filteredCountry[0]);
      setForm({
        firstName:route?.params?.billing?.firstName,
        lastName:route?.params?.billing.lastName,
        email:route?.params?.billing.email,
        country:filteredCountry[0]?.name['en'],
        streetAddress:route?.params?.billing?.address1,
        apartment:route?.params?.billing?.address2,
        zipCode:route?.params?.billing?.postcode,
        city:route?.params?.billing?.city,
        stateCounty:route?.params?.billing.state,
        phone:route?.params?.billing.phone
      })
    }
  },[route?.params])
  const validateForm = () => {
    setLoad(true);
    let newErrors = {};

    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!country || country==undefined) newErrors.country = 'Country is required';
    if (!form.streetAddress)
      newErrors.streetAddress = 'Street address is required';
    if (!form.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!form.city) newErrors.city = 'City is required';
    if (form.phone && !/^\+?\d{10,15}$/.test(form.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }

    setErrors(newErrors);
    console.log('Country::::::',form.country)
    if (Object.keys(newErrors).length === 0) {
      if(route?.params?.addressType=='Shipping'){
        updateCustomerShipping(form.firstName,form.lastName,form.phone,form.zipCode,form.streetAddress,form.apartment,form.stateCounty,form.city,country?.code)
        .then((result)=>{
          if(result!=undefined || result!=null){
            setLoad(false);
            Alert.alert('Shipping Address Updated Successfully');
          }
          setLoad(false);
        }).finally=()=>{
          setLoad(false);
        }
      }else{
        updateCustomerBilling(form.firstName,form.lastName,form.email,form.phone,form.zipCode,form.streetAddress,form.apartment,form.stateCounty,form.city,country?.code)
        .then((result)=>{
          if(result!=undefined || result!=null){
            setLoad(false);
            Alert.alert('Billing Address Updated Successfully');
          }
          setLoad(false);
        }).finally=()=>{
          setLoad(false);
        }
      }
    }else{
      setLoad(false);
    }
  };
  

  const handleInputChange = (field, value) => {
    setForm({...form, [field]: value});
    setErrors({...errors, [field]: null});
  };

  return (
    <SafeAreaView style={styles.inputContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-back-ios" size={25} color="#333" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Edit {route?.params?.addressType=='Shipping'?'Shipping':'Billing'} Address</Text>

      <ScrollView contentContainerStyle={styles.container}>
        {renderInput('First Name', 'firstName', true)}
        {renderInput('Last Name', 'lastName', true)}
        {renderInput('Email', 'email', true)}
        {renderInput('Country', 'country', true)}
        {renderInput('Street Address', 'streetAddress', true)}
        {renderInput(
          'Apartment, suite, unit, etc. (optional)',
          'apartment',
          false,
        )}
        {renderInput('Postcode / ZIP', 'zipCode', true)}
        {renderInput('Town / City', 'city', true)}
        {renderInput('State / County (optional)', 'stateCounty', false)}
        {renderInput('Phone (optional)', 'phone', false)}

        <TouchableOpacity style={styles.submitButton} onPress={validateForm}>
          {load?<ActivityIndicator animating={load} size={'small'} color='#fff'></ActivityIndicator>:<Text style={styles.submitText}>Submit</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  function renderInput(label, field, required = true) {
    return (
      <>
      {route?.params?.addressType=='Shipping' && field=='email'?<></>:        <Text style={styles.label}>
          {label} {required && <Text style={{color: baseColor}}>*</Text>}
        </Text>
}
        {route?.params?.addressType=='Shipping' && field=='email'?<></>:field!='country'? <TextInput
          key={field}
          style={[styles.input, errors[field] && styles.errorInput]}
          onChangeText={text => handleInputChange(field, text)}
          value={form[field]}
        />:
        <>
        <TextInput
          onPress={()=>{setShow(!show)}}
          key={field}
          style={[styles.input, errors[field] && styles.errorInput]}
          // onChangeText={text => handleInputChange(field, text)}
          editable={false}
          value={country?.name['en']==null?form.country:country?.name['en']}
        >
        </TextInput>
        <CountryPicker
        style={{modal:{height:'60%'}}}
        show={show}
        onBackdropPress={()=>{setShow(!show)}}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountry(item);
          setShow(false);
        }}
      /></>}
        {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  errorInput: {
    borderColor: baseColor,
  },
  errorText: {
    color: baseColor,
    fontSize: 14,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: baseColor,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    marginLeft: 20,
    marginRight: 20,
  },
});

export default AddressForm;
