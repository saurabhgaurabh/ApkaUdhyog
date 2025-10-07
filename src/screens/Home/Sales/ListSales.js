import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomHeader from '../../../components/CustomeHeader'
import { useNavigation } from '@react-navigation/native'
import styles from '../../../MainStyle'
import * as Animatable from 'react-native-animatable';

const ListSales = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={{ flex: 1 }}>
                <CustomHeader />
                <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                    <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddSales')}>
                        <Text style={styles.purchaseButtonText}>Add New Sale</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </>
    )
}

export default ListSales