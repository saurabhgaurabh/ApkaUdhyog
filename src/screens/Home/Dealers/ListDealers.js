import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../../components/CustomeHeader';
import styles from '../../../MainStyle';
import { useSelector } from 'react-redux';
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import Colors from '../../../constants/color';
import ImagePath from '../../../constants/ImagePath';
import DealersInfo from './DealersInfo';
import * as Animatable from 'react-native-animatable';
import { SlideInLeft } from 'react-native-reanimated';



const ListDealers = () => {
    const navigation = useNavigation();
    const { dealersGet } = useSelector(state => state.addDealer) // addDealer is a state name
    const capitalizeFirst = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    const getStatusStyle = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'pending':
                return { backgroundColor: '#FFF4E5', color: '#FF8C00' };
            case 'active':
                return { backgroundColor: '#E5F9E0', color: '#3BA55D' };
            case 'deleted':
                return { backgroundColor: '#FFE5E5', color: '#E63946' };
            default:
                return { backgroundColor: '#E0E7FF', color: '#3B5BDB' };
        }
    }


    const renderDealerItem = ({ item: dealer }) => (
        // <TouchableOpacity
        //     onPress={() => navigation.navigate('DealersInfo', { dealer })}
        //     style={styles.cardDealerBody}
        // >
        //     <View style={styles.listCardBody}>
        //         <Text style={styles.listStatus}>{capitalizeFirst(dealer?.status ?? '')}</Text>
        //         <Text style={styles.subcardText}>#{dealer?.dealer_id ?? ''}</Text>
        //     </View>

        //     <View style={{ marginBottom: 10 }}>
        //         <Text style={styles.cardText}>{capitalizeFirst(dealer?.dealer_name ?? '')}</Text>
        //         <Text style={styles.subcardText}>GSTIN: {dealer?.dealer_GST ?? ''}</Text>
        //     </View>

        //     <View style={styles.listCardBody}>
        //         <View style={{ marginTop: 40 }}>
        //             <Text style={styles.subcardText}>More Info</Text>
        //         </View>
        //         <Image source={ImagePath.user} resizeMode="cover" style={styles.cardImage} />
        //     </View>
        // </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate('DealersInfo', { dealer })}
            style={styles.cardDealerBody}
            activeOpacity={0.9}
        >
            <View style={styles.listCardHeader}>
                <Text style={[styles.listStatus, getStatusStyle(dealer?.status)]}>
                    {capitalizeFirst(dealer?.status ?? '')}
                </Text>
                <Text style={styles.subcardId}>#{dealer?.dealer_id ?? ''}</Text>
            </View>
            <View style={styles.cardMiddle}>
                <Text style={styles.cardTitle}>Name: {capitalizeFirst(dealer?.dealer_name ?? '')}</Text>
                <Text style={styles.cardTitle}>GSTIN: {dealer?.dealer_GST ?? ''}</Text>
            </View>
            <View style={styles.listCardFooter}>
                <Text style={styles.moreInfo}>More Info →</Text>
                <Image source={ImagePath.user} resizeMode="cover" style={styles.cardImage} />
            </View>
        </TouchableOpacity>

    );
    return (
        <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
            <CustomHeader />
            <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddDealers')}>
                    <Text style={styles.purchaseButtonText}>{'Add New Dealer'}</Text>
                </TouchableOpacity>
            </Animatable.View>

            {dealersGet?.result?.data?.length > 0 ? (
                <FlatList
                    data={dealersGet?.result?.data}
                    renderItem={renderDealerItem}
                    keyExtractor={(item, index) => item?.dealer_id?.toString() || index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Text>No dealers found.</Text>
            )}

        </View>
    )
}

export default ListDealers
