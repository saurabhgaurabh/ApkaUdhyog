import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './HomeStack';
import Settings from './SettingsStack';
import TabRoutes from '../TabRoutes';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        // <NavigationContainer>
        //     <Drawer.Navigator>
        //         <Drawer.Screen name="TabRoutes" component={TabRoutes} options={{ headerShown: true }} />
        //         <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: true }} />
        //     </Drawer.Navigator>
        // </NavigationContainer>
        <DrawerContentScrollView></DrawerContentScrollView>
    )
}