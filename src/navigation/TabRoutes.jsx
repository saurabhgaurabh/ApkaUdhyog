import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Drawer/Home';
import Settings from './Drawer/Settings';
import Dealers from './Drawer/Dealers';

const TabRoutes = () => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name='Dashboard' component={Home} options={{ headerShown: false }}></Tab.Screen>
      <Tab.Screen name='Dealers' component={Dealers} options={{ headerShown: false }}></Tab.Screen>
      <Tab.Screen name='Settings' component={Settings} options={{ headerShown: false }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default TabRoutes