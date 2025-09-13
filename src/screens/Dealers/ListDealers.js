import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../components/CustomeHeader';
import styles from '../../MainStyle';
import { useSelector } from 'react-redux';
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import Colors from '../../constants/color';
import ImagePath from '../../constants/ImagePath';



const ListDealers = () => {
    const navigation = useNavigation();
    const { dealersGet } = useSelector(state => state.addDealer)
    const capitalizeFirst = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
            <CustomHeader />
            <ScrollView showsVerticalScrollIndicator={false}>
                {dealersGet?.result?.data && dealersGet?.result?.data?.length > 0 ? (
                    dealersGet?.result?.data?.map((dealer, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                margin: 10,
                                borderRadius: 12,
                                backgroundColor: '#fff',
                                shadowColor: '#000',
                                shadowOpacity: 0.1,
                                shadowRadius: 6,
                                elevation: 4,
                                padding: 15,
                            }}
                        >
                            {/* Top row: Status + Dealer ID */}
                            <View style={styles.listCardBody}>
                                <Text style={styles.listStatus} >{capitalizeFirst(dealer?.status)} </Text>
                                <Text style={styles.cardText}># {dealer.dealer_id}</Text>
                            </View>

                            {/* Middle row: Dealer Name + Product */}
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.cardText}>
                                    {capitalizeFirst(dealer.dealer_name)}
                                </Text>
                                 <Text style={styles.subcardText}>GSTIN: {` ${dealer.dealer_GST}`} </Text>
                            </View>


                            {/* Bottom row: Icon / Image aligned right */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ marginTop: 40 }}>
                                    <Text style={{ fontSize: 14, color: '#666' }}>
                                        View More
                                    </Text>
                                </View>
                                <Image
                                    source={ImagePath.user}
                                    resizeMode="contain"
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30,
                                        backgroundColor: '#f5f5f5',
                                        padding: 8,
                                    }}
                                />
                            </View>
                        </TouchableOpacity>

                    ))
                ) : (
                    <Text>No dealers found.</Text>
                )}
                <Text>{console.log(dealersGet, " get new dealer data")}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddDealers')}>
                <Text style={styles.purchaseButtonText}>Add Dealer</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ListDealers
