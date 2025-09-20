import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../../../components/CustomeHeader'
import styles from '../../../MainStyle'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import ImagePath from '../../../constants/ImagePath'


const ListClients = () => {
    const navigation = useNavigation();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const capitalizeFirst = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const fetchClients = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://514bcc3e1c37.ngrok-free.app/api/users/v1/motion-parties-registration-get");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setClients(data.result.result);  // save response in state
            setError(null);
        } catch (err) {
            console.error("API error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
                <CustomHeader />
                <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                    <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddClients')}>
                        <Text style={styles.purchaseButtonText}>{`👤  Add New Clients`}</Text>
                    </TouchableOpacity>
                </Animatable.View>
                {loading ? (
                    <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
                ) : error ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'red' }}>Error: {error}</Text>
                    </View>
                ) : clients && Array.isArray(clients) && clients.length > 0 ? (
                    clients.map((client, index) => (
                        <View key={index} style={styles.clientItem}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('InfoClients', { client })}
                                style={styles.cardDealerBody}
                            >
                                <View style={styles.listCardBody}>
                                    <Text style={styles.listStatus}>{capitalizeFirst(client.status)}</Text>
                                    <Text style={styles.subcardText}>#{client.party_id}</Text>
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={styles.cardText}>{capitalizeFirst(client.owner_name)}</Text>
                                    <Text style={styles.subcardText}>GSTIN: {client.gst}</Text>
                                </View>

                                <View style={styles.listCardBody}>
                                    <View style={{ marginTop: 40 }}>
                                        <Text style={styles.subcardText}>More Info</Text>
                                    </View>
                                    <Image source={ImagePath.user} resizeMode="cover" style={styles.cardImage} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#666' }}>
                            No clients found
                        </Text>
                        <Text style={{ fontSize: 14, color: '#999', marginTop: 10 }}>
                            Add a new client to get started
                        </Text>
                    </View>
                )}
            </View>
        </>
    )
}

export default ListClients
