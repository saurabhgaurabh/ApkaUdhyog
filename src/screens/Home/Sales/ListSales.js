import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator,
    Image, RefreshControl
} from "react-native";
import { Card, IconButton } from "react-native-paper";
import styles from "../../../MainStyle";
import Colors from "../../../constants/color";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../../components/CustomeHeader";
import * as Animatable from "react-native-animatable";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePath from "../../../constants/ImagePath";
import NavigationStrings from "../../../constants/NavigationStrings";
import { ServerUrl } from "../../../services/ServerUrl";


const ListSales = () => {
    const navigation = useNavigation();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch sales from API
    const getSales = async () => {
        setLoading(true);
        try {
            if (!refreshing) setLoading(true);
            const response = await fetch(
                `https://motion.patiramproduction.com/api/v1/motion-sales-get`
            );
            const result = await response.json();
            console.log(result?.result?.result, "fetched sales");
            if (result.status === true) {
                setSales(result?.result?.result || []);
            } else {
                ToastAndroid.show("Failed to fetch sales.", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("Error fetching sales:", error);
            ToastAndroid.show("Failed to fetch sales.", ToastAndroid.SHORT);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        getSales();
    }, []);

    // 🔄 Pull to refresh handler
    const onRefresh = () => {
        setRefreshing(true);
        getSales();
    };

    const getStatusStyle = (status) => {
        switch ((status || "").toLowerCase()) {
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
