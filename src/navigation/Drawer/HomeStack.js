import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/Home';
import CustomHeader from '../../components/CustomeHeader';
import AddDealers from '../../screens/Home/Dealers/AddDealers';
import ListDealers from '../../screens/Home/Dealers/ListDealers';
import DealersInfo from '../../screens/Home/Dealers/DealersInfo';
import ListClients from '../../screens/Home/Clients/ListClients';
import AddClients from '../../screens/Home/Clients/AddClients';
import InfoClients from '../../screens/Home/Clients/InfoClients';
import EmployeeRegistration from '../../screens/Home/Employees/EmployeeRegistration';


const HomeStack = ({ navigation }) => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name='AddDealers' component={AddDealers} />
      <Stack.Screen name='ListDealer' component={ListDealers} />
      <Stack.Screen name='DealersInfo' component={DealersInfo} />
      <Stack.Screen name='AddClients' component={AddClients} />
      <Stack.Screen name='ListClients' component={ListClients} />
      <Stack.Screen name='InfoClients' component={InfoClients} />
      <Stack.Screen name='EmployeeRegistration' component={EmployeeRegistration} />
    </Stack.Navigator>
  )
}

export default HomeStack