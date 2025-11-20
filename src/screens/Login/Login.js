import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, StatusBar, Image, ToastAndroid } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from '../../MainStyle';
import { ServerUrl } from '../../services/ServerUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({ registration_email: "", password: "" });
  const handleEmail = (text) => { setState({ ...state, registration_email: text }); };
  const handlePassword = (text) => { setState({ ...state, password: text }); };
  const hasEmailError = () => !state.registration_email.includes('@') && state.registration_email.length > 0;
  const hasPasswordError = () => state.password.length > 0 && state.password.length < 1;

  const directLogin = () => {
    navigation.navigate('TabRoutes');
  }
  // const handleLogin = async () => {

  //   const { registration_email, password } = state;
  //   if (!registration_email || !password) {
  //     Alert.alert('Validation Error', 'Please enter email and password');
  //     return;
  //   }
  //   try {
  //     console.log('Sending request to API...');
  //     let response = await fetch(`https://e2ec9be535f8.ngrok-free.app/api/users/v1/user-login`, {
  //     // let response = await fetch(`https://motion.patiramproduction.com/v1/user_login`, {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',  // ✅ this allows cookies/sessions
  //       body: JSON.stringify({ registration_email, password }),
  //     });
  //     const text = await response.text();
  //     let data;
  //     try {
  //       data = JSON.parse(text);
  //     } catch (e) {
  //       // console.log('JSON parse error:', e);
  //       Alert.alert('Error', 'Invalid JSON response from server');
  //       return;
  //     }
  //     console.log('Response JSON:', data);
  //     if (response.ok && data.status) {
  //       const user_id = data.user?.user_id || data.user_id || data.data?.user_id;
  //       const otp_secret = data.user?.otp_secret || data.otp_secret || data.data?.otp_secret;

  //       if (user_id) {
  //         await AsyncStorage.setItem('user_id', String(user_id));
  //         await AsyncStorage.setItem('otp_secret', String(otp_secret));
  //         console.log('User ID stored:', user_id, otp_secret);
  //       } else {
  //         ToastAndroid.show('Login successful.', ToastAndroid.LONG);
  //       }

  //       Alert.alert('Login Successful', data.message || 'You have logged in successfully.');
  //       navigation.navigate('TabRoutes');
  //     } else {
  //       Alert.alert('Login Failed', data.message || 'Invalid credentials');
  //     }
  //   } catch (error) {
  //     Alert.alert('Error yes', error.message);
  //   }
  // };

  const handleLogin = async () => {
    const { registration_email, password } = state;

    if (!registration_email || !password) {
      Alert.alert('Validation Error', 'Please enter email and password');
      return;
    }

    try {
      console.log('Sending request to API...');

      let response = await fetch(`https://motion.patiramproduction.com/v1/user_login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ registration_email, password }),
      });

      const data = await response.json();
      console.log('Response JSON:', data);
      if (!response.ok || !data.status) {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
        return;
      }
      const user_id = data?.result?.user_id?.toString();
      const otp_secret = data?.result?.otp_secret?.toString();
      if (user_id) {
        await AsyncStorage.setItem("user_id", user_id);
        await AsyncStorage.setItem("otp_secret", otp_secret);
        console.log("User ID,  secret stored successfully:", user_id, otp_secret);
      } else {
        ToastAndroid.show("Login successful.", ToastAndroid.LONG);
      }
      ToastAndroid.show("Login successful.", ToastAndroid.LONG);
      navigation.navigate('TabRoutes');

    } catch (error) {
      Alert.alert('Error', error.message);
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
            activeOutlineColor="#4CAF50"
            outlineColor="#7f8378ff"
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
            activeOutlineColor="#4CAF50"
            outlineColor="#7f8378ff"
            style={styles.loginInput}
          />
          <HelperText type="error" visible={hasPasswordError()}>
            Password must be at least 6 characters.
          </HelperText>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.LoginForgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={directLogin} style={styles.LoginButton}> */}
          <TouchableOpacity onPress={handleLogin} style={styles.LoginButton}>
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
