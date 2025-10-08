import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ToastAndroid, } from "react-native";
import { TextInput, Card, Menu } from "react-native-paper";
import SubHeader from "../../../components/SubHeader";
import Colors from "../../../constants/color";
import styles from "../../../MainStyle";
import { useNavigation } from "@react-navigation/native";

const AddSales = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    const [form, setForm] = useState({
        customer_name: "", company: "", product_name: "", quantity: "", price: "", total_amount: "",
        due_amount: "", payment_status: "", remarks: ""
    });

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });

        // Auto-calculate total amount
        if (key === "quantity" || key === "price") {
            const qty = key === "quantity" ? value : form.quantity;
            const price = key === "price" ? value : form.price;
            const total = parseFloat(qty || 0) * parseFloat(price || 0);
            setForm((prev) => ({ ...prev, total_amount: total.toFixed(2) }));
        }
    };

    const handleSubmit = async () => {
        try {
            const { customer_name, company, product_name, quantity, price, total_amount, due_amount,
                payment_status, remarks } = form;
            const newSale = {
                customer_name, company, product_name, quantity, price, total_amount, due_amount,
                payment_status, remarks
            };
            const response = await fetch(`https://30e48ae68ae9.ngrok-free.app/api/users/v1/motion-sales`, {
                method: "POST",
                headers: {
                    "Accept": "Application/json",
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(newSale),
            })
            const result = await response.json();
            // console.log(result, "sales");
            if (result.status === true) {
                ToastAndroid.show("Sale has been added successfully", ToastAndroid.SHORT);
                setForm({
                    customer_name: "", company: "", product_name: "", quantity: "", price: "", total_amount: "",
                    due_amount: "", payment_status: "", remarks: ""
                });
                // console.log(result, "sale result");
                navigation.navigate("ListSales");
            } else {
                ToastAndroid.show("Failed to add sale. Please try again.", ToastAndroid.SHORT);
                Alert.alert("Error", "Failed to add sale. Please try again.");
            }

        } catch (error) {
            ToastAndroid.show("Failed to add sale. Please try again.", ToastAndroid.SHORT);
            Alert.alert("Error", "An error occurred while adding the sale.");
        }
    };

    const handleCancel = () => {
        setForm({
            customer_name: "",
            product_name: "",
            quantity: "",
            price: "",
            total_amount: "",
            sale_date: "",
            remarks: "",
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.screenBackground }}>
            <SubHeader title="Add New Sale" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }} >
                <ScrollView
                    style={styles.salescontainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }} >
                    <Card style={styles.salescard}>
                        <Card.Title title={<Text style={styles.sectionTitle}>Customer Details</Text>} />
                        <Card.Content>
                            <TextInput
                                label="Customer Name"
                                mode="outlined"
                                value={String(form.customer_name || "")}
                                onChangeText={(val) => handleChange("customer_name", val)}
                                style={styles.input}
                                outlineColor="#ccc"
                                activeOutlineColor={Colors.primary}
                            />
                            <TextInput
                                label="Company/Organization"
                                mode="outlined"
                                placeholder="Company name (if any)"
                                value={String(form.company || "")}
                                onChangeText={(val) => handleChange("company", val)}
                                style={styles.input}
                                outlineColor="#ccc"
                                activeOutlineColor={Colors.primary}
                            />
                        </Card.Content>
                    </Card>
                    <Card style={styles.salescard}>
                        <Card.Title title={<Text style={styles.sectionTitle}>Product Details</Text>} />
                        <Card.Content>
                            <TextInput
                                label="Product Name"
                                mode="outlined"
                                value={String(form.product_name || "")}
                                onChangeText={(val) => handleChange("product_name", val)}
                                style={styles.input}
                                outlineColor="#ccc"
                                activeOutlineColor={Colors.primary}
                            />

                            <View style={styles.salesrow}>
                                <TextInput
                                    label="Quantity"
                                    mode="outlined"
                                    keyboardType="numeric"
                                    value={String(form.quantity || "")}
                                    onChangeText={(val) => handleChange("quantity", val)}
                                    style={[styles.input, styles.halfInput]}
                                    outlineColor="#ccc"
                                    activeOutlineColor={Colors.primary}
                                />
                                <TextInput
                                    label="Price"
                                    mode="outlined"
                                    keyboardType="numeric"
                                    value={String(form.price || "")}
                                    onChangeText={(val) => handleChange("price", val)}
                                    style={[styles.input, styles.halfInput]}
                                    outlineColor="#ccc"
                                    activeOutlineColor={Colors.primary}
                                />
                            </View>
                            <TextInput
                                label="Total Amount"
                                mode="outlined"
                                value={String(form.total_amount || "")}
                                editable={false}
                                style={[styles.input, { backgroundColor: "#f3f4f6" }]}
                                outlineColor="#ccc"
                            />
                        </Card.Content>
                    </Card>
                    <Card style={styles.salescard}>
                        <Card.Title title={<Text style={styles.sectionTitle}>Additional Info</Text>} />
                        <Card.Content>
                            <TextInput
                                label="Remarks"
                                mode="outlined"
                                placeholder="Enter any remarks..."
                                multiline
                                numberOfLines={4}
                                value={String(form.remarks || "")}
                                onChangeText={(val) => handleChange("remarks", val)}
                                style={[styles.input, { height: 100 }]}
                                outlineColor="#ccc"
                                activeOutlineColor={Colors.primary}
                            />
                        </Card.Content>
                    </Card>
                    <Card style={styles.salescard}>
                        <Card.Title title={<Text style={styles.sectionTitle}>Payment Mode</Text>} />
                        <Menu
                            visible={menuVisible}
                            onDismiss={() => setMenuVisible(false)}
                            anchor={
                                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                                    <Card.Content>
                                        <TextInput
                                            label="Payment Status"
                                            mode="outlined"
                                            value={form.payment_status || ""}
                                            editable={false}
                                            style={styles.input}
                                            outlineColor="#ccc"
                                            activeOutlineColor={Colors.primary}
                                        />
                                    </Card.Content>
                                </TouchableOpacity>
                            }>
                            <Menu.Item onPress={() => { handleChange("payment_status", "Active"); setMenuVisible(false); }} title="Active" />
                            <Menu.Item onPress={() => { handleChange("payment_status", "Paid"); setMenuVisible(false); }} title="Paid" />
                            <Menu.Item onPress={() => { handleChange("payment_status", "Unpaid"); setMenuVisible(false); }} title="Unpaid" />
                        </Menu>
                    </Card>
                </ScrollView>
                <View style={styles.bottomBar}>
                    <TouchableOpacity onPress={handleCancel} style={[styles.bottomButton, { backgroundColor: "#9CA3AF" }]}>
                        <Text style={styles.bottomButtonText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmit} style={[styles.bottomButton, { backgroundColor: Colors.primary }]} >
                        <Text style={styles.bottomButtonText}>Add Sale</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default AddSales;
