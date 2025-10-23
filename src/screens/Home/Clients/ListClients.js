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
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import ImagePath from '../../../constants/ImagePath';
import Colors from '../../../constants/color';

const ListClients = () => {
    const navigation = useNavigation();
    const [clients, setClients] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    // 🔠 Capitalize function
    const capitalizeFirst = (str) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // 🎨 Status colors
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

    // 📦 Fetch Clients
    const fetchClients = async () => {
        try {
            if (!refreshing) setLoading(true);
            const response = await fetch(`https://motion.patiramproduction.com/api/v1/motion-parties-registration-get`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setClients(data?.result || []);
            console.log("Fetched clients:", data?.result);
        } catch (err) {
            console.error("API error:", err);
            Alert.alert("Error", "Failed to load clients.");
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    // 🔄 Pull to refresh handler
    const onRefresh = () => {
        setRefreshing(true);
        fetchClients();
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
