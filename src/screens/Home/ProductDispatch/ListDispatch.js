import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../MainStyle';
import SubHeader from '../../../components/SubHeader';

const ListDispatch = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={{ flex: 1 }}>
                <SubHeader title="List Dispatch" onRightPress={()=> navigation.navigate('AddDispatch')}/>
               
            </View>
        </>
    )
}

export default ListDispatch