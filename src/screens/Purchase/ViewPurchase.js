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
                        <Text style={[styles.status, getStatusStyle(purchaseData?.payment_status ? purchaseData?.payment_status : "unpaid")]}>
                            {purchaseData?.payment_status ? purchaseData?.payment_status : "unpaid"}
                        </Text>
                        <Text style={[styles.status,]}> # Purchase </Text>
                    </View>

                    <View style={styles.purchaseCardContent}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Status</Text>
                            <Text style={[styles.value, { color: Colors.primary }]}>
                                {purchaseData?.status ? purchaseData?.status : "Active"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Dealer Name</Text>
                            <Text style={styles.value}>{purchaseData?.dealer_name ? purchaseData?.dealer_name : "N/A"}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Country</Text>
                            <Text style={styles.value}>{purchaseData?.country ? purchaseData?.country : "N/A"} </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>State</Text>
                            <Text style={styles.value}>{purchaseData?.state ? purchaseData?.state : "N/A"} </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>City</Text>
                            <Text style={styles.value}>{purchaseData?.city ? purchaseData?.city : "N/A"} </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Address</Text>
                            <Text style={styles.value}>{purchaseData?.address ? purchaseData?.address : "N/A"} </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Postal Code</Text>
                            <Text style={styles.value}> {purchaseData?.postal_code ? purchaseData?.postal_code : "N/A"} </Text>
                        </View>
                        <Divider style={{ marginVertical: 8 }} />
                        <Text style={[styles.label, { fontWeight: "bold", marginBottom: 6 }]}>Products:</Text>
                        {Array.isArray(purchaseData?.products) && purchaseData?.products?.length > 0 ? (
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
                                ₹{purchaseData?.freight ? purchaseData?.freight : "N/A"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Pending Amount</Text>
                            <Text style={[styles.value, { color: "#E63946" }]}>
                                ₹{purchaseData?.material_amount_pending ? purchaseData?.material_amount_pending : "N/A"}
                            </Text>
                        </View>
                        <Divider style={{ marginVertical: 8 }} />
                        <View style={styles.row}>
                            <Text style={styles.label}>Total Amount</Text>
                            <Text style={[styles.value, { fontWeight: "bold", color: Colors.primary }]}>
                                ₹{(
                                    (Number(purchaseData?.total_amount || 0) -
                                        Number(purchaseData?.material_amount || 0) +
                                        Number(purchaseData?.freight || 0))
                                ).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
};

export default ViewPurchase;
