import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Settings from '../navigation/Drawer/PurchaseStack'
import CustomHeader from '../components/CustomeHeader'

const Home = ({ navigation }) => {
   const [showSearch, setShowSearch] = React.useState(false);
  const [q, setQ] = React.useState("");

  return (
    <>
     <CustomHeader        
        backgroundColor="#ffffff"
        textColor="#8a4949ff"
      />
      <View>
        <Text>Home</Text>
        <View><Text>go to settings </Text></View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}><Text>go to settings </Text></TouchableOpacity>
      </View>
    </>
  )
}

export default Home