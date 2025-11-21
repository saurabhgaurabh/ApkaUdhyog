import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ToastAndroid, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import CustomHeader from '../../../components/CustomeHeader';
import styles from '../../../MainStyle';
import Colors from '../../../constants/color';
import ImagePath from '../../../constants/ImagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ListDealers = () => {
    const navigation = useNavigation();
    const [dealers, setDealers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [session, setSession] = useState({ user_id: null });

   
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
    };
    useEffect(() => {
        const loadSession = async () => {
            const stored_user_id = await AsyncStorage.getItem("user_id");
            console.log("Fetched Dealers from storage:", stored_user_id);
            if (!stored_user_id) {
                Alert.alert("Session expired", "Please login again.");
                navigation.replace("Login");
                return;
            }
            setSession({
                user_id: stored_user_id,
            });

            getDealers(stored_user_id);
        };

        loadSession();
    }, []);

    const getDealers = async (user_id) => {
        try {
            if (!refreshing) setLoading(true);
            if (!user_id) {
                Alert.alert("Session Expired", "Please login again.");
                return;
            }
            const response = await fetch(
                `https://motion.patiramproduction.com/api/v1/motion-add-dealer-registration-get?user_id=${user_id}`
            );
            const result = await response.json();
            setDealers(result?.result || []);
        } catch (error) {
            ToastAndroid.show('Failed to fetch dealers.', ToastAndroid.SHORT);
            console.error('Error fetching dealers:', error);
        } finally {
            setLoading(false);
            setRefreshing(false); 
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getDealers(session.user_id);
    };


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
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[Colors.primary]}      // ✅ Spinner color (Android)
                            tintColor={Colors.primary}     // ✅ Spinner color (iOS)
                            title="Refreshing..."
                            titleColor={Colors.primary}
                        />
                    }
                />

            ) : (
                <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>No dealers found.</Text>
            )}
        </View>
    );
};

export default ListDealers;
