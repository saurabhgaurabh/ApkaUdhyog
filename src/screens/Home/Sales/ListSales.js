import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator,
    Image, RefreshControl,
    Alert
} from "react-native";
import { Card } from "react-native-paper";
import styles from "../../../MainStyle";
import Colors from "../../../constants/color";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../../components/CustomeHeader";
import * as Animatable from "react-native-animatable";
import ImagePath from "../../../constants/ImagePath";
import NavigationStrings from "../../../constants/NavigationStrings";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ListSales = () => {
    const navigation = useNavigation();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [session, setSession] = useState({ user_id: null, otp_secret: null });

    useEffect(() => {
        const loadSession = async () => {
            const stored_user_id = await AsyncStorage.getItem("user_id");
            const stored_otp_secret = await AsyncStorage.getItem("otp_secret");

            if (!stored_user_id || !stored_otp_secret) {
                Alert.alert("Session expired", "Please login again.");
                navigation.replace("Login");
                return;
            }

            setSession({
                user_id: stored_user_id,
                otp_secret: stored_otp_secret,
            });

            getSales(stored_user_id);
        };

        loadSession();
    }, []);


    const getSales = async (uid) => {
        try {
            if (!refreshing) setLoading(true);
            if (!uid) {
                Alert.alert("Session Expired", "Please login again.");
                return;
            }

            const response = await fetch(
                "https://motion.patiramproduction.com/api/v1/motion-sales-get",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ user_id: uid }),
                }
            );

            const result = await response.json();

            if (result.status === true) {

                // Convert products string → array
                const cleaned = (result?.result || []).map(item => {
                    if (typeof item.products === "string") {
                        try {
                            item.products = JSON.parse(item.products);
                        } catch (error) {
                            console.log("JSON Parse Error:", error);
                            item.products = [];
                        }
                    }
                    return item;
                });

                setSales(cleaned);
            }
            else {
                ToastAndroid.show("Failed to fetch sales: " + (result.message || ""), ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("Error fetching sales:", error);
            ToastAndroid.show("Failed to fetch sales.", ToastAndroid.SHORT);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    const onRefresh = () => {
        setRefreshing(true);
        getSales(session.user_id);
    };

    const getStatusStyle = (status) => {
        switch ((status || "").toUpperCase()) {
            case "Paid":
                return { backgroundColor: "#E5F9E0", color: "#3BA55D" };
            case "Unpaid":
                return { backgroundColor: "#FFE5E5", color: "#E63946" };
            default:
                return { backgroundColor: "#E0E7FF", color: "#3B5BDB" };
        }
    };

    const renderSaleItem = ({ item }) => (
        <Animatable.View animation="slideInUp" duration={500} style={{ marginBottom: 12 }}>
            <Card style={{ marginHorizontal: 10, borderRadius: 10, padding: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.customer_name}</Text>
                    <Text
                        style={{
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: "bold",
                            ...getStatusStyle(item.payment_status),
                        }}
                    >
                        {item.payment_status || "Pending"}
                    </Text>
                </View>

                <Text style={{ marginTop: 4, color: "#555" }}>Company: {item?.company || "-"}</Text>
                <View style={{ marginTop: 4 }}>
                    <Text style={{ fontWeight: "bold", color: "#444" }}>Products:</Text>
                    {Array.isArray(item.products) && item.products.length > 0 ? (
                        item.products.map((prod, index) => (
                            <Text key={index} style={{ color: "#555", marginLeft: 10 }}>
                                • {prod.product_name} (Qty: {prod.quantity}, ₹{prod.total_amount})
                            </Text>
                        ))
                    ) : (
                        <Text style={{ color: "#777", marginLeft: 10 }}>No products</Text>
                    )}
                </View>

                <Text style={{ marginTop: 2, color: "#555" }}>
                    Grand Total: ₹{item?.grand_total || "0.00"}
                </Text>

                <Text style={{ marginTop: 2, color: "#555" }}>
                    Due Amount: ₹{item?.due_amount || " 0.00"}
                </Text>

                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 8, alignItems: 'baseline', gap: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.PRINTSALE, { saleId: item?.sale_id })}>
                        <Image source={ImagePath.receipt} resizeMode="cover" style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.VIEWSALES, { saleId: item?.sale_id })}>
                        <Image source={ImagePath.view} resizeMode="cover" style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={ImagePath.delete} resizeMode="cover" style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>

                </View>
            </Card>
        </Animatable.View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: Colors.screenBackground }}>
            <CustomHeader />
            <Animatable.View
                animation="slideInRight"
                duration={800}
                easing="ease-in-circ"
                style={{ height: 65, justifyContent: "center", paddingHorizontal: 10 }}
            >
                <TouchableOpacity
                    style={styles.purchaseButton}
                    onPress={() => navigation.navigate("AddSales")}
                >
                    <Text style={styles.purchaseButtonText}>Add New Sale</Text>
                </TouchableOpacity>
            </Animatable.View>

            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            ) : sales.length > 0 ? (
                <FlatList
                    data={sales}
                    renderItem={renderSaleItem}
                    keyExtractor={(item, index) => item?.sale_id?.toString() || index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 10 }}
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
                />
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 16, color: "#555" }}>No sales found.</Text>
                </View>
            )}
        </View>
    );
};

export default ListSales;
