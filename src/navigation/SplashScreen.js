import { View, ImageBackground, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = async () => {
    const navigation = useNavigation();
    // const storedUserId = await AsyncStorage.getItem('user_id');
    // const storedOtpSecret = await AsyncStorage.getItem('otp_secret');
    // console.log(storedUserId, storedOtpSecret, "...id, secret")

   useEffect(() => {
        const checkLogin = async () => {
            const userId = await AsyncStorage.getItem('user_id');

            setTimeout(() => {
                if (userId) {
                    navigation.replace('TabRoutes');   // 👉 User logged in
                } else {
                    navigation.replace('Onboarding');  // 👉 No user, go to onboarding
                }
            }, 2000);
        };

        checkLogin();
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            {/* <StatusBar translucent backgroundColor="transparent" barStyle="light-content" /> */}
            <ImageBackground
                source={require('../assets/patiramPro.png')}
                style={{ height: '100%', width: '100%' }}
                resizeMode="cover"
            />
        </View>
    );
};

export default SplashScreen;
