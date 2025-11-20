import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert, ToastAndroid } from 'react-native';
import Colors from '../../constants/color';
import { useNavigation, useRoute } from '@react-navigation/native';

const VerifyOtp = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { email, user_id } = route.params || {};
    const [userOTP, setuserOTP] = useState('');

    const handleVerify = async () => {
        console.log("opening")
        if (!userOTP) {
            Alert.alert('Error', 'Please enter OTP');
            return;
        }
        console.log(userOTP, "userOTP...")
        try {
            let response = await fetch(`https://motion.patiramproduction.com/v1/verify_user_otp`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userOTP, email, user_id }),
            });
            const result = await response.json();
            if (result.status) {
                ToastAndroid.show(`Continue with login`, ToastAndroid.SHORT);
                navigation.navigate('Login');
            }
            else {
                Alert.alert('Error', result.message || 'Invalid OTP');
            }
            console.log(result, "result otp...")
        } catch (error) {
            console.log(error, "internal error")
            Alert.alert(`Internal Server Error.${error || error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.screenBackground} barStyle="light-content" />
            <View style={styles.card}>
                <Text style={styles.title}>Verify OTP</Text>
                <Text style={styles.subtitle}>Enter the OTP sent to your registered email or mobile number</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter 6-digit OTP"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={6}
                    activeOutlineColor="#4CAF50"
                    outlineColor="#7f8378ff"
                    value={userOTP}
                    onChangeText={setuserOTP}
                />

                <TouchableOpacity style={styles.button} onPress={handleVerify}>
                    <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.resendText}>Didn’t receive OTP? <Text style={styles.resendLink}>Resend</Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default VerifyOtp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: Colors.sweetGreen,
        width: '100%',
        borderRadius: 12,
        padding: 25,
        elevation: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        letterSpacing: 5,
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    resendText: {
        textAlign: 'center',
        color: '#444',
    },
    resendLink: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
});
