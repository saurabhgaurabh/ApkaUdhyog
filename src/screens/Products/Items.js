import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import SubHeader from "../../components/SubHeader";
import Colors from "../../constants/color";

const ProductCategoryScreen = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const baseUrl = ServerUrl();
            const response = await fetch(baseUrl + "api/v1/motion-product-category-get");
            const data = await response.json();
            console.log("Fetched Categories:", data?.result?.result);
            setCategories(data?.result?.result || []);
        } catch (error) {
            console.log("Category fetch error:", error);
            Alert.alert("Error", "Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    // Fetch subcategories
    const fetchSubcategories = async (category_id) => {
        // setLoading(true);
        try {
            const response = await fetch(
                `https://2b2a87af0b79.ngrok-free.app/api/users/v1/motion-product-subcategories-get?category_id=${category_id}`
            );
            const data = await response.json();
            console.log("Fetched Sub categories:", data?.result?.result);
            setSubcategories(data?.result?.result || []);
        } catch (error) {
            console.log("Subcategory fetch error:", error);
            Alert.alert("Error", "Failed to fetch subcategories");
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryPress = (category) => {
        setSelectedCategory(category.category_id);
        fetchSubcategories(category.category_id);
    };

    const renderCategory = ({ item }) => {
        const isSelected = selectedCategory === item.category_id;
        return (
            <TouchableOpacity
                style={[
                    styles.categoryCard,
                    isSelected && styles.selectedCategoryCard,
                ]}
                onPress={() => handleCategoryPress(item)}
                activeOpacity={0.8}
            >
                <Text
                    style={[
                        styles.categoryText,
                        isSelected && styles.selectedCategoryText,
                    ]}
                >
                    {item.category_name}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderSubcategory = ({ item }) => (
        <Animatable.View animation="fadeInUp" duration={500} style={styles.subCard}>
            <Text style={styles.subText}>{item.sub_category_name}</Text>
        </Animatable.View>
    );

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={{ marginTop: 10, color: Colors.primary }}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SubHeader title="Item Management" />

            {/* Header and Add Button */}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Product Categories</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate("AddNewItem")}
                >
                    <Text style={styles.addButtonText}>+ Add New Item</Text>
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item, index) =>
                    item.category_id?.toString() || index.toString()
                }
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryListContainer}
            />

            {/* Subcategories */}
            {selectedCategory && (
                <>
                    <Text style={styles.subHeader}>Subcategories</Text>

                    {subcategories.length > 0 ? (
                        <FlatList
                            data={subcategories}
                            renderItem={renderSubcategory}
                            keyExtractor={(item, index) =>
                                item.sub_category_id?.toString() || index.toString()
                            }
                            contentContainerStyle={styles.subListContainer}
                        />
                    ) : (
                        <Text style={styles.noDataText}>
                            No subcategories available for this category.
                        </Text>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6F8",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1C3F60",
    },
    addButton: {
        backgroundColor: "#1C3F60",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        elevation: 2,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
        letterSpacing: 0.5,
    },
    categoryListContainer: {
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    categoryCard: {
        backgroundColor: "#fff",
        height: 90,
        minWidth: 150,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D6DEE5",
    },
    selectedCategoryCard: {
        backgroundColor: "#1C3F60",
        borderColor: "#1C3F60",
        transform: [{ scale: 1.05 }],
    },
    categoryText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E4A62",
    },
    selectedCategoryText: {
        color: "#fff",
    },
    subHeader: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1C3F60",
        marginTop: 10,
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    subCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E1E8ED",
    },
    subText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#334E68",
    },
    subListContainer: {
        paddingBottom: 20,
    },
    noDataText: {
        textAlign: "center",
        color: "#888",
        fontSize: 16,
        marginTop: 20,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F6F8",
    },
});

export default ProductCategoryScreen;
