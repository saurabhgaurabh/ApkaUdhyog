import { View, ImageBackground, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Onboarding'); 
        }, 3000);

        return () => clearTimeout(timer);
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
