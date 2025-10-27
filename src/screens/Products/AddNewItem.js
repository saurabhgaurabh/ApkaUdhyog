import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import SubHeader from "../../components/SubHeader";
import { ServerUrl } from "../../services/ServerUrl";
import { useNavigation } from "@react-navigation/native";


const AddNewItem = () => {
    const navigation = useNavigation();
    const [state, setState] = useState({ category_name: "", description: "" });
    const [subCategory, setSubCategory] = useState({
        sub_category_name: "",
        category_id: "",
    });
    const [errors, setErrors] = useState({});
    const [subErrors, setSubErrors] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    // 🟦 Fetch categories for dropdown
    const fetchCategories = async () => {
        try {
            const baseUrl = ServerUrl();
            const res = await fetch(baseUrl + "api/v1/motion-product-category-get");
            // const res = await fetch(`https://37224c0b64d9.ngrok-free.app/api/users/v1/motion-product-category-get`);
            const data = await res.json();
            if (data?.status === true && Array.isArray(data?.result)) {
                const normalized = data?.result.map((item) => ({
                    id: item.category_id,
                    category_name: item.category_name,
                }));
                setCategories(normalized);
            }

        } catch (error) {
            console.error("Fetch categories error:", error);
        }
    };

    // 🟦 Handle change in category inputs
    const handleChange = (field, value) => {
        setState((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    // 🟦 Add category
    const handleCategory = async () => {
        let newErrors = {};
        const { category_name, description } = state;
        console.log(category_name, description, "category_name, description")
        if (!category_name.trim()) newErrors.category_name = "Category name is required.";
        if (!description.trim()) newErrors.description = "Description is required.";

        const isDuplicate = categories.some(
            (cat) =>
                cat.category_name?.toLowerCase() === category_name.trim().toLowerCase()
        );
        if (isDuplicate) newErrors.category_name = "This category already exists.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const baseUrl = ServerUrl();
            const apiUrl = baseUrl + "api/v1/motion-product-category-post";
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state),
            });

            const result = await response.json();
            if (result?.status === true) {
                ToastAndroid.show("Category Added Successfully.", ToastAndroid.SHORT);
                await fetchCategories();
                setCategories((prev) => [
                    ...prev,
                    { category_name, id: result?.insertId || Date.now() },
                ]);
                setState({ category_name: "", description: "" });
                setErrors({});
            } else if (result?.message?.includes("exists")) {
                setErrors({ category_name: "This category already exists in database." });
            } else {
                setErrors({ category_name: "Something went wrong, please try again." });
            }
        } catch (error) {
            console.error("API Error:", error);
            setErrors({ category_name: "Network error, please try later." });
        }
    };

    // 🟩 Add subcategory
    const handleSubCategory = async () => {
        let newErrors = {};
        const { sub_category_name, category_id } = subCategory;

        if (!sub_category_name.trim())
            newErrors.sub_category_name = "Subcategory name is required.";
        if (!category_id) newErrors.category_id = "Please select a category.";

        if (Object.keys(newErrors).length > 0) {
            setSubErrors(newErrors);
            return;
        }

        try {
            const baseUrl = ServerUrl();
            const apiUrl = baseUrl + "api/v1/motion-product-subcategories-post";
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(subCategory),
            });

            const result = await response.json();
            console.log(result, ".......")
            if (result?.status === true) {
                ToastAndroid.show("Subcategory Added Successfully.", ToastAndroid.SHORT);
                setSubCategory({ sub_category_name: "", category_id: "" });
                setSubErrors({});
            } else if (result?.message?.includes("exists")) {
                setSubErrors({
                    sub_category_name: "This subcategory already exists in database.",
                });
            } else {
                setSubErrors({
                    sub_category_name: "Something went wrong, please try again Subcategory.",
                });
            }
        } catch (error) {
            console.error("API Error:", error);
            setSubErrors({ sub_category_name: "Network error, please try later sub." });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <SubHeader title="Categories & Subcategories" />

            {/* -------- CATEGORY SECTION -------- */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Add Category</Text>

                <TextInput
                    style={[styles.input, errors.category_name && styles.inputError]}
                    placeholder="Enter category name"
                    placeholderTextColor="#999"
                    value={state.category_name}
                    onChangeText={(text) => handleChange("category_name", text)}
                />
                {errors.category_name && (
                    <Text style={styles.errorText}>{errors.category_name}</Text>
                )}

                <TextInput
                    style={[styles.input, styles.textArea, errors.description && styles.inputError]}
                    placeholder="Enter description"
                    placeholderTextColor="#999"
                    value={state.description}
                    onChangeText={(text) => handleChange("description", text)}
                    multiline
                    numberOfLines={3}
                />
                {errors.description && (
                    <Text style={styles.errorText}>{errors.description}</Text>
                )}

                <TouchableOpacity style={styles.buttonPrimary} onPress={handleCategory}>
                    <Text style={styles.buttonText}>Add Category</Text>
                </TouchableOpacity>
            </View>
            {/* -------- SUBCATEGORY SECTION -------- */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Add Subcategory</Text>
                <View style={[styles.pickerContainer, subErrors.category_id && styles.inputError,]}>
                    <Picker selectedValue={subCategory?.category_id} onValueChange={(value) => setSubCategory((prev) => ({ ...prev, category_id: Number(value) }))}>
                        <Picker.Item label="Select Category" value="" />
                        {categories.map((cat, index) => (
                            <Picker.Item
                                key={index}
                                label={cat.category_name}
                                value={cat.id}
                            />
                        ))}
                    </Picker>
                </View>
                {subErrors.category_id && (
                    <Text style={styles.errorText}>{subErrors.category_id}</Text>
                )}

                {/* Subcategory Name */}
                <TextInput style={[styles.input, subErrors.sub_category_name && styles.inputError,]}
                    placeholder="Enter subcategory name"
                    placeholderTextColor="#999"
                    value={subCategory.sub_category_name}
                    onChangeText={(text) =>
                        setSubCategory((prev) => ({ ...prev, sub_category_name: text }))
                    }
                />
                {subErrors.sub_category_name && (
                    <Text style={styles.errorText}>{subErrors.sub_category_name}</Text>
                )}

                {/* Description Field */}
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter subcategory description (optional)"
                    placeholderTextColor="#999"
                    value={subCategory.description || ""}
                    onChangeText={(text) =>
                        setSubCategory((prev) => ({ ...prev, description: text }))
                    }
                    multiline
                    numberOfLines={3}
                />

                <TouchableOpacity
                    // onPress={handleSubCategory}
                    style={styles.buttonSecondary}
                    onPress={async () => {
                        let newErrors = {};
                        const { sub_category_name, category_id } = subCategory;

                        if (!sub_category_name.trim())
                            newErrors.sub_category_name = "Subcategory name is required.";
                        if (!category_id) newErrors.category_id = "Please select a category.";

                        if (Object.keys(newErrors).length > 0) {
                            setSubErrors(newErrors);
                            return;
                        }

                        try {
                            const baseUrl = ServerUrl();
                            const apiUrl = baseUrl + "api/v1/motion-product-subcategories-post";

                            // 👇 FIX: match backend expected field names
                            const payload = {
                                sub_category_name: subCategory.sub_category_name,
                                description: subCategory.description || "",
                                category_id: subCategory.category_id,
                            };

                            const response = await fetch(apiUrl, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(payload),
                            });

                            const result = await response.json();
                            if (result?.status === true) {
                                ToastAndroid.show("Subcategory Added Successfully.",ToastAndroid.SHORT);
                                navigation.navigate('Items')
                                setSubCategory({ sub_category_name: "", category_id: "", description: "" });
                                setSubErrors({});
                            } else if (result?.message?.includes("exists")) {
                                setSubErrors({
                                    sub_category_name:
                                        "This subcategory already exists in this category.",
                                });
                            } else {
                                setSubErrors({
                                    sub_category_name: "Something went wrong, please try again. ok ",
                                });
                            }
                        } catch (error) {
                            setSubErrors({ sub_category_name: "Network error, please try later." });
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Add Subcategory</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {},
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
        top: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1C2833",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 15,
        color: "#000",
        marginBottom: 5,
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 10,
        overflow: "hidden",
    },
    inputError: {
        borderColor: "#ff4d4d",
    },
    errorText: {
        color: "#ff4d4d",
        fontSize: 13,
        marginBottom: 10,
        marginLeft: 3,
    },
    buttonPrimary: {
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonSecondary: {
        backgroundColor: "#28a745",
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
    },
});

export default AddNewItem;
