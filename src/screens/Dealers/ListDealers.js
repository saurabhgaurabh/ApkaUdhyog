import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../components/CustomeHeader';
import styles from '../../MainStyle';


const ListDealers = () => {
    const navigation = useNavigation();
    return (
          <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
            <CustomHeader />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View></View>
            </ScrollView>
            <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddDealers')}>
                <Text style={styles.purchaseButtonText}>Add Dealer</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ListDealers