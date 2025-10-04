import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomHeader from '../../../components/CustomeHeader'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../MainStyle';

const EmployeeList = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={{ flex: 1, }}>
                <CustomHeader />
                <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                    <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('EmployeeRegistration')}>
                        <Text style={styles.purchaseButtonText}>{'Employee Registration'}</Text>
                    </TouchableOpacity>
                </Animatable.View>
                

            </View>
        </>
    )
}

export default EmployeeList