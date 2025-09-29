import { View, Text, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../../../components/CustomeHeader'
import styles from '../../../MainStyle'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import ImagePath from '../../../constants/ImagePath'


const ListClients = () => {
    const navigation = useNavigation();
    const [clients, setClients] = useState([]);
    const capitalizeFirst = (str) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const fetchClients = async () => {
        try {
            const response = await fetch("https://cdeed6ab33c1.ngrok-free.app/api/users/v1/motion-parties-registration-get");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setClients(data.result.result);
            // console.log("Fetched clients:", data.result.result);
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
            <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
                <CustomHeader />
                <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                    <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddClients')}>
                        <Text style={styles.purchaseButtonText}>{`👤  Add New Clients`}</Text>
                    </TouchableOpacity>
                </Animatable.View>
                {clients && Array.isArray(clients) && clients?.length > 0 ? (
                    clients?.map((client, index) => (
                        // Animate each list item from bottom to top one by one with staggered delay
                        // animation="slideInUp" makes the item slide in from the bottom
                        // delay={index * 200} adds a 200ms delay per item index to animate sequentially
                        <Animatable.View key={index} style={styles.clientItem} animation="slideInUp" duration={600} easing="ease-in-circ" delay={index * 200}>
                            <TouchableOpacity onPress={() => navigation.navigate('InfoClients', { client })} style={styles.cardDealerBody} >
                                <View style={styles.listCardBody}>
                                    <Text style={styles.listStatus}>{capitalizeFirst(client?.status)}</Text>
                                    <Text style={styles.subcardText}>#{client?.party_id}</Text>
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={styles.cardText}>{capitalizeFirst(client?.owner_name)}</Text>
                                    <Text style={styles.subcardText}>GSTIN: {client.gst}</Text>
                                </View>

                                <View style={styles.listCardBody}>
                                    <View style={{ marginTop: 40 }}>
                                        <Text style={styles.subcardText}>More Info</Text>
                                    </View>
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
