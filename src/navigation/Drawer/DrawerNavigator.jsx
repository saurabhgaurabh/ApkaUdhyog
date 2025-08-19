import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Settings from './Settings';
import TabRoutes from '../TabRoutes';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
       <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name="TabRoutes" component={TabRoutes} options={{ headerShown: true }} />
            <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: true }} />
        </Drawer.Navigator>
       </NavigationContainer>
    )
}