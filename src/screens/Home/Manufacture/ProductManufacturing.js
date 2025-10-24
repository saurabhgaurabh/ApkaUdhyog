import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import SubHeader from "../../../components/SubHeader";

const ProductMaterialForm = () => {
    const [productName, setProductName] = useState("");
    const [materials, setMaterials] = useState([
        {
            materialType: "",
            mineralUsed: "",
            quantity: "",
            unit: "",
            costPerUnit: "",
            supplier: "",
            remarks: "",
        },
    ]);

    const handleMaterialChange = (index, field, value) => {
        const updated = [...materials];
        updated[index][field] = value;
        setMaterials(updated);
    };

    const addMaterial = () => {
        setMaterials([
            ...materials,
            {
                materialType: "",
                mineralUsed: "",
                quantity: "",
                unit: "",
                costPerUnit: "",
                supplier: "",
                remarks: "",
            },
        ]);
    };

    const removeMaterial = (index) => {
        if (materials.length === 1) {
            Alert.alert("Error", "At least one material entry is required.");
            return;
        }
        const updated = materials.filter((_, i) => i !== index);
        setMaterials(updated);
    };

    const handleSave = () => {
        if (!productName.trim()) {
            Alert.alert("Missing Product", "Please enter the product name.");
            return;
        }

        for (let i = 0; i < materials.length; i++) {
            const m = materials[i];
            if (!m.materialType || !m.quantity) {
                Alert.alert(
                    "Missing Fields",
                    `Please fill Material Type and Quantity for Material #${i + 1}.`
                );
                return;
            }
        }

        const finalData = { productName, materials };
        console.log("Submitted Data:", finalData);
        Alert.alert("Success", "Product materials saved successfully!");
    };

    return (
        <View style={styles.wrapper}>
            <SubHeader title="Material Composition" />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Product Name */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Product Name *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Product Name"
                            value={productName}
                            onChangeText={setProductName}
                        />
                    </View>

                    {/* Materials Section */}
                    {materials.map((material, index) => (
                        <View key={index} style={styles.materialCard}>
                            <Text style={styles.materialTitle}>
                                Material #{index + 1}
                            </Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Material Type (e.g. Iron, Steel)"
                                value={material.materialType}
                                onChangeText={(text) =>
                                    handleMaterialChange(index, "materialType", text)
                                }
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Mineral Used (e.g. Aluminum Oxide)"
                                value={material.mineralUsed}
                                onChangeText={(text) =>
                                    handleMaterialChange(index, "mineralUsed", text)
                                }
                            />

                            <View style={styles.row}>
                                <TextInput
                                    style={[styles.input, styles.half]}
                                    placeholder="Quantity"
                                    keyboardType="numeric"
                                    value={material.quantity}
                                    onChangeText={(text) =>
                                        handleMaterialChange(index, "quantity", text)
                                    }
                                />
                                <TextInput
                                    style={[styles.input, styles.half]}
                                    placeholder="Unit (Kg, Ton)"
                                    value={material.unit}
                                    onChangeText={(text) =>
                                        handleMaterialChange(index, "unit", text)
                                    }
                                />
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Cost per Unit"
                                keyboardType="numeric"
                                value={material.costPerUnit}
                                onChangeText={(text) =>
                                    handleMaterialChange(index, "costPerUnit", text)
                                }
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Supplier Name"
                                value={material.supplier}
                                onChangeText={(text) =>
                                    handleMaterialChange(index, "supplier", text)
                                }
                            />

                            {/* ✅ Remarks Input Added */}
                            <TextInput
                                style={[styles.input, styles.remarks]}
                                placeholder="Remarks (e.g. Quality Grade, Source Info, etc.)"
                                multiline
                                numberOfLines={3}
                                value={material.remarks}
                                onChangeText={(text) =>
                                    handleMaterialChange(index, "remarks", text)
                                }
                            />

                            {materials.length > 1 && (
                                <TouchableOpacity
                                    style={styles.removeBtn}
                                    onPress={() => removeMaterial(index)}
                                >
                                    <Text style={styles.removeBtnText}>Remove</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}

                    {/* Add Button */}
                    <TouchableOpacity style={styles.addBtn} onPress={addMaterial}>
                        <Text style={styles.addBtnText}>+ Add Another Material</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Fixed Save Button */}
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>Save All</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ProductMaterialForm;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#F7F8FA",
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 100,
    },
    formGroup: {
        marginBottom: 16,
        top: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        marginBottom: 10,
    },
    remarks: {
        textAlignVertical: "top", // aligns text properly for multiline
    },
    materialCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    materialTitle: {
        fontWeight: "700",
        fontSize: 16,
        color: "#4CAF50",
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    half: {
        width: "48%",
    },
    addBtn: {
        backgroundColor: "#E8F5E9",
        borderColor: "#4CAF50",
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    addBtnText: {
        color: "#4CAF50",
        fontWeight: "700",
        fontSize: 15,
    },
    removeBtn: {
        backgroundColor: "#FFEAEA",
        borderColor: "#FF5252",
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: "center",
    },
    removeBtnText: {
        color: "#FF5252",
        fontWeight: "700",
    },
    saveBtn: {
        backgroundColor: "#4CAF50",
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    saveBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
