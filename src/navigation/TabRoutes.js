import { View, Text, Image, Dimensions, SafeAreaView, StatusBar, Alert, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
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
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to Exit App?", [
  //       { text: "Cancel", onPress: () => null, style: "cancel" },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
  //   return () => backHandler.remove();
  // }, []);

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
          const isViewSales = routeName === "ViewSales";
          const isProductManufacturing = routeName === "ProductManufacturing";
          const isEmployeeRegistration = routeName === "EmployeeRegistration";
          return {
            headerShown: false,
            title: 'Home',
            tabBarStyle: isAddDealers || isDealersInfo || isAddClients || isEmployeeRegistration || isAddSales || isPrintSale || isViewSales || isProductManufacturing ? { display: "none" } : { display: "flex" },
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
          const isViewPurchase = routeName === "ViewPurchase";
          return {
            headerShown: false,
            tabBarStyle: isAddPurchaseItems || isViewPurchase ? { display: "none" } : { display: "flex" },
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