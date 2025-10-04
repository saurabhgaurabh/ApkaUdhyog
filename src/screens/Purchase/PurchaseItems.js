import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from "react-native"
import { TextInput, Text, Card, Button, HelperText } from "react-native-paper"
import CustomHeader from "../../components/CustomeHeader"
import styles from "../../MainStyle"
import AddPurchaseItems from "./AddPurchaseItems"
import { useNavigation } from "@react-navigation/native"
import * as Animatable from 'react-native-animatable';
import Colors from "../../constants/color"


const PurchaseItems = () => {
    const navigation = useNavigation();
    const [purchaseItems, setPurchaseItems] = useState([]);

    const purchaseGetApi = async () => {
        try {
            const response = await fetch("https://a40f5f24c80d.ngrok-free.app/api/users/v1/motion-purchase-row-material-get", {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setPurchaseItems(data.result.data);
            console.log("Purchase items data:", data.result.data);
            console.log(purchaseItems, " new data");
        } catch (error) {
            Alert.alert("Error fetching purchase items:", error.message);
            console.error("Error fetching purchase items:", error);
        };
    };

    useEffect(() => {
        purchaseGetApi();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#DCEDC8', }}>
            <CustomHeader />
            <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddPurchaseItems')}>
                    <Text style={styles.purchaseButtonText}>{`Add New Purchase`}</Text>
                </TouchableOpacity>
            </Animatable.View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {purchaseItems && Array.isArray(purchaseItems) && purchaseItems?.length > 0 ? (
                    purchaseItems?.map((items, index) => (
                        <TouchableOpacity key={index} style={styles.purchaseCardBody}>
                            <View style={styles.purchaseCard}>
                                <Text style={styles.subcardText}>Status</Text>
                                <Text style={styles.subcardText}>ID: {items?.purchase_id}</Text>
                            </View>
                            <View style={styles.purchaseCard}>
                                <Text style={styles.subcardText}>Name</Text>
                                <Text style={styles.subcardText}>{items?.dealer_name}</Text>
                            </View>
                            <View style={styles.purchaseCard}>
                                <Text style={styles.subcardText}>Material Type</Text>
                                <Text style={styles.subcardText}>{items?.material_type}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ fontSize: 14, color: '#999', marginTop: 10 }}>
                            Add a new client to get started
                        </Text>
                    </View>
                )}

            </ScrollView>

        </View>
    )
}



export default PurchaseItems
