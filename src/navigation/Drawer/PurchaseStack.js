import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PurchaseItems from '../../screens/Purchase/PurchaseItems';

const PurchaseStack = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PurchaseItems" component={PurchaseItems} screenOptions={{}} />
    </Stack.Navigator>
  )
}

export default PurchaseStack