import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Card, Divider } from "react-native-paper";
import SubHeader from "../../components/SubHeader";
import styles from "../../MainStyle";
import Colors from "../../constants/color";
import { useRoute } from "@react-navigation/native";

const ViewPurchase = () => {
    const route = useRoute();
    const { purchaseData } = route.params || {};

    if (!purchaseData) {
        return (
            <View style={[styles.container, { alignItems: "center", justifyContent: "center" }]}>
                <Text style={{ color: "#777" }}>No purchase data available.</Text>
            </View>
        );
    }

    const getStatusStyle = (status) => {
        switch ((status || "").toLowerCase()) {
            case "paid": return { backgroundColor: "#E5F9E0", color: "#3BA55D" };
            case "pending": return { backgroundColor: "#FFF4E5", color: "#FF8C00" };
            case "unpaid": return { backgroundColor: "#FFE5E5", color: "#E63946" };
            default: return { backgroundColor: "#E0E7FF", color: "#3B5BDB" };
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.screenBackground }}>
            <SubHeader title="Purchase Info" />

            <ScrollView style={{ padding: 10, top: 20 }} showsVerticalScrollIndicator={false}>
                <Card style={styles.purchaseCardBody}>
                    <View style={styles.purchaseCardHeader}>
                        <Text style={[styles.status, getStatusStyle(purchaseData?.payment_status)]}>
                            {purchaseData?.payment_status}
                        </Text>
                    </View>

                    <View style={styles.purchaseCardContent}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Status</Text>
                            <Text style={[styles.value, { color: Colors.primary }]}>
                                {purchaseData?.status || "Active"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Dealer Name</Text>
                            <Text style={styles.value}>{purchaseData?.dealer_name}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Address</Text>
                            <Text style={styles.value}>
                                {purchaseData?.address}, {purchaseData?.city}, {purchaseData?.state},{" "}
                                {purchaseData?.country} - {purchaseData?.postal_code}
                            </Text>
                        </View>
                        <Divider style={{ marginVertical: 8 }} />
                        <Text style={[styles.label, { fontWeight: "bold", marginBottom: 6 }]}>Products:</Text>
                        {Array.isArray(purchaseData.products) && purchaseData.products.length > 0 ? (
                            purchaseData.products.map((prod, index) => (
                                <View key={index} style={styles.row}>
                                    <Text style={styles.value}>
                                        • {prod?.product_name} (Qty: {prod?.quantity})
                                    </Text>
                                    <Text style={[styles.value, { color: Colors.primary }]}>
                                        ₹{prod?.total_amount}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <Text style={[styles.value, { color: "#777" }]}>No products available</Text>
                        )}
                        <Divider style={{ marginVertical: 8 }} />
                        <View style={styles.row}>
                            <Text style={styles.label}>Paid Amount</Text>
                            <Text style={[styles.value, { color: Colors.primary }]}>
                                ₹{purchaseData?.material_amount}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Freight</Text>
                            <Text style={[styles.value, { color: Colors.primary }]}>
                                ₹{purchaseData?.freight}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Pending Amount</Text>
                            <Text style={[styles.value, { color: "#E63946" }]}>
                                ₹{purchaseData?.material_amount_pending}
                            </Text>
                        </View>
                         <Divider style={{ marginVertical: 8 }} />
                        <View style={styles.row}>
                            <Text style={styles.label}>Total Amount</Text>
                            <Text style={[styles.value, { fontWeight: "bold", color: Colors.primary }]}>
                                ₹{purchaseData?.total_amount - purchaseData?.material_amount}.00
                            </Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
};

export default ViewPurchase;
