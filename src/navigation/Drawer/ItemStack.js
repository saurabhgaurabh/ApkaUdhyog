import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Items from '../../screens/Items/Items';
import AddNewItem from '../../screens/Items/AddNewItem';

const Dealers = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Items' component={Items} />
        <Stack.Screen name='AddNewItem' component={AddNewItem} options={{ headerShown: false, }} />
      </Stack.Navigator>
    </>
  )
}

export default Dealers