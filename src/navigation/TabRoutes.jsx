import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const TabRoutes = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>TabRoutes</Text>
    </View>
  )
}

export default TabRoutes