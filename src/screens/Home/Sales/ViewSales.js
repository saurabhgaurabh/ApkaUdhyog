import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
import SubHeader from '../../../components/SubHeader';
import { useRoute } from '@react-navigation/native';
import styles from '../../../MainStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ViewSales = () => {
    const route = useRoute();
    const { saleId } = route.params;
    const [salesData, setSalesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [invoiceNumber, setInvoiceNumber] = useState("");

    const fetchSales = async () => {
        try {
            setLoading(true);
            const user_id = await AsyncStorage.getItem("user_id");

            const response = await fetch(
                `https://motion.patiramproduction.com/api/v1/motion-sales-get?user_id=${user_id}`,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user_id: user_id }),
                }
            );

            const result = await response.json();

            if (result.status) {

                let sale = result?.result?.find((s) => s.sale_id == saleId);

                if (sale) {

                    // ⭐ FIX: Convert products to array
                    if (typeof sale.products === "string") {
                        try {
                            sale.products = JSON.parse(sale.products);
                        } catch (e) {
                            Alert.alert(`Data Error", "Failed to parse product data.${e}`);
                            sale.products = [];
                        }
                    }

                    setSalesData(sale);

                    generateInvoiceNumber(sale.customer_name, sale.total_amount);

                } else {
                    ToastAndroid.show("Invoice not found", ToastAndroid.SHORT);
                }
            }

        } catch (error) {
            ToastAndroid.show(`Failed to fetch invoice data.${error.message}`, ToastAndroid.SHORT);
            setInvoiceNumber(generateInvoiceNumber());
        } finally {
            setLoading(false);
        }
    };

    const generateInvoiceNumber = (name) => {
        const prefix = name ? name.toUpperCase().replace(/\s+/g, '') : "CUST";
        const date = new Date();
        const dateStr = `${date.getFullYear()}${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;

        const number = `${prefix}-${dateStr}`;
        setInvoiceNumber(number);
    };
    useEffect(() => {
        fetchSales();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#1E3A8A" />
            </View>
        );
    }

    if (!salesData) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No sales data available</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <SubHeader title="Invoice Information" />

            <ScrollView style={styles.viewcontainer}>
                {/* Invoice Info */}
                <View style={styles.viewinfoContainer}>
                    <Text style={styles.viewinfoText}><Text style={styles.bold}>Invoice: </Text>{invoiceNumber}</Text>
                    <Text style={styles.viewinfoText}><Text style={styles.bold}>Date:</Text> {new Date().toLocaleDateString()}</Text>
                    <Text style={styles.viewinfoText}><Text style={styles.bold}>Customer:</Text> {salesData.customer_name}</Text>
                    <Text style={styles.viewinfoText}><Text style={styles.bold}>Company:</Text> {salesData.company || "-"}</Text>
                    <Text style={styles.viewinfoText}><Text style={styles.bold}>Payment Status:</Text> {salesData.payment_status}</Text>
                </View>

                <Divider style={{ marginVertical: 10 }} />

                {/* Product Table */}
                <DataTable>
                    {/* Table Header */}
                    <DataTable.Header style={styles.viewtableHeader}>
                        <DataTable.Title style={{ flex: 2 }}>Product</DataTable.Title>
                        <DataTable.Title numeric style={styles.viewtableCell}>Qty</DataTable.Title>
                        <DataTable.Title numeric>Price</DataTable.Title>
                        <DataTable.Title numeric>Total</DataTable.Title>
                    </DataTable.Header>

                    <Divider style={{ marginVertical: 5 }} />
                    {/* Table Rows */}
                    {Array.isArray(salesData?.products) && salesData?.products?.length > 0 ? (
                        salesData?.products?.map((prod, index) => (
                            <DataTable.Row key={index} style={styles.viewtableRow}>
                                <DataTable.Cell style={{ flex: 2, }}>{prod.product_name}</DataTable.Cell>
                                <DataTable.Cell numeric >{prod.quantity}</DataTable.Cell>
                                <DataTable.Cell numeric>₹{prod.price}</DataTable.Cell>
                                <DataTable.Cell numeric>₹{prod.total_amount}</DataTable.Cell>
                            </DataTable.Row>
                        ))
                    ) : (
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: "#999", textAlign: "center" }}>No products found</Text>
                        </View>
                    )}
                </DataTable>

                <Divider style={{ marginVertical: 10 }} />

                {/* Summary */}
                <View style={styles.viewsummaryContainer}>
                    <Text style={styles.viewsummaryText}><Text style={styles.bold}>Grand Total:</Text> ₹{salesData.grand_total || 0.00}</Text>
                    <Text style={styles.viewsummaryText}><Text style={styles.bold}>Due Amount:</Text> ₹{salesData.due_amount || 0.00}</Text>
                    <Text style={styles.viewsummaryText}><Text style={styles.bold}>Payment Status:</Text> {salesData.payment_status}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default ViewSales;
