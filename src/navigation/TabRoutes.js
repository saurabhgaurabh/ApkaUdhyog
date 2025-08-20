import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Drawer/HomeStack';
import SettingsStack from './Drawer/SettingsStack';
import DealersStack from './Drawer/DealersStack';
import ImagePath from '../constants/ImagePath';


const TabRoutes = () => {
  const { width } = Dimensions.get("window");
  const iconSize = width * 0.07;
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ tabBarInactiveTintColor: '#4CAF50', tabBarActiveTintColor: '#03f570ff' }}>
      <Tab.Screen name='Dashboard' component={HomeStack} options={{
        headerShown: false, title: 'Dashboard',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? "#03f570ff" : "#4CAF50",
                width: iconSize,
                height: iconSize,
                resizeMode: "contain",
              }}
              source={ImagePath.dashboard}
            />
          )
        }
      }}></Tab.Screen>
      <Tab.Screen name='Dealers' component={DealersStack} options={{
        headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? "#03f570ff" : "#4CAF50",
                width: iconSize,
                height: iconSize,
                resizeMode: "contain",
              }}
              source={ImagePath.service}
            />
          )
        }
      }}></Tab.Screen>
      <Tab.Screen name='Settings' component={SettingsStack} options={{
        headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? "#03f570ff" : "#4CAF50",
                width: iconSize,
                height: iconSize,
                resizeMode: "contain",
              }}
              source={ImagePath.setting}
            />
          )
        }
      }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default TabRoutes