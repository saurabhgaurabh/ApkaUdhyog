import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Settings from '../navigation/Drawer/PurchaseStack'

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <View><Text>go to settings </Text></View>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}><Text>go to settings </Text></TouchableOpacity>
    </View>
  )
}

export default Home