import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomHeader from '../../../components/CustomeHeader'
import styles from '../../../MainStyle'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';

const ListClients = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
                <CustomHeader />
                <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                    <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddClients')}>
                        <Text style={styles.purchaseButtonText}>{`👤  Add New Clients`}</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </>
    )
}

export default ListClients