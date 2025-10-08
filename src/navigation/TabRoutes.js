import { View, Text, Image, Dimensions, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Drawer/HomeStack';
import PurchaseStack from './Drawer/PurchaseStack';
import ItemStack from './Drawer/ProductsStack';
import ImagePath from '../constants/ImagePath';
import Dashboard from './Drawer/DashboardStack';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";


const TabRoutes = () => {
  const { width } = Dimensions.get("window");
  const iconSize = width * 0.07;
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={{
        tabBarInactiveTintColor: '#7f8378ff', tabBarActiveTintColor: '#4CAF50',
        tabBarStyle: { backgroundColor: '#ffffff' }
      }}>
        <Tab.Screen name="HomeStack" component={HomeStack} options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          const isAddDealers = routeName === "AddDealers";
          const isDealersInfo = routeName === "DealersInfo";
          const isAddClients = routeName === "AddClients";
          const isAddSales = routeName === "AddSales";
          const isPrintSale = routeName === "PrintSale";
          const isEmployeeRegistration = routeName === "EmployeeRegistration";
          return {
            headerShown: false,
            title: 'Products',
            tabBarStyle: isAddDealers || isDealersInfo || isAddClients || isEmployeeRegistration || isAddSales  || isPrintSale ? { display: "none" } : { display: "flex" },
            tabBarIcon: ({ focused }) => (
              <Image
                style={{
                  tintColor: focused ? "#4CAF50" : "#7f8378ff",
                  width: iconSize,
                  height: iconSize,
                  resizeMode: "contain",
                }}
                source={ImagePath.Home}
              />
            ),
          };
        }}
        />
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

        <Tab.Screen name="Items" component={ItemStack} options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          const isAddNewItem = routeName === "AddNewItem";
          return {
            headerShown: false,
            title: 'Products',
            tabBarStyle: isAddNewItem ? { display: "none" } : { display: "flex" },
            tabBarIcon: ({ focused }) => (
              <Image
                style={{
                  tintColor: focused ? "#4CAF50" : "#7f8378ff",
                  width: iconSize,
                  height: iconSize,
                  resizeMode: "contain",
                }}
                source={ImagePath.product}
              />
            ),
          };
        }}
        />
        <Tab.Screen name="Purchase" component={PurchaseStack} options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          const isAddPurchaseItems = routeName === "AddPurchaseItems";
          return {
            headerShown: false,
            tabBarStyle: isAddPurchaseItems ? { display: "none" } : { display: "flex" },
            tabBarIcon: ({ focused }) => (
              <Image
                style={{
                  tintColor: focused ? "#4CAF50" : "#7f8378ff",
                  width: iconSize,
                  height: iconSize,
                  resizeMode: "contain",
                }}
                source={ImagePath.purchase}
              />
            ),
          };
        }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default TabRoutes