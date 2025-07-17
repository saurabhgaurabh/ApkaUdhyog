import { View, Text, Button } from 'react-native'
import React from 'react'
import { TabRouter, useNavigation } from '@react-navigation/native'
import TabRoutes from '../../navigation/TabRoutes'

const Login = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Login</Text>
            <Button title="go to tab bar" onPress={() => navigation.navigate('TabRoutes')} />
        </View>
    )
}

export default Login