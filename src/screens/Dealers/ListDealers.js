import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../components/CustomeHeader';
import styles from '../../MainStyle';
import { useSelector } from 'react-redux';



const ListDealers = () => {
    const navigation = useNavigation();
    const { dealersGet } = useSelector(state => state.addDealer)
    return (
        <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
            <CustomHeader />
            <ScrollView showsVerticalScrollIndicator={false}>
                {dealersGet.result.data && dealersGet.result.data.length > 0 ? (
                    dealersGet.result.data.map((dealer, index) => (
                        <View key={index} style={{ padding: 10, margin: 10, backgroundColor: '#fff', borderRadius: 5 }}>
                            <Text>Name: {dealer.dealer_name}</Text>
                            <Text>Email: {dealer.email}</Text>
                            <Text>Mobile: {dealer.mobile_number}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No dealers found.</Text>
                )}
                <Text>{console.log(dealersGet.result.data, " get new dealer data")}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddDealers')}>
                <Text style={styles.purchaseButtonText}>Add Dealer</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ListDealers
