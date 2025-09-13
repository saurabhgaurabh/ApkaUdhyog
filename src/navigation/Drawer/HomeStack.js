import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/Home';
import CustomHeader from '../../components/CustomeHeader';
import AddDealers from '../../screens/Dealers/AddDealers';
import ListDealers from '../../screens/Dealers/ListDealers';
import DealersInfo from '../../screens/Dealers/DealersInfo';


const HomeStack = ({ navigation }) => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name='AddDealers' component={AddDealers} />
      <Stack.Screen name='ListDealer' component={ListDealers} />
      <Stack.Screen name='DealersInfo' component={DealersInfo} />
    </Stack.Navigator>
  )
}

export default HomeStack