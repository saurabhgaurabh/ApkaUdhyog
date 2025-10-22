import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, Platform, PermissionsAndroid, Linking, Alert } from "react-native";
import { Card, Divider } from "react-native-paper";
import Colors from "../../../constants/color";
import { useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';
import SubHeader from "../../../components/SubHeader";
import RNFS from 'react-native-fs'
import { ServerUrl } from "../../../services/ServerUrl";



const InvoiceScreen = () => {
    const route = useRoute();
    const { saleId } = route.params;
    const [saleData, setSaleData] = useState(null);
    const [invoiceNumber, setInvoiceNumber] = useState("");

    useEffect(() => {
        fetchInvoiceData();
    }, []);

    const fetchInvoiceData = async () => {
        try {
            const response = await fetch(`https://motion.patiramproduction.com/api/v1/motion-sales-get`);
            const result = await response.json();
            if (result.status) {
                const sale = result.result?.result.find((s) => s.sale_id == saleId);
                if (sale) {
                    setSaleData(sale);
                    generateInvoiceNumber(sale.customer_name, sale.total_amount);
                } else {
                    ToastAndroid.show("Invoice not found", ToastAndroid.SHORT);
                }
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Failed to fetch invoice data", ToastAndroid.SHORT);
        }
    };

    const generateInvoiceNumber = (name) => {
        const prefix = name ? name.toUpperCase().replace(/\s+/g, '') : "CUST"; // remove spaces
        const date = new Date();
        const dateStr = `${date.getFullYear()}${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;

        const number = `${prefix}-${dateStr}`;
        setInvoiceNumber(number);
    };


    if (!saleData) {
        return (
            <View style={styles.center}>
                <Text>Loading invoice...</Text>
            </View>
        );
    }
    const getPaymentStatusColor = (status) => {
        switch ((status || "").toLowerCase()) {
            case "Paid" || "paid":
                return "#3BA55D"; // green
            case "Unpaid" || "unpaid":
                return "#E63946"; // red
            default:
                return Colors.primary; // primary color for others
        }
    };





    const shareInvoice = async () => {
        const pdfPath = await generateInvoicePdf(saleData, invoiceNumber);
        if (pdfPath) {
            await sharePdf(pdfPath);
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: Colors.screenBackground }}>
            <SubHeader title="Invoice" />
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.companyName}>PATIRAM PRODUCTION</Text>
                        <Text style={styles.companyDetails}>Invoice #: {invoiceNumber}</Text>
                        <Text style={styles.companyDetails}>Date: {new Date().toLocaleDateString()}</Text>

                        <Divider style={{ marginVertical: 10 }} />

                        <Text style={styles.section}>Customer Info</Text>
                        <Text>Name: {saleData.customer_name}</Text>
                        <Text>Company: {saleData.company || "-"}</Text>
                        <Text style={{ color: getPaymentStatusColor(saleData.payment_status), fontWeight: 'bold' }}>
                            Payment Status: {saleData.payment_status}
                        </Text>

                        <Divider style={{ marginVertical: 10 }} />

                        <Text style={styles.section}>Product Details</Text>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableCell, { flex: 1.5 }]}>Product</Text>
                            <Text style={styles.tableCell}>Qty</Text>
                            <Text style={styles.tableCell}>Price</Text>
                            <Text style={styles.tableCell}>Total</Text>
                        </View>
                        <Divider style={{ marginVertical: 5 }} />

                        {Array.isArray(saleData.products) && saleData.products.length > 0 ? (
                            saleData.products.map((prod, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCellData, { flex: 1.5 }]}>{prod.product_name}</Text>
                                    <Text style={styles.tableCellData}>{prod.quantity}</Text>
                                    <Text style={styles.tableCellData}>₹{prod.price}</Text>
                                    <Text style={styles.tableCellData}>₹{prod.total_amount}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={{ color: "#999", marginVertical: 5 }}>No products found</Text>
                        )}

                        <Divider style={{ marginVertical: 10 }} />

                        <Text style={styles.section}>Invoice Summary</Text>
                        <Text style={{ marginTop: 2, color: "#555" }}>
                            Grand Total: ₹ {saleData?.grand_total || "0.00"}
                        </Text>

                        <Text>Due Amount: ₹{saleData.due_amount || " 0.00"}</Text>
                        <Text style={{ color: getPaymentStatusColor(saleData.payment_status), fontWeight: 'bold' }}>
                            Payment Status: {saleData.payment_status}
                        </Text>
                    </Card.Content>
                </Card>
            </ScrollView>

            {/* Buttons fixed at bottom */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={{}}>
                    <Text style={styles.buttonText}>Download</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: Colors.secondary }]}
                    onPress={shareInvoice}>
                    <Text style={styles.buttonText}>Share</Text>
                </TouchableOpacity>
            </View>


        </View >
    );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    card: { marginVertical: 8, padding: 15, borderRadius: 12, backgroundColor: "#fff", top: 20 },
    companyName: { fontSize: 20, fontWeight: "bold", color: Colors.primary },
    companyDetails: { fontSize: 14, color: "#555" },
    section: { fontWeight: "bold", fontSize: 16, marginVertical: 5 },
    tableHeader: { flexDirection: "row", backgroundColor: "#bff1c2ff", paddingVertical: 5 },
    tableRow: { flexDirection: "row", marginVertical: 3 },
    tableCell: { flex: 1, textAlign: "center", fontWeight: "600", color: "#4CAF50" },
    tableCellData: { flex: 1, textAlign: "center", color: "#333" },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: "#f3f4f6",
        borderTopWidth: 1,
        borderColor: "#ccc",
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: Colors.primary,
        gap: 5,
    },
    buttonText: { color: "#fff", fontWeight: "bold", marginLeft: 5 },
});
