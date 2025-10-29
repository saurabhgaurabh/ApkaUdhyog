import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, StatusBar, Image } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from '../../MainStyle';
import { ServerUrl } from '../../services/ServerUrl';

const Login = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({ email: "", password: "" });
  const handleEmail = (text) => { setState({ ...state, email: text }); };
  const handlePassword = (text) => { setState({ ...state, password: text }); };
  const hasEmailError = () => !state.email.includes('@') && state.email.length > 0;
  const hasPasswordError = () => state.password.length > 0 && state.password.length < 6;

  const directLogin = () => { navigation.navigate('TabRoutes') };
  const handleLogin = async () => {
    const { email, password } = state;
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter email and password');
      return;
    }
    try {
      console.log('Sending request to API...');
      let response = await fetch(`https://b1920df43928.ngrok-free.app/api/users/v1/user-login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log('Response status:', response);
      const text = await response.text();
      console.log('Raw Response text:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.log('JSON parse error:', e);
        Alert.alert('Error', 'Invalid JSON response from server');
        return;
      }
      console.log('Response JSON:', data);
      if (response.ok && data.status) {
        console.log('Login successful');
        navigation.navigate('TabRoutes');
      } else {
        console.log('Login failed:', data.message || 'Unknown error');
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error in fetch:', error.message);
      Alert.alert('Error yes', error.message);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleRegister = () => {
    navigation.navigate('Registration');
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.loginContainer}
        >
          <View style={{ position: 'absolute', top: 30, height: '10%', width: '100%' }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{ height: '100%', width: '100%', resizeMode: 'contain', right: 100 }}
            />
          </View>

          <Text style={styles.loginHeading}>ApkaUdhyog</Text>
          <TextInput
            label="Email"
            placeholder='Enter Your Email'
            value={state.email}
            onChangeText={handleEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyLabel='next'
            style={styles.loginInput}
          />
          <HelperText type="error" visible={hasEmailError()}>
            Please enter a valid email.
          </HelperText>

          <TextInput
            label="Password"
            placeholder="Enter Your Password"
            value={state.password}
            onChangeText={handlePassword}
            mode="outlined"
            secureTextEntry={false}
            keyboardType='default'
            returnKeyLabel='next'
            style={styles.loginInput}
          />
          <HelperText type="error" visible={hasPasswordError()}>
            Password must be at least 6 characters.
          </HelperText>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.LoginForgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={directLogin} style={styles.LoginButton}>
            {/* <TouchableOpacity onPress={handleLogin} style={styles.LoginButton}> */}
            <Text style={styles.LoginButtonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <Button
            mode="outlined"
            // icon="google"
            onPress={handleGoogleLogin}
            style={styles.LoginGoogleButton}
          >
            Continue with Google
          </Button>

          <View style={styles.registerContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Text>© {new Date().getFullYear()} PatiRam Production. All rights reserved.</Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default Login;
