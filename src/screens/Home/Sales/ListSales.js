import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator,
    Image,
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


const ListSales = () => {
    const navigation = useNavigation();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch sales from API
    const getSales = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://30e48ae68ae9.ngrok-free.app/api/users/v1/motion-sales-get`
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
        }
    };

    useEffect(() => {
        getSales();
    }, []);

    const getStatusStyle = (status) => {
        switch ((status || "").toLowerCase()) {
            case "paid":
                return { backgroundColor: "#E5F9E0", color: "#3BA55D" };
            case "unpaid":
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

                <Text style={{ marginTop: 4, color: "#555" }}>Company: {item.company || "-"}</Text>
                <Text style={{ marginTop: 2, color: "#555" }}>
                    Products: {item.product_name || "-"}
                </Text>
                <Text style={{ marginTop: 2, color: "#555" }}>
                    Total Amount: ₹{item.total_amount || "0.00"}
                </Text>
                <Text style={{ marginTop: 2, color: "#555" }}>
                    Due Amount: ₹{item.due_amount || "0.00"}
                </Text>

                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 8, alignItems: 'baseline', gap: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.PRINTSALE)}>
                        <Image source={ImagePath.receipt} resizeMode="cover" style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>

                    <TouchableOpacity>
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
                    keyExtractor={(item, index) => item.sale_id?.toString() || index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 10 }}
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
