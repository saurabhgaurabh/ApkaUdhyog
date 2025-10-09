import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ToastAndroid,
} from "react-native";
import { TextInput, Card } from "react-native-paper";
import SubHeader from "../../../components/SubHeader";
import Colors from "../../../constants/color";
import styles from "../../../MainStyle";

const AddSales = () => {
    const [form, setForm] = useState({
        customer_name: "",
        company: "",
        payment_status: "",
        remarks: "",
    });

    const [products, setProducts] = useState([
        { product_name: "", quantity: "", price: "", total_amount: "" },
    ]);

    const [grandTotal, setGrandTotal] = useState(0);

    const handleProductChange = (index, key, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][key] = value;

        // Auto-calculate total for this product
        if (key === "quantity" || key === "price") {
            const qty = parseFloat(updatedProducts[index].quantity || 0);
            const price = parseFloat(updatedProducts[index].price || 0);
            updatedProducts[index].total_amount = (qty * price).toFixed(2);
        }

        setProducts(updatedProducts);
        calculateGrandTotal(updatedProducts);
    };

    const calculateGrandTotal = (list) => {
        const total = list.reduce(
            (acc, p) => acc + parseFloat(p.total_amount || 0),
            0
        );
        setGrandTotal(total.toFixed(2));
    };

    const addMoreProduct = () => {
        setProducts([
            ...products,
            { product_name: "", quantity: "", price: "", total_amount: "" },
        ]);
    };

    const removeProduct = (index) => {
        const updated = products.filter((_, i) => i !== index);
        setProducts(updated);
        calculateGrandTotal(updated);
    };

    const handleSubmit = async () => {
        try {
            if (!form.customer_name) {
                return ToastAndroid.show("Customer Name is required", ToastAndroid.SHORT);
            }

            const saleData = {
                ...form,
                products,
                grand_total: grandTotal,
            };

            const response = await fetch(
                `https://30e48ae68ae9.ngrok-free.app/api/users/v1/motion-sales`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(saleData),
                }
            );

            const result = await response.json();
            console.log(result, "sales result");

            if (result.status === true) {
                ToastAndroid.show("Sale added successfully!", ToastAndroid.SHORT);
                setForm({ customer_name: "", company: "", payment_status: "", remarks: "" });
                setProducts([{ product_name: "", quantity: "", price: "", total_amount: "" }]);
                setGrandTotal(0);
            } else {
                ToastAndroid.show("Failed to add sale.", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("Error in AddSales Submit:", error.message || error);
            ToastAndroid.show("Error occurred while adding sale.", ToastAndroid.SHORT);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.screenBackground }}>
            <SubHeader title="Add New Sale" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={styles.salescontainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                >
                    {/* Customer Info */}
                    <Card style={styles.salescard}>
                        <Card.Title title="Customer Details" titleStyle={styles.sectionTitle} />
                        <Card.Content>
                            <TextInput
                                label="Customer Name"
                                mode="outlined"
                                value={form.customer_name}
                                onChangeText={(val) => setForm({ ...form, customer_name: val })}
                                style={styles.input}
                                outlineColor="#ccc"
                                activeOutlineColor={Colors.primary}
                            />
                            <TextInput
                                label="Company / Organization"
                                mode="outlined"
                                value={form.company}
                                onChangeText={(val) => setForm({ ...form, company: val })}
                                style={styles.input}
                                outlineColor="#ccc"
                                activeOutlineColor={Colors.primary}
                            />
                        </Card.Content>
                    </Card>

                    {/* Product Info */}
                    <Card style={styles.salescard}>
                        <Card.Title title="Product Details" titleStyle={styles.sectionTitle} />
                        <Card.Content>
                            {products.map((p, index) => (
                                <View key={index} style={{ marginBottom: 16 }}>
                                    <TextInput
                                        label="Product Name"
                                        mode="outlined"
                                        value={p.product_name}
                                        onChangeText={(val) =>
                                            handleProductChange(index, "product_name", val)
                                        }
                                        style={styles.input}
                                        outlineColor="#ccc"
                                        activeOutlineColor={Colors.primary}
                                    />
                                    <View style={{ flexDirection: "row", gap: 10 }}>
                                        <TextInput
                                            label="Qty"
                                            mode="outlined"
                                            keyboardType="numeric"
                                            value={p.quantity}
                                            onChangeText={(val) =>
                                                handleProductChange(index, "quantity", val)
                                            }
                                            style={[styles.input, { flex: 1 }]}
                                        />
                                        <TextInput
                                            label="Price"
                                            mode="outlined"
                                            keyboardType="numeric"
                                            value={p.price}
                                            onChangeText={(val) => handleProductChange(index, "price", val)}
                                            style={[styles.input, { flex: 1 }]}
                                        />
                                    </View>
                                    <TextInput
                                        label="Total"
                                        mode="outlined"
                                        value={p.total_amount}
                                        editable={false}
                                        style={[styles.input, { backgroundColor: "#f3f4f6" }]}
                                    />

                                    {products.length > 1 && (
                                        <TouchableOpacity
                                            onPress={() => removeProduct(index)}
                                            style={{
                                                backgroundColor: "#EF4444",
                                                borderRadius: 8,
                                                alignItems: "center",
                                                padding: 8,
                                                marginTop: 4,
                                            }}
                                        >
                                            <Text style={{ color: "#fff", fontWeight: "600" }}>
                                                Remove Product
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}

                            <TouchableOpacity
                                onPress={addMoreProduct}
                                style={{
                                    backgroundColor: Colors.primary,
                                    borderRadius: 8,
                                    alignItems: "center",
                                    padding: 10,
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "600" }}>+ Add More</Text>
                            </TouchableOpacity>
                        </Card.Content>
                    </Card>

                    {/* Summary */}
                    <Card style={styles.salescard}>
                        <Card.Title title="Summary" titleStyle={styles.sectionTitle} />
                        <Card.Content>
                            <TextInput
                                label="Payment Status"
                                mode="outlined"
                                value={form.payment_status}
                                onChangeText={(val) => setForm({ ...form, payment_status: val })}
                                style={styles.input}
                            />
                            <TextInput
                                label="Remarks"
                                mode="outlined"
                                multiline
                                numberOfLines={3}
                                value={form.remarks}
                                onChangeText={(val) => setForm({ ...form, remarks: val })}
                                style={[styles.input, { height: 80 }]}
                            />
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    textAlign: "right",
                                    marginTop: 10,
                                }}
                            >
                                Grand Total: ₹{grandTotal}
                            </Text>
                        </Card.Content>
                    </Card>
                </ScrollView>

                <View style={styles.bottomBar}>
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
