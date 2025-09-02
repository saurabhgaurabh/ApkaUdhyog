import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Drawer/HomeStack';
import PurchaseStack from './Drawer/PurchaseStack';
import ItemStack from './Drawer/ItemStack';
import ImagePath from '../constants/ImagePath';
import Dashboard from './Drawer/DashboardStack';


const TabRoutes = () => {
  const { width } = Dimensions.get("window");
  const iconSize = width * 0.07;
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ tabBarInactiveTintColor: '#7f8378ff', tabBarActiveTintColor: '#4CAF50', 
       tabBarStyle: { backgroundColor: '#ffffff' }
     }}>
      <Tab.Screen name='HomeStack' component={HomeStack} options={{
        headerShown: false, title: 'Home',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? "#66BB6A" : "#7f8378ff",
                width: iconSize,
                height: iconSize,
                resizeMode: "contain",
              }}
              source={ImagePath.Home}
            />
          )
        }
      }}></Tab.Screen>
      <Tab.Screen name="Dashboard" component={Dashboard} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? "#4CAF50" : "#7f8378ff",
                width: iconSize,
                height: iconSize,
                resizeMode: "contain",
              }}
              source={ImagePath.dashboard}
            />
          )
        }
      }}>

      </Tab.Screen>
      <Tab.Screen name='Items' component={ItemStack} options={{
        headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? "#4CAF50" : "#7f8378ff",
                width: iconSize,
                height: iconSize,
                resizeMode: "contain",
              }}
              source={ImagePath.items}
            />
          )
        }
      }}></Tab.Screen>
      <Tab.Screen name='Purchase' component={PurchaseStack} options={{
        headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{
                tintColor: focused ? "#4CAF50" : "#7f8378ff",
                width: iconSize,
                height: iconSize,
                resizeMode: "contain",
              }}
              source={ImagePath.purchase}
            />
          )
        }
      }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default TabRoutes