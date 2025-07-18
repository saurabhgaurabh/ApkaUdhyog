// import { View, Text, Button, TextInput } from 'react-native'
// import React, { useState } from 'react'
// import { TabRouter, useNavigation } from '@react-navigation/native'
// import TabRoutes from '../../navigation/TabRoutes'
// import style from '../../MainStyle';


// const Login = () => {
//     const navigation = useNavigation();
//     const [state, setState] = useState({});

//     return (
//         <View style={style.LoginMainContainer}>
//             <Text style={style.loginHeading}>Login</Text>
//             <View style={style.LoginForm}>
//                 <TextInput style={style.LoginInput}
//                     label="Email"
//                     placeholder="Email"
//                     placeholderTextColor={'#617beeff'}
//                     autoCapitalize="none"
//                     keyboardType='email-address'
//                     mode="outlined"
//                     returnKeyLabel='next'
                    
//                 />
//                 <TextInput style={style.LoginInput}
//                     label="Password"
//                     placeholder="Password"
//                     placeholderTextColor={'#617beeff'}
//                     autoCapitalize="none"
//                     keyboardType='email-address'
//                 />

//             </View>


//         </View>
//     )
// }

// export default Login

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from '../../MainStyle';

const Login = () => {
  const navigation = useNavigation();
const [state, setState] = useState({});

  const hasEmailError = () => !email.includes('@') && email.length > 0;
  const hasPasswordError = () => password.length > 0 && password.length < 6;

  const handleLogin = () => {
    if (!hasEmailError() && !hasPasswordError()) {
      console.log('Login Successful!');
      navigation.navigate('TabRoutes'); 
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Google signin logic here
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Navigation to ForgotPassword screen
  };

  const handleRegister = () => {
   navigation.navigate('Registration'); // Navigate to Registration screen
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.loginContainer}
    >
      <Text style={styles.loginHeading}>ApkaUdhyog</Text>

      <TextInput
        label="Email"
        placeholder='Enter Your Email'
        value={email}
        // onChangeText={setEmail}
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
        value={password}
        // onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        returnKeyLabel='next'
        style={styles.loginInput}
      />
      <HelperText type="error" visible={hasPasswordError()}>
        Password must be at least 6 characters.
      </HelperText>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.LoginForgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button mode="contained" onPress={handleLogin} style={styles.LoginButton}>
        Login
      </Button>

      <Text style={styles.orText}>OR</Text>

      <Button
        mode="outlined"
        icon="google"
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
    </KeyboardAvoidingView>
  );
};

export default Login;

// const styles = StyleSheet.create({
  
// });
