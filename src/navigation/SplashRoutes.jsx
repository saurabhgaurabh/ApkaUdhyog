import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import NavigationStrings from '../constants/NavigationStrings';
import Login from '../screens/Login/Login';
import TabRoutes from './TabRoutes';

const splashRoutes = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name={NavigationStrings.LOGIN} component={Login} options={{ headerShown: false }} />
        <Stack.Screen name={NavigationStrings.TABROUTES} component={TabRoutes} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default splashRoutes