import { View, Text, Button, StatusBar } from 'react-native'
import React from 'react'
import { TabRouter, useNavigation } from '@react-navigation/native'
import TabRoutes from '../../navigation/TabRoutes'
import style from '../../MainStyle';



const Login = () => {
    const navigation = useNavigation();

    return (
        <View style={style.LoginMainContainer}>
            <Text style={style.loginHeading}>Login</Text>
            <View style={style.LoginForm}>
                <Text>Login Form for me hello my form </Text>
            </View>


        </View>
    )
}

export default Login