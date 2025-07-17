import react from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SplashRoutes from '../navigation/SplashRoutes';

function MainComponent() {
    return (
        <View style={{ flex: 1 }}>
            <SplashRoutes />
        </View>
    );
}

export default MainComponent;

