import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Drawer/HomeStack';
import SettingsStack from './Drawer/SettingsStack';
import DealersStack from './Drawer/DealersStack';

const TabRoutes = () => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name='Dashboard' component={HomeStack} options={{ headerShown: false }}></Tab.Screen>
      <Tab.Screen name='Settings' component={SettingsStack} options={{ headerShown: false }}></Tab.Screen>
      <Tab.Screen name='Dealers' component={DealersStack} options={{ headerShown: false }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default TabRoutes