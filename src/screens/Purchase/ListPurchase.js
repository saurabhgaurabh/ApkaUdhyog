import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity, RefreshControl } from "react-native"
import { TextInput, Text, Card, Button, HelperText, Menu, IconButton, Modal, Pressable } from "react-native-paper"
import CustomHeader from "../../components/CustomeHeader"
import styles from "../../MainStyle"
import AddPurchaseItems from "./AddPurchaseItems"
import { useNavigation } from "@react-navigation/native"
import * as Animatable from 'react-native-animatable';
import Colors from "../../constants/color"
import { ServerUrl } from "../../services/ServerUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"


const ListPurchase = ({ items, handleDelete }) => {
    const navigation = useNavigation();
    const [purchaseItems, setPurchaseItems] = useState([]);
    const [menuVisibleId, setMenuVisibleId] = useState(null); // store the open menu's purchase_id
    const [menuVisible, setMenuVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState("");

    const toggleMenu = (id) => {
        setMenuVisibleId(menuVisibleId === id ? null : id);
    };
    const capitalizeFirst = (str) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const getStatusStyle = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'pending' || 'Pending': return { backgroundColor: '#FFF4E5', color: '#FF8C00' };
            case 'paid' || 'Paid': return { backgroundColor: '#E5F9E0', color: '#3BA55D' };
            case 'unpaid' || 'Unpaid': return { backgroundColor: '#FFE5E5', color: '#E63946' };
            default: return { backgroundColor: '#E0E7FF', color: '#3B5BDB' };
        }
    };

    const purchaseGetApi = async (uid) => {
        if (!refreshing) setLoading(true);
        if (!uid) {
            Alert.alert("Session Expired", "Please login again.");
            console.log("Missing session: user_id, otp_secret", uid);
            return;
        }
        try {
            const response = await fetch(`https://motion.patiramproduction.com/api/v1/motion-purchase-row-material-get?user_id=${uid}`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setPurchaseItems(data?.result);
            console.log(data, " ....purchaseItems")
        } catch (error) {
            Alert.alert("Error fetching purchase items:", error.message);
            console.error("Error fetching purchase items:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        };
    };

    useEffect(() => {
        const loadSession = async () => {
            const stored_user_id = await AsyncStorage.getItem("user_id");
            const stored_otp_secret = await AsyncStorage.getItem("otp_secret");

            console.log("list purchase :", stored_user_id, stored_otp_secret);

            if (!stored_user_id || !stored_otp_secret) {
                Alert.alert("Session expired", "Please login again.");
                navigation.replace("Login");
                return;
            }

            setSession({
                user_id: stored_user_id,
                otp_secret: stored_otp_secret,
            });

            purchaseGetApi(stored_user_id);
        };

        loadSession();
    }, []);
    const onRefresh = () => {
        setRefreshing(true);
        purchaseGetApi(session.user_id);

    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.screenBackground, }}>
            <CustomHeader />
            <Animatable.View animation="slideInRight" duration={800} easing="ease-in-circ" style={{ height: 65 }}>
                <TouchableOpacity style={styles.purchaseButton} onPress={() => navigation.navigate('AddPurchaseItems')}>
                    <Text style={styles.purchaseButtonText}>{`Add New Purchase`}</Text>
                </TouchableOpacity>
            </Animatable.View>
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[Colors.primary]}
                        tintColor={Colors.primary}
                        title="Refreshing..."
                        titleColor={Colors.primary}
                    />
                }>

                {purchaseItems && Array.isArray(purchaseItems) && purchaseItems?.length > 0 ? (
                    purchaseItems?.map((items, index) => (
                        <TouchableOpacity key={index} style={styles.purchaseCardBody} activeOpacity={0.9}>
                            <View style={styles.purchaseCardHeader}>
                                <Text style={[styles.status, getStatusStyle(items?.payment_status ? items?.payment_status : "unpaid")]}>
                                    {capitalizeFirst(items?.payment_status ? items?.payment_status : "unpaid")}
                                </Text>
                                <Menu
                                    visible={menuVisibleId === items.purchase_id}
                                    onDismiss={() => setMenuVisibleId(null)}
                                    anchor={
                                        <TouchableOpacity onPress={() => toggleMenu(items.purchase_id)}>
                                            <Text style={styles.dots}>⋮</Text>
                                        </TouchableOpacity>
                                    }
                                >
                                    {/* Edit Button */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            setMenuVisibleId(null);
                                            navigation.navigate("AddPurchaseItems", { purchaseData: items });
                                        }}
                                        style={{
                                            backgroundColor: '#E5F9E0',
                                            paddingVertical: 10,
                                            paddingHorizontal: 30,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 16 }}> Edit</Text>
                                    </TouchableOpacity>

                                    {/* Divider */}
                                    <View style={{ height: 1, backgroundColor: '#ddd', marginVertical: 2 }} />

                                    {/* Delete Button */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            setMenuVisibleId(null);
                                            handleDelete(items.purchase_id);
                                        }}
                                        style={{
                                            backgroundColor: '#FFEBEE',
                                            paddingVertical: 10,
                                            paddingHorizontal: 30,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{ color: '#E53935', fontWeight: 'bold', fontSize: 16 }}> Delete</Text>
                                    </TouchableOpacity>
                                </Menu>
                            </View>
                            <View style={styles.purchaseCardContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Name</Text>
                                    <Text style={styles.value}>{capitalizeFirst(items?.dealer_name)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Product</Text>
                                    <View style={{ marginLeft: 10 }}>
                                        {Array.isArray(items?.products) && items?.products?.length > 0 ? (
                                            items.products.map((prod, index) => (
                                                <Text key={index} style={{ color: "#555", marginVertical: 2 }}>
                                                    • {prod?.product_name} (Qty: {prod?.quantity}, ₹{prod?.total_amount})
                                                </Text>
                                            ))
                                        ) : (
                                            <Text style={{ color: "#777" }}>No products</Text>
                                        )}
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Total</Text>
                                    <Text style={styles.value}>{items?.total_amount}</Text>
                                </View>
                                <TouchableOpacity style={styles.row}
                                    onPress={() => {
                                        navigation.navigate("ViewPurchase", { purchaseData: items });
                                    }}>
                                    <Text></Text>
                                    <Text style={[styles.value, { color: Colors.primary, fontWeight: 'bold' }]}>More Info</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#999', marginTop: 10 }}>
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}



export default ListPurchase
