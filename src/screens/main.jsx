import react from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


function MainComponent() {
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Text>Hello, this is a functional component!</Text>
        </View>
    );
}   

export default MainComponent;

