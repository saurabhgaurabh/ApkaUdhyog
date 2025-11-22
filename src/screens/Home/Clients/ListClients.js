import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Alert,
    ScrollView,
    RefreshControl
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../../../components/CustomeHeader';
import styles from '../../../MainStyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import ImagePath from '../../../constants/ImagePath';
import Colors from '../../../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListClients = () => {
    const navigation = useNavigation();
    const [session, setSession] = useState("");
    const [clients, setClients] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { user_id, otp_secret } = route.params || {};


    const capitalizeFirst = (str) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
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

    const fetchClients = async (uid) => {
        try {
            if (!refreshing) setLoading(true);
            if (!uid) {
                Alert.alert("Session Expired", "Please login again.");
                console.log("Missing session: user_id, otp_secret", uid);
                return;
            }
            const response = await fetch(
                `https://motion.patiramproduction.com/api/v1/motion-parties-registration-get?user_id=${uid}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.status) {
                setClients(data?.result || []);
            } else {
                Alert.alert("No Data", data?.message || "No clients found.");
                setClients([]);
            }

        } catch (err) {
            console.error("API error:", err);
            Alert.alert("Error", "Failed to load clients. Please try again later.");
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };


    useEffect(() => {
        const loadSession = async () => {
            const stored_user_id = await AsyncStorage.getItem("user_id");
            const stored_otp_secret = await AsyncStorage.getItem("otp_secret");

            console.log("Fetched from client storage:", stored_user_id, stored_otp_secret);

            if (!stored_user_id || !stored_otp_secret) {
                Alert.alert("Session expired", "Please login again.");
                navigation.replace("Login");
                return;
            }

            setSession({
                user_id: stored_user_id,
                otp_secret: stored_otp_secret,
            });

            fetchClients(stored_user_id);
        };

        loadSession();
    }, []);


    const onRefresh = () => {
        setRefreshing(true);
        fetchClients(session.user_id);

    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <CustomHeader />

            <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                <TouchableOpacity
                    style={styles.purchaseButton}
                    onPress={() => navigation.navigate('AddClients')}
                >
                    <Text style={styles.purchaseButtonText}>{`👤  Add New Clients`}</Text>
                </TouchableOpacity>
            </Animatable.View>

            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 30 }} />
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[Colors.primary]}
                            tintColor={Colors.primary}
                            title="Refreshing..."
                            titleColor={Colors.primary}
                        />
                    }
                    contentContainerStyle={{ paddingBottom: 80 }}
                >
                    {clients && Array.isArray(clients) && clients.length > 0 ? (
                        clients.map((client, index) => (
                            <Animatable.View
                                key={index}
                                style={styles.clientItem}
                                animation="slideInUp"
                                duration={600}
                                easing="ease-in-circ"
                                delay={index * 200}
                            >
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('InfoClients', { client })}
                                    style={styles.cardDealerBody}
                                    activeOpacity={0.9}
                                >
                                    {/* Header */}
                                    <View style={styles.listCardHeader}>
                                        <Text style={[styles.listStatus, getStatusStyle(client?.status)]}>
                                            {capitalizeFirst(client?.status ?? '')}
                                        </Text>
                                        <Text style={styles.subcardId}>#ID: {client?.party_id ?? ''}</Text>
                                    </View>

                                    {/* Body */}
                                    <View style={styles.cardMiddle}>
                                        <Text style={styles.cardTitle}>Name: {capitalizeFirst(client?.owner_name ?? '')}</Text>
                                        <Text style={styles.cardTitle}>GSTIN: {client?.gst ?? ''}</Text>
                                    </View>

                                    {/* Footer */}
                                    <View style={styles.listCardFooter}>
                                        <Text style={styles.moreInfo}>More Info →</Text>
                                        <Image source={ImagePath.user} resizeMode="cover" style={styles.cardImage} />
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>
                        ))
                    ) : (
                        <View style={{ alignItems: 'center', marginTop: 40 }}>
                            <Text style={{ fontSize: 14, color: '#999' }}>
                                Add a new client to get started
                            </Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

export default ListClients;
