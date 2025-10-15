import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from "react-native";
import SubHeader from "../../components/SubHeader";
import { ServerUrl } from "../../services/ServerUrl";

const AddNewItem = () => {
  const [state, setState] = useState({ category_name: "", description: "" });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  const handleChange = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error while typing
  };

  const handleCategory = async () => {
    let newErrors = {};
    const { category_name, description } = state;

    // ✅ Basic validation
    if (!category_name.trim()) newErrors.category_name = "Category name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";

    // ✅ Duplicate check (case insensitive)
    const isDuplicate = categories.some(
      (cat) => cat.toLowerCase() === category_name.trim().toLowerCase()
    );
    if (isDuplicate) newErrors.category_name = "This category already exists.";

    // ✅ If there are any errors, stop here
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const baseUrl = ServerUrl();
      const apiUrl = baseUrl + "api/users/v1/motion-product-category-post";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      const result = await response.json();
      console.log(result, "category result");

      if (result?.status === true) {
        ToastAndroid.show('Category Added Successfully.', ToastAndroid.SHORT);
        setCategories((prev) => [...prev, category_name.trim()]);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SubHeader title="Categories" />

      {/* -------- CATEGORY SECTION -------- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Add Category</Text>

        {/* Category Input */}
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

        {/* Description Input */}
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

        {/* Add Button */}
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleCategory}>
          <Text style={styles.buttonText}>Add Category</Text>
        </TouchableOpacity>
      </View>

      {/* -------- SUBCATEGORY SECTION -------- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Add Subcategory</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter subcategory name"
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => {}}
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
