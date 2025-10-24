import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import SubHeader from '../../../components/SubHeader'
import * as Animatable from 'react-native-animatable';
import Colors from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import ImagePath from '../../../constants/ImagePath';
import styles from '../../../MainStyle';


const ListProductManufacturing = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={{ flex: 1, backgroundColor: Colors.screenBackground  }}>
                <SubHeader title="Product Manufacture" />
                <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65, top: 10 }}>
                    <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('ProductManufacturing')}>
                        <Text style={styles.purchaseButtonText}>Add Material</Text>
                    </TouchableOpacity>
                </Animatable.View>
                <View></View>
            </View>
        </>
    )
}

export default ListProductManufacturing