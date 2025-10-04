import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from "react-native"
import { TextInput, Text, Card, Button, HelperText, Menu, IconButton, Modal, Pressable } from "react-native-paper"
import CustomHeader from "../../components/CustomeHeader"
import styles from "../../MainStyle"
import AddPurchaseItems from "./AddPurchaseItems"
import { useNavigation } from "@react-navigation/native"
import * as Animatable from 'react-native-animatable';
import Colors from "../../constants/color"


const PurchaseItems = ({ items, handleDelete }) => {
    const navigation = useNavigation();
    const [purchaseItems, setPurchaseItems] = useState([]);
    const [menuVisibleId, setMenuVisibleId] = useState(null); // store the open menu's purchase_id
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = (id) => {
        setMenuVisibleId(menuVisibleId === id ? null : id);
    };
    const capitalizeFirst = (str) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const getStatusStyle = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'pending':
                return { backgroundColor: '#FFF4E5', color: '#FF8C00' };
            case 'approved':
                return { backgroundColor: '#E5F9E0', color: '#3BA55D' };
            case 'rejected':
                return { backgroundColor: '#FFE5E5', color: '#E63946' };
            default:
                return { backgroundColor: '#E0E7FF', color: '#3B5BDB' };
        }
    }

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
                        <TouchableOpacity key={index} style={styles.purchaseCardBody} activeOpacity={0.9}>
                            <View style={styles.purchaseCardHeader}>
                                <Text style={[styles.status, getStatusStyle(items?.status)]}>
                                    {capitalizeFirst(items?.status)}
                                </Text>
                                <TouchableOpacity onPress={toggleMenu}>
                                    <Text style={styles.dots}>⋮</Text>
                                </TouchableOpacity>
                            </View>
                            <Modal
                                visible={menuVisible}
                                transparent
                                animationType="fade"
                                onRequestClose={() => setMenuVisible(false)}>
                                <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
                                    <View style={styles.menuBox}>
                                        <TouchableOpacity
                                            style={styles.menuItem}
                                            onPress={() => {
                                                setMenuVisible(false);
                                                handleDelete(items?.purchase_id);
                                            }}>
                                            <Text style={styles.menuText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Pressable>
                            </Modal>

                            <View style={styles.purchaseCardContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Name</Text>
                                    <Text style={styles.value}>{capitalizeFirst(items?.dealer_name)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Material Type</Text>
                                    <Text style={styles.value}>{capitalizeFirst(items?.material_type)}</Text>
                                </View>
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
