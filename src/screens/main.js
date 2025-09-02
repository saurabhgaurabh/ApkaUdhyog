import React from 'react';
import { View } from 'react-native';
import SplashRoutes from '../navigation/SplashRoutes';
import ErrorBoundary from '../components/ErrorBoundary';

function MainComponent() {
    return (
        <ErrorBoundary>
            <View style={{ flex: 1 }}>
                <SplashRoutes />
            </View>
        </ErrorBoundary>
    );
}

export default MainComponent;

