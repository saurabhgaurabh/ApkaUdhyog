import React, { useState } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Subheader } from "react-native-paper/lib/typescript/components/List/List";
import SubHeader from "../../../components/SubHeader";

export default function DispatchProductScreen() {
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        organization_name: "",
        owner_name: "",
        mobile: "",
        email: "",
        product_name: "",
        product_type: "",
        quantity: "",
        height: "",
        width: "",
        color: "",
        packing_type: "",
        dispatch_mode: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        gst: "",
        freight: "",
    });

    const handleChange = (field, value) => setForm({ ...form, [field]: value });

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const handleSubmit = () => {
        console.log("Dispatch Data:", form);
        alert("✅ Product Dispatched Successfully!");
    };

    return (
        <>
            <SubHeader title="Add Product Dispatch" />
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: "#f7f9fb" }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <Card style={styles.card}>
                        <Card.Title
                            title="📦 Product Dispatch"
                            titleStyle={styles.cardTitle}
                        />
                        <Card.Content>
                            {step === 1 ? (
                                <>
                                    {/* --- STEP 1 --- */}
                                    <Text style={styles.sectionTitle}>Organization Details</Text>
                                    <TextInput
                                        label="Organization Name"
                                        value={form.organization_name}
                                        onChangeText={(v) => handleChange("organization_name", v)}
                                        style={styles.input}
                                        mode="outlined"
                                        activeOutlineColor="#4CAF50"
                                    />
                                    <TextInput
                                        label="Owner Name"
                                        value={form.owner_name}
                                        onChangeText={(v) => handleChange("owner_name", v)}
                                        style={styles.input}
                                        mode="outlined" activeOutlineColor="#4CAF50"
                                    />
                                    <TextInput
                                        label="Mobile"
                                        keyboardType="phone-pad"
                                        value={form.mobile}
                                        onChangeText={(v) => handleChange("mobile", v)}
                                        style={styles.input}
                                        mode="outlined"
                                        activeOutlineColor="#4CAF50"
                                    />
                                    <TextInput
                                        label="Email"
                                        keyboardType="email-address"
                                        value={form.email}
                                        onChangeText={(v) => handleChange("email", v)}
                                        style={styles.input}
                                        mode="outlined"
                                        activeOutlineColor="#4CAF50"
                                    />

                                    <Text style={styles.sectionTitle}>Product Details</Text>
                                    <TextInput
                                        label="Product Name"
                                        value={form.product_name}
                                        onChangeText={(v) => handleChange("product_name", v)}
                                        style={styles.input}
                                        mode="outlined"
                                        activeOutlineColor="#4CAF50"
                                    />

                                    <View style={styles.dropdownContainer}>
                                        <Text style={styles.dropdownLabel}>Product Type</Text>
                                        <Picker
                                            selectedValue={form.product_type}
                                            onValueChange={(v) => handleChange("product_type", v)}
                                        >
                                            <Picker.Item label="Select Product Type" value="" />
                                            <Picker.Item label="Furnace" value="Furnace" />
                                            <Picker.Item label="Tandoor" value="Tandoor" />
                                            <Picker.Item label="Metal Mold" value="Metal Mold" />
                                            <Picker.Item label="Accessories" value="Accessories" />
                                        </Picker>
                                    </View>

                                    <View style={styles.row}>
                                        <TextInput
                                            label="Quantity"
                                            value={form.quantity}
                                            onChangeText={(v) => handleChange("quantity", v)}
                                            style={[styles.input, styles.half]}
                                            mode="outlined"
                                            keyboardType="numeric"
                                            activeOutlineColor="#4CAF50"
                                        />
                                        <TextInput
                                            label="Color"
                                            value={form.color}
                                            onChangeText={(v) => handleChange("color", v)}
                                            style={[styles.input, styles.half]}
                                            mode="outlined"
                                            activeOutlineColor="#4CAF50"
                                        />
                                    </View>

                                    <View style={styles.row}>
                                        <TextInput
                                            label="Height (cm)"
                                            value={form.height}
                                            onChangeText={(v) => handleChange("height", v)}
                                            style={[styles.input, styles.half]}
                                            mode="outlined"
                                            activeOutlineColor="#4CAF50"
                                        />
                                        <TextInput
                                            label="Width (cm)"
                                            value={form.width}
                                            onChangeText={(v) => handleChange("width", v)}
                                            style={[styles.input, styles.half]}
                                            mode="outlined"
                                            activeOutlineColor="#4CAF50"
                                        />
                                    </View>

                                    <View style={styles.dropdownContainer}>
                                        <Text style={styles.dropdownLabel}>Packing Type</Text>
                                        <Picker
                                            selectedValue={form.packing_type}
                                            onValueChange={(v) => handleChange("packing_type", v)}
                                        >
                                            <Picker.Item label="Select Packing Type" value="" />
                                            <Picker.Item label="Wooden Box" value="Wooden Box" />
                                            <Picker.Item label="Plastic Wrap" value="Plastic Wrap" />
                                            <Picker.Item
                                                label="Cardboard Box"
                                                value="Cardboard Box"
                                            />
                                            <Picker.Item
                                                label="Metal Container"
                                                value="Metal Container"
                                            />
                                        </Picker>
                                    </View>

                                    <View style={styles.dropdownContainer}>
                                        <Text style={styles.dropdownLabel}>Dispatch Mode</Text>
                                        <Picker
                                            selectedValue={form.dispatch_mode}
                                            onValueChange={(v) => handleChange("dispatch_mode", v)}
                                        >
                                            <Picker.Item label="Select Dispatch Mode" value="" />
                                            <Picker.Item label="By Road" value="By Road" />
                                            <Picker.Item label="By Air" value="By Air" />
                                            <Picker.Item label="By Rail" value="By Rail" />
                                            <Picker.Item label="By Sea" value="By Sea" />
                                        </Picker>
                                    </View>

                                    <Button
                                        onPress={handleNext}
                                        mode="contained"
                                        style={styles.submitBtn}
                                        buttonColor="#4CAF50"
                                    >
                                        Next ➜
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {/* --- STEP 2 --- */}
                                    <Text style={styles.sectionTitle}>Shipping Details</Text>
                                    <TextInput
                                        label="Address"
                                        multiline
                                        numberOfLines={2}
                                        value={form.address}
                                        onChangeText={(v) => handleChange("address", v)}
                                        style={styles.input}
                                        mode="outlined"
                                    />
                                    <View style={styles.row}>
                                        <TextInput
                                            label="City"
                                            value={form.city}
                                            onChangeText={(v) => handleChange("city", v)}
                                            style={[styles.input, styles.half]}
                                            mode="outlined"
                                        />
                                        <TextInput
                                            label="State"
                                            value={form.state}
                                            onChangeText={(v) => handleChange("state", v)}
                                            style={[styles.input, styles.half]}
                                            mode="outlined"
                                        />
                                    </View>

                                    <View style={styles.dropdownContainer}>
                                        <Text style={styles.dropdownLabel}>Country</Text>
                                        <Picker
                                            selectedValue={form.country}
                                            onValueChange={(v) => handleChange("country", v)}
                                        >
                                            <Picker.Item label="Select Country" value="" />
                                            <Picker.Item label="India" value="India" />
                                            <Picker.Item label="Nepal" value="Nepal" />
                                            <Picker.Item label="Bangladesh" value="Bangladesh" />
                                            <Picker.Item label="Sri Lanka" value="Sri Lanka" />
                                        </Picker>
                                    </View>

                                    <TextInput
                                        label="Postal Code"
                                        keyboardType="number-pad"
                                        value={form.postal_code}
                                        onChangeText={(v) => handleChange("postal_code", v)}
                                        style={styles.input}
                                        mode="outlined"
                                    />

                                    <Text style={styles.sectionTitle}>Billing Info</Text>
                                    <TextInput
                                        label="GST No."
                                        value={form.gst}
                                        onChangeText={(v) => handleChange("gst", v)}
                                        style={styles.input}
                                        mode="outlined"
                                    />
                                    <TextInput
                                        label="Freight Charges"
                                        value={form.freight}
                                        onChangeText={(v) => handleChange("freight", v)}
                                        style={styles.input}
                                        mode="outlined"
                                        keyboardType="decimal-pad"
                                    />
                                    <View style={styles.row}>
                                        <Button onPress={handleBack} mode="contained" style={styles.submitBtn} buttonColor="#4CAF50" >  Back</Button>                                    </View>
                                </>
                            )}

                        </Card.Content>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { padding: 16, paddingBottom: 40, gap: 10 },
    card: { borderRadius: 12, elevation: 4, backgroundColor: "#fff" },
    cardTitle: { fontSize: 22, color: "#4CAF50", fontWeight: "700" },
    sectionTitle: {
        fontSize: 16,
        marginTop: 16,
        marginBottom: 8,
        color: "#4CAF50",
        fontWeight: "600",
    },
    input: { marginBottom: 12, backgroundColor: "#fff" },
    row: { flexDirection: "row", justifyContent: "space-between" },
    half: { width: "48%" },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    dropdownLabel: {
        color: "#4CAF50",
        fontWeight: "500",
        fontSize: 14,
        marginHorizontal: 10,
        marginTop: 6,
    },
    submitBtn: {
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 6,
        width: "100%",
    },
});
