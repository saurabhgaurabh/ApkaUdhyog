import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { ServerUrl } from '../../services/ServerUrl';

const RegistrationScreen = () => {
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

  const handleRegister = async () => {
    const {
      company_name,
      owner_name,
      industry_type,
      GST_number,
      registration_email,
      mobile_number,
      password,
      confirm_password,
      country,
      state,
      city,
      address,
      postal_code,
      website,
    } = formData;

    if (
      !company_name ||
      !owner_name ||
      !industry_type ||
      !GST_number ||
      !registration_email ||
      !mobile_number ||
      !password ||
      !confirm_password ||
      !country ||
      !state ||
      !city ||
      !address ||
      !postal_code ||
      !website
    ) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    if (password !== confirm_password) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`https://ce5b4bd87000.ngrok-free.app/api/users/v1/motion-user-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('API response:', data);

      if (data.status) {
        Alert.alert('Success', data.message);
        // navigate or clear form
      } else {
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      console.log('Fetch error:', error.message);
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={formData.company_name}
          onChangeText={(text) => handleChange('company_name', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Owner Name"
          value={formData.owner_name}
          onChangeText={(text) => handleChange('owner_name', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Industry Type"
          value={formData.industry_type}
          onChangeText={(text) => handleChange('industry_type', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="GST Number"
          value={formData.GST_number}
          onChangeText={(text) => handleChange('GST_number', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.registration_email}
          onChangeText={(text) => handleChange('registration_email', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={formData.mobile_number}
          onChangeText={(text) => handleChange('mobile_number', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={formData.confirm_password}
          onChangeText={(text) => handleChange('confirm_password', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Country"
          value={formData.country}
          onChangeText={(text) => handleChange('country', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="State"
          value={formData.state}
          onChangeText={(text) => handleChange('state', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={formData.city}
          onChangeText={(text) => handleChange('city', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          value={formData.postal_code}
          onChangeText={(text) => handleChange('postal_code', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Website"
          value={formData.website}
          onChangeText={(text) => handleChange('website', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f4f6fc',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#4a6cf7',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default RegistrationScreen;
