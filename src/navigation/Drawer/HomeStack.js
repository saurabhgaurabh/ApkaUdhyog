import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/Home';
import CustomHeader from '../../components/CustomeHeader';
import AddDealers from '../../screens/Dealers/AddDealers';


const HomeStack = ({ navigation }) => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name='AddDealers' component={AddDealers}/>
    </Stack.Navigator>
  )
}

export default HomeStack