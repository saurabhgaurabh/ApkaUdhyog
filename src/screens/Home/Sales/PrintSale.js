import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity } from "react-native";
import { Card, Divider } from "react-native-paper";
import Colors from "../../../constants/color";
import { useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import SubHeader from "../../../components/SubHeader";

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
            const response = await fetch(`https://30e48ae68ae9.ngrok-free.app/api/users/v1/motion-sales-get`);
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

    const generateInvoiceNumber = (name, total) => {
        const prefix = name ? name.substring(0, 4).toUpperCase() : "CUST";
        const date = new Date();
        const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
        const number = `${prefix}${Math.floor(total)}-${dateStr}`;
        setInvoiceNumber(number);
    };

    const handleDownloadInvoice = async () => {
        if (!saleData) return;

        const htmlContent = `
            <h1>PATIRAM PRODUCTION</h1>
            <p>Invoice #: ${invoiceNumber}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
            <hr/>
            <h3>Customer Info</h3>
            <p>Name: ${saleData.customer_name}</p>
            <p>Company: ${saleData.company || "-"}</p>
            <p>Payment Status: ${saleData.payment_status}</p>
            <hr/>
            <h3>Products</h3>
            <p>${saleData.product_name} | Qty: ${saleData.quantity} | Price: ₹${saleData.price} | Total: ₹${saleData.total_amount}</p>
            <hr/>
            <h3>Summary</h3>
            <p>Total: ₹${saleData.total_amount}</p>
            <p>Due: ₹${saleData.due_amount}</p>
        `;
        try {
            const options = {
                html: htmlContent,
                fileName: invoiceNumber,
                directory: 'Documents',
            };
            const file = await RNHTMLtoPDF.convert(options);
            ToastAndroid.show(`Invoice saved: ${file.filePath}`, ToastAndroid.LONG);
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Failed to generate invoice", ToastAndroid.SHORT);
        }
    };

    const handleShareInvoice = async () => {
        if (!saleData) return;

        const shareOptions = {
            title: 'Share Invoice',
            message: `Invoice #: ${invoiceNumber}\nCustomer: ${saleData.customer_name}\nTotal: ₹${saleData.total_amount}`,
        };
        try {
            await Share.open(shareOptions);
        } catch (error) {
            console.log(error);
        }
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
            case "paid":
                return "#3BA55D"; // green
            case "unpaid":
                return "#E63946"; // red
            default:
                return Colors.primary; // primary color for others
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
                            <Text style={[styles.tableCell, { flex: 1 }]}>Product</Text>
                            <Text style={styles.tableCell}>Qty</Text>
                            <Text style={styles.tableCell}>Price</Text>
                            <Text style={styles.tableCell}>Total</Text>
                        </View>
                        <Divider style={{ marginVertical: 5 }} />
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCellData, { flex: 1 }]}>{saleData.product_name}</Text>
                            <Text style={styles.tableCellData}>{saleData.quantity}</Text>
                            <Text style={styles.tableCellData}>₹{saleData.price}</Text>
                            <Text style={styles.tableCellData}>₹{saleData.total_amount}</Text>
                        </View>

                        <Divider style={{ marginVertical: 10 }} />

                        <Text style={styles.section}>Invoice Summary</Text>
                        <Text>Total Amount: ₹{saleData.total_amount}</Text>
                        <Text>Due Amount: ₹{saleData.due_amount}</Text>
                        <Text style={{ color: getPaymentStatusColor(saleData.payment_status), fontWeight: 'bold' }}>
                            Payment Status: {saleData.payment_status}
                        </Text>
                    </Card.Content>
                </Card>
            </ScrollView>

            {/* Buttons fixed at bottom */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={handleDownloadInvoice}>
                    <Text style={styles.buttonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: Colors.secondary }]} onPress={handleShareInvoice}>
                    <Text style={styles.buttonText}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    tableHeader: { flexDirection: "row", marginVertical: 5 },
    tableRow: { flexDirection: "row", marginVertical: 5 },
    tableCell: { flex: 1, textAlign: "justify", fontWeight: 700 },
    tableCellData: { flex: 1, textAlign: "justify", },
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
