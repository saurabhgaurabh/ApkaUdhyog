import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ToastAndroid, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import CustomHeader from '../../../components/CustomeHeader';
import styles from '../../../MainStyle';
import Colors from '../../../constants/color';
import ImagePath from '../../../constants/ImagePath';

const ListDealers = () => {
    const navigation = useNavigation();
    const [dealers, setDealers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔠 Capitalize first letter
    const capitalizeFirst = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    // 🎨 Status styling
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
    };

    // 📦 API fetch
    const getDealers = async () => {
        try {
            const response = await fetch(
                `https://motion.patiramproduction.com/api/v1/motion-add-dealer-registration-get`
                // `https://2b2a87af0b79.ngrok-free.app/api/users/v1/motion-add-dealer-registration-get`
            );
            const result = await response.json();
            console.log(result?.result, "dealers darta")
            setDealers(result?.result || []);
        } catch (error) {
            ToastAndroid.show('Failed to fetch dealers.', ToastAndroid.SHORT);
            console.error('Error fetching dealers:', error);
        } finally {
            setLoading(false);
        }
    };
    // console.log(dealers.result[0], "new dealers")
    useEffect(() => {
        getDealers();
    }, []);

    //  Dealer item UI
    const renderDealerItem = ({ item: dealer }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('DealersInfo', { dealer })}
            style={styles.cardDealerBody}
            activeOpacity={0.9}>
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
        <View style={{ flex: 1, backgroundColor: Colors.screenBackground }}>
            <CustomHeader />

            <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddDealers')}>
                    <Text style={styles.purchaseButtonText}>Add New Dealer</Text>
                </TouchableOpacity>
            </Animatable.View>

            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 30 }} />
            ) : dealers?.length > 0 ? (
                <FlatList
                    data={dealers}
                    renderItem={renderDealerItem}
                    keyExtractor={(item, index) => item?.dealer_id?.toString() || index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            ) : (
                <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>No dealers found.</Text>
            )}
        </View>
    );
};

export default ListDealers;
