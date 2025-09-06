import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PurchaseItems from '../../screens/Purchase/PurchaseItems';
import AddPurchaseItems from '../../screens/Purchase/AddPurchaseItems';

const PurchaseStack = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PurchaseItems" component={PurchaseItems} screenOptions={{}} />
      <Stack.Screen name='AddPurchaseItems' component={AddPurchaseItems} />
    </Stack.Navigator>
  )
}

export default PurchaseStack