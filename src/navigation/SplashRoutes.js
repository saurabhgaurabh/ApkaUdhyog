import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import NavigationStrings from '../constants/NavigationStrings';
import Login from '../screens/Login/Login';
import TabRoutes from './TabRoutes';
import Registration from '../screens/Registration/Registration';
import AddPurchaseItems from '../screens/Purchase/AddPurchaseItems';
import { Provider as PaperProvider } from "react-native-paper";
import SplashScreen from './SplashScreen';
import Onboarding from './Onboarding ';
import VerifyOtp from '../screens/Registration/VerifyOtp';


const splashRoutes = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
      // initialRouteName="Login"
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name={NavigationStrings.LOGIN} component={Login} options={{ headerShown: false }} />
        <Stack.Screen name={NavigationStrings.TABROUTES} component={TabRoutes} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default splashRoutes