import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { TextInput, Card } from "react-native-paper";
import SubHeader from "../../../components/SubHeader";
import Colors from "../../../constants/color";

const AddSales = () => {
    const [form, setForm] = useState({
        customer_name: "",
        product_name: "",
        quantity: "",
        price: "",
        total_amount: "",
        sale_date: "",
        remarks: "",
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

    const handleSubmit = () => {
        console.log("Form submitted:", form);
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

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {/* SECTION 1: CUSTOMER DETAILS */}
                    <Card style={styles.card}>
                        <Card.Title title="Customer Details" titleStyle={styles.sectionTitle} />
                        <Card.Content>
                            <TextInput
                                label="Customer Name"
                                mode="outlined"
                                value={form.customer_name}
                                onChangeText={(val) => handleChange("customer_name", val)}
                                style={styles.input}
                                outlineColor="#ccc"
                                activeOutlineColor={Colors.primary}
                            />

                            <TextInput
                                label="Company/Organization"
                                mode="outlined"
                                placeholder="Company name (if any)"
                                value={form.sale_date}
                                onChangeText={(val) => handleChange("sale_date", val)}
                                style={styles.input}
                                outlineColor="#ccc"
                                activeOutlineColor={Colors.primary}
                            />
                        </Card.Content>
                    </Card>

                    {/* SECTION 2: PRODUCT DETAILS */}
                    <Card style={styles.card}>
                        <Card.Title title="Product Details" titleStyle={styles.sectionTitle} />
                        <Card.Content>
                            <TextInput
                                label="Product Name"
                                mode="outlined"
                                value={form.product_name}
                                onChangeText={(val) => handleChange("product_name", val)}
                                style={styles.input}
                                outlineColor="#ccc"
                                activeOutlineColor={Colors.primary}
                            />

                            <View style={styles.row}>
                                <TextInput
                                    label="Quantity"
                                    mode="outlined"
                                    keyboardType="numeric"
                                    value={form.quantity}
                                    onChangeText={(val) => handleChange("quantity", val)}
                                    style={[styles.input, styles.halfInput]}
                                    outlineColor="#ccc"
                                    activeOutlineColor={Colors.primary}
                                />
                                <TextInput
                                    label="Price"
                                    mode="outlined"
                                    keyboardType="numeric"
                                    value={form.price}
                                    onChangeText={(val) => handleChange("price", val)}
                                    style={[styles.input, styles.halfInput]}
                                    outlineColor="#ccc"
                                    activeOutlineColor={Colors.primary}
                                />
                            </View>

                            <TextInput
                                label="Total Amount"
                                mode="outlined"
                                value={form.total_amount}
                                editable={false}
                                style={[styles.input, { backgroundColor: "#f3f4f6" }]}
                                outlineColor="#ccc"
                            />
                        </Card.Content>
                    </Card>

                    {/* SECTION 3: ADDITIONAL INFO */}
                    <Card style={styles.card}>
                        <Card.Title title="Additional Info" titleStyle={styles.sectionTitle} />
                        <Card.Content>
                            <TextInput
                                label="Remarks"
                                mode="outlined"
                                placeholder="Enter any remarks..."
                                multiline
                                numberOfLines={4}
                                value={form.remarks}
                                onChangeText={(val) => handleChange("remarks", val)}
                                style={[styles.input, { height: 100 }]}
                                outlineColor="#ccc"
                                activeOutlineColor={Colors.primary}
                            />
                        </Card.Content>
                    </Card>
                </ScrollView>

                {/* Floating Action Buttons */}
                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        onPress={handleCancel}
                        style={[styles.bottomButton, { backgroundColor: "#9CA3AF" }]}
                    >
                        <Text style={styles.bottomButtonText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={[styles.bottomButton, { backgroundColor: Colors.primary }]}
                    >
                        <Text style={styles.bottomButtonText}>Add Sale</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default AddSales;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 25,
    },
    card: {
        borderRadius: 15,
        marginBottom: 20,
        elevation: 2,
        backgroundColor: "#fff",
        top: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.primary,
    },
    input: {
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    halfInput: {
        width: "48%",
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 15,
        backgroundColor: "#fff",
        elevation: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    bottomButton: {
        width: "45%",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    bottomButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
