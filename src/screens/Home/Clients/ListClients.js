import { View, Text, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../../../components/CustomeHeader'
import styles from '../../../MainStyle'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import ImagePath from '../../../constants/ImagePath'
import Colors from '../../../constants/color'


const ListClients = () => {
    const navigation = useNavigation();
    const [clients, setClients] = useState([]);
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
    }


    const fetchClients = async () => {
        try {
            const response = await fetch("https://a40f5f24c80d.ngrok-free.app/api/users/v1/motion-parties-registration-get");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setClients(data.result.result);
            console.log("Fetched clients:", data.result.result);
        } catch (err) {
            console.error("API error:", err);
            Alert.alert(err);
        }
    };
    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: Colors.background, }}>
                <CustomHeader />
                <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                    <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddClients')}>
                        <Text style={styles.purchaseButtonText}>{`👤  Add New Clients`}</Text>
                    </TouchableOpacity>
                </Animatable.View>
                {clients && Array.isArray(clients) && clients?.length > 0 ? (
                    clients?.map((client, index) => (
                        <Animatable.View key={index} style={styles.clientItem} animation="slideInUp" duration={600} easing="ease-in-circ" delay={index * 200}>
                            <TouchableOpacity onPress={() => navigation.navigate('InfoClients', { client })} style={styles.cardDealerBody} >
                                {/* Top Row - Status + Dealer ID */}
                                <View style={styles.listCardHeader}>
                                    <Text style={[styles.listStatus, getStatusStyle(client?.status)]}>
                                        {capitalizeFirst(client?.status ?? '')}
                                    </Text>
                                    <Text style={styles.subcardId}>#{client?.party_id ?? ''}</Text>
                                </View>

                                {/* Middle Section - Dealer Name + GST */}
                                <View style={styles.cardMiddle}>
                                    <Text style={styles.cardTitle}>Name: {capitalizeFirst(client?.owner_name ?? '')}</Text>
                                    <Text style={styles.cardTitle}>GSTIN: {client?.gst ?? ''}</Text>
                                </View>

                                {/* Bottom Row - More Info + Image */}
                                <View style={styles.listCardFooter}>
                                    <Text style={styles.moreInfo}>More Info →</Text>
                                    <Image source={ImagePath.user} resizeMode="cover" style={styles.cardImage} />
                                </View>
                            </TouchableOpacity>

                        </Animatable.View>
                    ))
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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
