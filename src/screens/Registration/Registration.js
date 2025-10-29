import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import styles from '../../MainStyle'; // ✅ your existing style
import { ServerUrl } from '../../services/ServerUrl';
import { Card, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    company_name: '',
    owner_name: '',
    industry_type: '',
    GST_number: '',
    registration_email: '',
    mobile_number: '',
    password: '',
    confirm_password: '',
    country: '',
    state: '',
    city: '',
    address: '',
    postal_code: '',
    website: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const gotoverify = () => { navigation.navigate('VerifyOtp') }

  // const handleRegister = async () => {
  //   const requiredFields = Object.keys(formData);
  //   for (let field of requiredFields) {
  //     if (!formData[field]) {
  //       Alert.alert('Validation Error', `Please enter ${field.replace('_', ' ')}`);
  //       return;
  //     }
  //   }

  //   if (formData.password !== formData.confirm_password) {
  //     Alert.alert('Error', 'Passwords do not match');
  //     return;
  //   }

  //   try {
  //     const baseUrl = ServerUrl();
  //     const apiUrl = 'https://37224c0b64d9.ngrok-free.app/api/users/v1/motion-user-registration';
  //     // const apiUrl = baseUrl + 'api/users/v1/motion-user-registration';
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });

  //     const text = await response.text();
  //     console.log(text, 'Raw API response text:');

  //     let data;
  //     try {
  //       data = JSON.parse(text);
  //     } catch {
  //       Alert.alert('Error', 'Invalid JSON response from server');
  //       return;
  //     }

  //     if (data.status) Alert.alert('Success', data.message);
  //     else Alert.alert('Error', data.message || 'Registration failed');
  //   } catch (error) {
  //     Alert.alert('Error', 'Something went wrong. Try again.');
  //     console.log(error);
  //   }
  // };

  const handleRegister = async () => {
    for (let key in formData) {
      if (!formData[key]) {
        Alert.alert('Validation Error', `Please enter ${key.replace('_', ' ')}`);
        return;
      }
    }

    if (formData.password !== formData.confirm_password) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const baseUrl = ServerUrl();
      // const apiUrl = baseUrl + 'api/users/v1/motion-user-registration';
      const apiUrl = baseUrl + 'api/v1/motion-user-registration';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Register Response:', result);

      if (result.status) {
        Alert.alert('Success', result.message);
        // Navigate to VerifyOtp screen with email or user_id
        navigation.navigate('VerifyOtp', {
          email: formData.registration_email,
          user_id: result.user_id, // if backend returns user_id
        });
      } else {
        Alert.alert('Error', result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.loginHeading}>Registration</Text>
        <Card style={styles.salescard}>
          <Card.Title title="Business Details" titleStyle={styles.sectionTitle} />
          <Card.Content>
            <TextInput
              label="Company Name"
              placeholder='Enter Company Name'
              mode="outlined"
              value={formData.company_name}
              onChangeText={(text) => handleChange('company_name', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />

            <TextInput
              label="Industry Type"
              placeholder='Enter Industry Type'
              mode="outlined"
              value={formData.industry_type}
              onChangeText={(text) => handleChange('industry_type', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />

            <TextInput
              label="GST"
              placeholder='Enter GST Number'
              mode="outlined"
              value={formData.GST_number}
              onChangeText={(text) => handleChange('GST_number', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />
          </Card.Content>
        </Card>

        <Card style={styles.salescard}>
          <Card.Title title="Personal Details" titleStyle={styles.sectionTitle} />
          <Card.Content>
            <TextInput
              label="Owner Name"
              placeholder='Enter Owner Name'
              mode="outlined"
              value={formData.owner_name}
              onChangeText={(text) => handleChange('owner_name', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />

            <TextInput
              label="Email"
              placeholder='Enter Your Email'
              mode="outlined"
              value={formData.registration_email}
              onChangeText={(text) => handleChange('registration_email', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />

            <TextInput
              label="Mobile"
              placeholder='Enter Mobile Number'
              mode="outlined"
              value={formData.mobile_number}
              onChangeText={(text) => handleChange('mobile_number', text)}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />

            <TextInput
              label="Password"
              placeholder='Enter Password'
              mode="outlined"
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />

            <TextInput
              label="Confirm Password"
              placeholder='Enter Confirm Password'
              mode="outlined"
              value={formData.confirm_password}
              onChangeText={(text) => handleChange('confirm_password', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />
          </Card.Content>
        </Card>

        <Card style={styles.salescard}>
          <Card.Title title="Residance Details" titleStyle={styles.sectionTitle} />
          <Card.Content>
            <TextInput
              label="Country"
              placeholder='Enter Your Country'
              mode="outlined"
              value={formData.country}
              onChangeText={(text) => handleChange('country', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />

            <TextInput
              label="State"
              placeholder='Enter Your State'
              mode="outlined"
              value={formData.state}
              onChangeText={(text) => handleChange('state', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />

            <TextInput
              label="City"
              placeholder='Enter Your City'
              mode="outlined"
              value={formData.city}
              onChangeText={(text) => handleChange('city', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />

            <TextInput
              label="Address"
              placeholder='Enter Your Address'
              mode="outlined"
              value={formData.address}
              onChangeText={(text) => handleChange('address', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />

            <TextInput
              label="Postal Code"
              placeholder='Enter Postal Code'
              mode="outlined"
              value={formData.postal_code}
              onChangeText={(text) => handleChange('postal_code', text)}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />

            <TextInput
              label="Website"
              placeholder='Enter website'
              mode="outlined"
              value={formData.website}
              onChangeText={(text) => handleChange('website', text)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              activeOutlineColor="#4CAF50"
              outlineColor="#7f8378ff"
              style={styles.input} />
          </Card.Content>
        </Card>


        {/* <TouchableOpacity onPress={gotoverify} style={styles.LoginButton}> */}
          <TouchableOpacity onPress={handleRegister} style={styles.LoginButton}>
          <Text style={styles.LoginButtonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
