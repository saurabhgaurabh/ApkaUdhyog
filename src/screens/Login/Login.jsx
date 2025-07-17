import { View, Text, Button } from 'react-native'
import React from 'react'
import { TabRouter, useNavigation } from '@react-navigation/native'
import TabRoutes from '../../navigation/TabRoutes'

const Login = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Login</Text>
            
        </View>
    )
}

export default Login