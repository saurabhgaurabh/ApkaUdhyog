import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPurchaseItems from '../../screens/Purchase/AddPurchaseItems';
import ListPurchase from '../../screens/Purchase/ListPurchase';

const PurchaseStack = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="ListPurchase" component={ListPurchase} screenOptions={{}} />
      <Stack.Screen name='AddPurchaseItems' component={AddPurchaseItems} options={{ headerShown: false, }} />
    </Stack.Navigator>
  )
}

export default PurchaseStack